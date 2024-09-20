import { EConfigTemplate, validators, ICoreConfig } from "ucconfig";
import { URL } from "url";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { EASN1TransportEncoding } from "../stub/TSInvokeContext";

/**
 * The static config of our server
 */
class StaticConfig {
	public readonly clientConnection = {
		client_keepalive: 30000
	};
}

interface IEconfConfig extends StaticConfig {
	instanceID: string;
	bPrettyPrintMessages: boolean;
	logDirectory: string;
	logToConsole: boolean;
	logASN1Transport: boolean;
	cleanLogDirectoryOnStart: boolean;
	transportDefaultEncoding: EASN1TransportEncoding;
	// UCConnect connection settings
	uccontrollerUrl: URL;
	ucsid: string;
	username: string;
	password: string;
}

export type IConfig = IEconfConfig & ICoreConfig

/**
 *
 */
export class Config extends EConfigTemplate {
	private static _config: Config;
	private _configuration: IEconfConfig;

	/**
	 * Constructor --- you know?
	 */
	private constructor() {
		super("UCSERVERWEBSDK20_CLIENT");
		dotenv.config();
		this.initCore();
		this._configuration = this.init();
		this.validate(true);
	}

	/**
	 * Returns instance of Config
	 *
	 * @returns Config - instance of config
	 */
	public static getInstance(): Config {
		if (!Config._config)
			Config._config = new Config();
		return Config._config;
	}

	/**
	 * Getter for the main config
	 *
	 * @returns - IConfig object
	 */
	public get config(): IConfig {
		return { ...this._configuration, ...this.coreConfig };
	}

	/**
	 * Inits all configurations/settings from given environment variables
	 *
	 * @returns IEConfig - configuration by env
	 */
	public init(): IEconfConfig {
		const config: IEconfConfig = {
			...new StaticConfig(),
			instanceID: uuidv4().split("-").join(""),
			bPrettyPrintMessages: this.newEnvProperty<boolean>("PRETTYPRINT", validators.validateBoolean(), false),
			logDirectory: this.newProperty<string>("LOG_DIRECTORY", validators.validateFolderExists()),
			logToConsole: this.newProperty<boolean>("LOG_TO_CONSOLE", validators.validateBoolean(), false),
			logASN1Transport: this.newProperty<boolean>("LOG_ASN1_TRANSPORT", validators.validateBoolean(), true),
			transportDefaultEncoding: this.newProperty<EASN1TransportEncoding>("TRANSPORT_DEFAULT_ENCODIG", validators.validateInteger(1, 2), EASN1TransportEncoding.JSON),
			cleanLogDirectoryOnStart: this.newProperty<boolean>("LOG_CLEAN_DIRECTORY_ON_START", validators.validateBoolean(), false),
			uccontrollerUrl: this.newProperty<URL>("UCCONTROLLERURL", validators.validateURL(), new URL("https://uccontroller.ucconnect.de")),
			ucsid: this.newProperty<string>("UCSID", validators.validateStringNotEmpty()),
			username: this.newProperty<string>("USERNAME", validators.validateStringNotEmpty()),
			password: this.newProperty<string>("PASSWORD", validators.validateStringNotEmpty())
		};
		return config;
	}

	/**
	 * Current working directory of the Node.js process
	 *
	 * @returns - current working directory of the Node.js process
	 */
	public get rootdir(): string {
		return process.cwd();
	}
}
