const Meta = require('../../support/class/meta.js');
/**
 * The Login object to be passed into and from Login Service API
 * @class
 */
class Login extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment, builder.brand);
        /** @type {string} */
        this.j_username = builder.j_username;
        /** @type {string} */
        this.j_password = builder.j_password;
        /** @type {string} */
        this.apiAuthToken = '';
    }

    /**
     * Object equality - compare self with other instance
     * @param {Login} object - Login instance
     * @returns {boolean}
     */
    equals(object) {
        return this === object ||
            ( object instanceof Login ) &&
            // Specific API checks
            ( object.j_username === this.j_username && object.j_password === this.j_password);
    }

    /**
     * Method to check Business object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.j_password != null &&
            this.j_password != null;
    }

    /**
     * JSON Serialise class as JSON for normal user login operation.
     * @returns {string}
     */
    toJsonString() {
        return ('{"loginRequest":' + JSON.stringify(this, this.replacer) + '}');
    }

    /**
     * JSON Serialise class as JSON for facebook user login operation.
     * @returns {string}
     */
    facebookRequest() {
        return (JSON.stringify({
            "fbUserId": this.j_username,
            "fbAccessToken": this.j_password
            }));
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Login Builder
         * @class
         * @alias LoginBuilder
         * @example
         * new Login.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.j_username = '';
                this.environment = '';
                this.j_password = '';
            }
            /**
             * Set environment
             * @param {string} environment API endpointß
             * @returns {Builder}
             */
            withEnvironment(environment) {
                this.environment = environment;
                return this
            }
            /**
             * Set username
             * @param {string} username username of user logging in
             * @returns {Builder}
             */
            withUsername(name) {
                this.j_username = name;
                return this
            }
            /**
             * Set password
             * @param {string} password password of user logging in
             * @returns {Builder}
             */
            withPassword(pass) {
                this.j_password = pass;
                return this
            }
            /**
             * Create Login instance
             * @returns {Login}
             */
            build() {
                return new Login(this);
            }
        }
        return Builder;
    }
}
module.exports = Login;