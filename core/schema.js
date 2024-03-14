const validateSchema = async (context) => {
    logger = log.init();
    logger.info(
      `Inside schema validation service for ${context?.req_body?.context?.action} api`
    );
    try {
      const validate = ajv.compile(context.apiConfig.schema);
      const valid = validate(context.req_body);
      if (!valid) {
        let error_list = validate.errors;
        logger.error(JSON.stringify(formatted_error(error_list)));
        logger.error("Schema validation : FAIL");
        logger.error(context?.req_body?.context?.transaction_id)
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