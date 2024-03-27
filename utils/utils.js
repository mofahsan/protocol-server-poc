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

module.exports= {formatted_error}