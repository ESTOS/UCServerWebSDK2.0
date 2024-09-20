import { theLogger, theNodeClient } from "./globals";

theLogger.init();

/**
 * The main function to execute stuff
 */
async function main() {
	await theNodeClient.main();
}

void main();
