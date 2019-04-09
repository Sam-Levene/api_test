// MainDeal for API Classes
const Meta = require('../../support/class/meta');
const Display = require('./display');
const Business = require('./business');

/**
 * The MainDeal object to be passed into and from Deal Service API
 * @class
 */
class LocationDeal extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.location = builder.location;
        /** @type {number} */
        this.canonicalUrl = null;
        /** @type {MainDeal} */
        this.mainDeal = null;
        /** @type {MainDeal} */
        this.deals = builder.deals;
    }

    operatorEvaluation(deals, price, operator) {
        if (operator === ">") {
            if (deals.price > price) {
                return deals;
            }
            else {
                return null;
            }
        }
        else if (operator === "=") {
            if (deals.price === price) {
                return deals;
            }
            else {
                return null;
            }
        }
        else if (operator === "<") {
            if (deals.price < price) {
                return deals;
            }
            else {
                return null;
            }
        }
        else {
            throw new ValidationError("There was no operator provided!");
        }
    }

    /**
     * Object equality - compare self with other instance
     * @param {Image} other - MainDeal instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            ( other instanceof LocationDeal ) &&
            // Specific API checks
            ( other.id === this.id);
    }

    toString() {
        return this;
    }

    isPopulated() {

        return this.canonicalUrl != null &&
               this.mainDeal != null  &&
               this.mainDeal.pageTitle != null &&
               this.mainDeal.title != null &&
               this.mainDeal.closingDate != null &&
               this.mainDeal.expiryDate != null &&
               this.mainDeal.display != null &&
               this.mainDeal.products != null &&
               this.deals != null;
    }

    /**
     * Returns the dealId of the mainDeal returned by this.mainDeal
     * @returns {number}
     */
    getMainDealID() {
        return this.mainDeal.id;
    }

    /**
     * Returns a map of dealIds of the sub deals returned by this.deals
     * @returns {Map<number>}
     */
    getDealIds() {
        let dealsIdMap = new Map();
        for (let i = 0; i < this.deals.size; i++) {
            dealsIdMap.set(i,this.deals.get(i).id);
        }
        return dealsIdMap;
    }

    /**
     * Locate deals equal to price
     * @param {string} price
     * @returns {Map<Deal>}
     */
    getDealsEqualToPrice(price) {
        return this.getIdentifierCostByPrice(price, "=");
    }

    /**
     * Locate deals less than price
     * @param {string} price
     * @returns {Map<Deal>}
     */
    getDealsLessThanPrice(price) {
        return this.getIdentifierCostByPrice(price, "<");
    }

    /**
     * Locate deals more than than price
     * @param {string} price
     * @returns {Map<Deal>}
     */
    getDealsMoreThanPrice(price) {
        return this.getIdentifierCostByPrice(price, ">");
    }

    getIdentifierCostByPrice(price, operator) {
        let dealsMap = new Map();
        let j = 0;
        for (let i = 0; i < this.deals.size; i++) {
            let returnedDeals = this.operatorEvaluation(this.deals.get(i), price, operator);
            if (returnedDeals !== null) {
                dealsMap.set(j, returnedDeals);
                j++;
            }
        }
        return dealsMap;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * MainDeal Builder
         * @class
         * @alias LocationDealBuilder
         * @example
         * new MainDeal.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.brand = '';
                this.location = '';
                this.deals = new Map();
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
             * Set location
             * @param {string} location
             * @returns {Builder}
             */
            withLocation(location) {
                this.location = location;
                return this
            }

            /**
             * Set deals
             * @param {Map} deals
             * @returns {Builder}
             */
            withDeals(deals) {
                this.deals = deals;
                return this
            }

            build() {
                return new LocationDeal(this);
            }
        }
        return Builder;
    }
}
module.exports = LocationDeal;