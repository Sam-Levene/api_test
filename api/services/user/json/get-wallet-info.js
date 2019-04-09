/* eslint-disable no-dupe-keys */
// noinspection Annotator

const walletInfo = {
  "type": "array",
  "definitions": {},
  "items": {
    "type": "object",
    "properties": {
      "transactions": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "date": {
              "type": "number"
            },
            "description": {
              "type": "string"
            },
            "amount": {
              "type": "number"
            },
            "type": {
              "type": "string"
            },
            "expiryDate": {
              "type": "null"
            }
          }
        }
      },
      "balance": {
        "type": "number"
      },
      "currency": {
        "type": "string"
      }
    }
  },
  "items": {
    "type": "object",
    "properties": {
      "transactions": {
        "type": "array",
        "items": {},
        "balance": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        }
      }
    }
  }
};

module.exports.wallet = walletInfo;