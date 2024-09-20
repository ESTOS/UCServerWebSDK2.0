import "@estos/esnacc-openapi-sdk/dist/esnacc-openapi-sdk.css";
import SDK from "@estos/esnacc-openapi-sdk";

SDK({
    ucconnect: true,
    domId: "ui",
    schemas: [
        { schemaUrl: "/ENetROSEInterface.json", label: "ENetROSEInterface" },
        { schemaUrl: "/ENetUC_Common.json", label: "ENetUC_Common" },
        { schemaUrl: "/ENetUC_Admin.json", label: "ENetUC_Admin" },
        { schemaUrl: "/ENetUC_Agent.json", label: "ENetUC_Agent" },
        { schemaUrl: "/ENetUC_Appointments.json", label: "ENetUC_Appointments" },
        { schemaUrl: "/ENetUC_Auth.json", label: "ENetUC_Auth" },
        { schemaUrl: "/ENetUC_AV.json", label: "ENetUC_AV" },
        { schemaUrl: "/ENetUC_BinaryTransfer.json", label: "ENetUC_BinaryTransfer" },
        { schemaUrl: "/ENetUC_ChatV2.json", label: "ENetUC_ChatV2" },
        { schemaUrl: "/ENetUC_ClientCapabilities.json", label: "ENetUC_ClientCapabilities" },
        { schemaUrl: "/ENetUC_ClientContent.json", label: "ENetUC_ClientContent" },
        { schemaUrl: "/ENetUC_ClientPersistence.json", label: "ENetUC_ClientPersistence" },
        { schemaUrl: "/ENetUC_Common_Appointments.json", label: "ENetUC_Common_Appointments" },
        { schemaUrl: "/ENetUC_Common_AsnContact.json", label: "ENetUC_Common_AsnContact" },
        { schemaUrl: "/ENetUC_Common_Auth.json", label: "ENetUC_Common_Auth" },
        { schemaUrl: "/ENetUC_Common_SIPCTI.json", label: "ENetUC_Common_SIPCTI" },
        { schemaUrl: "/ENetUC_CTI.json", label: "ENetUC_CTI" },
        { schemaUrl: "/ENetUC_Journal.json", label: "ENetUC_Journal" },
        { schemaUrl: "/ENetUC_Mgmt.json", label: "ENetUC_Mgmt" },
        { schemaUrl: "/ENetUC_PresenceV2.json", label: "ENetUC_PresenceV2" },
        { schemaUrl: "/ENetUC_Ranking.json", label: "ENetUC_Ranking" },
        { schemaUrl: "/ENetUC_ServicesAgents.json", label: "ENetUC_ServicesAgents" },
        { schemaUrl: "/ENetUC_Tasks.json", label: "ENetUC_Tasks" },
        { schemaUrl: "/ENetUC_Transport.json", label: "ENetUC_Transport" }
    ],
});
