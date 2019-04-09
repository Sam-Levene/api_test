const Meta = require('../../support/class/meta.js');
/**
 * The Shortcut object to be passed into and from Shortcut Service API
 * @class
 */
class Shortcut extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.id   = builder.identfier;
        /** @type {string} */
        this.redirectUrl = builder.redirectUrl;
        /** @type {string} */
        this.httpStatus  = builder.httpStatus;
        /** @type {string} */
        this.siteName    = builder.siteName;
        /** @type {string} */
        this.id          = builder.id;
        /** @type {string} */
        this._score      = builder._score;
        /** @type {string} */
        this.brand       = builder.brand;
        /** @type {string} */
        this.url         = builder.url;

    }

    /**
     * Object equality - compare self with other instance
     * @param {Shortcut} other - Shortcut instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Shortcut ) &&
               // Specific API checks
               ( other.id === this.id );
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    isPopulated() {
        return this.redirectUrl != null &&
               this.httpStatus != null &&
               this.siteName != null &&
               this.id != null &&
               this._score != null &&
               this.brand != null &&
               this.url != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Shortcut Builder
         * @class
         * @alias ShortcutBuilder
         * @example
         * new Shortcut.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.redirectUrl = '';
                this.siteName = '';
                this.id = '';
                this._score = '';
                this.brand = '';
                this.url = '';

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
             * Set Identfier
             * @param {string} identfier The identfier
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            /**
             * Set Brand
             * @param {string} brand BRAND
             * @returns {Builder}
             */
            withBrand(brand) {
                this.brand = brand;
                return this
            }
            /**
             * Create Shortcut instance
             * @returns {Shortcut}
             */
            build() {
                return new Shortcut(this);
            }
        }
        return Builder;
    }
}
module.exports = Shortcut;