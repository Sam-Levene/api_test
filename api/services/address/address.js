const Meta = require('../../support/class/meta.js');

// Typedef for ClassConstructor
/**
 * 1 ) A Builder for API Object class or
 * 2 ) Another API Object class of the same type
 * 3 ) A JSON object that contains, in whole or a subset of, API Object class fields.
 *
 * @typedef {(object)} ClassConstructor
 *
 */



/**
 * The Address object to be passed into and from Address Service API
 * @class
 */

class Address extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.postCode = builder.postCode;
        /** @type {string} */
        this.apiKey = builder.apiKey;
        /** @type {string} */
        this.address = builder.address;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Address} other - Address instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Address ) &&
               // Specific API checks
               ( other.postCode === this.postCode);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    isPopulated() {
        return this.address !== '';
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Address Builder
         * @class
         * @alias AddressBuilder
         * @example
         * new Address.Builder().with withEnvironment(environment).build()
         */
        class Builder {

        constructor() {
                // Fields can be defaulted here
                this.postCode = '';
                this.apiKey =   'cf522cfec2a4d56d569e60a152040000';
                this.environment = '';
                // Placeholder.  no builder method - returned from API
                this.address = '';
            }
            /**
             * Set environment
             * @param {string} environment API endpoint
             * @returns {Builder}
             */
            withEnvironment(environment) {
                this.environment = environment;
                return this
            }
            /**
             * Set PostCode
             * @param {string} postCode PostCode
             * @returns {Builder}
             */
            withPostCode(postCode){
                this.postCode = postCode;
                return this
            }
            /**
             * Set apiKey
             * @param {string} apiKey The API Key
             * @returns {Builder}
             */
            withApiKey(apiKey){
                this.apiKey = apiKey;
                return this
            }
            /**
             * Create Address instance
             * @returns {Address}
             */
            build() {
                return new Address(this);
            }
        }
        return Builder;
    }
}
module.exports = Address;