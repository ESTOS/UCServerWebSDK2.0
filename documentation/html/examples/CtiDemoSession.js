var invokeid = 2;       // Counter for invoke/result
var client = null;      // Object for WebSocket connection

// disable all call function buttons
function disableAllCtiFunctions() {
  document.getElementById("makecallbtn").disabled = true;
  document.getElementById("answerbtn").disabled = true;
  document.getElementById("hangupbtn").disabled = true;
  document.getElementById("changedndbtn").disabled = true;
  document.getElementById("setforwardbtn").disabled = true;
  document.getElementById("removeforwardbtn").disabled = true;
}

// Default for program start: all CTI function buttons off
disableAllCtiFunctions();

// Handlers for WebSocket events
var sockethandlers = {
  // Handler for a socket error
  onError: function(err) {
    console.log('error: ' + err);
  },

  // Handler for a successful connect
  onConnect: function() {
    // disable all call function buttons
    disableAllCtiFunctions();
    console.log('connect');
  },

  // Handler for a closed socket connection
  onClose: function() {
    console.log('close');
  },

  // Handler for data received from the server
  onMessage: function(data) {
    var outtext = data.data;
    let rosemsg = null;
    try {
      rosemsg = JSON.parse(outtext)[0]; // Get the JavaScript object
      outtext = JSON.stringify(rosemsg, null, 4); // Format to a readable form to display on the HTML Page
    } catch(e) {
      // do some proper error handling here
    }

    // is it a rose result?
    if ('result' in rosemsg) {
      if ('result' in rosemsg.result) {
        if ('result' in rosemsg.result.result) {
          // then it is a normal result of the function call
          document.getElementById("result").innerHTML = '<b>Result-Message</b><br />' + outtext;
          parseResult(rosemsg);
        }
      }
      // is it an invoke from the server? (==> can be an rose event also)
    } else if('invoke' in rosemsg) {
      // Events are ROSE invokes from the server to the client, only with arguments und the special invokeID 99999
      if('invokeID' in rosemsg.invoke) {
        // Is it an rose event?
        if(rosemsg.invoke.invokeID === 99999) {
          document.getElementById("result").innerHTML += '<br/><b>Event-Message</b><br />' + outtext;
          parseEventFromServer(rosemsg);
        }
      }
      // is it a rose error?
    } else if ('error' in rosemsg) {
      document.getElementById("result").innerHTML = '<b>Error-Message<b/><br />' + outtext;
      // do some proper error handling here ...
      // is it a rose reject? (e.g. server does not know the called function etc.)
    } else if ('reject' in rosemsg) {
      document.getElementById("result").innerHTML = '<b>Reject-Message</b><br />' + outtext;
      // do some proper error handling here
      // something unforseen has happened somewhere
    } else {
      /* PROTOCOLL ERROR */
      document.getElementById("result").innerHTML = '<b>Protocoll Error?!</b><br />' + outtext;
      // do some proper error handling here
    }
  }
}

// global memory of the line we will monitor in this example to keep it simple
var g_firstline;
// global memory of the connectionid of the call on the line
var g_connectionid;

// Parser the ROSE-Result objects
function parseResult(rosemsg) {
  // normally check now, which invokeID corresponds to this result to
  // find the waiting caller-object and finish it with this result with this result object. (e.g. closure).
  // In this example we don't have multiple calls to the server waiting.
  let rose_result = rosemsg.result.result.result;

  if(rose_result._type === "AsnCtiEnumPhoneLinesResult") {
    // Show LineIDs of the own lines of the logged in contact in the UI
    // and store the first line in the global object for further use
    let str = '';
    for (let i = 0; i < rose_result.seqLines.length; i++) {
      str += rose_result.seqLines[i].u8sLinePhoneNumber + '\n';
      if(!g_firstline)
        g_firstline = rose_result.seqLines[i];
    }
    document.getElementById("phonelines").innerHTML = str;
  } else if(rose_result._type === "AsnCtiLineMonitorStartResult") {
    // Get the result of AsnCtiLineMonitorStart, check the state of the line and set the
    // call function buttons accordingly.

    // only if the line is opened and therefore usable
    if(rose_result.lineInfo.iLineOpenStatus === AsnCtiLineOpenStatus.lineStatusOpen) {
      document.getElementById("changedndbtn").disabled = false; // DnD possible is line open was successful
      document.getElementById("setforwardbtn").disabled = false; // Set forward possible is line open was successful
      document.getElementById("removeforwardbtn").disabled = false; // Remove forward possible is line open was successful

      if(rose_result.seqCalls.length == 0) {
        // if no calls are on the line, "make call" is available
        document.getElementById("makecallbtn").disabled = false;
        document.getElementById("answerbtn").disabled = true;
        document.getElementById("hangupbtn").disabled = true;

      } else {
        // set the call function buttons accordiung the  actual call state
        switchStateOnCallInformation(rose_result.seqCalls[0]); // VERY simple .. the first call will change buttons in this example
      }

      /*
        For real life, this result contains a CrossRefId for this Monitor start. See Documentation how to use
        it for distinguishing between different MonitorStarts and their events and for MonitorStop calls.
      */

    }
  }
}

// Helper to set Buttonstate using callinformation
function switchStateOnCallInformation(callinformation) {
  // default: only "hang up"; if anything is on the line, hangup is possible (in most cases)
  document.getElementById("makecallbtn").disabled = true;
  document.getElementById("answerbtn").disabled = true;
  document.getElementById("hangupbtn").disabled = false;

  // if no call is on the line, make call is available
  if(callinformation.iCallState === EnumCallState.eCALLSTATEDESTROYED) {
    document.getElementById("makecallbtn").disabled = false;
    document.getElementById("answerbtn").disabled = true;
    document.getElementById("hangupbtn").disabled = true;
  } else if (callinformation.iCallState === EnumCallState.eCALLSTATEOFFERING) {
    // if a call is offering, you can answer
    document.getElementById("makecallbtn").disabled = true;
    document.getElementById("answerbtn").disabled = false;
    document.getElementById("hangupbtn").disabled = false;
  }
}

function parseEventFromServer(rosemsg) {
  let event_argument = rosemsg.invoke.argument;

  // a very simple example what to do with the call information - switch button states
  if(event_argument._type === 'AsnCtiNotifyLineCallInformationChangedArgument')
    switchStateOnCallInformation(event_argument.callinformation);
  else if(event_argument._type === "AsnCtiNotifyMakeCallResultArgument")
    g_connectionid = event_argument.u8sConnectionID;
  else if(event_argument.callinformation)
    g_connectionid = event_argument.callinformation.u8sConnectionID;
}

// once created a session, you can start a websocket
function createwebsocket(serverurl, sessionid) {
  // ws://localhost:7224/ws/client/websocket?x-ucsessionid=<sessionid>
  socketurl = serverurl.replace('http', 'ws') + '/ws/client/websocket?x-ucsessionid=' + sessionid;
  client = new WebSocket(socketurl);

  // connect to the handlers for some calls from the socket
  client.onclose = sockethandlers.onClose;
  client.onerror = sockethandlers.onError;
  client.onopen = sockethandlers.onConnect;
  client.onmessage = sockethandlers.onMessage;
}

// first step, create a sessionid giving credentials
function createsession()
{
  let serverurl = document.getElementById("serverurl").value;
  let ucsid = document.getElementById("ucsid").value;
  let user = document.getElementById("userinput").value;
  let pass = document.getElementById("pass").value;
  let func = 'createsession?clientappid=15'; // since ProCall 7 you have to tell the server your application type (Web = 15)

  var oXHR = new XMLHttpRequest();   // new HttpRequest instance
  oXHR.addEventListener("loadend", function(evt) {
    var outtext = oXHR.responseText;
    var response = {};
    try {
      response = JSON.parse(oXHR.responseText);
      outtext = JSON.stringify(response, null, 4);
    } catch(e) {
    }
    if (oXHR.status == 0) {
      document.getElementById("result").innerHTML = 'Failed: General Network Error';
    } else if (outtext == '') {
      document.getElementById("result").innerHTML = 'Failed: No response received';
    } else if (oXHR.status == 200) {
      document.getElementById("result").innerHTML = outtext;
      if (response.hasOwnProperty('sessionid')) {
        document.getElementById("sessionid").value = response.sessionid;

        // with the help of the sessionid, we start the websocket now
        createwebsocket(serverurl, response.sessionid);
      }
    } else {
      document.getElementById("result").innerHTML = outtext;
    }
  });

    // for ProCall 7 it is a MUST to tell the server the API Version ('70' for ProCall 7, '61' for ProCall 6)
    // for ProCall 6 you can (and SHOULD) do it.
    const apiVersion = 70; // 70 for ProCall 7 upwards, 61 for Procall 6

    // since the post is not going to be "stringified", just put the string equivalent to the output
    document.getElementById("sended").innerHTML = 'POST ' + serverurl + '/ws/client/' + func + '<br/>'
      + "Authorization" + " Basic " + btoa(user + ":" + pass)
      + '<br />'
      + "Content-Type" + " application/json;charset=utf-8"
      + '<br />'
      + "X-no401" + " 1"
      + '<br />'
      + "X-ucsid " + ucsid
      + '<br />'
      + "X-simple" + " 1"
      + '<br />'
      + '<br />'
      + '{ "negotiate": { "iClientProtocolVersion": ' + apiVersion + ' } }';

    oXHR.open("POST", serverurl + "/ws/client/" + func, true);
    oXHR.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
    oXHR.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    oXHR.setRequestHeader("X-no401", "1");
    oXHR.setRequestHeader("X-ucsid", ucsid);
    oXHR.setRequestHeader("X-simple", "1");
    oXHR.send('{ "negotiate": { "iClientProtocolVersion": ' + apiVersion + ' } }');
}

function rose_invoke(operationname, argument) {
  let rose_function = {
    "invoke" : {
      "argument" : argument,
      "invokeID" : invokeid++, // each invoke must have a unique ID, to check which
                               // message from the server is an answer to a call.
                               // Since the server is highly multithreaded, the messages
                               // from the server may come in a different order than the messages
                               // sent to the server. So it is neccessary to match the calling processes/objects
                               // with their corresponding answers
      "operationID" : 0, // for JSON-Encoded ASN.1 (estos) set this to 0
      "operationName" : operationname
    }
  }
  let outtext = JSON.stringify(rose_function, null, 4);
  document.getElementById("sended").innerHTML = outtext;
  client.send(outtext);
}

// ---- Enumerate own lines
// called from ui to get the lines from the server
// Argument structure for getting the phone lines the logged in user has access to
function AsnCtiEnumPhoneLinesArgument() {
  this._type = 'AsnCtiEnumPhoneLinesArgument';
  this.typeofLines = AsnCtiEnumPhoneLinesArgumentEnum.userOwnLines; // Default value
  this.attachChangeNotify = 0;
  this.optionalParams = {};
}
function getmylines()
{
  // asnCtiEnumPhoneLines
  let arg = new AsnCtiEnumPhoneLinesArgument();
  arg.typeofLines = AsnCtiEnumPhoneLinesArgumentEnum.userOwnLines; // only own lines
  arg.attachChangeNotify = 1;                                       // if there are chnages to the "own line configuration", then let me know it
  rose_invoke("asnCtiEnumPhoneLines", arg);
}

// ---- Subscribe for Line/Call Events
// called from ui to subscribe to line events using AsnCtiLineMonitorStart
// Argument for AsnCtiLineMonitorStart
function AsnCtiLineMonitorStartArgument() {
  this._type = 'AsnCtiLineMonitorStartArgument';
  this.u8sLinePhoneNumber = ''; // string},
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}
function subscribeToFirstLine() {
  if(g_firstline) {
    let arg = new AsnCtiLineMonitorStartArgument();
    arg.u8sLinePhoneNumber = g_firstline.u8sLinePhoneNumber;

    rose_invoke("asnCtiLineMonitorStart", arg);
  }
}

// ---- MAKE CALL
function AsnCtiMakeCallArgument() {
  this._type = 'AsnCtiMakeCallArgument';
  this.u8sPhoneNumberFrom = ''; // string},
  this.u8sPhoneNumberTo = ''; // string},
  this.iNumberFormat = 0; // number},
  this.newCallParams = {}; //  type: AsnCtiNewCallParams},
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}

function AsnCtiNewCallParams() {
  this._type = 'AsnCtiNewCallParams';
  this.projectPinRule = {}; //  type: AsnProjectPinRule},
  this.bHideMyCallerID = false; // boolean},
  this.asnRemoteContact = {}; //  type: AsnNetDatabaseContact},
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}

function AsnProjectPinRule() {
  this._type = 'AsnProjectPinRule';
  this.u8sProjectName = ''; // string},
  this.u8sProjectPin = ''; // string},
  this.iProjectType = 0; // number},
  this.bAssociatedCallIsPrivateCall = false; // boolean},
  this.u8sLocationID = ''; // string},
  this.u8sUserEnteredPin = ''; // string},
  this.u8sUserEnteredUserID = ''; // string},
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}
function makecall() {
  let arg = new AsnCtiMakeCallArgument();
  arg.u8sPhoneNumberFrom = g_firstline.u8sLinePhoneNumber; // needed to identify the line to call from; must be the LinePhoneNumber of the line
  arg.u8sPhoneNumberTo = document.getElementById("phonenumber").value; // number to dial
  arg.newCallParams = new AsnCtiNewCallParams(); // object must be set
  arg.newCallParams.projectPinRule = new AsnProjectPinRule(); // object must be set
  rose_invoke("asnCtiMakeCall", arg);
}

// ---- HANG UP call
function AsnCtiDropCallArgument() {
  this._type = 'AsnCtiDropCallArgument';
  this.u8sConnectionID = ''; // string},
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}

function hangup() {
  let arg = new AsnCtiDropCallArgument();
  arg.u8sConnectionID = g_connectionid;
  rose_invoke("asnCtiDropCall", arg);
}

// ----  ANSWER call
function AsnCtiAnswerCallArgument() {
  this._type = 'AsnCtiAnswerCallArgument';
  this.u8sConnectionID = ''; // string},
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}

function answer() {
  let arg = new AsnCtiAnswerCallArgument();
  arg.u8sConnectionID = g_connectionid;
  rose_invoke("asnCtiAnswerCall", arg);
}

// ---- Change do not disturb
function AsnCtiLineSetDoNotDisturbArgument() {
	this._type = 'AsnCtiLineSetDoNotDisturbArgument';
	this.u8sLinePhoneNumber = '';
	this.bDoNotDisturb = false;
	this.optionalParams = {};
}

let g_DnD = false;
function changeDoNotDisturb() {
  let arg = new AsnCtiLineSetDoNotDisturbArgument();
  arg.u8sLinePhoneNumber = g_firstline.u8sLinePhoneNumber; // needed to identify the line to change DnD on
  g_DnD = !g_DnD;
  arg.bDoNotDisturb = g_DnD;

  rose_invoke("asnCtiLineSetDoNotDisturb", arg);
}


//
// -- Forward (simple)
//

// -- Set simple forward
function AsnCtiSetForwardArgument() {
	this._type = 'AsnCtiSetForwardArgument';
	this.u8sPhoneNumberFrom = '';
	this.u8sPhoneNumberTo = '';
	this.optionalParams = {};
}

function setForward() {
  let arg = new AsnCtiSetForwardArgument();
  arg.u8sPhoneNumberFrom = g_firstline.u8sLinePhoneNumber; // needed to identify the line to set the forward on
  arg.u8sPhoneNumberTo = document.getElementById("forwardtonumber").value; // number to forward to

  rose_invoke("asnCtiSetForward", arg);

}

// -- Remove simple forward
function AsnCtiRemoveForwardArgument() {
	this._type = 'AsnCtiRemoveForwardArgument';
	this.u8sPhoneNumberFrom = '';
	this.optionalParams = {};
}

function removeForward() {
  let arg = new AsnCtiRemoveForwardArgument();
  arg.u8sPhoneNumberFrom = g_firstline.u8sLinePhoneNumber; // needed to identify the line to remove the forwards

  rose_invoke("asnCtiRemoveForward", arg);
}

//
// --- Logoff
//
function AsnLogoffArgument() {
  this._type = 'AsnLogoffArgument';
  this.optionalParams = {}; //  type: AsnOptionalParameters}
}

function logoff() {
  // logoff from UCServer
  let arg = new AsnLogoffArgument();
  rose_invoke("asnLogoff", arg);

  // Mark SessionID as invalid
  document.getElementById("sessionid").value = '<INVALID>';
  
  // Clear global memory of the line we will monitor in this example to keep it simple
  g_firstline="";
  // Clear global memory of the connectionid of the call on the line
  g_connectionid="";

  // All CTI functions off
  disableAllCtiFunctions();

  // Clear phone lines field
  document.getElementById("phonelines").value = '';
  
  // Close client connection
  client.close();

  // We will not receive an answer
  document.getElementById("result").innerHTML = '';
}

//
// ---- Some Structures (or ASN.1 Sequences) useful for CTI
// ---- For more see Documentation
//

// Enumeration of Line state values; a line is only usable when lineStatusOpen is set.
var AsnCtiLineOpenStatus = {
  lineStatusDisconnected: 0,
  lineStatusClosed: 1,
  lineStatusOpen: 2,
  lineStatusOpenNoPhoneConnected: 3,
  lineStatusOpenNoPBXConnection: 4,
  lineStatusOpenPBXLoginFailed: 5,
  lineStatusOpenPBXNoLicense: 6,
  lineStatusOpenPBXSessionCountExceeded: 7,
  lineStatusFailedNoLicense: 8,
  lineStatusFailedNoECSTALicense: 9
};

// enum for AsnCtiEnumPhoneLinesArgument.typeofLines
var AsnCtiEnumPhoneLinesArgumentEnum = {
  userOwnLines: 0,
  userMonitorLines: 1,
  systemLocalLines: 2,
  systemGlobalLines: 3
};

// Call types
var EnumCallType = {
  eCALLTYPENORMAL: 0,
  eCALLTYPECONSULT: 1,
  eCALLTYPECONFERENCECONTROLER: 2,
  eCALLTYPECALLBACK: 3,
  eCALLTYPECONFERENCEMEMBER: 4,
  eCALLTYPECONFERENCECONTROLERPENDING: 5,
  eCALLTYPECONFERENCEMEMBERPENDING: 6
};

// Call Features ... iFeature in the callinformation structure shows the possibilities
// what cann be done with the call
var EnumCallFeatures = {
  eCFEATURENONE: 0,
  eCFEATUREANSWER: 1,
  eCFEATUREMAKECALL: 2,
  eCFEATURECOMPLETECALL: 4,
  eCFEATUREMERGECALLS: 16,
  eCFEATUREHANGUP: 32,
  eCFEATUREBLINDTRANSFER: 256,
  eCFEATUREREDIRECT: 512,
  eCFEATUREMAYBEPICKUPED: 1024,
  eCFEATURESWAPHOLD: 4096,
  eCFEATUREHOLD: 8192,
  eCFEATUREUNHOLD: 16384,
  eCFEATURECONFERENCESTARTEU: 65536,
  eCFEATURECONFERENCEADDPARTY: 131072,
  eCFEATURECONFERENCESTARTUSA: 262144,
  eCFEATUREGENERATETONE: 1048576,
  eCFEATUREDIALDIGITS: 2097152,
  eCFEATURESTARTCALLRECORD: 16777216,
  eCFEATURESTOPCALLRECORD: 33554432
};

// Call states - In which state is the call now
var EnumCallState = {
  eCALLSTATEUNKNOWN: 0,
  eCALLSTATEDESTROYED: 1,
  eCALLSTATEOFFERING: 2,
  eCALLSTATEDIALING: 4,
  eCALLSTATERINGBACK: 8,
  eCALLSTATEBUSY: 16,
  eCALLSTATECONNECTED: 32,
  eCALLSTATECONFERENCED: 64,
  eCALLSTATEHOLD: 128,
  eCALLSTATEDISCONNECTED: 256,
  eCALLSTATEPREPARECALL: 512
};

