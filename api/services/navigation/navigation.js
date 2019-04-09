// Navigation for API Classes
const Meta = require('../../support/class/meta');
/**
 * The Navigation object to be passed into and from Navigation Service API
 * @class
 */
class Navigation extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment, builder.brand);
        /** @type {string} */
        this.location = builder.location;
        /** @type {string} */
        this.brand = builder.brand;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Navigation} other - Navigation instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Navigation ) &&
               // Specific API checks
               ( other.location === this.location);
    }

    /**
     * Method to check Navigation object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.location != null;
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
         * Navigation Builder
         * @class
         * @alias NavigationBuilder
         * @example
         * new Navigation.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.location = 'london';
                this.brand = '';
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
             * Set brand
             * @param {string} brand API endpoint
             * @returns {Builder}
             */
            withBrand(brand) {
                this.brand = brand;
                return this
            }
            /**
             * Set location
             * @param {string} location The Field
             * @returns {Builder}
             */
            withLocation(location) {
                this.location = location;
                return this
            }
            /**
             * Create Navigation instance
             * @returns {Navigation}
             */
            build() {
                return new Navigation(this);
            }
        }
        return Builder;
    }
}
module.exports = Navigation;