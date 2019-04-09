// Template for API Classes
const Meta = require('../../support/class/meta.js');
const PPC = require('./ppc');
/**
 * The PPCPage object to be passed into and from PPCPage Service API
 * @class
 */
class PPCPage extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.path = builder.path;
        /** @type {string} */
        this.location = builder.location;
        /** @type {string} */
        this.selectedLocation = builder.selectedLocation;
        this.ppc = new PPC(builder.ppc);
    }

    /**
     * Object equality - compare self with other instance
     * @param {PPCPage} other - PPCPage instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof PPCPage ) &&
               // Specific API checks
               ( other.path === this.path &&
                   other.location === this.location
               );
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

     /**
     * Method to check PPC Page object is populated
     * @returns {string}
     */
     isPopulated(){
         return this.selectedLocation != null &&
             this.ppc != null &&
             this.ppc.isPopulated() == true;
     }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * PPC Page Builder
         * @class
         * @alias PPCPage Builder
         * @example
         * new PPCPage.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.path = '';
                this.location = '';
                this.ppc = new PPC.Builder().build();
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
             * Set path
             * @param {string} path The Path
             * @returns {Builder}
             */
            withPath(path) {
                this.path = path;
                return this
            }
            /**
             * Set location
             * @param {string} location The Location
             * @returns {Builder}
             */
            withLocation(location) {
                this.location = location;
                return this
            }
            /**
             * Create PPCPage instance
             * @returns {Ppcpage}
             */
            build() {
                return new PPCPage(this);
            }
        }
        return Builder;
    }
}

module.exports = PPCPage;