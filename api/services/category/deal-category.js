const Meta = require('../../support/class/meta.js');
/**
 *  The dealCategory object to be passed into and from Category Service API
 * @class
 *
 */
class DealCategory {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        this.id = builder.id;
        /** @type {string} */
        this.name = builder.name;
        /** @type {string} */
        this.shortName = builder.shortName;
        /** @type {string} */
        this.position = builder.position;
        /** @type {string} */
        this.canonicalPathType = builder.canonicalPathType;
        /** @type {array} */
        this.locations = new Map();

    }

    /**
     * Object equality - compare self with other instance
     * @param {category} other dealCategory instance
     * @returns {boolean} true: Objects are equal. false otherwise.
     */
    equals(other) {
        return this === other ||
               ( other instanceof DealCategory ) &&
               // Specific API checks
               (other.id === this.id &&
                   other.name === this.name &&
                   other.shortName === this.shortName &&
                   other.canonicalPathType === this.canonicalPathType &&
                   other.locations === this.locations);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }
}
module.exports = DealCategory;