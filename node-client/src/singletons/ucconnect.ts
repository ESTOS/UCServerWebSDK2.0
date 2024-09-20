import { ILogger } from "uclogger";
import { IConfig } from "./config";
import { error } from "console";

interface IRedirectResponse {
	redirect?: string;
}

interface IGetUCWebSessionResponse {
	sessionid?: string;
}

interface IConnectionError {
	httpResultcode: number;
	errorDescription: string;
}

interface IGetUCWebSessionResultSucceeded {
	succeeded: true;
	sessionid: string;
}

interface IGetUCWebSessionResultFailed {
	succeeded: false;
	error: IConnectionError;
}

type IGetUCWebSessionResult = IGetUCWebSessionResultSucceeded | IGetUCWebSessionResultFailed

interface IGetUCWebResultSucceeded {
	succeeded: true;
	redirectURL: string;
}

interface IGetUCWebResultFailed {
	succeeded: false;
	error: IConnectionError;
}

type IGetUCWebResult = IGetUCWebResultSucceeded | IGetUCWebResultFailed

interface IConnectToUCWebResultFailed {
	succeeded: false;
	error: IConnectionError;
}

interface IConnectToUCWebResultSucceeded {
	succeeded: true;
	websocketURL: string;
}

type IConnectToUCWebResult = IConnectToUCWebResultFailed | IConnectToUCWebResultSucceeded;

/**
 * Wraps access to UCConnect in a class
 * This class helps setting up a connection towards UCConnect to the proxy the UCServer is connected to
 */
export class UCConnect {
	private static instance: UCConnect;
	private logger: ILogger;
	private config: IConfig;

	/**
	 * Constructs the UConnect connection helper object
	 *
	 * @param logger - the logger to log messages
	 * @param config - the config
	 */
	private constructor(logger: ILogger, config: IConfig) {
		this.logger = logger;
		this.config = config;
	}

	/**
	 * Gets instance of ConferenceLogger to use as singleton.
	 *
	 * @param logger - the logger to log messages
	 * @param config - the config
	 * @returns - an instance of this class.
	 */
	public static getInstance(logger: ILogger, config: IConfig): UCConnect {
		if (!UCConnect.instance)
			UCConnect.instance = new UCConnect(logger, config);
		return UCConnect.instance;
	}

	/**
	 * Retrieves a ucweb from the controller
	 *
	 * @returns the redirect url if the Controller has one
	 */
	private async getUCWeb(): Promise<IGetUCWebResult> {
		try {
			const target = new URL(`/controller/client/ucws?ucsid=${this.config.ucsid}`, this.config.uccontrollerUrl);
			const ucControllerURL = target.toString();
			this.logger.debug("connecting uccontroller", "getUCWeb", undefined, { ucControllerURL });
			const resp = await fetch(ucControllerURL, {
				method: "GET",
				signal: AbortSignal.timeout(10000)
			});

			const bodyAvailable = resp.headers.get("Content-Length") ? true : false;
			this.logger.debug("Fetch returned", "getUCWeb", undefined, { bodyAvailable, status: resp.status });

			if (resp.status !== 200 || !bodyAvailable) {
				let errorDescription: string | undefined;
				if (bodyAvailable)
					errorDescription = await resp.text();
				else
					errorDescription = "no repsonse provided";
				this.logger.error("No valid redirect response received 1", "getUCWeb", undefined, { bodyUsed: resp.bodyUsed, errorDescription });
				return {
					succeeded: false,
					error: {
						httpResultcode: resp.status,
						errorDescription
					}
				};
			}
			const redirectResponse = await resp.json() as IRedirectResponse;
			if (redirectResponse && redirectResponse.redirect) {
				this.logger.info("Received redirect target", "getUCWeb", undefined, { redirectURL: redirectResponse.redirect });
				return {
					succeeded: true,
					redirectURL: redirectResponse.redirect
				};
			}
			this.logger.error("No valid redirect response received 2", "getUCWeb");
			return {
				succeeded: false,
				error: {
					httpResultcode: resp.status,
					errorDescription: "Could not read server response"
				}
			};
		} catch (error) {
			this.logger.error("Exception catched", "getUCWeb", undefined, { ucController: this.config.uccontrollerUrl, ucsId: this.config.ucsid }, error);
			return {
				succeeded: false,
				error: {
					httpResultcode: 0,
					errorDescription: (error as Error).message
				}
			};
		}
	}

	/**
	 * Create a session on the UCWeb
	 * Returns the token we need to open the websocket connection
	 *
	 * @param ucweb - the ucweb to connect to
	 * @returns the token we need to open the websocket
	 */
	private async getUCWebSession(ucweb: string): Promise<IGetUCWebSessionResult> {
		try {
			const headers = new Headers();
			headers.append("X-Ucsid", this.config.ucsid);
			headers.append("Authorization", `Basic ${btoa(this.config.username + ":" + this.config.password)}`);

			const target = new URL("/ws/client/createsession?clientappid=15", ucweb);
			const ucWebURL = target.toString();
			this.logger.debug("connecting ucweb", "getUCWebSession", undefined, { ucWebURL });
			const resp = await fetch(ucWebURL,
				{
					method: "GET",
					headers,
					signal: AbortSignal.timeout(10000)
				}
			);
			this.logger.debug("Fetch returned", "getUCWebSession", undefined, { status: resp.status });

			if (resp.status !== 200) {
				let errorDescription = await resp.text();
				if (!errorDescription)
					errorDescription = "no repsonse provided";
				this.logger.error("No valid response received 1", "getUCWebSession", undefined, { bodyUsed: resp.bodyUsed, errorDescription });
				return {
					succeeded: false,
					error: {
						httpResultcode: resp.status,
						errorDescription
					}
				};
			}
			const sessionResponse = await resp.json() as IGetUCWebSessionResponse;
			if (sessionResponse && sessionResponse.sessionid) {
				this.logger.info("Received redirect target", "getUCWebSession", undefined, { sessionid: sessionResponse.sessionid });
				return {
					succeeded: true,
					sessionid: sessionResponse.sessionid
				};
			}
			this.logger.error("No valid response received 2", "getUCWebSession");
			return {
				succeeded: false,
				error: {
					httpResultcode: resp.status,
					errorDescription: "Could not read server response"
				}
			};
		} catch (error) {
			this.logger.error("Exception catched", "getUCWebSession", undefined, { ucController: this.config.uccontrollerUrl, ucweb, ucsId: this.config.ucsid }, error);
			return {
				succeeded: false,
				error: {
					httpResultcode: 0,
					errorDescription: (error as Error).message
				}
			};
		}
	}

	/**
	 * Retrieves the url that allows us to open a websocket to the proper UCWeb
	 * - Asks the controller for a usable ucweb proxy
	 * - Authenticates to this ucweb and retreives a sessionId to create the websocket URL
	 *
	 * @returns the webSocketURL or an error
	 */
	public async getWebsocketURL(): Promise<IConnectToUCWebResult> {
		const ucWebResult = await this.getUCWeb();
		if (!ucWebResult.succeeded)
			return ucWebResult;
		else {
			const ucWebSessionResult = await this.getUCWebSession(ucWebResult.redirectURL);
			if (!ucWebSessionResult.succeeded)
				return ucWebSessionResult;

			const target = new URL(`/ws/client/websocket/?x-ucsessionid=${ucWebSessionResult.sessionid}`, ucWebResult.redirectURL);
			const websocketURL = target.toString();
			this.logger.info("Connecting to ucweb", "connectToUCWeb", undefined, { websocketURL });

			return {
				succeeded: true,
				websocketURL
			};
		}
	}
}
