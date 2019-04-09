/**
 * HTTP Response Codes
 * @class
 */
class HttpResponseCodes {
    /**
     * OK
     * @param response
     * @returns {boolean}
     */
    static isOK(response) {
        return response === 200;
    }
    /**
     * Created
     * @param response
     * @returns {boolean}
     */
    static isCreated(response) {
        return response === 201;
    }
    /**
     * Bad Request
     * @param response
     * @returns {boolean}
     */
    static isBadRequest(response) {
        return response === 400;
    }
    /**
     * Unauthorized
     * @param response
     * @returns {boolean}
     */
    static isUnauthorized(response) {
        return response === 401;
    }
    /**
     * Not Found
     * @param response
     * @returns {boolean}
     */
    static isNotFound(response) {
        return response === 404;
    }

    /**
     * Conflict
     * @param response
     * @returns {boolean}
     */
    static isConflict(response){
        return response === 409;
    }

    /**
     * Internal Server Error
     * @param response
     * @returns {boolean}
     */
    static isInternalServerError(response) {
        return response === 500;
    }
}
module.exports = HttpResponseCodes;
