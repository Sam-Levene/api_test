const Meta = require('../../support/class/meta.js');
/**
 *  The relatedDealCategory object to be passed into and from Category Service API
 * @class
 *
 */
class RelatedSubCategory {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        this.code = builder.id;
        /** @type {string} */
        this.shortName = builder.name;
    }

    /**
     * Object equality - compare self with other instance
     * @param {category} other. RelatedSubCategory instance
     * @returns {boolean} true: Objects are equal. false otherwise.
     */
    equals(other) {
        return this === other ||
               ( other instanceof RelatedSubCategory ) &&
               // Specific API checks
               (other.id === this.id && other.name === this.name && other.shortName === this.shortName && other.canonicalPathType === this.canonicalPathType && other.locations === this.locations);
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
         * RelatedSubCategory Builder
         * @class
         * @alias RelatedSubCategoryBuilder
         * @example
         * new RelatedSubCategory.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
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
             * Create RelatedSubCategory instance
             * @returns {RelatedSubCategory}
             */
            build() {
                return new RelatedSubCategory(this);
            }
        }
        return Builder;
    }
}
module.exports = RelatedSubCategory;