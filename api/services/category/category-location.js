const Meta = require('../../support/class/meta.js');
/**
 *  The Deal Category Location object to be passed into and from Category Service API
 * @class
 *
 */
class CategoryLocation {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        this.location = builder.location;
        /** @type {string} */
        this.brand = builder.brand;
        /** @type {string} */
        this.text = builder.text;
        /** @type {string} */
        this.imageUrl = builder.imageUrl;
        /** @type {string} */
        this.altText = builder.altText;
        /** @type {string} */
        this.countryCode = builder.countryCode;
    }

    /**
     * Object equality - compare self with other instance
     * @param {CategoryLocation} other. CategoryLocation instance
     * @returns {boolean} true: Objects are equal. false otherwise.
     */
    equals(other) {
        return this === other ||
               ( other instanceof CategoryLocation ) &&
               // Specific API checks
               (other.location === this.location &&
                   other.brand === this.brand &&
                   other.text === this.text &&
                   other.imageUrl === this.imageUrl &&
                   other.altText === this.altText &&
                   other.countryCode === this.countryCode);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }
}
module.exports = CategoryLocation;