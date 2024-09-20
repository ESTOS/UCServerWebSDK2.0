import { Common } from "./singletons/common";
import { Config } from "./singletons/config";
import { Logger } from "./singletons/logger";
import { NodeClient } from "./singletons/NodeClient";
import { UCConnect } from "./singletons/ucconnect";
import { UCServerClient } from "./singletons/ucserverclient";

const config = Config.getInstance();
config.init();
export const theConfig = config.config;
export const theLogger = Logger.getInstance(theConfig);
export const theCommon = Common.getInstance(theConfig);
const ucconnect = UCConnect.getInstance(theLogger, theConfig);
export const theUCServerClient = UCServerClient.getInstance(theLogger, theConfig, ucconnect);
export const theNodeClient = NodeClient.getInstance(theLogger, theConfig);
