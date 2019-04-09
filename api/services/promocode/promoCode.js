// Template for API Classes
const Meta = require('../../support/class/meta.js');
/**
 * The PromoCode object to be passed into and from Promo Code Service API
 * @class
 */
class PromoCode extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.code = builder.code;
        /** @type {String} */
        this.dealId = builder.dealId;
        /** @type {String} */
        this.apiAuthToken = builder.apiAuthToken;
        /** @type {String} */
        this.wowcherUser = builder.wowcherUser;
        /** @type {String} */
        this.brand = builder.brand;
        /** @type {String} */
        this.purchaseSource = builder.purchaseSource;
        /** @type {String} */
        this.appPlatform = builder.appPlatform;
        /** @type {String} */
        this.id = builder.id;
        /** @type {String} */
        this.applicable = builder.applicable;
        /** @type {String} */
        this.discount = builder.discount;
        /** @type {String} */
        this.expired = builder.expired;
        /** @type {String} */
        this.inValidCode = builder.inValidCode;
        /** @type {String} */
        this.alreadyUsed = builder.alreadyUsed;
        /** @type {String} */
        this.userNotApplicable = builder.userNotApplicable;
        /** @type {String} */
        this.dealNotApplicable = builder.dealNotApplicable;
        /** @type {String} */
        this.message = builder.message;
    }

    /**
     * Object equality - compare self with other instance
     * @param {PromoCode} other - PromoCode instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof PromoCode ) &&
               // Specific API checks
               ( other.code === this.code &&
               other.dealId === this.dealId);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Method to check PromoCode object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.applicable != null &&
            this.discount != null &&
            this.expired != null &&
            this.inValidCode != null &&
            this.alreadyUsed != null &&
            this.userNotApplicable != null &&
            this.dealNotApplicable != null
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * PromoCode Builder
         * @class
         * @alias PromoCodeBuilder
         * @example
         * new PromoCode.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.code = '';
                this.dealId = '';
                this.apiAuthToken = '';
                this.wowcherUser = '';
                this.brand = '';
                this.purchaseSource = '';
                this.appPlatform = '';
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
             * Set code
             * @param {string} code The Code
             * @returns {Builder}
             */
            withCode(code) {
                this.code = code;
                return this
            }

            /**
             * Set Deal ID
             * @param {string} dealID The dealID
             * @returns {Builder}
             */
            withDealId(dealId){
                this.dealId = dealId;
                return this
            }

            /**
             * Set apiAuthToken
             * @param {string} apiAuthToken The apiAuthToken
             * @returns {Builder}
             */
            withApiAuthToken(apiAuthToken){
                this.apiAuthToken = apiAuthToken;
                return this
            }

            /**
             * Set wowcherUser
             * @param {string} wowcherUser The wowcherUser
             * @returns {Builder}
             */
            withWowcherUser(wowcherUser){
                this.wowcherUser = wowcherUser;
                return this
            }

            /**
             * Set brand
             * @param {string} brand The brand
             * @returns {builder}
             */
            withBrand(brand){
                this.brand = brand;
                return this
            }

            /**
             * Set purchaseSource
             * @param {string} purchaseSource The purchaseSource
             * @returns {Builder}
             */
            withPurchaseSource(purchaseSource){
                this.purchaseSource = purchaseSource;
                return this
            }

            /**
             * Set appPlatform
             * @param {string} appPlatform The appPlatform
             * @returns {Builder}
             */
            withAppPlatform(appPlatform){
                this.appPlatform = appPlatform;
                return this
            }

            /**
             * Create PromoCode instance
             * @returns {PromoCode}
             */
            build() {
                return new PromoCode(this);
            }
        }
        return Builder;
    }
}
module.exports = PromoCode;