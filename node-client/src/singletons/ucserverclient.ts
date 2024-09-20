import { TSASN1NodeClient } from "../stub/TSASN1NodeClient";
import { IClientConnectionCallback } from "../stub/TSASN1Client";
import { EOwnInterval } from "../lib/common_timers";
import { ENetUC_TransportROSE } from "../stub/ENetUC_TransportROSE";
import { ENetUC_Transport } from "../stub/types";
import { ILogger } from "uclogger";
import { IConfig } from "./config";
import { UCConnect } from "./ucconnect";
import { ISendInvokeContextParams } from "../stub/TSInvokeContext";

/**
 * This is a sample client that encapsulates the hole communication layer and exposes access methods to the server
 * The class implements the transport layer that communicates with the server
 *
 * Each ROSE (Remote object service element) class from the asn1 interface registers with this transport layer to be able to receive events.
 * You may therefore distribute your application in different classes where each class holds a special piece of logic (e.g. journal, cti etc pp)
 */
export class UCServerClient extends TSASN1NodeClient implements IClientConnectionCallback {
	private static instance: UCServerClient;
	private config: IConfig;
	private mylogger: ILogger;
	private ucconnect: UCConnect;
	// Interface to call the server for transport related
	private readonly transport: ENetUC_TransportROSE;
	private keepAliveTimer?: EOwnInterval;

	/**
	 * Constructs the ESelfNginxMonitor object
	 *
	 * @param logger - the logger to log messages
	 * @param config - the config
	 * @param ucconnect - a helper class which allows us to setup a connection to ucconnect
	 */
	private constructor(logger: ILogger, config: IConfig, ucconnect: UCConnect) {
		super(config.transportDefaultEncoding);
		this.config = config;
		this.mylogger = logger;
		this.ucconnect = ucconnect;
		this.setLogger(logger, true);
		this.addConnectionCallback(this);
		this.encodeContext.bPrettyPrint = this.config.bPrettyPrintMessages;
		this.encodeContext.bLaxEncoding = false;
		this.decodeContext.bLaxDecoding = false;

		// Adds access to the transport related asn1 messages
		// You may call operations on this object, check onKeepAliveInterval for an example
		this.transport = new ENetUC_TransportROSE(this, true);
	}

	/**
	 * Gets instance of ConferenceLogger to use as singleton.
	 *
	 * @param logger - the logger to log messages
	 * @param config - the config
	 * @param ucconnect - a helper class which allows us to setup a connection to ucconnect
	 * @returns - an instance of this class.
	 */
	public static getInstance(logger: ILogger, config: IConfig, ucconnect: UCConnect): UCServerClient {
		if (!UCServerClient.instance)
			UCServerClient.instance = new UCServerClient(logger, config, ucconnect);
		return UCServerClient.instance;
	}

	/**
	 * Initializes the self connection check, sets the target url and connects
	 */
	public async init(): Promise<void> {
		await this.prepareConnection();
		await this.connect();
	}

	/**
	 * Uninitializes the self connection check object
	 */
	public exit(): void {
	}

	/**
	 * Getter for the invoke context
	 * Allows to intercept the context that the caller has (oprovided
	 *
	 * @param context - the context the caller has provided with an invoke or event
	 * @param operationID - the operation ID that has been called
	 * @param operationName - the operation Name that has been called
	 * @param event - true, in case we are encoding an event, false for a regular invoke
	 * @returns - an updated context
	 */
	public override getInvokeContextParams(context: Partial<ISendInvokeContextParams> | undefined, operationID: number, operationName: string, event: boolean): ISendInvokeContextParams {
		context = { ...context };
		// Currently the logic of the UCWeb relies on operationnames...
		context.bAddOperationName = true;
		return context;
	}

	/**
	 * Is called from the TSASN1NodeClient just before a reconnect is beeing done
	 */
	public async onBeforeReconnect(): Promise<void> {
		await this.prepareConnection();
	}

	/**
	 * Prepares the connection to the server
	 * Does the uconnect server lookup and auth part
	 *
	 * @returns - a promise resolving to true on success or false on failure
	 */
	private async prepareConnection(): Promise<boolean> {
		const getWebsockerURLResponse = await this.ucconnect.getWebsocketURL();
		if (getWebsockerURLResponse.succeeded) {
			const url = getWebsockerURLResponse.websocketURL.replace(/^http(s?):\/\//, "ws$1://");
			this.mylogger.info("setting connection target", "init", this, { url });
			this.setTarget(url);
		}
		return getWebsockerURLResponse.succeeded;
	}

	/**
	 * Is called from the TSASN1NodeClient if we are connected
	 *
	 * @param bReconnected - true if we are reconnecting, false if we are connecting for the first time
	 */
	public async onClientConnected(bReconnected: boolean): Promise<void> {
		const timeout = 5000;
		this.keepAliveTimer = new EOwnInterval(this.onKeepAliveInterval.bind(this), timeout < 1000 ? 1000 : timeout);
	}

	/**
	 * Is called from the TSASN1NodeClient if we got disconnected
	 *
	 * @param bShuttingDown - true if we are shutting down, false if the connection was terminated by a failure
	 */
	public async onClientDisconnected(bShuttingDown: boolean): Promise<void> {
		if (this.keepAliveTimer) {
			this.keepAliveTimer.clearInterval();
			this.keepAliveTimer = undefined;
		}
	}

	/**
	 * Called by the timer to send a keepalive message to the server to keep the connection up and running
	 */
	private async onKeepAliveInterval(): Promise<void> {
		const arg = new ENetUC_Transport.AsnTransportKeepAliveArgument({ dummy: null });
		await this.transport.event_asnTransportKeepAlive(arg);
	}
}
