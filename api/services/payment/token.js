// Token for API Classes
/**
 * The Token object to be passed into and from Payment Service API
 * @class
 */
class Token {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {string} */
        this.keyId = builder.keyId;
        /** @type {json} */
        this.cardInfo = builder.cardInfo;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Token} other - Token instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            (other instanceof Token) &&
            // Specific API checks
            (other.field === this.field);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Token Builder
         * @class
         * @alias TokenBuilder
         * @example
         * new Token.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.keyId = '';
                this.cardInfo = '';
            }

            /**
             * Set Key ID
             * @param {string} id API Auth Token
             * @returns {Builder}
             */
            withKeyId(id) {
                this.keyId = id;
                return this
            }

            /**
             * Set card info
             * @param {json} info card information
             * @returns {Builder}
             */
            withCardInfo(info) {
                this.cardInfo = info;
                return this
            }

            /**
             * Create Token instance
             * @returns {Token}
             */
            build() {
                return new Token(this);
            }
        }

        return Builder;
    }
}
module.exports = Token;