const Meta = require('../../support/class/meta.js');
const Site = require('./staticpagesite');
/**
 * The StaticPage object to be passed into and from StaticPage Service API
 * @class
 */
class StaticPage extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.id = builder.id;
        this.displayName = builder.displayName;
        this.url = builder.url;
        this.text = builder.text;
        this.status = builder.status;
        this.description = builder.description;
        this.externalUrl = builder.externalUrl;
        this.brand = builder.brand;
        this.externalUrlTarget = builder.externalUrlTarget;
        this.isSource = builder.isSource;
        this.ppcDealPageText = builder.ppcDealPageText;
        this.itoCode = builder.itoCode;
        this.ppcDealType = builder.ppcDealType;
        this.sourcePageId = builder.sourcePageId;
        this.staticPageType = builder.staticPageType;
        this.site = new Site(builder.site);
        this.images = builder.images;

    }

    /**
     * Object equality - compare self with other instance
     * @param {StaticPage} other - StaticPage instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof StaticPage ) &&
               // Specific API checks
               ( other.id === this.id &&
                       other.displayName === this.displayName &&
                       other.url === this.url &&
                       other.text === this.text &&
                       other.status === this.status &&
                       other.description === this.description &&
                       other.externalUrl === this.externalUrl &&
                       other.isSource === this.isSource &&
                       other.ppcDealPageText === this.ppcDealPageText &&
                       other.itoCode === this.itoCode &&
                       other.ppcDealType === this.ppcDealType &&
                       other.sourcePageId === this.sourcePageId &&
                       other.staticPageType === this.staticPageType &&
                       other.images === this.images
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
        return this.displayName != null &&
        this.status != null &&
        this.staticPageType != null &&
        this.site.isPopulated() == true;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * StaticPage Builder
         * @class
         * @alias StaticPage
         * @example
         * new StaticPage.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.id = '';
                this.brand = '';
                this.url = '';
                this.site = new Site.Builder().build();
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
             * @param {string} id The ID
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            /**
             * Set brand
             * @param {string} brand The Brand
             * @returns {Builder}
             */
            withBrand(brand) {
                this.brand = brand;
                return this
            }
            /**
             * Set url
             * @param {string} url The URL
             * @returns {Builder}
             */
            withUrl(url) {
                this.url = url;
                return this
            }
            /**
             * Create StaticPage instance
             * @returns {StaticPage}
             */
            build() {
                return new StaticPage(this);
            }
        }
        return Builder;
    }
}
module.exports = StaticPage;