const getAllRobots = {
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
      "_score": {
        "type": "number"
      },
      "brand": {
        "type": "string"
      },
      "url": {
        "type": "string"
      }
    }
  }
};

module.exports.getAllRobots = getAllRobots;