// Display for API Classes
/**
 * The Display object to be passed into and from Display Service API
 * @class
 */
class Display{

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {boolean} */
            this.discountAmount = builder.discountAmount;
        /** @type {boolean} */
            this.quantity = builder.quantity;
        /** @type {boolean} */
            this.quantityRemaining = builder.quantityRemaining;
        /** @type {boolean} */
            this.endDate = builder.endDate;
        /** @type {boolean} */
            this.discount = builder.discount;
        /** @type {boolean} */
            this.bought = builder.bought;
        /** @type {boolean} */
            this.previousDeal = builder.previousDeal;
        /** @type {boolean} */
            this.deliveryAddress = builder.deliveryAddress;
        /** @type {boolean} */
            this.business = builder.business;
        /** @type {boolean} */
            this.timer = builder.timer;
        /** @type {boolean} */
            this.flashDeal = builder.flashDeal;
        /** @type {boolean} */
            this.priceText = builder.priceText;
        /** @type {boolean} */
            this.lastChance = builder.lastChance;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Display} other - Display instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            ( other instanceof Display ) &&
            // Specific API checks
            ( other.id === this.id);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toString() {
        for (let key in this) {
            if (this[key] !== '' && this[key] !== undefined) {
                console.log(key + ": " + this[key]);
            }
        }
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Display Builder
         * @class
         * @alias DisplayBuilder
         * @example
         * new Display.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.discountAmount = false;
                this.quantity = false;
                this.quantityRemaining = false;
                this.endDate = false;
                this.discount = false;
                this.bought = false;
                this.previousDeal = false;
                this.deliveryAddress = false;
                this.business = false;
                this.timer = false;
                this.flashDeal = false;
                this.priceText = false;
                this.lastChance = false;
            }

            /**
             * Set discount amount
             * @param {boolean} bool discount amount
             * @returns {Builder}
             */
            withDiscountAmount(bool) {
                this.discountAmount = bool;
                return this
            }

            /**
             * Set quantity
             * @param {boolean} bool quantity
             * @returns {Builder}
             */
            withQuantity(bool) {
                this.quantity = bool;
                return this
            }

            /**
             * Set quantity remaining
             * @param {boolean} bool quantity remaining
             * @returns {Builder}
             */
            withQuantityRemaining(bool) {
                this.quantityRemaining = bool;
                return this
            }

            /**
             * Set end date
             * @param {boolean} bool end date
             * @returns {Builder}
             */
            withEndDate(bool) {
                this.endDate = bool;
                return this
            }

            /**
             * Set discount
             * @param {boolean} bool discount
             * @returns {Builder}
             */
            withDiscount(bool) {
                this.discount = bool;
                return this
            }

            /**
             * Set bought
             * @param {boolean} bool bought
             * @returns {Builder}
             */
            withBought(bool) {
                this.bought = bool;
                return this
            }

            /**
             * Set previous deal
             * @param {boolean} bool previousDeal
             * @returns {Builder}
             */
            withPreviousDeal(bool) {
                this.previousDeal = bool;
                return this
            }

            /**
             * Set delivery address
             * @param {boolean} bool delivery address
             * @returns {Builder}
             */
            withDeliveryAddress(bool) {
                this.deliveryAddress = bool;
                return this
            }

            /**
             * Set business
             * @param {boolean} bool business
             * @returns {Builder}
             */
            withBusiness(bool) {
                this.business = bool;
                return this
            }

            /**
             * Set timer
             * @param {boolean} bool timer
             * @returns {Builder}
             */
            withTimer(bool) {
                this.timer = bool;
                return this
            }

            /**
             * Set flash deal
             * @param {boolean} bool flash deal
             * @returns {Builder}
             */
            withFlashDeal(bool) {
                this.flashDeal = bool;
                return this
            }

            /**
             * Set price text
             * @param {boolean} bool price text
             * @returns {Builder}
             */
            withPriceText(bool) {
                this.priceText = bool;
                return this
            }

            /**
             * Set last chance
             * @param {boolean} bool last chance
             * @returns {Builder}
             */
            withLastChance(bool) {
                this.lastChance = bool;
                return this
            }

            /**
             * Create Display instance
             * @returns {Display}
             */
            build() {
                return new Display(this);
            }
        }
        return Builder;
    }
}
module.exports = Display;