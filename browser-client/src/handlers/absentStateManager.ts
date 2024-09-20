import { IASN1Transport, IReceiveInvokeContext } from "../stub/TSROSEBase";
import { theClient } from "../client";
import { IENetROSEInterfaceROSE_Event_Handler } from "../stub/ENetROSEInterfaceROSE_Interface";
import { ENetROSEInterfaceROSE } from "../stub/ENetROSEInterfaceROSE";
import { ENetROSEInterface, ENetUC_Common_AsnContact } from "../stub/types";

/**
 * This module sends requests to the server to receive events
 */
export class AbsentStateManager implements Partial<IENetROSEInterfaceROSE_Event_Handler> {
	// The networking layer that allows to send events to the server side
	private server: ENetROSEInterfaceROSE;

	/**
	 * Creates the SettingsManager object
	 *
	 * @param transport - the transport layer (the TSASN1Server instance that holds the hole ROSE ASN1 stuff)
	 */
	public constructor(transport: IASN1Transport) {
		this.server = new ENetROSEInterfaceROSE(transport, true, this);
	}

	/**
	 * Modifies our absent state
	 */
	public async setAbsentState(): Promise<void> {
		const argument = new ENetROSEInterface.AsnSetUserAbsentStateArgument({
			absentstate: new ENetUC_Common_AsnContact.AsnAbsentStateV2({
				u8sContactId: "",
				eAbsentState: ENetUC_Common_AsnContact.AsnAbsentStateEnum.eABSENTSTATEOUTOFOFFICE
			})
		});
		const response = await this.server.invoke_asnSetUserAbsentState(argument);
		theClient.getResult(response, ENetROSEInterface.AsnSetUserAbsentStateResult);
	}

	// invoke_asnGetUserAbsentState(argument: ENetROSEInterface.AsnGetUserAbsentStateArgument, invokeContext?: ISendInvokeContextParams): Promise<ENetROSEInterface.AsnGetUserAbsentStateResult | ENetUC_Common.AsnRequestError | AsnInvokeProblem>;

	/**
	 * Event that my contact configuration has changed
	 *
	 * @param argument -
	 * @param invokeContext - Invokecontext from the asn.1 lib (containing invoke related data)
	 */
	public onEvent_asnUpdateMyContactConfigurationV2(argument: ENetROSEInterface.AsnUpdateMyContactConfigurationV2Argument, invokeContext: IReceiveInvokeContext): void {
		// Update ui
	}
}
