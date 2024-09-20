import { v4 as uuidv4 } from "uuid";
import path from "path";
import { IConfig } from "../singletons/config";

interface IGetCallingFunctionResult {
	class?: string;
	method: string | undefined;
}

/**
 * A string:string indexed object
 */
export interface IStringIndexedObject {
	[index: string]: string;
}

/**
 * The common class which contains generic unsorted helper functions
 */
export class Common {
	private static common: Common;
	private config: IConfig;

	/**
	 * creates new Common instance
	 * Singleton pattern - only once called in globals
	 *
	 * @param config - global config instance
	 */
	private constructor(config: IConfig) {
		this.config = config;
	}

	/**
	 * Gets or create Common instance
	 * Singleton pattern
	 *
	 * @param theConfig - global config instance
	 * @returns Common instance
	 */
	public static getInstance(theConfig: IConfig): Common {
		if (Common.common == null)
			Common.common = new Common(theConfig);
		return Common.common;
	}

	/**
	 * Generates a uuidv4
	 *
	 * @returns - the uuidv4
	 */
	public generateGUID(): string {
		return uuidv4().split("-").join("");
	}

	/**
	 * Adds a platform specific directory seperator if the string is not empty and not closed with the approrpriate one
	 *
	 * @param dir - Directory path where to add the separator
	 * @returns - the directory with the seperator
	 */
	public addDirSeperator(dir: string): string {
		if (dir.length && dir.substring(dir.length - 1) !== path.sep)
			dir += path.sep;
		return dir;
	}

	/**
	 * Retrieve a random string A-Z, a-z, 0-9, of a given length
	 *
	 * @param length - the length we want to retrieve
	 * @returns - the random string
	 */
	public getRandomString(length: number): string {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < length; i++)
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		return result;
	}

	/**
	 * Retreive a random number as string with a given length
	 *
	 * @param length - the length we want to retrieve
	 * @returns - the random string
	 */
	public getRandomNumberAsString(length: number): string {
		let result = "";
		const characters = "0123456789";
		for (let i = 0; i < length; i++)
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		return result;
	}

	/**
	 * Retrieve a random integer value between 0 and max
	 *
	 * @param max - the maximum value we want to retrieve (exclusive this value - 2 returns 1 or 0)
	 * @returns - the integer value
	 */
	public getRandomInt(max: number): number {
		return Math.floor(Math.random() * Math.floor(max));
	}

	/**
	 * Get the time as 00:00:00:000 value
	 *
	 * @returns - the time
	 */
	public getTime(): string {
		const time = new Date();
		let result = "";
		if (time.getHours() < 10)
			result += "0";
		result += time.getHours().toString();
		result += ":";
		if (time.getMinutes() < 10)
			result += "0";
		result += time.getMinutes().toString();
		result += ":";
		if (time.getSeconds() < 10)
			result += "0";
		result += time.getSeconds().toString();
		result += ":";
		if (time.getMilliseconds() < 10)
			result += "00";
		else if (time.getMilliseconds() < 100)
			result += "0";
		result += time.getMilliseconds().toString();
		return result;
	}

	/**
	 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
	 * In dev mode we do it pretty printed, in prod or staging we do it plain
	 *
	 * @param value - A JavaScript value, usually an object or array, to be converted.
	 * @returns - the converted JSON as string
	 */
	public stringify(value: unknown): string {
		if (this.config.development)
			return JSON.stringify(value, null, "\t");
		else
			return JSON.stringify(value);
	}

	/**
	 * Exits the process and writes that info as error to the console
	 *
	 * @param text - text for the console output
	 * @param code - the code to exit
	 */
	public exit(text: string, code: number): void {
		if (process.env["NODE_ENV"] === "test") {
			// Dont exit test runner
		} else {
			(console as Console).error({ code, text });
			process.exit(code);
		}
	}

	/**
	 * Retrieves a name from the stack of the function that was calling
	 * Instead of going back to the calling function we can also go back furhter layers
	 * This is helpful if we are in a notify called function and do not want to get the fire_method but the method that was calling the fire, then set the back to two
	 *
	 * @param back - how many methods we want to go back
	 * @returns - the name of the function that called the function that called this function
	 */
	public getCallingFunction(back = 1): IGetCallingFunctionResult {
		const result: IGetCallingFunctionResult = {
			method: undefined
		};
		const stack = new Error().stack;
		if (stack) {
			const elements = stack.split("\n");
			const caller = elements[2 + back];
			if (caller) {
				const reg1 = / at (.*) /;
				const method = reg1.exec(caller);
				if (method && method[1]) {
					const reg2 = /(.*)\.(.*)/;
					const split = reg2.exec(method[1]);
					if (split) {
						result.class = split[1];
						result.method = split[2];
					} else
						result.method = method[1];
				}
			}
		}
		return result;
	}

	/**
	 * Delays execution for debugging purposes
	 *
	 * @param ms - the duration to delay
	 * @returns a promise resolving to void
	 */
	public sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	/**
	 * Convert a hex string to an ArrayBuffer.
	 *
	 * @param hex - the hex string to convert
	 * @returns - The bytes as an ArrayBuffer.
	 */
	public hex2buf(hex: string): ArrayBuffer | undefined {
		// Remove potenial leading 0x value
		hex = hex.replace(/^0x/, "");
		// Remove all whitespaces
		hex = hex.replace(/\s/g, "");
		// ensure even number of characters
		if (hex.length % 2 !== 0)
			return undefined;
		// Check for only allowed characters
		if (hex.match(/[G-Z\s]/i))
			return undefined;
		// Get value pairs of two character
		const pairs = hex.match(/[\dA-F]{2}/gi);
		if (!pairs)
			return undefined;
		// convert them to integers
		const integers = pairs.map((s: string): number => {
			return parseInt(s, 16);
		});
		const array = new Uint8Array(integers);
		return array.buffer;
	}
}
