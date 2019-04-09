const Meta = require('../../support/class/meta');
/**
 * The Recommendations object to be passed into and from Recommendations Service API
 * @class
 */
class Recommendations extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {number} */
        this.dealId = builder.dealId;
        /** @type {string} */
        this.brand = builder.brand;
        /** @type {string} */
        this.source = builder.source;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Recommendations} other - Recommendations instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Recommendations ) &&
               // Specific API checks
               ( other.dealId === this.dealId);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Method to check Recommendation object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.dealId != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Recommendations Builder
         * @class
         * @alias RecommendationsBuilder
         * @example
         * new Recommendations.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.dealId = '';
                this.environment = '';
                this.brand = '';
                this.source = '';
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
             * Set brand
             * @param {string} brand API endpoint
             * @returns {Builder}
             */
            withBrand(brand) {
                this.brand = brand;
                return this
            }
            /**
             * Set dealId
             * @param {string} dealId The Deal ID
             * @returns {Builder}
             */
            withDealId(dealId) {
                this.dealId = dealId;
                return this
            }
            /**
             * Set source
             * @param {string} source The source of the recommendations
             * @returns {Builder}
             */
            withSource(source) {
                this.source = source;
                return this
            }
            /**
             * Create Recommendations instance
             * @returns {Recommendations}
             */
            build() {
                return new Recommendations(this);
            }
        }
        return Builder;
    }
}
module.exports = Recommendations;