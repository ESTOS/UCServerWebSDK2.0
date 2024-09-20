import { ILogger } from "uclogger";
import { IConfig } from "./config";
import { ENetUC_Auth, ENetUC_Common_AsnContact, ENetUC_PresenceV2 } from "../stub/types";
import { ENetUC_PresenceV2ROSE } from "../stub/ENetUC_PresenceV2ROSE";
import { theUCServerClient } from "../globals";
import { IENetUC_PresenceV2ROSE_Event_Handler, IENetUC_PresenceV2ROSE_Handler } from "../stub/ENetUC_PresenceV2ROSE_Interface";
import { IReceiveInvokeContext } from "../stub/TSROSEBase";
import { ENetUC_AuthROSE } from "../stub/ENetUC_AuthROSE";

/**
 * This is the main client of this UCServer Web SDK 2.0 example project
 * This client is the one that will trigger "stuff" on the server side and receive events if the client wants to have them
 *
 * This client can hold all the server functions or you follow the same pattern and you create per module elements
 */
export class NodeClient implements Partial<IENetUC_PresenceV2ROSE_Handler> {
	private static instance: NodeClient;
	private config: IConfig;
	private logger: ILogger;
	private ownContact?: ENetUC_Common_AsnContact.AsnContactV2;
	private ownContactID?: string;

	// These objects are used to call the server side
	private presenceV2: ENetUC_PresenceV2ROSE;
	private auth: ENetUC_AuthROSE;

	/**
	 * Creates the node client class
	 *
	 * @param logger - global logger instance
	 * @param config - global config instance
	 */
	private constructor(logger: ILogger, config: IConfig) {
		this.config = config;
		this.logger = logger;

		// theUCServerClient holds the connection to the server
		// When we want to implement some functionality we need to create ROSE objects that encapsulate the communication layer for a certain asn1 module
		// This can be done *anywhere*, so you can wrap them all in the same object or separate them according to your needs.
		// The constructor of these objects requires you to provide the transport layer (theUCServerClient)
		// By doing this the module is registered in the transport, thus inbound invokes or events are dispatchable to the third argument which is this here.
		// The once the servre has something he wants to tell us theUCServerClient decodes the message and finds the appropriate module to handle the request.
		// We do this here by subscribing to our own presence. If that presence changes we get notified in onEvent_asnUpdatePresenceV2

		this.presenceV2 = new ENetUC_PresenceV2ROSE(theUCServerClient, true, this);

		// Auth has no events, so we do not need to register a handler
		this.auth = new ENetUC_AuthROSE(theUCServerClient, false);
	}

	/**
	 * Gets or creates the NodeClient
	 * Singleton pattern
	 *
	 * @param logger - global logger instance
	 * @param config - global config instance
	 * @returns Common instance
	 */
	public static getInstance(logger: ILogger, config: IConfig): NodeClient {
		if (NodeClient.instance == null)
			NodeClient.instance = new NodeClient(logger, config);
		return NodeClient.instance;
	}

	/**
	 * Event from the server to the client about presence updates
	 *
	 * This event is fired from the server if the client has subscribed by asnGetAndSubscribePresence on a contact (=user).
	 * It contains the new presence state and other data which has changed.
	 *
	 * @param argument - Argument of asnUpdatePresence
	 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
	 */
	public onEvent_asnUpdatePresenceV2(argument: ENetUC_PresenceV2.AsnUpdatePresenceV2Argument, invokeContext: IReceiveInvokeContext): void {
		console.log("Hey, we just received a presence update...");
	}

	/**
	 * The main loop for the example client
	 */
	public async main(): Promise<void> {
		// Now let´s do something magic in our example client

		// Initialize the client connection towards the server
		await theUCServerClient.init();

		// First let´s connect to the other side. This is done implicit on the first called command.
		{
			const argument = new ENetUC_Auth.AsnGetLoggedInContactArgument();
			const response = await this.auth.invoke_asnGetLoggedInContactV2(argument);
			if (response instanceof ENetUC_Auth.AsnGetLoggedInContactV2Result) {
				this.ownContact = response.ownContact;
				this.ownContactID = this.ownContact.u8sContactId;
			} else
				this.logger.error("Could not retrieve own contact", "main", this, { argument }, response);
		}
		if (this.ownContactID) {
			const argument = new ENetUC_PresenceV2.AsnGetAndSubscribePresenceArgument({
				seqContactIDs: [this.ownContactID]
			});
			const response = await this.presenceV2.invoke_asnGetAndSubscribePresenceV2(argument);
			if (response instanceof ENetUC_PresenceV2.AsnGetAndSubscribePresenceV2Result) {
				// The response constains a presence snapshot of our own contact
				// Whenever something changes we will get notified with a call to onEvent_asnUpdatePresenceV2
				for (const presence of response.seqSubscribedPresence)
					console.log(presence);
			} else
				this.logger.error("Could not retrieve own contact", "main", this, { argument }, response);
		}
	}
}
