const getBecknObject = require("./services")

const obj = {
    "context": {
      "location": {
        "country": {
          "code": "IND"
        },
        "city": {
          "code": "std:011"
        }
      },
      "domain": "ONDC:TRV11",
      "timestamp": "2023-03-23T04:41:16.000Z",
      "bap_id": "api.example-bap.com",
      "transaction_id": "629fdfe9-e77c-4d79-aa94-2da2de09f660",
      "message_id": "6743e9e2-4fb5-487c-92b7-13ba8018f176",
      "version": "2.0.0",
      "action": "search",
      "bap_uri": "https://api.example-bap.com/ondc/metro",
      "ttl": "PT30S"
    },
    "message": {
      "intent": {
        "fulfillment": {
          "vehicle": {
            "category": "METRO"
          }
        },
        "payment": {
          "tags": [
            {
              "descriptor": {
                "code": "BUYER_FINDER_FEES"
              },
              "display": false,
              "list": [
                {
                  "descriptor": {
                    "code": "BUYER_FINDER_FEES_PERCENTAGE"
                  },
                  "value": "1"
                }
              ]
            },
            {
              "descriptor": {
                "code": "SETTLEMENT_TERMS"
              },
              "display": false,
              "list": [
                {
                  "descriptor": {
                    "code": "DELAY_INTEREST"
                  },
                  "value": "2.5"
                },
                {
                  "descriptor": {
                    "code": "STATIC_TERMS"
                  },
                  "value": "https://api.example-bap.com/booking/terms"
                }
              ]
            }
          ]
        }
      }
    }
}


  // console.log("hello")

getBecknObject(obj).then((res)=>{
  console.log(res)
})


