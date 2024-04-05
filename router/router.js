const axios = require("axios");
const router = require("express").Router();
const {
  createBecknObject,
  extractBusinessData,
} = require("../core/mapper_core");
const {
  insertSession,
  getSession,
  generateSession,
} = require("../core/session");
const { generateHeader, verifyHeader } = require("../core/auth_core");
const { getCache } = require("../core/cache");
const { parseBoolean } = require("../utils/utils");
const mapping = require("../test");
const IS_VERIFY_AUTH = parseBoolean(process.env.IS_VERIFY_AUTH);
const IS_SYNC = parseBoolean(process.env.IS_SYNC);
const { becknToBusiness } = require("../controller/index");

const validateSchema = require("../core/schema");
const SERVER_TYPE = process.env.SERVER_TYPE;
const PROTOCOL_SERVER = process.env.PROTOCOL_SERVER;
const logger = require("../utils/logger").init();

const dynamicReponse = require("../core/operations/main");
const calls = [
  { config: "search_route" },
  { config: "search_trip" },
  { config: "select" },
  { config: "init" },
  { config: "confirm" },
  { config: "status" },
  { config: "on_search_route", endpoint: "mapper/ondc" },
  { config: "on_search_trip", endpoint: "mapper/ondc" },
  { config: "on_select", endpoint: "mapper/ondc" },
  { config: "on_init", endpoint: "mapper/ondc" },
  { config: "on_confirm", endpoint: "mapper/ondc" },
  { config: "on_status", endpoint: "mapper/ondc" },
];

const { signNack, errorNack, ack } = require("../utils/responses");

// buss > beckn
router.post("/createPayload", async (req, res) => {
  console.log("inside create Payload ");

  try {
    //except target i can fetch rest from my payload
    let { type, config, data, transactionId, target } = req.body;
    let seller = false;
    if (SERVER_TYPE === "BPP") {
      (data = req.body),
        (transactionId = data.context.transaction_id),
        (type = data.context.action),
        (config = type);
      seller = true;
    }

    let session = req.body.session;

    ////////////// session validation ////////////////////

    if (session && session.createSession && session.data) {
      insertSession({ ...session.data, calls });
      session = { ...session.data, calls };
    } else {
      session = getSession(transactionId); // session will be premade with beckn to business usecase

      if (!session) {
        return res.status(400).send({ error: "session not found" });
      }
    }

    session = { ...session, ...data };

    ////////////// session validation ////////////////////

    // const protocol = mapping[session.configName][config];
    const protocol = session.protocolCalls[config].protocol;

    ////////////// MAPPING/EXTRACTION ////////////////////////

    const { payload: becknPayload, session: updatedSession } =
      createBecknObject(session, type, data, protocol);

    if (!seller) {
      becknPayload.context.bap_uri = `${process.env.CALLBACK_URL}/ondc`;
    }

    let url;

    const GATEWAY_URL = process.env.GATEWAY_URL;

    if (target === "GATEWAY") {
      url = GATEWAY_URL;
    } else {
      url =
        SERVER_TYPE === "BPP"
          ? becknPayload.context.bap_uri
          : becknPayload.context.bpp_uri;
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

    /// UPDTTED CALLS ///////

    const updatedCalls = calls.map((call) => {
      const message_id = becknPayload.context.message_id;
      if (call.config === config) {
        call.message_id = message_id;
        call.becknPayload = becknPayload;
      }
      if (call.config === `on_${config}`) {
        call.message_id = message_id;
      }
      return call;
    });

    updatedSession.calls = updatedCalls;

    /// UPDTTED CALLS ///////

    insertSession(updatedSession);

    if (IS_SYNC) {
      setTimeout(() => {
        const newSession = getSession(transactionId);
        let businessPayload = null;

        newSession.calls.map((call) => {
          if (call.config === `on_${config}`) {
            businessPayload = call.businessPayload;
          }
        });

        res.send({ newSession, businessPayload });
      }, [3000]);
    } else {
      res.send({ updatedSession, becknPayload, becknReponse: response.data });
    }
  } catch (e) {
    res.status(500).send(errorNack);
    console.log(">>>>>", e);
  }
});

// bkn > buss
router.post("/ondc/:method", becknToBusiness);

router.post("/updateSession", async (req, res) => {
  const { sessionData, transactionId } = req.body;
  if (!sessionData || !transactionId) {
    return res
      .status(400)
      .send({ message: "session Data || transcationID required" });
  }

  session = getSession(transactionId);

  if (!session) {
    return res.status(400).send({ message: "No session found" });
  }

  insertSession({ ...session, ...sessionData });

  res.send({ message: "session updated" });
});

router.get("/health", (req, res) => {
  res.send({ status: "working" });
});
module.exports = router;
