// Deal for API Classes
const Meta = require('../../support/class/meta');

/**
 * The Deal object to be passed into and from Deal Service API
 * @class
 */
class Deal extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {number} */
        this.id = builder.id;
        /** @type {string} */
        this.q = builder.q;
        /** @type {string} */
        this.location = builder.location;
        /** @type {string} */
        this.category = builder.category;
        /** @type {string} */
        this.subCat = builder.subCat;
        /** @type {string} */
        this.ct = builder.ct;
        /** @type {string} */
        this.searchTag = builder.searchTag;
        /** @type {number} */
        this.limit = builder.limit;
        /** @type {number} */
        this.pageSize = builder.pageSize;
        /** @type {number} */
        this.page = builder.page;
        /** @type {string} */
        this.urlPrefix = builder.urlPrefix;
        /** @type {object} */
        this.images = builder.images;
        /** @type {number} */
        this.priceText = builder.priceText;
        /** @type {number} */
        this.totalBought = builder.totalBought;
        /** @type {number} */
        this.totalRemaining = builder.totalRemaining;
        /** @type {number} */
        this.price = builder.price;
        /** @type {number} */
        this.depositPrice = builder.depositPrice;
        /** @type {number} */
        this.pricePerPerson = builder.pricePerPerson;
        /** @type {string} */
        this.headline = builder.headline;
        /** @type {object} */
        this.display = builder.display;
        /** @type {number} */
        this.priceIndicative = builder.priceIndicative;
        /** @type {number} */
        this.discount = builder.discount;
        /** @type {number} */
        this.discountPercentage = builder.discountPercentage;
        /** @type {number} */
        this.originalPrice = builder.originalPrice;
        /** @type {date} */
        this.closingDate = builder.closingDate;
        /** @type {date} */
        this.expiryDate = builder.expiryDate;
        /** @type {date} */
        this.flashDealDate = builder.flashDealDate;
        /** @type {string} */
        this.currency = builder.currency;
        /** @type {string} */
        this.soldText = builder.soldText;
        /** @type {string} */
        this.title = builder.title;
        /** @type {object} */
        this.business = builder.business;
        /** @type {string} */
        this.urlPath = builder.urlPath;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Deal} other - Deal instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Deal ) &&
               // Specific API checks
               ( other.id === this.id);
    }

    isPopulated() {
        return this.id != null;
    }

    /**
     * returns the object as a whole to stringify.
     * @returns {object}
     */
    toString() {
        return this;
    }

    /**
     * Method to check Deal object is populated
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
         * Deal Builder
         * @class
         * @alias DealBuilder
         * @example
         * new Deal.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.q = '';
                this.brand = '';
                this.id = '';
                this.ct = '';
                this.searchTag = '';
                this.subCat = '';
                this.limit = '';
                this.pageSize = '';
                this.category = '';
                this.page = '';
                this.location = '';
            }
            /**
             * Set query string
             * @param {string} query query string
             * @returns {Builder}
             */
            withQ(query) {
                this.q = query;
                return this
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
             * Set category
             * @param {string} category API endpoint
             * @returns {Builder}
             */
            withCategory(category) {
                this.category = category;
                return this
            }
            /**
             * Set sub-category
             * @param {string} subcat API endpoint
             * @returns {Builder}
             */
            withSubCategory(subcat) {
                this.subCat = subcat;
                return this
            }
            /**
             * Set search tag
             * @param {string} tag API endpoint
             * @returns {Builder}
             */
            withSearchTag(tag) {
                this.searchTag = tag;
                return this
            }
            /**
             * Set location
             * @param {string} location API endpoint
             * @returns {Builder}
             */
            withLocation(location) {
                this.location = location;
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
             * Set Customer Token
             * @param {string} ct sets the customer token
             * @returns {Builder}
             */
            withCustomerToken(ct) {
                this.ct = ct;
                return this
            }
            /**
             * Set Limit
             * @param {number} limit sets the limit
             * @returns {Builder}
             */
            withLimit(limit) {
                this.limit = limit;
                return this
            }
            /**
             * Set Page Size
             * @param {number} size sets the page size
             * @returns {Builder}
             */
            withPageSize(size) {
                this.pageSize = size;
                return this
            }
            /**
             * Set Page number
             * @param {number} number sets the page number
             * @returns {Builder}
             */
            withPage(number) {
                this.page = number;
                return this
            }
            /**
             * Create DealRecommendation instance
             * @returns {Deal}
             */
            build() {
                return new Deal(this);
            }
        }
        return Builder;
    }
}
module.exports = Deal;