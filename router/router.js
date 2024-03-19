const router = require("express").Router();
const { createBecknObject } = require("../core/mapper_core");
const { insertSession, getSession } = require("../core/session");
const { generateHeader } = require("../core/auth_core");
const mapping = require("../test");

// buss > beckn
router.post("/createPayload", async (req, res) => {
  try {
    const { type, config, data, transcationId, target } = req.body;

    let session = req.body.session;

    ////////////// session validation ////////////////////

    if (session && session.createSession && session.data) {
      insertSession(session.data);
      session = session.data;
    } else {
      session = getSession(transcationId);

      if (!session) {
        return res.status(400).send({ error: "session not found" });
      }
    }

    ////////////// session validation ////////////////////

    const protocol = mapping[session.configName][config];

    ////////////// MAPPING/EXTRACTION ////////////////////////

    const { payload: becknPayload, session: updatedSession } =
      createBecknObject(session, type, data, protocol);

    becknPayload.context.bap_uri = `${callbackUrl}/ondc`;
    let url;

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

    res.send({ updatedSession, becknPayload, becknReponse: response });
  } catch (e) {
    console.log(">>>>>", e);
  }
});

// bkn > buss
router.post("/extractPayload", async (req, res) => {});

router.get("/health", (req, res) => {
  res.send({ status: "working" });
});

module.exports = router;
