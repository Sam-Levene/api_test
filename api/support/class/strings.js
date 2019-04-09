
/**
 * String Utilities
 * @class
 */

class Strings {
    /**
     * Check if string is null or empty
     * @param str
     * @return {boolean}
     */
    static isEmpty(str) {
       return str === null || str.length === 0;
    }

    /**
     * Check if JSON string is null or empty
     * @param str
     * @return {boolean}
     */
    static hasContent(str) {
        return str !== null &&  str.length !== 0 && str !== '{}';
    }

    /**
     *  Check if string is JSON
     * @param str
     * @return {boolean}
     */
    static isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}

module.exports = Strings;
