
class Random {

    /**
     * Generate random alpha numeric string of the given length
     * @param length
     * @returns {string}
     **/

    static string(length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    
    /**
     * Generate random numeric value of the given maximum value
     * @param value
     * @returns {number}
     */
    
    static number(value) {
    	return Math.floor(Math.random() * Math.floor(length));
    }

    /**
     * Generate and Return random Map entry
     * @param Map<T>
     * @returns {T}
     **/
    static map(map) {
        //random number between 1 and 10:
        //let random = Math.floor((Math.random() * map.size) + 1);
        return map.get(Math.floor((Math.random() * map.size) + 1) -1);
    }
}

module.exports = Random;
