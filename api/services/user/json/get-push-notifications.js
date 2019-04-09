const pushNotification = {
  "newOrResubscription": {
    "type": "null"
  },
  "newEmailToBrand": {
    "type": "null"
  },
  "newEmail": {
    "type": "null"
  },
  "suspectEmail": {
    "type": "null"
  },
  "expressBuyable": {
    "type": "null"
  },
  "alias": {
    "type": "object",
    "properties": {
      "key": {
        "type": "string"
      },
      "value": {
        "type": "string"
      }
    }
  },
  "tags": {
    "type": "object",
    "properties": {
      "tags": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "key": {
              "type": "string"
            },
            "value": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  "apiLocationsVO": {
    "type": "null"
  },
  "apiAddressReferencesVO": {
    "type": "null"
  },
  "apiAddressVO": {
    "type": "null"
  },
  "apiDealsVO": {
    "type": "null"
  },
  "apiMultiLocationDealsVO": {
    "type": "null"
  },
  "apiDealVO": {
    "type": "null"
  },
  "apiFeaturedDealVO": {
    "type": "null"
  },
  "apiDealstatusVO": {
    "type": "null"
  },
  "apiRequestPurchase": {
    "type": "null"
  },
  "paymentOptions": {
    "type": "null"
  },
  "apiSubscriptionVO": {
    "type": "null"
  },
  "apiUserDealInfoVO": {
    "type": "null"
  },
  "isNewEmail": {
    "type": "null"
  },
  "isNewToBrand": {
    "type": "null"
  },
  "isNewOrResubscription": {
    "type": "null"
  },
  "isSuspect": {
    "type": "null"
  },
  "apiAuthToken": {
    "type": "null"
  },
  "customerToken": {
    "type": "null"
  },
  "facebookStatus": {
    "type": "null"
  },
  "subscriptionsCount": {
    "type": "null"
  },
  "isExpressBuyable": {
    "type": "null"
  },
  "paymentCvvCheckEnabled": {
    "type": "null"
  },
  "paymentCvvCheckMaxOrderCostLimitForToday": {
    "type": "null"
  },
  "paymentCvvCheckMaxItemLimitForToday": {
    "type": "null"
  }
};

module.exports.notifications = pushNotification;