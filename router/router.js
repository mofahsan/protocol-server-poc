const axios = require("axios");
const router = require("express").Router();
const {
  createBecknObject,
  extractBusinessData,
} = require("../core/mapper_core");
const { insertSession, getSession ,generateSession} = require("../core/session");
const { generateHeader,verifyHeader } = require("../core/auth_core");
const { getCache } = require("../core/cache");
const {parseBoolean} = require("../utils/utils")
const mapping = require("../test");
const VERIFY_AUTH = parseBoolean(process.env.VERIFY_AUTH)
const validateSchema = require("../core/schema")
const SYNC = parseBoolean(process.env.SYNC)
const PROTOCOL_SERVER = process.env.PROTOCOL_SERVER
const SERVER_TYPE = process.env.SERVER_TYPE
const dynamicReponse = require("../core/operations/main")

// buss > beckn
router.post("/createPayload", async (req, res) => {
  console.log("inside create Payload ");

  try {
    //except target i can fetch rest from my payload
    let { type, config, data, transactionId, target } = req.body;
    let seller
    if(SERVER_TYPE === "BPP"){
      data = req.body,transactionId = data.context.transaction_id,type=data.context.action,config=type
      seller = true
    }

    let session = req.body.session;

    console.log("sessions", session);
    ////////////// session validation ////////////////////

    if (session && session.createSession && session.data) {
      insertSession(session.data);
      session = session.data;
    } else {
      session = getSession(transactionId); // session will be premade with beckn to business usecase

      if (!session) {
        return res.status(400).send({ error: "session not found" });
      }
    }

    session = { ...session, ...data };

    ////////////// session validation ////////////////////

    // const protocol = mapping[session.configName][config];
    const protocol= session.protocolCalls[config].protocol;

    ////////////// MAPPING/EXTRACTION ////////////////////////

    const { payload: becknPayload, session: updatedSession } =
      createBecknObject(session, type, data, protocol);

      if(SYNC){
        return res.status(200).send(becknPayload)
      }

    if(SERVER_TYPE === "BPP"){
      becknPayload.context.bpp_uri = `${process.env.CALLBACK_URL}/ondc`;
    }else{
      becknPayload.context.bap_uri = `${process.env.CALLBACK_URL}/ondc`;
    }

    let url;

    const GATEWAY_URL = process.env.GATEWAY_URL;

    if (target === "GATEWAY") {
      url = GATEWAY_URL;
    } else {
      url = SERVER_TYPE === "BPP"?becknPayload.context.bap_uri:becknPayload.context.bpp_uri;
    }

    if (url[url.length - 1] != "/") {
      //"add / if not exists in bap uri"
      url = url + "/";
    }

    ////////////// MAPPING/EXTRACTION ////////////////////////

    /////////////////// AUTH/SIGNING /////////////////

    const signedHeader = await generateHeader(becknPayload);

    /////////////////// AUTH/SIGNING /////////////////

    const header = { headers: { Authorization: signedHeader } };

    //////////////////// SEND TO NETWORK /////////////////////////

    const response = await axios.post(`${url}${type}`, becknPayload, header);

    //////////////////// SEND TO NETWORK /////////////////////////

    insertSession(updatedSession);

    res.send({ updatedSession, becknPayload, becknReponse: response.data });
  } catch (e) {
    console.log(">>>>>", e);
  }
});

// bkn > buss
// router.post("/extractPayload", async (req, res) => {});
router.post("/ondc/:method", async (req, res) => {
  const body = req.body
  const transaction_id = body?.context?.transaction_id
  const config = body.context.action
  if(VERIFY_AUTH ==='true'){
    if(!verifyHeader(body)){
      return res.status(401).send({message:"auth failed"})
    }
  }
  let session = getSession(transaction_id)

  if (!session) {
   await  generateSession({version: body.context.version,country: body?.context?.location?.country?.code,cityCode: body?.context?.location?.city?.code,configName: "metro-flow-1",transaction_id: transaction_id});
    session = getSession(transaction_id);
  } 

  if(!await validateSchema(body,session.schema[config])){
    return res.status(400).send("schema validation failed")
  }


  console.log("Revieved request:", JSON.stringify(body));
  handleRequest(body,res);
});

router.get("/health", (req, res) => {
  res.send({ status: "working" });
});

const handleRequest = async (response,res) => {
  // auth

  // schema validation

  //////// SESSION VALIDATION //////////////

  try {
    let session = null;
    let sessionId = null;

    const allSession = getCache();
    console.log("allSessions", allSession);

    allSession.map((ses) => {
      const sessionData = getCache(ses);
      console.log("sessionDat", sessionData.transactionIds);
      if (
        sessionData.transactionIds.includes(response.context.transaction_id)
      ) {
        console.log(" got session>>>>");
        session = sessionData;
        sessionId = ses.substring(3);
      }
    });

    if (!session) {
      console.log("No session exists");
      return;
    }

    const action = response?.context?.action;
    const messageId = response?.context?.message_id;
    if (!action) {
      return console.log("Action not defined");
    }

    if (!messageId) {
      return console.log("Message ID not defined");
    }

    // extarct protocol mapping
    // const protocol = mapping[session.configName][action];
    const protocol= session.protocolCalls[action].protocol;
    // let becknPayload,updatedSession;
    // mapping/extraction

    // console.log(action)
   let callback=  dynamicReponse(response,session.api[action])
    callback = callback?callback:action
    
    if(SERVER_TYPE === "BAP"){
      const { result: businessPayload, session: updatedSession } =
      extractBusinessData(action, response, session, protocol);
    }else{
       const { payload: becknPayload, session: updatedSession } =createBecknObject(session, action, response, protocol);
       insertSession(updatedSession);
      //  schema/path
      //  select/getticketapi
      //  metro ondemand

     const url =`${process.env.BACKEND_SERVER_URL}/${callback}`
     const mockResponse =   await axios.post(`${url}`, 
        becknPayload
      );
      if(SYNC){
        const finalResponse = await axios.post(`${PROTOCOL_SERVER}/createPayload`,mockResponse.data)
        // res.status(200).send(finalResponse.data)
      }
      return
        }


    insertSession(updatedSession);

    await axios.post(`${process.env.BACKEND_SERVER_URL}mapper/ondc`, {
      businessPayload,
      updatedSession,
      messageId,
      sessionId,
      response,
    });
  } catch (e) {
    console.log("error", e?.response?.data || e);
  }

};

module.exports = router;

