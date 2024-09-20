// [PrintTSConverterCode]
// [PrintTSConverterComments]
/*
 * ENetUC_Common_SIPCTI_Converter.ts
 * "UC-Server-Access-Protocol-SIPCTICommon" ASN.1 stubs.
 * This file was generated by estos esnacc (V6.0.19, 20.09.2024)
 * based on Coral WinSnacc written by Deepak Gupta
 * NOTE: This is a machine generated file - editing not recommended
 */

// prettier-ignore
/* eslint-disable */

// [PrintTSConverterImports]
import { ConverterError, ConverterErrorType, ConverterErrors, TSConverter, IDecodeContext, IEncodeContext, INamedType } from "./TSConverterBase";
import * as ENetUC_Common_SIPCTI from "./ENetUC_Common_SIPCTI";
// [PrintTSImports]
import * as asn1ts from "@estos/asn1ts";
import * as ENetUC_Common from "./ENetUC_Common";
import * as ENetUC_Common_Converter from "./ENetUC_Common_Converter";
// [PrintTSRootTypes]
export const MODULE_NAME = "ENetUC_Common_SIPCTI_Converter";
export const MODULE_LASTCHANGE = "1970-01-01T00:00:00Z";
export const MODULE_MAJOR_VERSION = 8;
export const MODULE_MINOR_VERSION = 0;
export const MODULE_VERSION = "8.0.0";

// [PrintTSEncoderDecoderCode]
export class AsnProjectPinRule_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnProjectPinRule, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnProjectPinRule & INamedType | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnProjectPinRule");

		const t = {} as ENetUC_Common_SIPCTI.AsnProjectPinRule & INamedType;

		// [Print_JSON_EncoderSeqDefCode]
		if (newContext.bAddTypes)
			t._type = "AsnProjectPinRule";
		TSConverter.fillJSONParam(s, t, "u8sProjectName", "string", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sProjectPin", "string", errors, newContext);
		TSConverter.fillJSONParam(s, t, "iProjectType", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "bAssociatedCallIsPrivateCall", "boolean", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sLocationID", "string", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sUserEnteredPin", "string", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sUserEnteredUserID", "string", errors, newContext);

		if (errors.validateResult(newContext, "AsnProjectPinRule"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnProjectPinRule | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnProjectPinRule");

		let t: ENetUC_Common_SIPCTI.AsnProjectPinRule | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnProjectPinRule>(data, errors, newContext, optional);
		if (s) {
			t = ENetUC_Common_SIPCTI.AsnProjectPinRule["initEmpty"].call(0);
			// [Print_JSON_DecoderSeqDefCode]
			TSConverter.fillJSONParam(s, t, "u8sProjectName", "string", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sProjectPin", "string", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "iProjectType", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "bAssociatedCallIsPrivateCall", "boolean", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sLocationID", "string", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sUserEnteredPin", "string", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sUserEnteredUserID", "string", errors, newContext, false);
		}

		if (errors.validateResult(newContext, "AsnProjectPinRule"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnProjectPinRule | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnProjectPinRule";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnProjectPinRule");

		// [Print_BER_EncoderSeqDefCode]
		TSConverter.validateParam(s, "u8sProjectName", "string", errors, newContext);
		TSConverter.validateParam(s, "u8sProjectPin", "string", errors, newContext);
		TSConverter.validateParam(s, "iProjectType", "number", errors, newContext);
		TSConverter.validateParam(s, "bAssociatedCallIsPrivateCall", "boolean", errors, newContext);
		TSConverter.validateParam(s, "u8sLocationID", "string", errors, newContext);
		TSConverter.validateParam(s, "u8sUserEnteredPin", "string", errors, newContext);
		TSConverter.validateParam(s, "u8sUserEnteredUserID", "string", errors, newContext);
		if (!errors.hasNewErrors()) {
			t.push(new asn1ts.Utf8String({ value: s.u8sProjectName, name: "u8sProjectName" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sProjectPin, name: "u8sProjectPin" }));
			t.push(new asn1ts.Integer({ value: s.iProjectType, name: "iProjectType" }));
			t.push(new asn1ts.Boolean({ value: s.bAssociatedCallIsPrivateCall, name: "bAssociatedCallIsPrivateCall" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sLocationID, name: "u8sLocationID" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sUserEnteredPin, name: "u8sUserEnteredPin" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sUserEnteredUserID, name: "u8sUserEnteredUserID" }));
		}

		if (errors.validateResult(newContext, "AsnProjectPinRule"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnProjectPinRule | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnProjectPinRule");

		let t: ENetUC_Common_SIPCTI.AsnProjectPinRule | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnProjectPinRule.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = ENetUC_Common_SIPCTI.AsnProjectPinRule["initEmpty"].call(0);
			// [Print_BER_DecoderSeqDefCode]
			TSConverter.fillASN1Param(s, t, "u8sProjectName", "Utf8String", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sProjectPin", "Utf8String", errors, newContext);
			TSConverter.fillASN1Param(s, t, "iProjectType", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "bAssociatedCallIsPrivateCall", "Boolean", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sLocationID", "Utf8String", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sUserEnteredPin", "Utf8String", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sUserEnteredUserID", "Utf8String", errors, newContext);
		}

		if (errors.validateResult(newContext, "AsnProjectPinRule"))
			return t;

		return undefined;
	}
}

// [PrintTSEncoderDecoderCode]
export class AsnConfigSTUNandTURN_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN & INamedType | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnConfigSTUNandTURN");

		const t = {} as ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN & INamedType;

		// [Print_JSON_EncoderSeqDefCode]
		if (newContext.bAddTypes)
			t._type = "AsnConfigSTUNandTURN";
		TSConverter.fillJSONParam(s, t, "iType", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sUsername", "string", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sPassword", "string", errors, newContext);
		TSConverter.fillJSONParam(s, t, "stValidTo", "Date", errors, newContext);
		const _listURIs = ENetUC_Common_Converter.UTF8StringList_Converter.toJSON(s.listURIs, errors, newContext, "listURIs");
		if (_listURIs)
			t.listURIs = _listURIs;
		TSConverter.fillJSONParam(s, t, "iTTL", "number", errors, newContext);

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURN"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnConfigSTUNandTURN");

		let t: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN>(data, errors, newContext, optional);
		if (s) {
			t = ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN["initEmpty"].call(0);
			// [Print_JSON_DecoderSeqDefCode]
			TSConverter.fillJSONParam(s, t, "iType", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sUsername", "string", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sPassword", "string", errors, newContext, false);
			if (TSConverter.validateParam(s, "stValidTo", "string", errors, newContext, false))
				t.stValidTo = new Date(s.stValidTo);
			const _listuris = ENetUC_Common_Converter.UTF8StringList_Converter.fromJSON(s.listURIs, errors, newContext, "listURIs", false);
			if (_listuris)
				t.listURIs = _listuris;
			TSConverter.fillJSONParam(s, t, "iTTL", "number", errors, newContext, false);
		}

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURN"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnConfigSTUNandTURN";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnConfigSTUNandTURN");

		// [Print_BER_EncoderSeqDefCode]
		TSConverter.validateParam(s, "iType", "number", errors, newContext);
		TSConverter.validateParam(s, "u8sUsername", "string", errors, newContext);
		TSConverter.validateParam(s, "u8sPassword", "string", errors, newContext);
		TSConverter.validateParam(s, "stValidTo", "Date", errors, newContext);
		const _listURIs = ENetUC_Common_Converter.UTF8StringList_Converter.toBER(s.listURIs, errors, newContext, "listURIs");
		TSConverter.validateParam(s, "iTTL", "number", errors, newContext);
		if (!errors.hasNewErrors()) {
			t.push(new asn1ts.Integer({ value: s.iType, name: "iType" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sUsername, name: "u8sUsername" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sPassword, name: "u8sPassword" }));
			t.push(new asn1ts.Real({ value: TSConverter.getVariantTimeFromDateTime(s.stValidTo), name: "stValidTo" }));
			if (_listURIs)
				t.push(_listURIs);
			t.push(new asn1ts.Integer({ value: s.iTTL, name: "iTTL" }));
		}

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURN"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnConfigSTUNandTURN");

		let t: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = ENetUC_Common_SIPCTI.AsnConfigSTUNandTURN["initEmpty"].call(0);
			// [Print_BER_DecoderSeqDefCode]
			TSConverter.fillASN1Param(s, t, "iType", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sUsername", "Utf8String", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sPassword", "Utf8String", errors, newContext);
			TSConverter.fillASN1Param(s, t, "stValidTo", "AsnSystemTime", errors, newContext);
			const _listuris = ENetUC_Common_Converter.UTF8StringList_Converter.fromBER(s.getTypedValueByName(asn1ts.Sequence, "listURIs"), errors, newContext, "listURIs");
			if (_listuris)
				t.listURIs = _listuris;
			TSConverter.fillASN1Param(s, t, "iTTL", "Integer", errors, newContext);
		}

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURN"))
			return t;

		return undefined;
	}
}

// [PrintTSEncoderDecoderCode]
export class AsnLineForward_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnLineForward, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnLineForward & INamedType | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnLineForward");

		const t = {} as ENetUC_Common_SIPCTI.AsnLineForward & INamedType;

		// [Print_JSON_EncoderSeqDefCode]
		if (newContext.bAddTypes)
			t._type = "AsnLineForward";
		TSConverter.fillJSONParam(s, t, "iInternalID", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "iForwardController", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "iForwardMode", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "iBackEndSpecific", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "iNoAnswerTime", "number", errors, newContext);
		TSConverter.fillJSONParam(s, t, "u8sDestination", "string", errors, newContext);
		const _u8sCallerIDList = ENetUC_Common_Converter.UTF8StringList_Converter.toJSON(s.u8sCallerIDList, errors, newContext, "u8sCallerIDList");
		if (_u8sCallerIDList)
			t.u8sCallerIDList = _u8sCallerIDList;

		if (errors.validateResult(newContext, "AsnLineForward"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnLineForward | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnLineForward");

		let t: ENetUC_Common_SIPCTI.AsnLineForward | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnLineForward>(data, errors, newContext, optional);
		if (s) {
			t = ENetUC_Common_SIPCTI.AsnLineForward["initEmpty"].call(0);
			// [Print_JSON_DecoderSeqDefCode]
			TSConverter.fillJSONParam(s, t, "iInternalID", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "iForwardController", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "iForwardMode", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "iBackEndSpecific", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "iNoAnswerTime", "number", errors, newContext, false);
			TSConverter.fillJSONParam(s, t, "u8sDestination", "string", errors, newContext, false);
			const _u8scalleridlist = ENetUC_Common_Converter.UTF8StringList_Converter.fromJSON(s.u8sCallerIDList, errors, newContext, "u8sCallerIDList", false);
			if (_u8scalleridlist)
				t.u8sCallerIDList = _u8scalleridlist;
		}

		if (errors.validateResult(newContext, "AsnLineForward"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnLineForward | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnLineForward";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnLineForward");

		// [Print_BER_EncoderSeqDefCode]
		TSConverter.validateParam(s, "iInternalID", "number", errors, newContext);
		TSConverter.validateParam(s, "iForwardController", "number", errors, newContext);
		TSConverter.validateParam(s, "iForwardMode", "number", errors, newContext);
		TSConverter.validateParam(s, "iBackEndSpecific", "number", errors, newContext);
		TSConverter.validateParam(s, "iNoAnswerTime", "number", errors, newContext);
		TSConverter.validateParam(s, "u8sDestination", "string", errors, newContext);
		const _u8sCallerIDList = ENetUC_Common_Converter.UTF8StringList_Converter.toBER(s.u8sCallerIDList, errors, newContext, "u8sCallerIDList");
		if (!errors.hasNewErrors()) {
			t.push(new asn1ts.Integer({ value: s.iInternalID, name: "iInternalID" }));
			t.push(new asn1ts.Integer({ value: s.iForwardController, name: "iForwardController" }));
			t.push(new asn1ts.Integer({ value: s.iForwardMode, name: "iForwardMode" }));
			t.push(new asn1ts.Integer({ value: s.iBackEndSpecific, name: "iBackEndSpecific" }));
			t.push(new asn1ts.Integer({ value: s.iNoAnswerTime, name: "iNoAnswerTime" }));
			t.push(new asn1ts.Utf8String({ value: s.u8sDestination, name: "u8sDestination" }));
			if (_u8sCallerIDList)
				t.push(_u8sCallerIDList);
		}

		if (errors.validateResult(newContext, "AsnLineForward"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnLineForward | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnLineForward");

		let t: ENetUC_Common_SIPCTI.AsnLineForward | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnLineForward.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = ENetUC_Common_SIPCTI.AsnLineForward["initEmpty"].call(0);
			// [Print_BER_DecoderSeqDefCode]
			TSConverter.fillASN1Param(s, t, "iInternalID", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "iForwardController", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "iForwardMode", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "iBackEndSpecific", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "iNoAnswerTime", "Integer", errors, newContext);
			TSConverter.fillASN1Param(s, t, "u8sDestination", "Utf8String", errors, newContext);
			const _u8scalleridlist = ENetUC_Common_Converter.UTF8StringList_Converter.fromBER(s.getTypedValueByName(asn1ts.Sequence, "u8sCallerIDList"), errors, newContext, "u8sCallerIDList");
			if (_u8scalleridlist)
				t.u8sCallerIDList = _u8scalleridlist;
		}

		if (errors.validateResult(newContext, "AsnLineForward"))
			return t;

		return undefined;
	}
}

// [PrintTSEncoderDecoderCode]
export class AsnProjectPinRuleList_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnProjectPinRuleList, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnProjectPinRuleList | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnProjectPinRuleList");

		const t = [] as ENetUC_Common_SIPCTI.AsnProjectPinRuleList;

		// [Print_JSON_EncoderSetOfDefCode]
		for (const id in s) {
			const se = s[id];
			if (se === undefined)
				continue;
			const val = AsnProjectPinRule_Converter.toJSON(se, errors, newContext, "AsnProjectPinRule");
			if (val)
				t.push(val);
		}

		if (errors.validateResult(newContext, "AsnProjectPinRuleList"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnProjectPinRuleList | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnProjectPinRuleList");

		let t: ENetUC_Common_SIPCTI.AsnProjectPinRuleList | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnProjectPinRuleList>(data, errors, newContext, optional);
		if (s) {
			t = new ENetUC_Common_SIPCTI.AsnProjectPinRuleList();
			// [Print_JSON_DecoderSetOfDefCode]
			for (const id in s) {
				const se = s[id];
				if (se === undefined)
					continue;
				const val = AsnProjectPinRule_Converter.fromJSON(se, errors, newContext, "AsnProjectPinRule", false);
				if (val)
					t.push(val);
			}
		}

		if (errors.validateResult(newContext, "AsnProjectPinRuleList"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnProjectPinRuleList | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnProjectPinRuleList";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnProjectPinRuleList");

		// [Print_BER_EncoderSetOfDefCode]
		for (const id in s) {
			const val = AsnProjectPinRule_Converter.toBER(s[id], errors, newContext, "AsnProjectPinRule");
			if (val)
				t.push(val);
		}


		if (errors.validateResult(newContext, "AsnProjectPinRuleList"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnProjectPinRuleList | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnProjectPinRuleList");

		let t: ENetUC_Common_SIPCTI.AsnProjectPinRuleList | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnProjectPinRuleList.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = new ENetUC_Common_SIPCTI.AsnProjectPinRuleList();
			// [Print_BER_DecoderSetOfDefCode]
			for (const se of s.valueBlock.value) {
				if (asn1ts.Sequence.typeGuard(se)) {
					const val = AsnProjectPinRule_Converter.fromBER(se, errors, newContext, "AsnProjectPinRule", optional);
					if (val)
						t.push(val);
				} else
					errors.push(new ConverterError(ConverterErrorType.PROPERTY_TYPEMISMATCH, newContext.context, "wrong type"));
			}
		}

		if (errors.validateResult(newContext, "AsnProjectPinRuleList"))
			return t;

		return undefined;
	}
}

// [PrintTSEncoderDecoderCode]
export class AsnCtiNewCallParams_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnCtiNewCallParams, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnCtiNewCallParams & INamedType | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnCtiNewCallParams");

		const t = {} as ENetUC_Common_SIPCTI.AsnCtiNewCallParams & INamedType;

		// [Print_JSON_EncoderSeqDefCode]
		if (newContext.bAddTypes)
			t._type = "AsnCtiNewCallParams";
		const _projectPinRule = AsnProjectPinRule_Converter.toJSON(s.projectPinRule, errors, newContext, "projectPinRule");
		if (_projectPinRule)
			t.projectPinRule = _projectPinRule;
		TSConverter.fillJSONParam(s, t, "bHideMyCallerID", "boolean", errors, newContext);
		if (s.asnRemoteContact) {
			const _asnRemoteContact = ENetUC_Common_Converter.AsnNetDatabaseContact_Converter.toJSON(s.asnRemoteContact, errors, newContext, "asnRemoteContact");
			if (_asnRemoteContact)
				t.asnRemoteContact = _asnRemoteContact;
		}
		if (s.optionalParams) {
			const _optionalParams = ENetUC_Common_Converter.AsnOptionalParameters_Converter.toJSON(s.optionalParams, errors, newContext, "optionalParams");
			if (_optionalParams)
				t.optionalParams = _optionalParams;
		}

		if (errors.validateResult(newContext, "AsnCtiNewCallParams"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnCtiNewCallParams | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnCtiNewCallParams");

		let t: ENetUC_Common_SIPCTI.AsnCtiNewCallParams | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnCtiNewCallParams>(data, errors, newContext, optional);
		if (s) {
			t = ENetUC_Common_SIPCTI.AsnCtiNewCallParams["initEmpty"].call(0);
			// [Print_JSON_DecoderSeqDefCode]
			const _projectpinrule = AsnProjectPinRule_Converter.fromJSON(s.projectPinRule, errors, newContext, "projectPinRule", false);
			if (_projectpinrule)
				t.projectPinRule = _projectpinrule;
			TSConverter.fillJSONParam(s, t, "bHideMyCallerID", "boolean", errors, newContext, false);
			const _asnremotecontact = ENetUC_Common_Converter.AsnNetDatabaseContact_Converter.fromJSON(s.asnRemoteContact, errors, newContext, "asnRemoteContact", true);
			if (_asnremotecontact)
				t.asnRemoteContact = _asnremotecontact;
			const _optionalparams = ENetUC_Common_Converter.AsnOptionalParameters_Converter.fromJSON(s.optionalParams, errors, newContext, "optionalParams", true);
			if (_optionalparams)
				t.optionalParams = _optionalparams;
		}

		if (errors.validateResult(newContext, "AsnCtiNewCallParams"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnCtiNewCallParams | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnCtiNewCallParams";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnCtiNewCallParams");

		// [Print_BER_EncoderSeqDefCode]
		const _projectPinRule = AsnProjectPinRule_Converter.toBER(s.projectPinRule, errors, newContext, "projectPinRule");
		TSConverter.validateParam(s, "bHideMyCallerID", "boolean", errors, newContext);
		const _asnRemoteContact = ENetUC_Common_Converter.AsnNetDatabaseContact_Converter.toBER(s.asnRemoteContact, errors, newContext, "asnRemoteContact", 0);
		const _optionalParams = ENetUC_Common_Converter.AsnOptionalParameters_Converter.toBER(s.optionalParams, errors, newContext, "optionalParams", 1);
		if (!errors.hasNewErrors()) {
			if (_projectPinRule)
				t.push(_projectPinRule);
			t.push(new asn1ts.Boolean({ value: s.bHideMyCallerID, name: "bHideMyCallerID" }));
			if (_asnRemoteContact)
				t.push(_asnRemoteContact);
			if (_optionalParams)
				t.push(_optionalParams);
		}

		if (errors.validateResult(newContext, "AsnCtiNewCallParams"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnCtiNewCallParams | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnCtiNewCallParams");

		let t: ENetUC_Common_SIPCTI.AsnCtiNewCallParams | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnCtiNewCallParams.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = ENetUC_Common_SIPCTI.AsnCtiNewCallParams["initEmpty"].call(0);
			// [Print_BER_DecoderSeqDefCode]
			const _projectpinrule = AsnProjectPinRule_Converter.fromBER(s.getTypedValueByName(asn1ts.Sequence, "projectPinRule"), errors, newContext, "projectPinRule");
			if (_projectpinrule)
				t.projectPinRule = _projectpinrule;
			TSConverter.fillASN1Param(s, t, "bHideMyCallerID", "Boolean", errors, newContext);
			t.asnRemoteContact = ENetUC_Common_Converter.AsnNetDatabaseContact_Converter.fromBER(s.getTypedValueByName(asn1ts.Sequence, "asnRemoteContact"), errors, newContext, "asnRemoteContact", true);
			t.optionalParams = ENetUC_Common_Converter.AsnOptionalParameters_Converter.fromBER(s.getTypedValueByName(asn1ts.Sequence, "optionalParams"), errors, newContext, "optionalParams", true);
		}

		if (errors.validateResult(newContext, "AsnCtiNewCallParams"))
			return t;

		return undefined;
	}
}

// [PrintTSEncoderDecoderCode]
export class AsnConfigSTUNandTURNList_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnConfigSTUNandTURNList");

		const t = [] as ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList;

		// [Print_JSON_EncoderSetOfDefCode]
		for (const id in s) {
			const se = s[id];
			if (se === undefined)
				continue;
			const val = AsnConfigSTUNandTURN_Converter.toJSON(se, errors, newContext, "AsnConfigSTUNandTURN");
			if (val)
				t.push(val);
		}

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURNList"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnConfigSTUNandTURNList");

		let t: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList>(data, errors, newContext, optional);
		if (s) {
			t = new ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList();
			// [Print_JSON_DecoderSetOfDefCode]
			for (const id in s) {
				const se = s[id];
				if (se === undefined)
					continue;
				const val = AsnConfigSTUNandTURN_Converter.fromJSON(se, errors, newContext, "AsnConfigSTUNandTURN", false);
				if (val)
					t.push(val);
			}
		}

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURNList"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnConfigSTUNandTURNList";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnConfigSTUNandTURNList");

		// [Print_BER_EncoderSetOfDefCode]
		for (const id in s) {
			const val = AsnConfigSTUNandTURN_Converter.toBER(s[id], errors, newContext, "AsnConfigSTUNandTURN");
			if (val)
				t.push(val);
		}


		if (errors.validateResult(newContext, "AsnConfigSTUNandTURNList"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnConfigSTUNandTURNList");

		let t: ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = new ENetUC_Common_SIPCTI.AsnConfigSTUNandTURNList();
			// [Print_BER_DecoderSetOfDefCode]
			for (const se of s.valueBlock.value) {
				if (asn1ts.Sequence.typeGuard(se)) {
					const val = AsnConfigSTUNandTURN_Converter.fromBER(se, errors, newContext, "AsnConfigSTUNandTURN", optional);
					if (val)
						t.push(val);
				} else
					errors.push(new ConverterError(ConverterErrorType.PROPERTY_TYPEMISMATCH, newContext.context, "wrong type"));
			}
		}

		if (errors.validateResult(newContext, "AsnConfigSTUNandTURNList"))
			return t;

		return undefined;
	}
}

// [PrintTSEncoderDecoderCode]
export class AsnLineForwards_Converter {
	public static toJSON(s: ENetUC_Common_SIPCTI.AsnLineForwards, errors?: ConverterErrors, context?: IEncodeContext, name?: string): ENetUC_Common_SIPCTI.AsnLineForwards | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnLineForwards");

		const t = [] as ENetUC_Common_SIPCTI.AsnLineForwards;

		// [Print_JSON_EncoderSetOfDefCode]
		for (const id in s) {
			const se = s[id];
			if (se === undefined)
				continue;
			const val = AsnLineForward_Converter.toJSON(se, errors, newContext, "AsnLineForward");
			if (val)
				t.push(val);
		}

		if (errors.validateResult(newContext, "AsnLineForwards"))
			return t;

		return undefined;
	}

	public static fromJSON(data: string | object | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnLineForwards | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnLineForwards");

		let t: ENetUC_Common_SIPCTI.AsnLineForwards | undefined;
		const s = TSConverter.prepareJSONData<ENetUC_Common_SIPCTI.AsnLineForwards>(data, errors, newContext, optional);
		if (s) {
			t = new ENetUC_Common_SIPCTI.AsnLineForwards();
			// [Print_JSON_DecoderSetOfDefCode]
			for (const id in s) {
				const se = s[id];
				if (se === undefined)
					continue;
				const val = AsnLineForward_Converter.fromJSON(se, errors, newContext, "AsnLineForward", false);
				if (val)
					t.push(val);
			}
		}

		if (errors.validateResult(newContext, "AsnLineForwards"))
			return t;

		return undefined;
	}

	public static toBER(s: ENetUC_Common_SIPCTI.AsnLineForwards | undefined, errors?: ConverterErrors, context?: IEncodeContext, name?: string, optional?: boolean | number): asn1ts.Sequence | undefined {
		name ||= "AsnLineForwards";
		if (!s) {
			TSConverter.addMissingError(errors, context, name, optional);
			return undefined;
		}

		const result = new asn1ts.Sequence(TSConverter.getASN1TSConstructorParams(name, optional));
		const t = result.valueBlock.value;
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addEncodeContext(context, name, "AsnLineForwards");

		// [Print_BER_EncoderSetOfDefCode]
		for (const id in s) {
			const val = AsnLineForward_Converter.toBER(s[id], errors, newContext, "AsnLineForward");
			if (val)
				t.push(val);
		}


		if (errors.validateResult(newContext, "AsnLineForwards"))
			return result;

		return undefined;
	}

	public static fromBER(data: Uint8Array | asn1ts.BaseBlock | undefined, errors?: ConverterErrors, context?: IDecodeContext, name?: string, optional?: boolean): ENetUC_Common_SIPCTI.AsnLineForwards | undefined {
		errors ||= new ConverterErrors();
		errors.storeState();
		const newContext = TSConverter.addDecodeContext(context, name, "AsnLineForwards");

		let t: ENetUC_Common_SIPCTI.AsnLineForwards | undefined;
		const s = TSConverter.prepareASN1BERData(ENetUC_Common_SIPCTI.AsnLineForwards.getASN1Schema, data, errors, newContext, optional);
		if (asn1ts.Sequence.typeGuard(s)) {
			t = new ENetUC_Common_SIPCTI.AsnLineForwards();
			// [Print_BER_DecoderSetOfDefCode]
			for (const se of s.valueBlock.value) {
				if (asn1ts.Sequence.typeGuard(se)) {
					const val = AsnLineForward_Converter.fromBER(se, errors, newContext, "AsnLineForward", optional);
					if (val)
						t.push(val);
				} else
					errors.push(new ConverterError(ConverterErrorType.PROPERTY_TYPEMISMATCH, newContext.context, "wrong type"));
			}
		}

		if (errors.validateResult(newContext, "AsnLineForwards"))
			return t;

		return undefined;
	}
}