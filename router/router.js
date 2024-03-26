const axios = require("axios");
const router = require("express").Router();
const {
  createBecknObject,
  extractBusinessData,
} = require("../core/mapper_core");
const { insertSession, getSession ,generateSession} = require("../core/session");
const { generateHeader,verifyHeader } = require("../core/auth_core");
const { getCache } = require("../core/cache");
const mapping = require("../test");
const VERIFY_AUTH = process.env.VERIFY_AUTH
const validateSchema = require("../core/schema")


// buss > beckn
router.post("/createPayload", async (req, res) => {
  console.log("inside create Payload ");

  try {
    const { type, config, data, transactionId, target } = req.body;

    let session = req.body.session;

    console.log("sessions", session);
    ////////////// session validation ////////////////////

    if (session && session.createSession && session.data) {
      insertSession(session.data);
      session = session.data;
    } else {
      session = getSession(transactionId);

      if (!session) {
        return res.status(400).send({ error: "session not found" });
      }
    }

    session = { ...session, ...data };

    ////////////// session validation ////////////////////

    const protocol = mapping[session.configName][config];

    ////////////// MAPPING/EXTRACTION ////////////////////////

    const { payload: becknPayload, session: updatedSession } =
      createBecknObject(session, type, data, protocol);



    becknPayload.context.bap_uri = `${process.env.CALLBACK_URL}/ondc`;
    let url;

    const GATEWAY_URL = process.env.GATEWAY_URL;

    console.log("becknPayload", becknPayload);

    if (target === "GATEWAY") {
      url = GATEWAY_URL;
    } else {
      url = becknPayload.context.bpp_uri;
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
  handleRequest(body);
});

router.get("/health", (req, res) => {
  res.send({ status: "working" });
});

const handleRequest = async (response) => {
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
    const is_buyer = action.split("_").length === 2? true : false
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
    if(is_buyer){
      const { result: businessPayload, session: updatedSession } =
      extractBusinessData(action, response, session, protocol);
    }else{
       const { payload: becknPayload, session: updatedSession } =createBecknObject(session, action, response, protocol);
       insertSession(updatedSession);
       const url =`${process.env.BACKEND_SERVER_URL}/${action}`
       await axios.post(`${process.env.BACKEND_SERVER_URL}/${action}`, 
        becknPayload
      );
      return
        }

    console.log("businessPayload", becknPayload);

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
    // res.status(500).send({ message: "Internal Server Error" });
  }

  //////// SESSION VALIDATION //////////////
};

module.exports = router;

