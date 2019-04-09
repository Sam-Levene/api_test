// MainDeal for API Classes
const Meta = require('../../support/class/meta');
const Display = require('./display');
const Business = require('./business');

/**
 * The MainDeal object to be passed into and from Deal Service API
 * @class
 */
class MainDeal extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {number} */
        this.id = builder.id;
        /** @type {string} */
        this.pageTitle = builder.pageTitle;
        /** @type {string} */
        this.status = builder.status;
        /** @type {string} */
        this.title = builder.title;
        /** @type {string} */
        this.description = builder.description;
        /** @type {number} */
        this.price = builder.price;
        /** @type {number} */
        this.originalPrice = builder.originalPrice;
        /** @type {string} */
        this.priceText = builder.priceText;
        /** @type {number} */
        this.discount = builder.discount;
        /** @type {number} */
        this.discountPercentage = builder.discountPercentage;
        /** @type {number} */
        this.depositPrice = builder.depositPrice;
        /** @type {boolean} */
        this.priceIndicative = builder.priceIndicative;
        /** @type {string} */
        this.urlPrefix = builder.urlPrefix;
        /** @type {string} */
        this.soldText = builder.soldText;
        /** @type {string} */
        this.emailSubject = builder.emailSubject;
        /** @type {string} */
        this.printTitle = builder.printTitle;
        /** @type {number} */
        this.closingDate = builder.closingDate;
        /** @type {number} */
        this.expiryDate = builder.expiryDate;
        /** @type {number} */
        this.flashDealDate = builder.flashDealDate;
        /** @type {string} */
        this.webAddress = builder.webAddress;
        /** @type {string} */
        this.originalPriceUrl = builder.originalPriceUrl;
        /** @type {boolean} */
        this.expressBuy = builder.expressBuy;
        /** @type {boolean} */
        this.giftable = builder.giftable;
        /** @type {boolean} */
        this.soldOut = builder.soldOut;
        /** @type {boolean} */
        this.depositAvailable = builder.depositAvailable;
        /** @type {Display} */
        this.display = builder.display;
        /** @type {string} */
        this.currency = builder.currency;
        /** @type {boolean} */
        this.pricePerPerson = builder.pricePerPerson;
        /** @type {string} */
        this.headline = builder.headline;
        /** @type {boolean} */
        this.enableBuyClosedDeal = builder.enableClosedBuyDeal;
        /** @type {boolean} */
        this.invasiveHealth = builder.invasiveHealth;
        /** @type {boolean} */
        this.open = builder.open;
        /** @type {products} */
        this.products = builder.products;
        /** @type {Object} */
        this.productDisplay =  builder.productDisplay;
        /** @type {images} */
        this.images = builder.images;
        /** @type {string} */
        this.previewImageThumbUrl = builder.previewImageThumbUrl;
        /** @type {number} */
        this.totalBought = builder.totalBought;
        /** @type {string} */
        this.totalRemaining = builder.totalRemaining;
        /** @type {Business} */
        this.business = builder.business;
        /** @type {Object} */
        this.highlights = builder.highlights;
        /** @type {array} */
        this.terms = builder.terms;
        /** @type {string} */
        this.leadGen = builder.leadGen;
        /** @type {string} */
        this.redeemLocationUrl = builder.redeemLocationUrl;
        /** @type {string} */
        this.redeemInstructions = builder.redeemInstructions;
        /** @type {number} */
        this.chainDealId =  builder.chainDealId;
        /** @type {string} */
        this.chainDealUrlPrefix = builder.chainDealUrlPrefix;
        /** @type {string} */
        this.shareUrl = builder.shareUrl;
        /** @type {Category} */
        this.category = builder.category;
        /** @type {SubCategory} */
        this.subCategory = builder.subCategory;
        /** @type {reviews} */
        this.reviews = builder.reviews;
        /** @type {string} */
        this.reviewTitle =  builder.reviewTitle;
        /** @type {string} */
        this.marketplaceOptions = builder.marketplaceOptions;
        /** @type {string} */
        this.closedDealRedirectPath = builder.closedDealRedirectPath;
        /** @type {Object} */
        this.brands = builder.brands;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Image} other - MainDeal instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            ( other instanceof MainDeal ) &&
            // Specific API checks
            ( other.id === this.id);
    }

    isPopulated() {
        // TODO check for more mandatory fields
        return this.id != null &&
            this.pageTitle  != null &&
            this.status  != null &&
            this.title  != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * MainDeal Builder
         * @class
         * @alias MainDealBuilder
         * @example
         * new MainDeal.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.brand = '';
                this.id = '';
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
             * Set ID
             * @param {number} id sets the ID
             * @returns {Builder}
             */
            withID(id) {
                this.id = id;
                return this
            }
            /**
             * Create MainDeal instance
             * @returns {MainDeal}
             */
            build() {
                return new MainDeal(this);
            }
        }
        return Builder;
    }
}
module.exports = MainDeal;