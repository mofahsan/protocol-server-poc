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
const { parseBoolean } = require("../utils/utils")
const mapping = require("../test");
const IS_VERIFY_AUTH = parseBoolean(process.env.IS_VERIFY_AUTH)
const IS_SYNC = parseBoolean(process.env.IS_SYNC)

const validateSchema = require("../core/schema");
const SERVER_TYPE = process.env.SERVER_TYPE
const PROTOCOL_SERVER = process.env.PROTOCOL_SERVER
const logger = require("../utils/logger").init()

const becknToBusiness = (req) => {

    const body = req.body;
    const transaction_id = body?.context?.transaction_id;
    const config = body.context.action;

    validateIncommingRequest(body, transaction_id, config)

}

const validateIncommingRequest = (body, transaction_id, config) => {
    try {
        if (IS_VERIFY_AUTH) {
            if (! await verifyHeader(body)) {
                return res.status(401).send(signNack);
            }
        }
        let session = getSession(transaction_id);

        if (!session) {
            await generateSession({
                version: body.context.version,
                country: body?.context?.location?.country?.code,
                cityCode: body?.context?.location?.city?.code,
                configName: "metro-flow-1",
                transaction_id: transaction_id,
            });
            session = getSession(transaction_id);
        }

        if (!await validateSchema(body, session.schema[config], res)) {
            return  // fails schema validation if false
        }


        console.log("Revieved request:", JSON.stringify(body));
        handleRequest(body, res);
    }
    catch (err) {
        console.log(err)
    }
}


const handleRequest = async (response, res) => {

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
        const is_buyer = SERVER_TYPE === 'BAP' ? true : false
        if (!action) {
            return console.log("Action not defined");
        }

        if (!messageId) {
            return console.log("Message ID not defined");
        }

        // extarct protocol mapping
        // const protocol = mapping[session.configName][action];
        const protocol = session.protocolCalls[action].protocol;
        // let becknPayload,updatedSession;
        // mapping/extraction
        let { callback, serviceUrl } = dynamicReponse(response, session.api[action])
        callback = callback ? callback : action

        if (is_buyer) {
            const { result: businessPayload, session: updatedSession } =
                extractBusinessData(action, response, session, protocol);

            let urlEndpint = null;

            console.log("updatedSession", updatedSession);

            const updatedCalls = updatedSession.calls.map((call) => {
                if (call?.message_id === response.context.message_id) {
                    call.becknPayload = response;
                    call.businessPayload = businessPayload;
                    urlEndpint = call.endpoint;
                }

                return call;
            });

            updatedSession.calls = updatedCalls;

            insertSession(updatedSession);

            if (IS_SYNC) {
                await axios.post(`${process.env.BACKEND_SERVER_URL}mapper/ondc`, {
                    businessPayload,
                    updatedSession,
                    messageId,
                    sessionId,
                    response,
                });
            }
        } else {

            const { payload: becknPayload, session: updatedSession } = createBecknObject(session, action, response, protocol);
            insertSession(updatedSession);

            const url = `${serviceUrl ? serviceUrl : process.env.BACKEND_SERVER_URL}/${callback}`
            const mockResponse = await axios.post(`${url}`,
                becknPayload
            );
            if (mockResponse.status === 200) {
                res.send(ack)
            }
            if (mockResponse)
                if (IS_SYNC) {
                    //  const final_resp = await 
                    axios.post(`${PROTOCOL_SERVER}/createPayload`, mockResponse.data)

                    //  if(final_resp.)
                }
        }
        // throw new Error("an error occurred")
    } catch (e) {
        logger.error(JSON.stringify(e))
        res.status(500).send(errorNack)
    }

};


module.exports = { becknToBusiness }