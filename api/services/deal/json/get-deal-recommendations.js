const dealRecommendations = {
  "$id": "http://example.com/example.json",
  "type": "array",
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "number"
      },
      "urlPrefix": {
        "type": "string"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "caption": {
              "type": "string"
            },
            "alt": {
              "type": "string"
            },
            "link": {
              "type": "string"
            },
            "extension": {
              "type": "string"
            },
            "height": {
              "type": "number"
            },
            "width": {
              "type": "number"
            },
            "mobileImage": {
              "type": "boolean"
            },
            "status": {
              "type": "string"
            },
            "imageUrl": {
              "type": "string"
            },
            "mobileImageUrl": {
              "type": "string"
            }
          }
        }
      },
      "priceText": {
        "type": "string"
      },
      "totalBought": {
        "type": "number"
      },
      "totalRemaining": {
        "type": "number"
      },
      "price": {
        "type": "number"
      },
      "depositPrice": {
        "type": "number"
      },
      "pricePerPerson": {
        "type": "boolean"
      },
      "headline": {
        "type": "string"
      },
      "display": {
        "type": "object",
        "properties": {
          "discountAmount": {
            "type": "boolean"
          },
          "quantity": {
            "type": "boolean"
          },
          "quantityRemaining": {
            "type": "boolean"
          },
          "endDate": {
            "type": "boolean"
          },
          "discount": {
            "type": "boolean"
          },
          "bought": {
            "type": "boolean"
          },
          "previousDeal": {
            "type": "boolean"
          },
          "deliveryAddress": {
            "type": "boolean"
          },
          "business": {
            "type": "boolean"
          },
          "timer": {
            "type": "boolean"
          },
          "flashDeal": {
            "type": "boolean"
          },
          "priceText": {
            "type": "boolean"
          },
          "lastChance": {
            "type": "boolean"
          }
        }
      },
      "priceIndicative": {
        "type": "boolean"
      },
      "discount": {
        "type": "number"
      },
      "discountPercentage": {
        "type": "number"
      },
      "originalPrice": {
        "type": "number"
      },
      "closingDate": {
        "type": "number"
      },
      "expiryDate": {
        "type": "number"
      },
      "flashDealDate": {
        "type": "number"
      },
      "currency": {
        "type": "string"
      },
      "soldText": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "business": {
        "type": "object",
        "properties": {
          "image": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number"
              },
              "caption": {
                "type": "string"
              },
              "alt": {
                "type": "string"
              },
              "link": {
                "type": "string"
              },
              "extension": {
                "type": "string"
              },
              "height": {
                "type": "number"
              },
              "width": {
                "type": "number"
              },
              "mobileImage": {
                "type": "boolean"
              },
              "status": {
                "type": "string"
              },
              "imageUrl": {
                "type": "string"
              },
              "mobileImageUrl": {
                "type": "string"
              }
            }
          }
        }
      },
      "urlPath": {
        "type": "string"
      }
    }
  }
};

module.exports.dealRecommendations = dealRecommendations;