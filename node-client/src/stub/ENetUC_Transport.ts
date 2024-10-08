// [PrintTSCodeOne]
// [PrintTSComments]
/*
 * ENetUC_Transport.ts
 * "UC-Server-Access-Protocol-Transport" ASN.1 stubs.
 * This file was generated by estos esnacc (V6.0.19, 20.09.2024)
 * based on Coral WinSnacc written by Deepak Gupta
 * NOTE: This is a machine generated file - editing not recommended
 */

// prettier-ignore
/* eslint-disable */
/**
 * Transport layer interface
 * ## Module description
 * The module defines operations on the transport layer of the business logic.
 * This includes asnStartTLS which activates TLS on a already existing TCP connection and additional operations for
 * running multiplexed connections to the UCServer (several sessions of different users on one TCP connection; creating, deleting them and user authentication).
 */
// [PrintTSImports]
import * as asn1ts from "@estos/asn1ts";
import * as ENetUC_Common from "./ENetUC_Common";
import * as ENetUC_Auth from "./ENetUC_Auth";
import * as ENetUC_Common_Auth from "./ENetUC_Common_Auth";
// [PrintTSRootTypes]
export const MODULE_NAME = "ENetUC_Transport";
export const MODULE_LASTCHANGE = "1970-01-01T00:00:00Z";
export const MODULE_MAJOR_VERSION = 8;
export const MODULE_MINOR_VERSION = 0;
export const MODULE_VERSION = "8.0.0";

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum EAsnAuthRoles {
	user = 0,
	mgmt = 1
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnStartTLSArgument {
	public constructor(that?: AsnStartTLSArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnStartTLSArgument {
		return new AsnStartTLSArgument();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnStartTLSArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnStartTLSArgument",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnStartTLSResult {
	public constructor(that?: AsnStartTLSResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnStartTLSResult {
		return new AsnStartTLSResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnStartTLSResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnStartTLSResult",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnTransportKeepAliveArgument {
	public constructor(that: AsnTransportKeepAliveArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnTransportKeepAliveArgument {
		return new AsnTransportKeepAliveArgument({
			dummy: null
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"dummy"
		];
		return p;
	}

	public static type = "AsnTransportKeepAliveArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnTransportKeepAliveArgument",
			...params,
			value: [
				new asn1ts.Null({ name: "dummy" }),
				new asn1ts.Extension()
			]
		});
	}

	public dummy!: null;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnTokenVerifyResult {
	public constructor(that: AsnTokenVerifyResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnTokenVerifyResult {
		return new AsnTokenVerifyResult({
			stValidTo: new Date(),
			iType: 0,
			u8sDNPath: "",
			u8sUserName: "",
			u8sSIPURI: "",
			u8sobjectGUID: "",
			u8sPhoneNumber: "",
			u8sPhoneSecondary: "",
			u8sCallRecordingNumber: "",
			u8sMailboxNumber: "",
			u8sHomeServer: "",
			iUserStaticRights: 0,
			asnUserContact: ENetUC_Common.AsnNetDatabaseContact["initEmpty"].call(0),
			asnUserPropertyBag: ENetUC_Common.AsnUserPropertyBag["initEmpty"].call(0)
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"stValidTo",
			"iType",
			"u8sDNPath",
			"u8sUserName",
			"u8sSIPURI",
			"u8sobjectGUID",
			"u8sPhoneNumber",
			"u8sPhoneSecondary",
			"u8sCallRecordingNumber",
			"u8sMailboxNumber",
			"u8sHomeServer",
			"iUserStaticRights",
			"asnUserContact",
			"asnUserPropertyBag"
		];
		return p;
	}

	public static type = "AsnTokenVerifyResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnTokenVerifyResult",
			...params,
			value: [
				new asn1ts.Real({ name: "stValidTo" }),
				new asn1ts.Integer({ name: "iType" }),
				new asn1ts.Utf8String({ name: "u8sDNPath" }),
				new asn1ts.Utf8String({ name: "u8sUserName" }),
				new asn1ts.Utf8String({ name: "u8sSIPURI" }),
				new asn1ts.Utf8String({ name: "u8sobjectGUID" }),
				new asn1ts.Utf8String({ name: "u8sPhoneNumber" }),
				new asn1ts.Utf8String({ name: "u8sPhoneSecondary" }),
				new asn1ts.Utf8String({ name: "u8sCallRecordingNumber" }),
				new asn1ts.Utf8String({ name: "u8sMailboxNumber" }),
				new asn1ts.Utf8String({ name: "u8sHomeServer" }),
				new asn1ts.Integer({ name: "iUserStaticRights" }),
				ENetUC_Common.AsnNetDatabaseContact.getASN1Schema({ name: "asnUserContact" }),
				ENetUC_Common.AsnUserPropertyBag.getASN1Schema({ name: "asnUserPropertyBag" }),
				new asn1ts.Extension()
			]
		});
	}

	/** valid until */
	public stValidTo!: Date;
	/** Type of token (AsnUserTokenType: eUserTokenExternal or eUserTokenLogin) */
	public iType!: number;
	public u8sDNPath!: string;
	public u8sUserName!: string;
	public u8sSIPURI!: string;
	public u8sobjectGUID!: string;
	public u8sPhoneNumber!: string;
	public u8sPhoneSecondary!: string;
	public u8sCallRecordingNumber!: string;
	public u8sMailboxNumber!: string;
	public u8sHomeServer!: string;
	public iUserStaticRights!: number;
	public asnUserContact!: ENetUC_Common.AsnNetDatabaseContact;
	public asnUserPropertyBag!: ENetUC_Common.AsnUserPropertyBag;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnTokenVerifyV2Argument {
	public constructor(that: AsnTokenVerifyV2Argument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnTokenVerifyV2Argument {
		return new AsnTokenVerifyV2Argument({
			u8sToken: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sToken"
		];
		return p;
	}

	public static type = "AsnTokenVerifyV2Argument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnTokenVerifyV2Argument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sToken" }),
				new asn1ts.Extension()
			]
		});
	}

	/** JWT Token */
	public u8sToken!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnCheckConnectionArgument {
	public constructor(that?: AsnCheckConnectionArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnCheckConnectionArgument {
		return new AsnCheckConnectionArgument();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnCheckConnectionArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnCheckConnectionArgument",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnCheckConnectionResult {
	public constructor(that: AsnCheckConnectionResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnCheckConnectionResult {
		return new AsnCheckConnectionResult({
			u8sServerVersion: "",
			u8sProductVersion: "",
			iProtocolVersion: 0,
			iOEMID: 0,
			u8sCookie: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sServerVersion",
			"u8sProductVersion",
			"iProtocolVersion",
			"iOEMID",
			"u8sCookie"
		];
		return p;
	}

	public static type = "AsnCheckConnectionResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnCheckConnectionResult",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sServerVersion" }),
				new asn1ts.Utf8String({ name: "u8sProductVersion" }),
				new asn1ts.Integer({ name: "iProtocolVersion" }),
				new asn1ts.Integer({ name: "iOEMID" }),
				new asn1ts.Utf8String({ name: "u8sCookie" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Server Version \"5.1.30.35169\" */
	public u8sServerVersion!: string;
	/** Product Version \"5.1.30.35169\" */
	public u8sProductVersion!: string;
	/** Protocol Version (60) */
	public iProtocolVersion!: number;
	/** estos : 0 */
	public iOEMID!: number;
	/** Cookie, das der Server vom Admin bekommt, um zu schauen, ob er das ist. */
	public u8sCookie!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnCreateAuthTokenResult {
	public constructor(that: AsnCreateAuthTokenResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnCreateAuthTokenResult {
		return new AsnCreateAuthTokenResult({
			loginResult: ENetUC_Common_Auth.AsnLoginV2Result["initEmpty"].call(0),
			u8sAuthSessionID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"loginResult",
			"u8sAuthSessionID"
		];
		return p;
	}

	public static type = "AsnCreateAuthTokenResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnCreateAuthTokenResult",
			...params,
			value: [
				ENetUC_Common_Auth.AsnLoginV2Result.getASN1Schema({ name: "loginResult" }),
				new asn1ts.Utf8String({ name: "u8sAuthSessionID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Result of the login */
	public loginResult!: ENetUC_Common_Auth.AsnLoginV2Result;
	/** auth session for subsequent requests (ntlm, digest, ...) */
	public u8sAuthSessionID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnCreateAuthTokenArgument {
	public constructor(that: AsnCreateAuthTokenArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnCreateAuthTokenArgument {
		return new AsnCreateAuthTokenArgument({
			login: ENetUC_Common_Auth.AsnLoginV2Argument["initEmpty"].call(0),
			u8sUCSID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"login",
			"u8sUCSID"
		];
		if (bIncludeOptionals)
			p.push("role");
		return p;
	}

	public static type = "AsnCreateAuthTokenArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnCreateAuthTokenArgument",
			...params,
			value: [
				ENetUC_Common_Auth.AsnLoginV2Argument.getASN1Schema({ name: "login" }),
				new asn1ts.Utf8String({ name: "u8sUCSID" }),
				new asn1ts.Enumerated({ name: "role", idBlock: { optionalID: 0 } }),
				new asn1ts.Extension()
			]
		});
	}

	/** login data */
	public login!: ENetUC_Common_Auth.AsnLoginV2Argument;
	public u8sUCSID!: string;
	/** the role you want to login with (if not defined than normal user) */
	public role?: EAsnAuthRoles;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnNegotiateInterfaceVersionArgument {
	public constructor(that: AsnNegotiateInterfaceVersionArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnNegotiateInterfaceVersionArgument {
		return new AsnNegotiateInterfaceVersionArgument({
			u8sMinInterfaceVer: "",
			u8sMaxInterfaceVer: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sMinInterfaceVer",
			"u8sMaxInterfaceVer"
		];
		return p;
	}

	public static type = "AsnNegotiateInterfaceVersionArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnNegotiateInterfaceVersionArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sMinInterfaceVer" }),
				new asn1ts.Utf8String({ name: "u8sMaxInterfaceVer" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Requested minimum interface version, usually this should be a &lt;major&gt;.0.0 */
	public u8sMinInterfaceVer!: string;
	/** Requested maximum interface version, usually this will be the interface version the client has been built with */
	public u8sMaxInterfaceVer!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
export class AsnNegotiateInterfaceVersionResult {
	public constructor(that: AsnNegotiateInterfaceVersionResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnNegotiateInterfaceVersionResult {
		return new AsnNegotiateInterfaceVersionResult({
			bSuccess: false,
			u8sServerInterfaceVer: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"bSuccess",
			"u8sServerInterfaceVer"
		];
		return p;
	}

	public static type = "AsnNegotiateInterfaceVersionResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnNegotiateInterfaceVersionResult",
			...params,
			value: [
				new asn1ts.Boolean({ name: "bSuccess" }),
				new asn1ts.Utf8String({ name: "u8sServerInterfaceVer" }),
				new asn1ts.Extension()
			]
		});
	}

	/** true if the requested version is considered compatible, false otherwise */
	public bSuccess!: boolean;
	/** The interface version the server has been built with */
	public u8sServerInterfaceVer!: string;
}
