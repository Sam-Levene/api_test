/**
 * The Products object to be passed into and from Basket Service API
 * @class
 */
class Product {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {string} */
        this.id = builder.id;
        /** @type {string} */
        this.dealId = builder.dealId;
        /** @type {string} */
        this.quantity = builder.quantity;
        /** @type {boolean} */
        this.payDeposit = builder.payDeposit;
        /** @type {boolean} */
        this.gift = builder.gift;
        /** @type {number} */
        this.checkInDate = builder.checkInDate;
        /** @type {number} */
        this.checkOutDate = builder.checkOutDate;
        /** @type {string} */
        this.sessionPurchaseSource = builder.sessionPurchaseSource;
        /** @type {string} */
        this.purchaseGclid = builder.purchaseGclid;
        /** @type {string} */
        this.purchaseUrl = builder.purchaseUrl;
        /** @type {string} */
        this.purchaseLocation = builder.purchaseLocation;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Product} other - Products instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Product ) &&
               // Specific API checks
               ( other.id === this.id &&
               other.dealId === this.dealId &&
               other.quantity === this.quantity &&
               other.payDeposit === this.payDeposit &&
               other.gift === this.gift);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    jsonThis() {
        return {
            "id": this.id,
            "dealId": this.dealId,
            "quantity": this.quantity,
            "payDeposit": this.payDeposit,
            "gift": this.gift,
            "checkInDate": this.checkInDate,
            "checkOutDate": this.checkOutDate,
            "sessionPurchaseSource": this.sessionPurchaseSource,
            "purchaseGclid": this.purchaseGclid,
            "purchaseUrl": this.purchaseUrl,
            "purchaseLocation": this.purchaseLocation
        }
    }

    /**
     * Method to check Products object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.productId != null &&
            this.dealId != null &&
            this.quantity != null;
    }

    /**
     * Method to Add Products to Basket
     * @returns {string}
     */
    addProduct(){
        return JSON.stringify({
            "id": this.id,
            "dealID": this.dealId,
            "quantity": this.quantity,
            "payDeposit": this.payDeposit,
            "gift": this.gift,
            "checkInDate": this.checkInDate,
            "checkOutDate": this.checkOutDate,
            "sessionPurchaseSource": this.sessionPurchaseSource,
            "purchaseGclid": this.purchaseGclid,
            "purchaseUrl": this.purchaseUrl,
            "purchaseLocation": this.purchaseLocation
        })
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * BasketProducts Builder
         * @class
         * @alias Products
         * @example
         * new Products.Builder().with withId(id).withDealId(dealId).withQuantity(quantity).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.id = '';
                this.dealId = '';
                this.quantity = '';
                this.payDeposit = '';
                this.gift = '';
                this.checkInDate = '';
                this.checkOutDate = '';
                this.sessionPurchaseSource = '';
                this.purchaseGclid ='';
                this.purchaseUrl = '';
                this.purchaseLocation = '';
            }
            /**
             * Set id
             * @param {string} id The Product Id
             * @returns {Builder}
             */
            withProductId(id) {
                this.id = id;
                return this
            }
            /**
             * Set dealID
             * @param {string} dealId id The Deal Id
             * @returns {Builder}
             */
            withDealId(dealId) {
                this.dealId = dealId;
                return this
            }
            /**
             * Set quantity
             * @param {string} quantity The Quantity
             * @returns {Builder}
             */
            withQuantity(quantity){
                this.quantity = quantity;
                return this
            }
            /**
             * Set payDeposit
             * @param {boolean} payDeposit The Pay Deposit
             * @returns {Builder}
             */
            withPayDeposit(payDeposit){
                this.payDeposit = payDeposit;
                return this
            }
            /**
             * Set gift
             * @param {boolean} gift The Gift
             * @returns {Builder}
             */
            withGift(gift){
                this.gift = gift;
                return this
            }
            /**
             * Set checkInDate
             * @param {string} checkInDate The Check In Date
             * @returns {Builder}
             */
            withCheckInDate(checkInDate){
                this.checkInDate = checkInDate;
                return this
            }
            /**
             * Set checkOutDate
             * @param {string} checkOutDate The Check Out Date
             * @returns {Builder}
             */
            withCheckOutDate(checkOutDate){
                this.checkOutDate = checkOutDate;
                return this
            }

            /**
             * Create Products instance
             * @returns {Product}
             */
            build() {
                return new Product(this);
            }
        }
        return Builder;
    }
}
module.exports = Product;