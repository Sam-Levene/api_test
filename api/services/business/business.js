// Business for API Classes
const Meta = require('../../support/class/meta.js');
/**
 * The Business object to be passed into and from Business Service API
 * @class
 */
class Business extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.id = builder.id;
        this.brand = builder.brand;
        this.location = builder.location;
        this.countryCode = builder.countryCode;
        this.canonicalUrl = builder.canonicalUrl;
        this.business = builder.business;
        this.deals = builder.deals;
        this.similarDeals = builder.similarDeals;
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
     * Method to check Shortcut object is populated
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
         * Business Builder
         * @class
         * @alias BusinessBuilder
         * @example
         * new Template.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.id = '';
                this.brand = '';
                this.location = '';
                this.countryCode = '';
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
             * @param {number} id sets the ID
             * @returns {Builder}
             */
            withID(id) {
                this.id = id;
                return this
            }

            /**
             * Set brand
             * @param {string} brand sets the brand
             * @returns {Builder}
             */
            withBrand(brand){
                this.brand = brand;
                return this
            }

            /**
             * set location
             * @param {string} location sets the location
             * @returns {Builder}
             */
            withLocation(location){
                this.location = location;
                return this
            }

            /**
             * set countryCode
             * @param {string} countryCode sets the country code
             * @returns {Builder}
             */
            withCountryCode(countryCode){
                this.countryCode = countryCode;
                return this
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