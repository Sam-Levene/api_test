// SailThru for API Classes
const Meta = require('../../support/class/meta.js');
/**
 * The SailThru object to be passed into and from SailThru Service API
 * @class
 */
class Sailthru extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.path = builder.path;
        /** @type {string} */
        this.solus = builder.solus;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Sailthru} other - Sailthru instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Sailthru ) &&
               // Specific API checks
               ( other.path === this.path);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Method to check Business object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.path != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Sailthru Builder
         * @class
         * @alias SailthruBuilder
         * @example
         * new Sailthru.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.path = "";
                this.solus = "false";
                this.environment = "";
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
             * Set solus
             * @param {string} solus The solus flag (true or false)
             * @returns {Builder}
             */
            withSolus(solus) {
                this.solus = solus;
                return this
            }
            /**
             * Create Sailthru instance
             * @returns {Sailthru}
             */
            build() {
                return new Sailthru(this);
            }
        }
        return Builder;
    }
}
module.exports = Sailthru;