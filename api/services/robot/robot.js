
const Meta = require('../../support/class/meta.js');
/**
 *  The Robot object to be passed into and from Robot Service API
 * @class
 *
 */
class Robot extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.id = builder.id;
        /** @type {string} */
        this.url = builder.url;
        /** @type {string} */
        this.brand = builder.brand
    }

    /**
     * Object equality method.  compare self with other instance
     * @param {Robot} other. Robot instance
     * @returns {boolean} true: Objects are equal. false otherwise.
     */
    equals(other) {
        return this === other ||
            ( other instanceof Robot ) &&
            // Specific API checks
            ( other.id === this.id && other.url === this.url && other.brand === this.brand );
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
        return this.id != null &&
            this.url != null &&
            this.brand != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Robot Builder
         * @class
         * @alias RobotBuilder
         * @example
         * new Robot.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.id = '';
                this.url = '';
                this.brand = '';
                this.environment = '';
            }
            /**
             * Set environment
             * @param {string} environment API Endpoint
             * @returns {Builder}
             */
            withEnvironment(environment) {
                this.environment = environment;
                return this
            }


            /**
             * Set Id
             * @param {string} id ID
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }

            /**
             * Set Url
             * @param {string} url URL
             * @returns {Builder}
             */
            withUrl(url) {
                this.url = url;
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
             * Create Robot instance
             * @returns {Robot}
             */
            build() {
                return new Robot(this);
            }
        }
        return Builder;
    }
}
module.exports = Robot;