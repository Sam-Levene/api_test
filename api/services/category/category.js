const Meta = require('../../support/class/meta.js');
/**
 *  The Category object to be passed into and from Category Service API
 * @class
 *
 */
class Category extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {integer} */
        this.id = builder.id;
        /** @type {string} */
        this.name = builder.name;
        /** @type {string} */
        this.shortName = builder.shortName;
        /** @type {string} */
        this.position = builder.position;
        /** @type {array} */
        this.dealCategories = builder.dealCategories;
        /** @type {array} */
        this.subCategories = builder.subCategories;

    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * toString objectify class
     * @returns {string}
     */
    toString() {
        return this;
    }

    /**
     * Method to check category object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.id != null &&
            this.name != null &&
            this.shortName != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Category Builder
         * @class
         * @alias CategoryBuilder
         * @example
         * new Category.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.id = '';
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
             * Set id
             * @param {string} id id
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            /**
             * Create Template instance
             * @returns {Template}
             */
            build() {
                return new Category(this);
            }
        }
        return Builder;
    }
}
module.exports = Category;