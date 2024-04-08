const { setCache, getCache } = require("./cache");
const fs = require("fs");
const yaml = require("yaml");
const path = require("path");
const $RefParser = require("@apidevtools/json-schema-ref-parser");
const {parseBoolean} = require("../utils/utils")
const loadConfigFromGit = require("./loadConfig")
const is_loadConfigFromGit = parseBoolean(process.env.is_loadConfigFromGit)

const insertSession = (session) => {
  setCache("jm_" + session.transaction_id, session, 86400);
};

const getSession = (transaction_id) => {
  return getCache("jm_" + transaction_id);
};

function loadConfig() {
  return new Promise(async (resolve, reject) => {
    try {
      if(!is_loadConfigFromGit){
      const config = yaml.parse(
        fs.readFileSync(path.join(__dirname, "../configs/index.yaml"), "utf8")
      );

      const schema = await $RefParser.dereference(config);

      this.config = schema;

      resolve(schema);
      }else{
        const build_spec = await loadConfigFromGit()

        resolve(build_spec[process.env.SERVER_TYPE])
        // resolve()
      }
    } catch (e) {
      throw new Error(e);
    }
  });
}

const getConfigBasedOnFlow = async (flowId) => {
  return new Promise(async (resolve, reject) => {
    try {
      this.config = await loadConfig();


      let filteredInput = null;
      let filteredCalls = null;
      let filteredDomain = null;
      let filteredSessiondata = null;
      let filteredAdditionalFlows = null;
      let filteredsummary = "";
      let filteredSchema = null;
      let filteredApi = null;

      this.config.flows.forEach((flow) => {
        if (flow.id === flowId) {
          const { input, calls, domain, sessionData, additioalFlows, summary, schema,api } =
            flow;
          filteredInput = input;
          filteredCalls = calls;
          filteredDomain = domain;
          filteredSessiondata = sessionData;
          filteredAdditionalFlows = additioalFlows || [];
          filteredsummary = summary;
          filteredSchema = schema,
          filteredApi = api
        }
      });

      resolve({
        filteredCalls,
        filteredInput,
        filteredDomain,
        filteredSessiondata,
        filteredAdditionalFlows,
        filteredsummary,
        filteredSchema,
        filteredApi
      });
    } catch (err) {
      console.log("error", err);
    }
  });
};

async function generateSession(session_body) {
  return new Promise(async (resolve, reject) => {
    const { version, country, cityCode, transaction_id, configName } =
      session_body;

    const {
      filteredCalls,
      filteredInput,
      filteredDomain,
      filteredSessiondata,
      filteredAdditionalFlows,
      filteredsummary,
      filteredSchema,
      filteredApi
    } = await getConfigBasedOnFlow(configName);

    const session = {
      ...session_body,
      bap_id: process.env.SUBSCRIBER_ID,
      bap_uri: process.env.callbackUrl,
      ttl: "PT10M",
      domain: filteredDomain,
      summary: filteredsummary,
      ...filteredSessiondata,
      currentTransactionId: transaction_id,
      transactionIds: [transaction_id],
      input: filteredInput,
      protocolCalls: filteredCalls,
      additioalFlows: filteredAdditionalFlows,
      schema : filteredSchema,
      api:filteredApi
    };

    insertSession(session);
    resolve(true);
  });
}

module.exports = { generateSession, getSession, insertSession };
