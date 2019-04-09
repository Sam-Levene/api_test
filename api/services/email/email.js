// Template for API Classes
const Meta = require('../../support/class/meta.js');
/**
 * The Emial object to be passed into and from Email Service API
 * @class
 */
class Email extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.email = builder.email;
        /** @type {string} */
        this.location = builder.location;
        /** @type {string} */
        this.status = builder.status;
        /** @type {string} */
        this.message = builder.message;
        /** @type {string} */
        this.count = builder.count;
        /** @type {string} */
        this.token = builder.token;
        /** @type {string} */
        this.newEmail = builder.newEmail;
        /** @type {string} */
        this.newToBrand = builder.newToBrand;
        /** @type {string}*/
        this.subscriptionSource = builder.subscriptionSource;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Email} other - Template instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Email ) &&
               // Specific API checks
               ( other.email === this.email &&
               other.location === this.location);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Method to check Email object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.status  != null &&
            this.message != null &&
            this.count != null &&
            this.token != null &&
            this.newEmail != null &&
            this.newToBrand != null
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Email Builder
         * @class
         * @alias EmailBuilder
         * @example
         * new Email.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.email = '';
                this.location = '';
                this.subscriptionSource = '';
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
             * Set email
             * @param {string} email The Email
             * @returns {Builder}
             */
            withEmail(email) {
                this.email = email;
                return this
            }

            /**
             * Set location
             * @param {string} location The Location
             * @returns {Builder}
             */
            withLocation(location){
                this.location = location;
                return this
            }

            /**
             * Set subscription Source
             * @param {string} subscriptionSource The subscriptionSource
             * @returns {Builder}
             */
            withSubscriptionSource(subscriptionSource){
                this.subscriptionSource = subscriptionSource;
                return this
            }

            withToken(token){
                this.token = token;
                return this
            }

            /**
             * Create Template instance
             * @returns {Email}
             */
            build() {
                return new Email(this);
            }
        }
        return Builder;
    }
}
module.exports = Email;