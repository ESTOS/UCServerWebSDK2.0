// [PrintTSROSEInterfaceCode]
// [PrintTSROSEHeader]
/**
 * ENetUC_AdminROSE_Interface
 * "UC-Server-Access-Protocol-Admin" ASN.1 interfaces.
 * This file was generated by estos esnacc (V6.0.19, 20.09.2024)
 * based on Coral WinSnacc written by Deepak Gupta
 * NOTE: This is a machine generated file - editing not recommended
 */

// prettier-ignore
/* eslint-disable */
// [PrintTSROSEImport]
import { IReceiveInvokeContext, AsnInvokeProblem } from "./TSROSEBase";
import { ISendInvokeContextParams } from "./TSInvokeContext";
// Local imports
import * as ENetUC_Admin from "./ENetUC_Admin";
// [PrintTSImports]
import * as ENetUC_Common from "./ENetUC_Common";
import * as ENetUC_Common_AsnContact from "./ENetUC_Common_AsnContact";
// [PrintTSRootTypes]
export const MODULE_NAME = "ENetUC_AdminROSEInterface";
export const MODULE_LASTCHANGE = "1970-01-01T00:00:00Z";
export const MODULE_MAJOR_VERSION = 8;
export const MODULE_MINOR_VERSION = 0;
export const MODULE_VERSION = "8.0.0";

// [PrintTSROSEInterface]
export interface IENetUC_AdminROSE {
	invoke_asnAdminLogin(argument: ENetUC_Admin.AsnAdminLoginArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminLoginResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminGetUserProfile(argument: ENetUC_Admin.AsnAdminGetUserProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminGetUserProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminGetUserProfiles(argument: ENetUC_Admin.AsnAdminGetUserProfilesArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminGetUserProfilesResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminSetUserProfile(argument: ENetUC_Admin.AsnAdminSetUserProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminSetUserProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminRemoveUserProfile(argument: ENetUC_Admin.AsnAdminRemoveUserProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminRemoveUserProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminAddUserProfile(argument: ENetUC_Admin.AsnAdminAddUserProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminAddUserProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminGetComputerProfile(argument: ENetUC_Admin.AsnAdminGetComputerProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminGetComputerProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminSetComputerProfile(argument: ENetUC_Admin.AsnAdminSetComputerProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminSetComputerProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminAddComputerProfile(argument: ENetUC_Admin.AsnAdminAddComputerProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminAddComputerProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminFindUser(argument: ENetUC_Admin.AsnAdminFindUserArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminFindUserResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminFindGroupProfiles(argument: ENetUC_Admin.AsnAdminFindGroupProfilesArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminFindGroupProfilesResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminSetGroupProfile(argument: ENetUC_Admin.AsnAdminSetGroupProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminSetGroupProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminAddGroupProfile(argument: ENetUC_Admin.AsnAdminAddGroupProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminAddGroupProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminRemoveGroupProfile(argument: ENetUC_Admin.AsnAdminRemoveGroupProfileArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminRemoveGroupProfileResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnGetDatabaseManagerSettings(argument: ENetUC_Admin.AsnGetDatabaseManagerSettingsArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnGetDatabaseManagerSettingsResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnGetNetworkInterfacePorts(argument: ENetUC_Admin.AsnGetNetworkInterfacePortsArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnGetNetworkInterfacePortsResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnGetAvailableLines(argument: ENetUC_Admin.AsnGetAvailableLinesArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnGetAvailableLinesResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnGetUserManagerSettings(argument: ENetUC_Admin.AsnGetUserManagerSettingsArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnGetUserManagerSettingsResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminGetPhoneJournalSettings(argument: ENetUC_Admin.AsnAdminGetPhoneJournalSettingsArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminGetPhoneJournalSettingsResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminSetAnonymousUserAccessToken(argument: ENetUC_Admin.AsnAdminSetAnonymousUserAccessTokenArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminSetAnonymousUserAccessTokenResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminSetAnonymousUserContactData(argument: ENetUC_Admin.AsnAdminSetAnonymousUserContactDataArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminSetAnonymousUserContactDataResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
	invoke_asnAdminRemoveAnonymousUser(argument: ENetUC_Admin.AsnAdminRemoveAnonymousUserArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetUC_Admin.AsnAdminRemoveAnonymousUserResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;
}

// [PrintTSROSEHandlerInterface]
// Contains all invokes of the interface (normally the server side)
export interface IENetUC_AdminROSE_Invoke_Handler {
	// Allows the implementer to (globally) implement an async local storage (thread local storage) for calls inside the called environment)
	setLogContext?(argument: unknown, invokeContext: IReceiveInvokeContext): void;
	onInvoke_asnAdminLogin(argument: ENetUC_Admin.AsnAdminLoginArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminLoginResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminGetUserProfile(argument: ENetUC_Admin.AsnAdminGetUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetUserProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminGetUserProfiles(argument: ENetUC_Admin.AsnAdminGetUserProfilesArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetUserProfilesResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminSetUserProfile(argument: ENetUC_Admin.AsnAdminSetUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetUserProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminRemoveUserProfile(argument: ENetUC_Admin.AsnAdminRemoveUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminRemoveUserProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminAddUserProfile(argument: ENetUC_Admin.AsnAdminAddUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminAddUserProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminGetComputerProfile(argument: ENetUC_Admin.AsnAdminGetComputerProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetComputerProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminSetComputerProfile(argument: ENetUC_Admin.AsnAdminSetComputerProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetComputerProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminAddComputerProfile(argument: ENetUC_Admin.AsnAdminAddComputerProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminAddComputerProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminFindUser(argument: ENetUC_Admin.AsnAdminFindUserArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminFindUserResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminFindGroupProfiles(argument: ENetUC_Admin.AsnAdminFindGroupProfilesArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminFindGroupProfilesResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminSetGroupProfile(argument: ENetUC_Admin.AsnAdminSetGroupProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetGroupProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminAddGroupProfile(argument: ENetUC_Admin.AsnAdminAddGroupProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminAddGroupProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminRemoveGroupProfile(argument: ENetUC_Admin.AsnAdminRemoveGroupProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminRemoveGroupProfileResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnGetDatabaseManagerSettings(argument: ENetUC_Admin.AsnGetDatabaseManagerSettingsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetDatabaseManagerSettingsResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnGetNetworkInterfacePorts(argument: ENetUC_Admin.AsnGetNetworkInterfacePortsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetNetworkInterfacePortsResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnGetAvailableLines(argument: ENetUC_Admin.AsnGetAvailableLinesArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetAvailableLinesResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnGetUserManagerSettings(argument: ENetUC_Admin.AsnGetUserManagerSettingsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetUserManagerSettingsResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminGetPhoneJournalSettings(argument: ENetUC_Admin.AsnAdminGetPhoneJournalSettingsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetPhoneJournalSettingsResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminSetAnonymousUserAccessToken(argument: ENetUC_Admin.AsnAdminSetAnonymousUserAccessTokenArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetAnonymousUserAccessTokenResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminSetAnonymousUserContactData(argument: ENetUC_Admin.AsnAdminSetAnonymousUserContactDataArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetAnonymousUserContactDataResult | ENetUC_Common.AsnRequestError | undefined>;
	onInvoke_asnAdminRemoveAnonymousUser(argument: ENetUC_Admin.AsnAdminRemoveAnonymousUserArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminRemoveAnonymousUserResult | ENetUC_Common.AsnRequestError | undefined>;
}

// Contains all events of the interface (normally the client side)
export interface IENetUC_AdminROSE_Event_Handler {
	// Allows the implementer to (globally) implement an async local storage (thread local storage) for calls inside the called environment)
	setLogContext?(argument: unknown, invokeContext: IReceiveInvokeContext): void;
}

// Contains all invokes and events of the interface
export type IENetUC_AdminROSE_Handler = IENetUC_AdminROSE_Invoke_Handler & IENetUC_AdminROSE_Event_Handler;

// [PrintTSROSEServerCopyPasteInterface]
/* Copy paste code for the import statement
import { IReceiveInvokeContext } from "./TSROSEBase";
import * as ENetUC_Common from "./ENetUC_Common";
import { ENetUC_Admin } from "./ENetUC_Admin";
*/

/**
 * Allows to set the log context for an invoke.
 * This method is called in advanced of methods handled inside this handler
 * The idea is to implement a async local storage based on the provided data from the argument or invokeContext
 *
 * @param argument - the snacc rose argument
 * @param invokeContext - the invoke context
 */
/*
public setLogContext(argument: unknown, invokeContext: IReceiveInvokeContext): void {
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminLoginResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminLogin(argument: ENetUC_Admin.AsnAdminLoginArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminLoginResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminGetUserProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminGetUserProfile(argument: ENetUC_Admin.AsnAdminGetUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetUserProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminGetUserProfilesResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminGetUserProfiles(argument: ENetUC_Admin.AsnAdminGetUserProfilesArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetUserProfilesResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminSetUserProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminSetUserProfile(argument: ENetUC_Admin.AsnAdminSetUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetUserProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminRemoveUserProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminRemoveUserProfile(argument: ENetUC_Admin.AsnAdminRemoveUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminRemoveUserProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminAddUserProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminAddUserProfile(argument: ENetUC_Admin.AsnAdminAddUserProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminAddUserProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminGetComputerProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminGetComputerProfile(argument: ENetUC_Admin.AsnAdminGetComputerProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetComputerProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminSetComputerProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminSetComputerProfile(argument: ENetUC_Admin.AsnAdminSetComputerProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetComputerProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminAddComputerProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminAddComputerProfile(argument: ENetUC_Admin.AsnAdminAddComputerProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminAddComputerProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminFindUserResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminFindUser(argument: ENetUC_Admin.AsnAdminFindUserArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminFindUserResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminFindGroupProfilesResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminFindGroupProfiles(argument: ENetUC_Admin.AsnAdminFindGroupProfilesArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminFindGroupProfilesResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminSetGroupProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminSetGroupProfile(argument: ENetUC_Admin.AsnAdminSetGroupProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetGroupProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminAddGroupProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminAddGroupProfile(argument: ENetUC_Admin.AsnAdminAddGroupProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminAddGroupProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminRemoveGroupProfileResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminRemoveGroupProfile(argument: ENetUC_Admin.AsnAdminRemoveGroupProfileArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminRemoveGroupProfileResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnGetDatabaseManagerSettingsResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnGetDatabaseManagerSettings(argument: ENetUC_Admin.AsnGetDatabaseManagerSettingsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetDatabaseManagerSettingsResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnGetNetworkInterfacePortsResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnGetNetworkInterfacePorts(argument: ENetUC_Admin.AsnGetNetworkInterfacePortsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetNetworkInterfacePortsResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnGetAvailableLinesResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnGetAvailableLines(argument: ENetUC_Admin.AsnGetAvailableLinesArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetAvailableLinesResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnGetUserManagerSettingsResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnGetUserManagerSettings(argument: ENetUC_Admin.AsnGetUserManagerSettingsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnGetUserManagerSettingsResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * -
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminGetPhoneJournalSettingsResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminGetPhoneJournalSettings(argument: ENetUC_Admin.AsnAdminGetPhoneJournalSettingsArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminGetPhoneJournalSettingsResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * Update accessToken for PublicUsers
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminSetAnonymousUserAccessTokenResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminSetAnonymousUserAccessToken(argument: ENetUC_Admin.AsnAdminSetAnonymousUserAccessTokenArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetAnonymousUserAccessTokenResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * create or update contactdata for PublicUsers
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminSetAnonymousUserContactDataResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminSetAnonymousUserContactData(argument: ENetUC_Admin.AsnAdminSetAnonymousUserContactDataArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminSetAnonymousUserContactDataResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/

/**
 * remove PublicUser from userdatabase
 *
 * @param argument -
 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
 * @returns - AsnAdminRemoveAnonymousUserResult on success, AsnRequestError on error or undefined if the function is not implemented
 */
/*
public async onInvoke_asnAdminRemoveAnonymousUser(argument: ENetUC_Admin.AsnAdminRemoveAnonymousUserArgument, invokeContext: IReceiveInvokeContext): Promise<ENetUC_Admin.AsnAdminRemoveAnonymousUserResult | ENetUC_Common.AsnRequestError | undefined> {
	return undefined;
}
*/