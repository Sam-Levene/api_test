const userData = {
    "result": {"type": "string"},
    "code": {"type": "string"},
    "message": {"type": "string"},
    "data": {"type": "object", "properties": {
            "apiAuthToken": {"type": "string"},
            "customerToken": {"type": "string"},
            "subscriptionsCount": {"type": "string"},
            "isNewEmail": {"type": "boolean"}
        }
    },
    "fieldErrors": {"type": "null"}
};

module.exports.userData = userData;