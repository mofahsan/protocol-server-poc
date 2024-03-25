const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
});
const addFormats = require("ajv-formats");

addFormats(ajv);
require("ajv-errors")(ajv);
const logger = require("../utils/logger").init()
// logger = log.init();

const validateSchema = async (payload,schema) => {
    
    logger.info(
      `Inside schema validation service for ${payload?.context?.action} api protocol server`
    );
    try {
      const validate = ajv.compile(schema);
      const valid = validate(payload);
      if (!valid) {
        let error_list = validate.errors;
        logger.error(JSON.stringify(formatted_error(error_list)));
        logger.error("Schema validation : FAIL");
        logger.error(payload?.context?.transaction_id)
        return false;
      } else {
        logger.info("Schema validation : SUCCESS");
        return true;
      }
    } catch (error) {
      logger.error(error);
    }
  };

module.exports = validateSchema