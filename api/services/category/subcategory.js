const Meta = require('../../support/class/meta.js');
/**
 *  The SubCategory object
 * @class
 *
 */
class SubCategory {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        this.id = builder.id;
        /** @type {string} */
        this.code = builder.code;
        /** @type {string} */
        this.name = builder.name;
        /** @type {string} */
        this.shortName = builder.shortName;
        /** @type {string} */
        this.affiliateName = builder.affiliateName;
        /** @type {string} */
        this.canonicalPathType = builder.canonicalPathType;
        /** @type {array} */
        this.relatedSubCategories = new Map();
        /** @type {array} */
        this.locations = new Map();
    }

    /**
     * Object equality - compare self with other instance
     * @param {category} other. SubCategory instance
     * @returns {boolean} true: Objects are equal. false otherwise.
     */
    equals(other) {
        return this === other ||
               ( other instanceof SubCategory ) &&
               // Specific API checks
               (other.id === this.id &&
                   other.code === this.code &&
                   other.name === this.name &&
                   other.shortName === this.shortName &&
                   other.canonicalPathType === this.canonicalPathType &&
                   other.relatedSubCategories === this.relatedSubCategories &&
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
module.exports = SubCategory;