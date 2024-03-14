const {generateSession} = require("./session")
const {setCache} = require("./cache")
const { v4: uuidv4 } = require("uuid");
const logger = require("../../utils/logger").init();


const buildTags = (tags) => {
  return Object.keys(tags).map((key) => {
    
    const subObject = tags[key];
    
    let display = subObject["display"]===undefined?{}:{display:subObject["display"]}
    delete subObject["display"]
    const list = Object.keys(subObject).map((subKey) => {
      const value = subObject[subKey];
      return {
        descriptor: {
          code: subKey,
        },
        value: typeof value === "string" ? value : value.toString(),
      };
    });

    return {
      descriptor: {
        code: key,
      },
      ...display,
        // display: false,
      list: list,
    };
  });
};


const createBecknObject = (session, call, data, protocol) => {
    // const parsedYaml = yaml.load(getYamlConfig(session.configName));
    const config = protocol;
    if (config.sessionData) {
      const updatedSession = createPayload(
        config.sessionData,
        call.type,
        data,
        session
      );
  
      session = { ...session, ...updatedSession };
    }
    const payload = createPayload(config.mapping, call.type, data, session);
  
    return { payload, session };
  };

  const createPayload = (config, action, data, session) => {
    const payload = {};
    const startPoint = "START";
    const endPoint = "END";
    const cancelName = "Ride Cancellation";
    const messageId = uuidv4();
    const paymentId = uuidv4();
    const timestamp = new Date().toISOString();
    const newTranscationId = uuidv4();
  
    config.map((item) => {
      try{
      if (eval(item.value) && (item.check ? eval(item.check) : true))
        createNestedField(
          payload,
          item.beckn_key,
          item.compute ? eval(item.compute) : eval(item.value)
        );
      }
      catch(err){
        logger.info(item.value+" is undefined, will not be mapping that")
      }
    });
  
    return payload;
  };

  const createNestedField = (obj, path, value) => {
    const keys = path.split(".");
    let currentObj = obj;
  
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const isArrayIndex = /\[\d+\]/.test(key); // Check if the key represents an array index
  
      if (isArrayIndex) {
        const arrayKey = key.substring(0, key.indexOf("["));
        const index = parseInt(key.match(/\[(\d+)\]/)[1], 10);
  
        if (!currentObj[arrayKey]) {
          currentObj[arrayKey] = [];
        }
  
        if (!currentObj[arrayKey][index]) {
          currentObj[arrayKey][index] = {};
        }
  
        currentObj = currentObj[arrayKey][index];
      } else {
        if (!currentObj[key]) {
          currentObj[key] = {};
        }
        currentObj = currentObj[key];
      }
    }
  
    currentObj[keys[keys.length - 1]] = value;
  };





module.exports = createBecknObject