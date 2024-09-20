import { ELogger, IELoggerSettings, IFinalLogData } from "uclogger";
import { TransformableInfo } from "logform";
import fs from "fs";
import path from "path";
import { ITransportMetaData } from "../stub/TSASN1Base";
import { EOwnInterval, EOwnTimeout } from "../lib/common_timers";
import micromatch from "micromatch";
import { IConfig } from "./config";
import { theCommon } from "../globals";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type logany = any

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * This function removes rather large objects from a log object which bring no benefit to the log output
 * e.g. a websocket requires 100k json log, but has no sense to be logged, same for the timer objects
 *
 * @param obj - the object to parse
 * @param levelstoprocess - a counter that is used to only process a certain level (deepness in the object)
 * @param id - in recursion the id of the parent element we are currently handling
 * @param cache - an internal cache object for the recursive calls
 * @returns - the cleaned object
 */
function omitForLoggingInternal(obj: logany, levelstoprocess?: number, id?: string, cache: logany[] = []): unknown {
	try {
		let result: logany | undefined;

		const type = typeof (obj);
		switch (type) {
			case "boolean":
			case "number":
			case "string":
			case "bigint":
			case "undefined":
				result = obj;
				break;
			case "function":
			case "symbol":
				// we do not take over symbols or functions into the Logger
				break;
			case "object":
				if (obj instanceof Date)
					result = obj;
				else if (obj instanceof WebSocket ||
						obj instanceof EOwnTimeout ||
						obj instanceof EOwnInterval)
					result = omitForLoggingInternal(obj, 0, id);
				else if (obj === null)
					result = obj;
				else {
					if (obj.toJSON)
						obj = obj.toJSON();

					const pos = cache.indexOf(obj);
					if (pos !== -1)
						result = "circular_reference";
					else {
						cache.push(obj);

						let counter = 0;
						result = {};
						const keys = Object.keys(obj);
						for (const iid of keys) {
							if (counter < 20 || levelstoprocess === undefined) {
								const element = obj[iid];
								if (levelstoprocess === undefined)
									result[iid] = omitForLoggingInternal(element, levelstoprocess, iid);
								else if (levelstoprocess > 0)
									result[iid] = omitForLoggingInternal(element, levelstoprocess - 1, iid);
								else {
									const type = typeof element;
									if (type === "object")
										result[iid] = "obj truncated";
									else if (type === "function")
										result[iid] = "func truncated";
									else if (type === "symbol")
										result[iid] = "sym truncated";
									else
										result[iid] = element;
								}
								// Only count defined objects wether we truncate or not
								if (result[iid] !== undefined)
									counter++;
							} else if (counter === 20) {
								result.truncated = true;
								counter++;
							}
						}
					}
				}
				break;
			default:
				// die we miss something?
				debugger;
				(console as Console).error("invalid type case", "", undefined, { type });
				break;
		}

		return result;
	} catch (error) {
		debugger;
		return obj;
	}
}

/**
 * This function removes rather large objects from a log object which bring no benefit to the log output
 * e.g. a websocket requires 100k json log, but has no sense to be logged, same for the timer objects
 *
 * @param obj - the object to parse
 * @param levelstoprocess - a counter that is used to only process a certain level (deepness in the object)
 * @returns - the cleaned object
 */
export function omitForLogging(obj: unknown, levelstoprocess?: number): unknown {
	return omitForLoggingInternal(obj, levelstoprocess);
}

/**
 * This filter removes websocket and timer objects from logging
 */
class FilterLog {
	/**
	 * Custum log filter
	 *
	 * @param info - log entry
	 * @returns - the transformt log entry
	 */
	public transform(info: TransformableInfo): TransformableInfo {
		let result: TransformableInfo | undefined;
		try {
			result = omitForLogging(info) as TransformableInfo;
		} catch (e) {
			debugger;
		}
		return result || info;
	}
}
/** Simple filter for the transport logging */
class FilterLogTransport {
	/**
	 * Custum log parser
	 *
	 * @param info - log entry
	 * @returns - the transformed log entry or false
	 */
	public transform(info: TransformableInfo): TransformableInfo | false {
		const logData = info as IFinalLogData;
		if (logData.meta) {
			const transport = logData.meta as ITransportMetaData;
			if (transport.payLoad && transport.type && transport.direction) {
				let details = `${info["time"]}`;
				if (transport.clientConnectionID)
					details += " - " + transport.clientConnectionID;
				else if (transport.clientIP)
					details += " - " + transport.clientIP;
				details += " - " + transport.direction;
				if (transport.invokeID)
					details += " - " + transport.invokeID;
				const plain = typeof transport.payLoad === "string";
				const result = {
					_: details,
					// level: info.level,
					// message: info.message,
					...(plain && { raw: transport.payLoad }),
					...(!plain && { ...(transport.payLoad as object) })
				} as unknown as TransformableInfo;
				return result;
			}
		}
		return false;
	}
}

/**
 * Returns the logger settings
 *
 * @param config - the config
 * @returns the settings
 */
function getELoggerSettings(config: IConfig): IELoggerSettings {
	const eLoggerSettings: IELoggerSettings = {
		logLevel: config.logLevel,
		infrastructure: {
			environment: config.environment,
			servername: "",
			role: "UCServerWebSDK2.0",
			role_instance: 0
		},
		logSubsequentErrorsAs: "debug"
	};

	if (config.logToConsole) {
		eLoggerSettings.consoleLog =
		{
			logConsole: true,
			logObjectInsteadOfMessage: config.environment === "development",
			filterData: new FilterLog(),
			filter: {
				error: true,
				warn: true,
				debug: false,
				info: false
			}
		};
	}

	eLoggerSettings.fileLog = [];
	if (config.logToConsole) {
		eLoggerSettings.fileLog.push(
			{
				logFilename: "node-client.log",
				logDirectory: config.logDirectory,
				prettyPrintLogFile: 2,
				maxFileSize: 1024 * 1024 * 25,
				maxFileCount: (config.environment === "development") ? 1 : 10,
				bNewFileAlways: (config.environment === "development") ? true : false,
				filterData: new FilterLog(),
				logLevel: "debug",
				bSyncLogging: config.development
			}
		);
	}

	if (config.logASN1Transport) {
		eLoggerSettings.fileLog.push(
			{
				logFilename: "asn1Transport.log",
				logDirectory: config.logDirectory,
				prettyPrintLogFile: 2,
				maxFileSize: 1024 * 1024 * 25,
				maxFileCount: config.environment === "development" ? 1 : 10,
				bNewFileAlways: config.environment === "development" ? true : false,
				filterData: new FilterLogTransport(),
				filter: {
					common: {
						includeMessages: ["asn1Transport"]
					}
				},
				logLevel: "debug",
				bSyncLogging: config.development
			}
		);
	}

	return eLoggerSettings;
}

/**
 * A Wrapper around the uccommon ELogger class to extend it with own functionality
 */
export class Logger extends ELogger {
	public readonly notifyName = "Logger";
	// The singleton instance of this class
	private static instance: Logger;
	// set to true if we initialized the singleton
	private bInitialized = false;
	// Access to the console for logging
	private con: Console = console;
	// the config which parameterizes the logger
	private config: IConfig;

	/**
	 * Constructs the Logger object
	 *
	 * @param config - the config which parameterizes the logger
	 */
	private constructor(config: IConfig) {
		super();
		this.config = config;
	}

	/**
	 * Gets instance of Logger to use as singleton.
	 *
	 * @param config - the config which parameterizes the logger
	 * @returns - an instance of this class.
	 */
	public static getInstance(config: IConfig): Logger {
		if (!Logger.instance)
			Logger.instance = new Logger(config);
		return Logger.instance;
	}

	/**
	 * Initializes the ConferenceLogger and the uccommon ELogger class
	 */
	public override init(): void {
		const logSettings = getELoggerSettings(this.config);
		if (this.config.cleanLogDirectoryOnStart) {
			const logDirectory = theCommon.addDirSeperator(this.config.logDirectory);
			let filesToDelete: string[] = [];
			const files = fs.readdirSync(logDirectory);
			if (Array.isArray(logSettings.fileLog)) {
				for (const fileLog of logSettings.fileLog) {
					const ext = path.extname(fileLog.logFilename);
					const base = path.basename(fileLog.logFilename, ext);
					const matchName = `${base}*${ext}`;
					const matches = micromatch.match(files, matchName);
					filesToDelete = filesToDelete.concat(matches);
				}
			} else if (logSettings.fileLog) {
				const ext = path.extname(logSettings.fileLog.logFilename);
				const base = path.basename(logSettings.fileLog.logFilename, ext);
				const matchName = `${base}*.${ext}`;
				const matches = micromatch.match(files, matchName);
				filesToDelete = filesToDelete.concat(matches);
			}
			for (const filetoDelete of filesToDelete) {
				const filePath = path.join(this.config.logDirectory, filetoDelete);
				this.console_log(`Removing ${filePath}`);
				try {
					fs.unlinkSync(filePath);
				} catch (error) {
					this.console_error(`Failed to unlink ${filePath} ${error}`);
				}
			}
		}

		super.init(logSettings);

		this.bInitialized = true;
	}

	/**
	 * Unintializes the module
	 *
	 * @returns a Promise resolving to void
	 */
	public override async exit(): Promise<void> {
		if (!this.bInitialized)
			return;

		await super.exit();

		this.bInitialized = false;
	}

	/**
	 * Logs to the console. Strings are only printed if configured in the settings
	 *
	 * @param data - data to log
	 * @param optionalParams - Additional arguments
	 */
	public console_log(data: unknown, ...optionalParams: any[]): void {
		this.con.log(data, ...optionalParams);
	}

	/**
	 * Logs to the console. Strings are only printed if configured in the settings
	 *
	 * @param data - data to log
	 * @param optionalParams - Additional arguments
	 */
	public console_warn(data: unknown, ...optionalParams: any[]): void {
		this.con.warn(data, ...optionalParams);
	}

	/**
	 * Logs to the console. Strings are only printed if configured in the settings
	 *
	 * @param data - data to log
	 * @param optionalParams - Additional arguments
	 */
	public console_error(data: unknown, ...optionalParams: any[]): void {
		this.con.error(data, ...optionalParams);
	}
}
