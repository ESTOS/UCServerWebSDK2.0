// [PrintTSCodeOne]
// [PrintTSComments]
/*
 * ENetUC_ClientPersistence.ts
 * "UC-Server-Access-Protocol-ClientPersistence" ASN.1 stubs.
 * This file was generated by estos esnacc (V6.0.19, 20.09.2024)
 * based on Coral WinSnacc written by Deepak Gupta
 * NOTE: This is a machine generated file - editing not recommended
 */

// prettier-ignore
/* eslint-disable */
/**
 * Client persistence interface
 * ## Module description
 * This module defines structures and operations for a CRUD item store and its eventing.
 * With these operations, each client can persist client specific data on the UCServer and can attach to the according change notify interface.
 */
// [PrintTSImports]
import * as asn1ts from "@estos/asn1ts";
import * as ENetUC_Common from "./ENetUC_Common";
// [PrintTSRootTypes]
export const MODULE_NAME = "ENetUC_ClientPersistence";
export const MODULE_LASTCHANGE = "1970-01-01T00:00:00Z";
export const MODULE_MAJOR_VERSION = 8;
export const MODULE_MINOR_VERSION = 0;
export const MODULE_VERSION = "8.0.0";

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnClientPersistenceResultDetailsEnum {
	/** No error */
	noerror = 0,
	/** Access to ItemStore not allowed */
	itemstoreaccessdenied = 1,
	/** Access denied (read\/write) */
	dataaccessdenied = 2,
	/** Invalid Subscribe\/Unsubscribe */
	invalidsubscription = 3,
	/** Invalid CrossRef ID given */
	invalidcrossrefid = 4,
	/** Invalid key element */
	invalidkey = 5,
	/** Invalid data element (e.g. too big) */
	invaliddata = 6,
	/** Too many requests (a client should only have 10 requests in parallel on the UCServer) */
	clientpersistenceoverload = 7,
	/** Database error (read\/write) */
	databasefail = 8,
	/** Client requests with a revision that is too old, i.e. client must discard its data and request again (= get initial data) */
	revisionoutdated = 9,
	/** ClientPersistence system is not active on the UCServer */
	clientpersistencedisabled = 99
}

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnClientPersistenceReadWildcardTypeEnum {
	/** no wildcard read - key has to match exactly (DEFAULT) */
	noWildcard = 0,
	/**
	 * the given key is used as prefix for result key(s)
	 * example: given key \"apple\" will receive elements like \"apple\" \"applesauce\" \"applejack\" but not \"pineapple\"
	 */
	prefixKey = 1,
	/**
	 * the given key is used as postfix for result key(s)
	 * example: given key \"apple\" will receive elements like \"apple\" \"pineappleapple\" \"crabapple\" but not \"applesauce\"
	 */
	postfixKey = 2
}

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnClientPersistenceSubscribeTypeEnum {
	subscribe = 1,
	unsubscribe = 2
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Definition of persistence items
 * An ItemStore can hold any persistence items. A persistence item always belongs to exactly one ItemStore.
 * The key of a persistence item (u8sItemStoreID) must be unique within the ItemStore.
 * If the client does not specify a u8sItemStoreID when creating an item, the server generates this key itself.
 * The client itself is responsible for managing the payload in an appropriate way.
 */
export class AsnClientPersistenceItem {
	public constructor(that: AsnClientPersistenceItem) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceItem {
		return new AsnClientPersistenceItem({
			u8sItemStore: "",
			u8sItemStoreID: "",
			data: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sItemStore",
			"u8sItemStoreID",
			"data"
		];
		if (bIncludeOptionals)
			p.push("iRevision");
		return p;
	}

	public static type = "AsnClientPersistenceItem";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceItem",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sItemStore" }),
				new asn1ts.Utf8String({ name: "u8sItemStoreID" }),
				new asn1ts.Utf8String({ name: "data" }),
				new asn1ts.Integer({ name: "iRevision", idBlock: { optionalID: 0 } }),
				new asn1ts.Extension()
			]
		});
	}

	/** Item store name, e.g. \"FAQEntry\", \"usersettings\" */
	public u8sItemStore!: string;
	/** Key of an item, it must be unique in an item store */
	public u8sItemStoreID!: string;
	/** Value data of the item */
	public data!: string;
	/** Revision of the item */
	public iRevision?: number;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceCreate
 */
export class AsnClientPersistenceCreateArgument {
	public constructor(that: AsnClientPersistenceCreateArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceCreateArgument {
		return new AsnClientPersistenceCreateArgument({
			u8sCrossRefID: "",
			u8sItemStore: "",
			data: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sCrossRefID",
			"u8sItemStore",
			"data"
		];
		if (bIncludeOptionals)
			p.push("u8sItemStoreID");
		return p;
	}

	public static type = "AsnClientPersistenceCreateArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceCreateArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sCrossRefID" }),
				new asn1ts.Utf8String({ name: "u8sItemStore" }),
				new asn1ts.Utf8String({ name: "u8sItemStoreID", idBlock: { optionalID: 0 } }),
				new asn1ts.Utf8String({ name: "data" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Must be unique in a client session and will be generated by the client */
	public u8sCrossRefID!: string;
	/** ItemStore of the item */
	public u8sItemStore!: string;
	/** when given, the u8sItemStoreID must not exist in the item store already */
	public u8sItemStoreID?: string;
	/** Data of the item */
	public data!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result of asnClientPersistenceCreate
 */
export class AsnClientPersistenceCreateResult {
	public constructor(that?: AsnClientPersistenceCreateResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceCreateResult {
		return new AsnClientPersistenceCreateResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnClientPersistenceCreateResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceCreateResult",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceRead
 */
export class AsnClientPersistenceReadArgument {
	public constructor(that: AsnClientPersistenceReadArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceReadArgument {
		return new AsnClientPersistenceReadArgument({
			u8sCrossRefID: "",
			u8sItemStore: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sCrossRefID",
			"u8sItemStore"
		];
		if (bIncludeOptionals) {
			p.push(
				"u8sItemStoreID",
				"iLastKnownGlobalRevision",
				"iItemKeyWildcardType",
				"bCountAvailableItemsOnly",
				"iItemLimit"
			);
		}
		return p;
	}

	public static type = "AsnClientPersistenceReadArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceReadArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sCrossRefID" }),
				new asn1ts.Utf8String({ name: "u8sItemStore" }),
				new asn1ts.Utf8String({ name: "u8sItemStoreID", idBlock: { optionalID: 0 } }),
				new asn1ts.Integer({ name: "iLastKnownGlobalRevision", idBlock: { optionalID: 1 } }),
				new asn1ts.Integer({ name: "iItemKeyWildcardType", idBlock: { optionalID: 2 } }),
				new asn1ts.Boolean({ name: "bCountAvailableItemsOnly", idBlock: { optionalID: 3 } }),
				new asn1ts.Integer({ name: "iItemLimit", idBlock: { optionalID: 4 } }),
				new asn1ts.Extension()
			]
		});
	}

	/** The CrossRef ID is generated by the client and must be unique within the ClientSession. */
	public u8sCrossRefID!: string;
	/** The ItemStore to read the items from. */
	public u8sItemStore!: string;
	/** Key of the item to read (without specification all available items are returned). */
	public u8sItemStoreID?: string;
	/**
	 * Without specifying a u8sItemStoreID all items with larger revision will be returned.
	 * (i.e. the parameter is only evaluated if **no** u8sItemStoreID was specified)
	 */
	public iLastKnownGlobalRevision?: number;
	/**
	 * Key of the item (u8sItemStoreID) is to be treated as wildcard prefix\/postfix
	 * i.e. all items starting with the u8sItemStoreID prefix\/postfix will be returned.&lt;br \/&gt;
	 * See AsnClientPersistenceReadWildcardTypeEnum for possible values.
	 */
	public iItemKeyWildcardType?: number;
	/**
	 * False: default\/standard behavior - all matching items are returned.
	 * True: only the number of currently available\/accessible items is returned (in the optional iChangedItemsCount parameter) - but not their contents
	 * (works only if iItemKeyWildcardType is prefixKey or postfixKey).
	 */
	public bCountAvailableItemsOnly?: boolean;
	/**
	 * Limit the number of (wildcard) items returned.
	 * (works only if iItemKeyWildcardType is prefixKey or postfixKey)
	 */
	public iItemLimit?: number;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result of asnClientPersistenceRead
 */
export class AsnClientPersistenceReadResult {
	public constructor(that?: AsnClientPersistenceReadResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceReadResult {
		return new AsnClientPersistenceReadResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnClientPersistenceReadResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceReadResult",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceUpdate
 */
export class AsnClientPersistenceUpdateArgument {
	public constructor(that: AsnClientPersistenceUpdateArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceUpdateArgument {
		return new AsnClientPersistenceUpdateArgument({
			u8sCrossRefID: "",
			u8sItemStore: "",
			u8sItemStoreID: "",
			data: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sCrossRefID",
			"u8sItemStore",
			"u8sItemStoreID",
			"data"
		];
		return p;
	}

	public static type = "AsnClientPersistenceUpdateArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceUpdateArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sCrossRefID" }),
				new asn1ts.Utf8String({ name: "u8sItemStore" }),
				new asn1ts.Utf8String({ name: "u8sItemStoreID" }),
				new asn1ts.Utf8String({ name: "data" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Must be unique in a client session and will be generated by the client. */
	public u8sCrossRefID!: string;
	/** ItemStore of the item. */
	public u8sItemStore!: string;
	/** Key of the item. */
	public u8sItemStoreID!: string;
	/** Data of the item. */
	public data!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result of asnClientPersistenceUpdate
 */
export class AsnClientPersistenceUpdateResult {
	public constructor(that?: AsnClientPersistenceUpdateResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceUpdateResult {
		return new AsnClientPersistenceUpdateResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnClientPersistenceUpdateResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceUpdateResult",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceDelete
 */
export class AsnClientPersistenceDeleteArgument {
	public constructor(that: AsnClientPersistenceDeleteArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceDeleteArgument {
		return new AsnClientPersistenceDeleteArgument({
			u8sCrossRefID: "",
			u8sItemStore: "",
			u8sItemStoreID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sCrossRefID",
			"u8sItemStore",
			"u8sItemStoreID"
		];
		return p;
	}

	public static type = "AsnClientPersistenceDeleteArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceDeleteArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sCrossRefID" }),
				new asn1ts.Utf8String({ name: "u8sItemStore" }),
				new asn1ts.Utf8String({ name: "u8sItemStoreID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Must be unique in a client session and will be generated by the client. */
	public u8sCrossRefID!: string;
	/** ItemStore of the item. */
	public u8sItemStore!: string;
	/** Key of the item. */
	public u8sItemStoreID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result of asnClientPersistenceDelete
 */
export class AsnClientPersistenceDeleteResult {
	public constructor(that?: AsnClientPersistenceDeleteResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceDeleteResult {
		return new AsnClientPersistenceDeleteResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnClientPersistenceDeleteResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceDeleteResult",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceSubscribe
 */
export class AsnClientPersistenceSubscribeArgument {
	public constructor(that: AsnClientPersistenceSubscribeArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceSubscribeArgument {
		return new AsnClientPersistenceSubscribeArgument({
			u8sCrossRefID: "",
			iSubscribeType: 0,
			u8sItemStore: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sCrossRefID",
			"iSubscribeType",
			"u8sItemStore"
		];
		return p;
	}

	public static type = "AsnClientPersistenceSubscribeArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceSubscribeArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sCrossRefID" }),
				new asn1ts.Integer({ name: "iSubscribeType" }),
				new asn1ts.Utf8String({ name: "u8sItemStore" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Must be unique in a client session and will be generated by the client. */
	public u8sCrossRefID!: string;
	/** Subscribe or Unsubscribe, see AsnClientPersistenceSubscribeTypeEnum. */
	public iSubscribeType!: number;
	/** ItemStore for which the action is to be performed. */
	public u8sItemStore!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result of asnClientPersistenceSubscribe
 */
export class AsnClientPersistenceSubscribeResult {
	public constructor(that?: AsnClientPersistenceSubscribeResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceSubscribeResult {
		return new AsnClientPersistenceSubscribeResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnClientPersistenceSubscribeResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceSubscribeResult",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceGetDatabaseID
 */
export class AsnClientPersistenceGetDatabaseIDArgument {
	public constructor(that?: AsnClientPersistenceGetDatabaseIDArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceGetDatabaseIDArgument {
		return new AsnClientPersistenceGetDatabaseIDArgument();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnClientPersistenceGetDatabaseIDArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceGetDatabaseIDArgument",
			...params,
			value: [
				new asn1ts.Extension()
			]
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result of asnClientPersistenceGetDatabaseID
 */
export class AsnClientPersistenceGetDatabaseIDResult {
	public constructor(that: AsnClientPersistenceGetDatabaseIDResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceGetDatabaseIDResult {
		return new AsnClientPersistenceGetDatabaseIDResult({
			u8sDatabaseID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sDatabaseID"
		];
		return p;
	}

	public static type = "AsnClientPersistenceGetDatabaseIDResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceGetDatabaseIDResult",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sDatabaseID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Unique ID der aktuellen Server Datenbank */
	public u8sDatabaseID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSetOfDefCode]
// [PrintTSListClass]
export class AsnClientPersistenceItemList extends Array<AsnClientPersistenceItem> {
	public static getASN1Schema(params?: asn1ts.SequenceOfParams): asn1ts.SequenceOf {
		return new asn1ts.SequenceOf({
			...params,
			value: AsnClientPersistenceItem.getASN1Schema()
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for asnClientPersistenceEvent
 */
export class AsnClientPersistenceEventArgument {
	public constructor(that: AsnClientPersistenceEventArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnClientPersistenceEventArgument {
		return new AsnClientPersistenceEventArgument({
			iResult: 0,
			u8sCrossRefID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"iResult",
			"u8sCrossRefID"
		];
		if (bIncludeOptionals) {
			p.push(
				"iGlobalRevision",
				"changedItems",
				"deletedItems",
				"u8sDatabaseID",
				"iAvailableItemsCount"
			);
		}
		return p;
	}

	public static type = "AsnClientPersistenceEventArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnClientPersistenceEventArgument",
			...params,
			value: [
				new asn1ts.Integer({ name: "iResult" }),
				new asn1ts.Utf8String({ name: "u8sCrossRefID" }),
				new asn1ts.Integer({ name: "iGlobalRevision", idBlock: { optionalID: 0 } }),
				AsnClientPersistenceItemList.getASN1Schema({ name: "changedItems", idBlock: { optionalID: 1 } }),
				AsnClientPersistenceItemList.getASN1Schema({ name: "deletedItems", idBlock: { optionalID: 2 } }),
				new asn1ts.Utf8String({ name: "u8sDatabaseID", idBlock: { optionalID: 3 } }),
				new asn1ts.Integer({ name: "iAvailableItemsCount", idBlock: { optionalID: 4 } }),
				new asn1ts.Extension()
			]
		});
	}

	/** See AsnClientPersistenceResultDetailsEnum for possible values. */
	public iResult!: number;
	/** If it is not empty, it is a response to a request from the client, otherwise it is a UCServer generated event. */
	public u8sCrossRefID!: string;
	/** The transaction ID managed by the server that led to this event. */
	public iGlobalRevision?: number;
	/** List of changed items (the list may contain items from several ItemStores) */
	public changedItems?: AsnClientPersistenceItemList;
	/** List of deleted items (the list may contain items from several ItemStores) */
	public deletedItems?: AsnClientPersistenceItemList;
	/** Unique ID of the current server database, sent by the server on request - or automatically if the DB ID has changed. */
	public u8sDatabaseID?: string;
	/** Is only returned if only the number of elements was requested for asnClientPersistenceRead. */
	public iAvailableItemsCount?: number;
}
