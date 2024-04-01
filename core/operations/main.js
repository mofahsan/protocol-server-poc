const {evaluateOperation} = require("./utils")

const dynamicReponse = (context) =>{
    console.log("hello")
    return 
    const callback = context?.apiConfig?.callbacks
      if(Object.keys(callback).length>1){
        for (const payloads in callback ){
          if(payloads != "default"){
            const result = operator.evaluateOperation(context, callback[payloads].condition?.operation)
            if(result)
            {
              return callback[payloads]
            }   
          } 
        }
      }
      return callback['default']
  
  }

  module.exports = dynamicReponse