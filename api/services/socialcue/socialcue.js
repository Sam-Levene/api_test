// Template for API Classes
const Meta = require('../../support/class/meta');
/**
 * The Socialcue object to be passed into and from Socialcue Service API
 * @class
 */
class Socialcue extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {number} */
        this.id = builder.id;
        /** @type {string} */
        this.brand = builder.brand;
        /** @type {json} */
        this.categoryPurchases = builder.categoryPurchases;
        /** @type {json} */
        this.subcategoryPurchases = builder.subcategoryPurchases;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Socialcue} other - Socialcue instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Socialcue ) &&
               // Specific API checks
               ( other.id === this.id);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Method to check SocialCue object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.id != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Socialcue Builder
         * @class
         * @alias SocialcueBuilder
         * @example
         * new Socialcue.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.id = '';
                this.environment = '';
                this.brand = 'wowcher';
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
             * Set ID
             * @param {number} id The deal ID
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            /**
             * Set brand
             * @param {string} brand The deal brand
             * @returns {Builder}
             */
            withBrand(brand) {
                this.brand = brand;
                return this
            }
            /**
             * Create Socialcue instance
             * @returns {Socialcue}
             */
            build() {
                return new Socialcue(this);
            }
        }
        return Builder;
    }
}
module.exports = Socialcue;