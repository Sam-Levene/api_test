// Business for API Classes
const Image = require('./image');
/**
 * The Business object to be passed into and from Business Service API
 * @class
 */
class Business {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        this.image = new Image();
    }

    /**
     * Object equality - compare self with other instance
     * @param {Business} other - Business instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            ( other instanceof Business ) &&
            // Specific API checks
            ( other.image === this.image);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toString() {
        for (let key in this) {
            if (this[key] !== '' && this[key] !== undefined) {
                console.log(key + ": " + this[key]);
            }
        }
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Business Builder
         * @class
         * @alias BusinessBuilder
         * @example
         * new Business.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.image = '';
            }

            /**
             * Creates new Query object
             * @param {object} image The Image object
             * @returns {builder}
             */
            withImage(image)
            {
                this.image = image;
                return this;
            }

            /**
             * Create Business instance
             * @returns {Business}
             */
            build() {
                return new Business(this);
            }
        }
        return Builder;
    }
}
module.exports = Business;