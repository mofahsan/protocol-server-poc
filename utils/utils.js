const formatted_error = (errors) => {
    error_list = [];
    let status = "";
    errors.forEach((error) => {
      if (
        !["not", "oneOf", "anyOf", "allOf", "if", "then", "else"].includes(
          error.keyword
        )
      ) {
        error_dict = {
          message: `${error.message}${
            error.params.allowedValues ? ` (${error.params.allowedValues})` : ""
          }${error.params.allowedValue ? ` (${error.params.allowedValue})` : ""}${
            error.params.additionalProperty
              ? ` (${error.params.additionalProperty})`
              : ""
          }`,
          details: error.instancePath,
        };
        error_list.push(error_dict);
      }
    });
    if (error_list.length === 0) status = "pass";
    else status = "fail";
    error_json = { errors: error_list, status: status };
    return error_json;
  };

  function parseBoolean(value) {
    // Convert 'true' to true and 'false' to false
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    }
    // Return null for other values
    return null;
}


module.exports= {formatted_error,parseBoolean}