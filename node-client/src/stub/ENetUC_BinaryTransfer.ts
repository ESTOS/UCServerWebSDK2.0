// [PrintTSCodeOne]
// [PrintTSComments]
/*
 * ENetUC_BinaryTransfer.ts
 * "UC-Server-Access-Protocol-BinaryTransfer" ASN.1 stubs.
 * This file was generated by estos esnacc (V6.0.19, 20.09.2024)
 * based on Coral WinSnacc written by Deepak Gupta
 * NOTE: This is a machine generated file - editing not recommended
 */

// prettier-ignore
/* eslint-disable */
/**
 * Data structures and methods to transport binary data between clients and the server
 * The binary transfer can be used to transport any binary data blob between clients. It´s primary targeting to transfer
 * files within the chat but may be used to implement file sharing in remote desktop sessions as well as to implement a new procall function:
 * Provinding files for customers.
 * The interface is simple and has no other dependencies.
 * Primary target is to be able to transport the file contents inband in the asn.1 connection.
 * Later the implementation will also target 3rd party file shares like onedrive, awss3, dropbox or ucweb.
 */
// [PrintTSImports]
import * as asn1ts from "@estos/asn1ts";
import * as ENetUC_Common from "./ENetUC_Common";
// [PrintTSRootTypes]
export const MODULE_NAME = "ENetUC_BinaryTransfer";
export const MODULE_LASTCHANGE = "1970-01-01T00:00:00Z";
export const MODULE_MAJOR_VERSION = 8;
export const MODULE_MINOR_VERSION = 0;
export const MODULE_VERSION = "8.0.0";

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnBinaryTransferMetaDataTypeEnum {
	/**
	 * Binary data is empty
	 * mimetype:
	 */
	empty = 0,
	/**
	 * preview jpg picture (take care about the limits in AsnBinaryTransferSettings),
	 * mimetype: image\/jpeg
	 */
	picture = 1,
	/**
	 * a vcf in version 2.1 or 3 (https:\/\/de.wikipedia.org\/wiki\/VCard)
	 * mimetype: text\/vcard
	 */
	vcard = 2,
	/**
	 * Location information as Keyhole Markup Language (https:\/\/de.wikipedia.org\/wiki\/Keyhole_Markup_Language)
	 * mimetype: application\/vnd.google-earth.kml+xml
	 */
	geodata = 3,
	/**
	 * Voice Message as ogg\/opus file
	 * mimetype: text\/stringtable (https:\/\/www.xiph.org\/vorbis\/doc\/v-comment.html)
	 */
	voicemessage = 4
}

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnBinaryTransferRequestErrorEnum {
	/** no error */
	noerror = 0,
	/** server is currently serving to many downloads, please try again later */
	serverBusy = 1,
	/** the file type (extension) is not allowed for file transfer */
	extensionNotAllowed = 2,
	/** the file size is too big */
	fileTooBig = 3,
	/** the server does not know this transferID (may occur in upload and download) */
	unknownTransferID = 4,
	/** the server terminated the transfer (e.g. shutting down or denied for user profile) */
	transferTerminated = 5,
	/** the client was requesting a position which is not within the file beeing downloaded */
	invalidPosition = 6,
	/** the file was already deleted */
	filedeleted = 7,
	/** the metaData is not allowed or invalid (may occur when initiating upload) */
	invalidMetaData = 8,
	/** either the connection or read\/write from server database failed (see server log for details) */
	databaseFail = 9,
	/** general error within server request processing (see server log for details) */
	generalServerError = 9999
}

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnBinaryTransferStorageTypeEnum {
	/** Tranfer via ASN1 functions asnSendBinaryChunk\/asnReceiveBinaryChunk */
	ucserver = 0,
	/** Tranfer via UCWeb REST API - DETAILS TO FOLLOW */
	ucweb = 1,
	/** Tranfer via DropBox API - DETAILS TO FOLLOW */
	dropbox = 2,
	/** Tranfer via AWS S3 Storage - DETAILS TO FOLLOW */
	awss3 = 3,
	/** Tranfer via OneDrive Storage - DETAILS TO FOLLOW */
	onedrive = 4
}

// [PrintTSTypeDefCode]
// [PrintTSEnumDefCode]
export enum AsnBinaryTransferServiceTypeEnum {
	/** Settings are for chat */
	chat = 0,
	/** Settings are for screensharing file transfer */
	screensharing = 1,
	/** Settings are for providing files to external (customers, uploading them to a public available storage where customers may download the content) */
	toexternal = 2
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Data structure describing binary transfer settings
 * This data structure is used to inform the clients about the configuration for binary transfer for the different services (chat, screensharing, etc...).
 */
export class AsnBinaryTransferSettings {
	public constructor(that: AsnBinaryTransferSettings) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferSettings {
		return new AsnBinaryTransferSettings({
			eServiceType: 0,
			bEnabled: false,
			u8sNotAllowedExtensions: new ENetUC_Common.UTF8StringList(),
			iMaxChunkSizeDownload: 0,
			iMaxChunkSizeUpload: 0,
			iMaxPreviewSize: 0,
			iMaxPreviewDimension: 0,
			iMaxFileSizeMB: 0
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"eServiceType",
			"bEnabled",
			"u8sNotAllowedExtensions",
			"iMaxChunkSizeDownload",
			"iMaxChunkSizeUpload",
			"iMaxPreviewSize",
			"iMaxPreviewDimension",
			"iMaxFileSizeMB"
		];
		return p;
	}

	public static type = "AsnBinaryTransferSettings";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferSettings",
			...params,
			value: [
				new asn1ts.Integer({ name: "eServiceType" }),
				new asn1ts.Boolean({ name: "bEnabled" }),
				ENetUC_Common.UTF8StringList.getASN1Schema({ name: "u8sNotAllowedExtensions" }),
				new asn1ts.Integer({ name: "iMaxChunkSizeDownload" }),
				new asn1ts.Integer({ name: "iMaxChunkSizeUpload" }),
				new asn1ts.Integer({ name: "iMaxPreviewSize" }),
				new asn1ts.Integer({ name: "iMaxPreviewDimension" }),
				new asn1ts.Integer({ name: "iMaxFileSizeMB" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Defines the type of service these settings are for (chat, screensharing, etc) */
	/** (see AsnBinaryTransferServiceTypeEnum) */
	public eServiceType!: number;
	/** The service is enabled, thus available to the client */
	public bEnabled!: boolean;
	/** List of extensions the server will not allow for binary transfer */
	public u8sNotAllowedExtensions!: ENetUC_Common.UTF8StringList;
	/** Maximum supported chunk size for download in bytes, -1 defines no limit */
	public iMaxChunkSizeDownload!: number;
	/** Maximum supported chunk size for upload in bytes, -1 defines no limit */
	public iMaxChunkSizeUpload!: number;
	/** Maximum supported preview size in bytes, -1 defines no limit */
	public iMaxPreviewSize!: number;
	/** Maximum Dimension. Width or height must not exceed this value in pixel, -1 defines not limit */
	public iMaxPreviewDimension!: number;
	/** Maximum supported file size in megabytes, -1 defines no limit */
	public iMaxFileSizeMB!: number;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * binary transfer storage settings
 * This data structure is used for admin Data structure describing binary transfer storage settings - used by admin
 */
export class AsnBinaryTransferStorageSettings {
	public constructor(that: AsnBinaryTransferStorageSettings) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferStorageSettings {
		return new AsnBinaryTransferStorageSettings({
			eStorageType: 0,
			bEnabled: false,
			iMaxFileSizeMB: 0,
			iMaxStorageSizeMB: 0,
			u8sAllowedMimeTypes: new ENetUC_Common.UTF8StringList(),
			u8sNotAllowedExtensions: new ENetUC_Common.UTF8StringList(),
			u8sRootFolder: "",
			iMaxFileAgeDays: 0,
			bRemoveOutdatedFilesEnabled: false
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"eStorageType",
			"bEnabled",
			"iMaxFileSizeMB",
			"iMaxStorageSizeMB",
			"u8sAllowedMimeTypes",
			"u8sNotAllowedExtensions",
			"u8sRootFolder",
			"iMaxFileAgeDays",
			"bRemoveOutdatedFilesEnabled"
		];
		return p;
	}

	public static type = "AsnBinaryTransferStorageSettings";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferStorageSettings",
			...params,
			value: [
				new asn1ts.Integer({ name: "eStorageType" }),
				new asn1ts.Boolean({ name: "bEnabled" }),
				new asn1ts.Integer({ name: "iMaxFileSizeMB" }),
				new asn1ts.Integer({ name: "iMaxStorageSizeMB" }),
				ENetUC_Common.UTF8StringList.getASN1Schema({ name: "u8sAllowedMimeTypes" }),
				ENetUC_Common.UTF8StringList.getASN1Schema({ name: "u8sNotAllowedExtensions" }),
				new asn1ts.Utf8String({ name: "u8sRootFolder" }),
				new asn1ts.Integer({ name: "iMaxFileAgeDays" }),
				new asn1ts.Boolean({ name: "bRemoveOutdatedFilesEnabled" }),
				new asn1ts.Extension()
			]
		});
	}

	/** Defines the type of storage these settings are for */
	/** (see AsnBinaryTransferStorageTypeEnum) */
	public eStorageType!: number;
	/** The service is enabled, thus available to the client */
	public bEnabled!: boolean;
	/** Maximum supported file size in megabytes, -1 defines no limit */
	public iMaxFileSizeMB!: number;
	/** Maximum supported storage size in megabytes, -1 defines no limit */
	public iMaxStorageSizeMB!: number;
	/** List of allowed mimetypes for binary transfer */
	public u8sAllowedMimeTypes!: ENetUC_Common.UTF8StringList;
	/** List of extensions the server will not allow for binary transfer */
	public u8sNotAllowedExtensions!: ENetUC_Common.UTF8StringList;
	/** root folder for the storage */
	public u8sRootFolder!: string;
	/** age of files (days) before they will be deleted (default: 90) */
	public iMaxFileAgeDays!: number;
	/** if true the files will be removed */
	public bRemoveOutdatedFilesEnabled!: boolean;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Data structure describing binary transfer settings
 * This data structure is used to inform the clients about the configuration for binary transfer.
 */
export class AsnBinaryTransferMetaData {
	public constructor(that?: AsnBinaryTransferMetaData) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferMetaData {
		return new AsnBinaryTransferMetaData();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		if (bIncludeOptionals) {
			p.push(
				"u8sFileNameWithExtension",
				"u8sMimeType",
				"iDataSize",
				"u8sChecksum",
				"iMediaDuration",
				"eMetaDataType",
				"osMetaData",
				"u8sDescriptionText",
				"u8sBinaryTransferID"
			);
		}
		return p;
	}

	public static type = "AsnBinaryTransferMetaData";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferMetaData",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sFileNameWithExtension", idBlock: { optionalID: 0 } }),
				new asn1ts.Utf8String({ name: "u8sMimeType", idBlock: { optionalID: 1 } }),
				new asn1ts.Integer({ name: "iDataSize", idBlock: { optionalID: 2 } }),
				new asn1ts.Utf8String({ name: "u8sChecksum", idBlock: { optionalID: 3 } }),
				new asn1ts.Integer({ name: "iMediaDuration", idBlock: { optionalID: 4 } }),
				new asn1ts.Integer({ name: "eMetaDataType", idBlock: { optionalID: 5 } }),
				new asn1ts.OctetString({ name: "osMetaData", idBlock: { optionalID: 6 } }),
				new asn1ts.Utf8String({ name: "u8sDescriptionText", idBlock: { optionalID: 7 } }),
				new asn1ts.Utf8String({ name: "u8sBinaryTransferID", idBlock: { optionalID: 8 } }),
				new asn1ts.Extension()
			]
		});
	}

	/**
	 * The original filename with extension
	 * (not available if data is only transported within the osMetaData)
	 */
	public u8sFileNameWithExtension?: string;
	/**
	 * Mime-Type
	 * (always available, even if data is only transported within the osMetaData)
	 */
	public u8sMimeType?: string;
	/**
	 * Binary data size in bytes (may contain a 64bit value)
	 * (only available, if a file is existing \/ not filled if data is only transported within osMetaData)
	 */
	public iDataSize?: number;
	/**
	 * Sha256 Checksum of the file
	 * (only available, if a file is existing \/ not filled if data is only transported within osMetaData)
	 */
	public u8sChecksum?: string;
	/**
	 * Playtime audio, video in milliseconds
	 * (only available, if a media content which has a duration is transported (e.g. voice or video recording)
	 */
	public iMediaDuration?: number;
	/**
	 * Defines which kind of embedded meta data is stored in osMetaData
	 * available if osMetaData is filled
	 * (see AsnBinaryTransferMetaDataTypeEnum)
	 */
	public eMetaDataType?: number;
	/**
	 * the binary meta data (content described by the eMetaDataType value)
	 * available if eMetaDataType is filled
	 */
	public osMetaData?: Uint8Array;
	/** Description text for the file */
	public u8sDescriptionText?: string;
	/** TransferID für binarymessage (wird vom Server bei asnInitBinaryTransferUpload erzeugt) */
	/** (see AsnInitBinaryTransferUploadResult) */
	public u8sBinaryTransferID?: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the AsnGetBinaryTransferSettings
 */
export class AsnGetBinaryTransferSettingsArgument {
	public constructor(that?: AsnGetBinaryTransferSettingsArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnGetBinaryTransferSettingsArgument {
		return new AsnGetBinaryTransferSettingsArgument();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnGetBinaryTransferSettingsArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnGetBinaryTransferSettingsArgument",
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
 * Result for the asnInitBinaryTransferUpload
 */
export class AsnInitBinaryTransferUploadResult {
	public constructor(that: AsnInitBinaryTransferUploadResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnInitBinaryTransferUploadResult {
		return new AsnInitBinaryTransferUploadResult({
			eTargetType: 0,
			u8sTransferID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"eTargetType",
			"u8sTransferID"
		];
		if (bIncludeOptionals)
			p.push("u8sTargetServiceDetails");
		return p;
	}

	public static type = "AsnInitBinaryTransferUploadResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnInitBinaryTransferUploadResult",
			...params,
			value: [
				new asn1ts.Integer({ name: "eTargetType" }),
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				ENetUC_Common.AsnStringPairList.getASN1Schema({ name: "u8sTargetServiceDetails", idBlock: { optionalID: 0 } }),
				new asn1ts.Extension()
			]
		});
	}

	/**
	 * Tells the client which storage provider it shall use for the binary transfer
	 * Server will set itself if no further transfer is necessary (e.g. vcf or location sent to the server)
	 * (see AsnBinaryTransferStorageypeEnum)
	 */
	public eTargetType!: number;
	/** The server provided id identifying the transfer */
	public u8sTransferID!: string;
	/** Service\/Target specific configuration, members see AsnBinaryTransferStorageypeEnum (only for 3rd party storage providers) */
	public u8sTargetServiceDetails?: ENetUC_Common.AsnStringPairList;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the asnSendBinaryChunk
 */
export class AsnSendBinaryChunkArgument {
	public constructor(that: AsnSendBinaryChunkArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnSendBinaryChunkArgument {
		return new AsnSendBinaryChunkArgument({
			u8sTransferID: "",
			iDataOffset: 0,
			osChunkData: new Uint8Array(0)
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID",
			"iDataOffset",
			"osChunkData"
		];
		return p;
	}

	public static type = "AsnSendBinaryChunkArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnSendBinaryChunkArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Integer({ name: "iDataOffset" }),
				new asn1ts.OctetString({ name: "osChunkData" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The server provided id identifying the transfer */
	public u8sTransferID!: string;
	/** Data Offset in the file (0 based) */
	public iDataOffset!: number;
	/**
	 * the binary data
	 * when using json encoding the sender has to base64 encode this chunkdata
	 */
	public osChunkData!: Uint8Array;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnSendBinaryChunk
 */
export class AsnSendBinaryChunkResult {
	public constructor(that: AsnSendBinaryChunkResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnSendBinaryChunkResult {
		return new AsnSendBinaryChunkResult({
			iNewPosition: 0
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"iNewPosition"
		];
		return p;
	}

	public static type = "AsnSendBinaryChunkResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnSendBinaryChunkResult",
			...params,
			value: [
				new asn1ts.Integer({ name: "iNewPosition" }),
				new asn1ts.Extension()
			]
		});
	}

	/**
	 * Tells the client the new position to write for the file.
	 * The client has to examine this value in order to be aware of missing chunks on the server
	 * the iDataOffset of the Function calling argument together with the length of the osChunkData should match this value
	 * if the value matches the client can continue (or the file transfer is completed)
	 * if the value differs the client must send a new chunk beginning with iWritingPosition next.
	 */
	public iNewPosition!: number;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the UploadCompleted
 */
export class AsnBinaryTransferUploadCompletedArgument {
	public constructor(that: AsnBinaryTransferUploadCompletedArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferUploadCompletedArgument {
		return new AsnBinaryTransferUploadCompletedArgument({
			u8sTransferID: "",
			bUploadCompleted: false
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID",
			"bUploadCompleted"
		];
		if (bIncludeOptionals) {
			p.push(
				"u8s3rdPartyFileReference",
				"u8sUploadError"
			);
		}
		return p;
	}

	public static type = "AsnBinaryTransferUploadCompletedArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferUploadCompletedArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Boolean({ name: "bUploadCompleted" }),
				new asn1ts.Utf8String({ name: "u8s3rdPartyFileReference", idBlock: { optionalID: 0 } }),
				new asn1ts.Utf8String({ name: "u8sUploadError", idBlock: { optionalID: 1 } }),
				new asn1ts.Extension()
			]
		});
	}

	/** The id identifying the transfer (provided by the server in AsnInitBinaryTransferUploadArgument) */
	public u8sTransferID!: string;
	/** File upload was successfully completed (true) or failed (false) */
	public bUploadCompleted!: boolean;
	/** Contains information to download the binary from 3rd party storage services */
	public u8s3rdPartyFileReference?: string;
	/** Custom error information from a 3rd party backend for logging purposes (in case of bUploadCompleted = false) */
	public u8sUploadError?: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the UploadCompleted
 */
export class AsnBinaryTransferUploadCompletedResult {
	public constructor(that?: AsnBinaryTransferUploadCompletedResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferUploadCompletedResult {
		return new AsnBinaryTransferUploadCompletedResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnBinaryTransferUploadCompletedResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferUploadCompletedResult",
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
 * Argument for the asnInitBinaryTransferDownload
 */
export class AsnInitBinaryTransferDownloadArgument {
	public constructor(that: AsnInitBinaryTransferDownloadArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnInitBinaryTransferDownloadArgument {
		return new AsnInitBinaryTransferDownloadArgument({
			u8sTransferID: "",
			bProvideMetaData: false
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID",
			"bProvideMetaData"
		];
		return p;
	}

	public static type = "AsnInitBinaryTransferDownloadArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnInitBinaryTransferDownloadArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Boolean({ name: "bProvideMetaData" }),
				new asn1ts.Extension()
			]
		});
	}

	/** ID of the binary we want to download */
	public u8sTransferID!: string;
	/** If the client wants to have the meta data for the download (e.g. wants to know the file size or mime type and has not yet been able to get those) */
	public bProvideMetaData!: boolean;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the asnReceiveBinaryChunk
 */
export class AsnReceiveBinaryChunkArgument {
	public constructor(that: AsnReceiveBinaryChunkArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnReceiveBinaryChunkArgument {
		return new AsnReceiveBinaryChunkArgument({
			u8sTransferID: "",
			iDataOffset: 0,
			iChunkSize: 0
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID",
			"iDataOffset",
			"iChunkSize"
		];
		return p;
	}

	public static type = "AsnReceiveBinaryChunkArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnReceiveBinaryChunkArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Integer({ name: "iDataOffset" }),
				new asn1ts.Integer({ name: "iChunkSize" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The id identifying the transfer */
	public u8sTransferID!: string;
	/** Data Offset in the file (0 based) */
	public iDataOffset!: number;
	/** Chunk size the client wants to receive */
	public iChunkSize!: number;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnReceiveBinaryChunk
 */
export class AsnReceiveBinaryChunkResult {
	public constructor(that: AsnReceiveBinaryChunkResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnReceiveBinaryChunkResult {
		return new AsnReceiveBinaryChunkResult({
			osChunkData: new Uint8Array(0),
			bCompleted: false
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"osChunkData",
			"bCompleted"
		];
		return p;
	}

	public static type = "AsnReceiveBinaryChunkResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnReceiveBinaryChunkResult",
			...params,
			value: [
				new asn1ts.OctetString({ name: "osChunkData" }),
				new asn1ts.Boolean({ name: "bCompleted" }),
				new asn1ts.Extension()
			]
		});
	}

	/**
	 * the chunk binary data
	 * when using json encoding the data will be base64 encoded
	 */
	public osChunkData!: Uint8Array;
	/** tells the client that there is no more data on the server */
	public bCompleted!: boolean;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the asnBinaryTransferDownloadCompleted
 */
export class AsnBinaryTransferDownloadCompletedArgument {
	public constructor(that: AsnBinaryTransferDownloadCompletedArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferDownloadCompletedArgument {
		return new AsnBinaryTransferDownloadCompletedArgument({
			u8sTransferID: "",
			bDownloadCompleted: false
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID",
			"bDownloadCompleted"
		];
		if (bIncludeOptionals)
			p.push("u8sDownloadError");
		return p;
	}

	public static type = "AsnBinaryTransferDownloadCompletedArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferDownloadCompletedArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Boolean({ name: "bDownloadCompleted" }),
				new asn1ts.Utf8String({ name: "u8sDownloadError", optional: true }),
				new asn1ts.Extension()
			]
		});
	}

	/** The id identifying the transfer (provided by the server in AsnInitBinaryTransferDownloadArgument) */
	public u8sTransferID!: string;
	/** File Download was successfully completed */
	public bDownloadCompleted!: boolean;
	/** Custom error information from a 3rd party backend for logging purposes (in case of bDownloadCompleted = false) */
	public u8sDownloadError?: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnBinaryTransferDownloadCompleted
 */
export class AsnBinaryTransferDownloadCompletedResult {
	public constructor(that?: AsnBinaryTransferDownloadCompletedResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferDownloadCompletedResult {
		return new AsnBinaryTransferDownloadCompletedResult();
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p: string[] = [];
		return p;
	}

	public static type = "AsnBinaryTransferDownloadCompletedResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferDownloadCompletedResult",
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
 * Argument for the asnGetBinaryTransferMetaData
 */
export class AsnGetBinaryTransferMetaDataArgument {
	public constructor(that: AsnGetBinaryTransferMetaDataArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnGetBinaryTransferMetaDataArgument {
		return new AsnGetBinaryTransferMetaDataArgument({
			u8sTransferID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID"
		];
		return p;
	}

	public static type = "AsnGetBinaryTransferMetaDataArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnGetBinaryTransferMetaDataArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The id identifying the transfer (provided by the server in AsnInitBinaryTransferDownloadArgument) */
	public u8sTransferID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the asnBinaryTransferRemoveElement
 */
export class AsnBinaryTransferRemoveElementArgument {
	public constructor(that: AsnBinaryTransferRemoveElementArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferRemoveElementArgument {
		return new AsnBinaryTransferRemoveElementArgument({
			u8sTransferID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID"
		];
		return p;
	}

	public static type = "AsnBinaryTransferRemoveElementArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferRemoveElementArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The id identifying the transfer (provided by the server in AsnInitBinaryTransferDownloadArgument) */
	public u8sTransferID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnBinaryTransferRemoveElement
 */
export class AsnBinaryTransferRemoveElementResult {
	public constructor(that: AsnBinaryTransferRemoveElementResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferRemoveElementResult {
		return new AsnBinaryTransferRemoveElementResult({
			bRemoved: false
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"bRemoved"
		];
		return p;
	}

	public static type = "AsnBinaryTransferRemoveElementResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferRemoveElementResult",
			...params,
			value: [
				new asn1ts.Boolean({ name: "bRemoved" }),
				new asn1ts.Extension()
			]
		});
	}

	/** entry removed */
	public bRemoved!: boolean;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the asnBinaryTransferForwardElement
 */
export class AsnBinaryTransferForwardElementArgument {
	public constructor(that: AsnBinaryTransferForwardElementArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferForwardElementArgument {
		return new AsnBinaryTransferForwardElementArgument({
			u8sTransferID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sTransferID"
		];
		return p;
	}

	public static type = "AsnBinaryTransferForwardElementArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferForwardElementArgument",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sTransferID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The id identifying the transfer (provided by the server in AsnInitBinaryTransferDownloadArgument) */
	public u8sTransferID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnBinaryTransferForwardElement
 */
export class AsnBinaryTransferForwardElementResult {
	public constructor(that: AsnBinaryTransferForwardElementResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnBinaryTransferForwardElementResult {
		return new AsnBinaryTransferForwardElementResult({
			u8sOrigTransferID: "",
			u8sForwardTransferID: ""
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"u8sOrigTransferID",
			"u8sForwardTransferID"
		];
		return p;
	}

	public static type = "AsnBinaryTransferForwardElementResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnBinaryTransferForwardElementResult",
			...params,
			value: [
				new asn1ts.Utf8String({ name: "u8sOrigTransferID" }),
				new asn1ts.Utf8String({ name: "u8sForwardTransferID" }),
				new asn1ts.Extension()
			]
		});
	}

	/** original transferID */
	public u8sOrigTransferID!: string;
	/** transferID for forwarding the file */
	public u8sForwardTransferID!: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSetOfDefCode]
// [PrintTSListClass]
export class AsnBinaryTransferSettingsList extends Array<AsnBinaryTransferSettings> {
	public static getASN1Schema(params?: asn1ts.SequenceOfParams): asn1ts.SequenceOf {
		return new asn1ts.SequenceOf({
			...params,
			value: AsnBinaryTransferSettings.getASN1Schema()
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the AsnGetBinaryTransferSettings
 */
export class AsnGetBinaryTransferSettingsResult {
	public constructor(that: AsnGetBinaryTransferSettingsResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnGetBinaryTransferSettingsResult {
		return new AsnGetBinaryTransferSettingsResult({
			asnBinaryTransferSettingsList: new AsnBinaryTransferSettingsList()
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"asnBinaryTransferSettingsList"
		];
		return p;
	}

	public static type = "AsnGetBinaryTransferSettingsResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnGetBinaryTransferSettingsResult",
			...params,
			value: [
				AsnBinaryTransferSettingsList.getASN1Schema({ name: "asnBinaryTransferSettingsList" }),
				new asn1ts.Extension()
			]
		});
	}

	/** BinaryTransfer settings for the different services (chat, screensharing, etc.) */
	public asnBinaryTransferSettingsList!: AsnBinaryTransferSettingsList;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Argument for the asnInitBinaryTransferUpload
 */
export class AsnInitBinaryTransferUploadArgument {
	public constructor(that: AsnInitBinaryTransferUploadArgument) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnInitBinaryTransferUploadArgument {
		return new AsnInitBinaryTransferUploadArgument({
			asnMetaData: AsnBinaryTransferMetaData["initEmpty"].call(0),
			eServiceType: 0
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"asnMetaData",
			"eServiceType"
		];
		return p;
	}

	public static type = "AsnInitBinaryTransferUploadArgument";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnInitBinaryTransferUploadArgument",
			...params,
			value: [
				AsnBinaryTransferMetaData.getASN1Schema({ name: "asnMetaData" }),
				new asn1ts.Integer({ name: "eServiceType" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The client filled meta data for the binary transfer */
	public asnMetaData!: AsnBinaryTransferMetaData;
	/**
	 * Defines the type of service this transfer is for (chat, screensharing, etc)
	 * The service will then decide which AsnBinaryTransferStorageypeEnum the transfer is sent to
	 * (see AsnBinaryTransferServiceTypeEnum)
	 */
	public eServiceType!: number;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnInitBinaryTransferDownload
 */
export class AsnInitBinaryTransferDownloadResult {
	public constructor(that: AsnInitBinaryTransferDownloadResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnInitBinaryTransferDownloadResult {
		return new AsnInitBinaryTransferDownloadResult({
			eSourceType: 0
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"eSourceType"
		];
		if (bIncludeOptionals) {
			p.push(
				"asnMetaData",
				"u8sTargetServiceDetails",
				"u8s3rdPartyFileReference"
			);
		}
		return p;
	}

	public static type = "AsnInitBinaryTransferDownloadResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnInitBinaryTransferDownloadResult",
			...params,
			value: [
				new asn1ts.Integer({ name: "eSourceType" }),
				AsnBinaryTransferMetaData.getASN1Schema({ name: "asnMetaData", idBlock: { optionalID: 0 } }),
				ENetUC_Common.AsnStringPairList.getASN1Schema({ name: "u8sTargetServiceDetails", idBlock: { optionalID: 1 } }),
				new asn1ts.Utf8String({ name: "u8s3rdPartyFileReference", idBlock: { optionalID: 2 } }),
				new asn1ts.Extension()
			]
		});
	}

	/** (see AsnBinaryTransferStorageypeEnum) */
	public eSourceType!: number;
	/** The meta data for the binary transfer (if they were requested in the argument) */
	public asnMetaData?: AsnBinaryTransferMetaData;
	/** Service\/Target specific configuration, members see AsnBinaryTransferStorageypeEnum */
	public u8sTargetServiceDetails?: ENetUC_Common.AsnStringPairList;
	/** Contains information to download the binary from 3rd party storage services */
	public u8s3rdPartyFileReference?: string;
}

// [PrintTSTypeDefCode]
// [PrintTSSeqDefCode]
/**
 * Result for the asnGetBinaryTransferMetaData
 */
export class AsnGetBinaryTransferMetaDataResult {
	public constructor(that: AsnGetBinaryTransferMetaDataResult) {
		Object.assign(this, that);
	}

	private static initEmpty(): AsnGetBinaryTransferMetaDataResult {
		return new AsnGetBinaryTransferMetaDataResult({
			asnMetaData: AsnBinaryTransferMetaData["initEmpty"].call(0)
		});
	}

	public static getOwnPropertyNames(bIncludeOptionals: boolean = true): string[] {
		const p = [
			"asnMetaData"
		];
		return p;
	}

	public static type = "AsnGetBinaryTransferMetaDataResult";

	public static getASN1Schema(params?: asn1ts.ConstructedParams): asn1ts.Sequence {
		return new asn1ts.Sequence({
			name: "AsnGetBinaryTransferMetaDataResult",
			...params,
			value: [
				AsnBinaryTransferMetaData.getASN1Schema({ name: "asnMetaData" }),
				new asn1ts.Extension()
			]
		});
	}

	/** The meta data for the binary transfer */
	public asnMetaData!: AsnBinaryTransferMetaData;
}

// [PrintTSTypeDefCode]
// [PrintTSSetOfDefCode]
// [PrintTSListClass]
export class AsnBinaryTransferStorageSettingsList extends Array<AsnBinaryTransferStorageSettings> {
	public static getASN1Schema(params?: asn1ts.SequenceOfParams): asn1ts.SequenceOf {
		return new asn1ts.SequenceOf({
			...params,
			value: AsnBinaryTransferStorageSettings.getASN1Schema()
		});
	}
}

// [PrintTSTypeDefCode]
// [PrintTSSetOfDefCode]
// [PrintTSListClass]
export class AsnBinaryTransferMetaDataList extends Array<AsnBinaryTransferMetaData> {
	public static getASN1Schema(params?: asn1ts.SequenceOfParams): asn1ts.SequenceOf {
		return new asn1ts.SequenceOf({
			...params,
			value: AsnBinaryTransferMetaData.getASN1Schema()
		});
	}
}
