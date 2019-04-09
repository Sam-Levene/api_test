// Needs completing
const Meta = require('../../support/class/meta.js');
/**
 * The Voucher object to be passed into and from User Service API
 * @class
 */
class Voucher extends Meta {
    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.status = builder.status;
        /** @type {string} */
        this.orderLineStatus = builder.orderLineStatus;
        /** @type {number} */
        this.dealId = builder.dealId;
        /** @type {string} */
        this.title = builder.title;
        /** @type {number} */
        this.price = builder.price;
        /** @type {number} */
        this.originalPrice = builder.originalPrice;
        /** @type {number} */
        this.discountPercentage = builder.discountPercentage;
        /** @type {boolean} */
        this.open = builder.open;
        /** @type {boolean} */
        this.buyNow = builder.buyNow;
        /** @type {boolean} */
        this.expired = builder.expired;
        /** @type {string} */
        this.voucherCode = builder.voucherCode;
        /** @type {string} */
        this.image = builder.image;
        /** @type {number} */
        this.purchasedDate = builder.purchasedDate;
        /** @type {number} */
        this.redeemStartDate = builder.redeemStartDate;
        /** @type {boolean} */
        this.printable = builder.printable;
        /** @type {boolean} */
        this.expiringSoon = builder.expiringSoon;
        /** @type {boolean} */
        this.showDiscount = builder.showDiscount;
        /** @type {string} */
        this.currency = builder.currency;
        /** @type {boolean} */
        this.deposit = builder.deposit;
        /** @type {number} */
        this.checkInDate = builder.checkInDate;
        /** @type {number} */
        this.checkOutDate = builder.checkOutDate;
        /** @type {boolean} */
        this.dayEvent = builder.dayEvent;
        /** @type {boolean} */
        this.giftCard = builder.giftCard;
        /** @type {boolean} */
        this.giftable = builder.giftable;
        /** @type {boolean} */
        this.gifted = builder.gifted;
        /** @type {boolean} */
        this.showGiftForm = builder.showGiftForm;
        /** @type {number} */
        this.gift = builder.gift;
        /** @type {string} */
        this.businessName = builder.businessName;
        /** @type {number} */
        this.estimatedDeliveryDate = builder.estimatedDeliveryDate;
        /** @type {boolean} */
        this.deliveryNotificationAvailable = builder.deliveryNotificationAvailable;
        /** @type {boolean} */
        this.deliveryNotificationTooltipVisible = builder.deliveryNotificationTooltipVisible;
        /** @type {boolean} */
        this.speedyDelivery = builder.speedyDelivery;
        /** @type {number} */
        this.orderLineId = builder.orderLineId;
        /** @type {string} */
        this.customerServiceInfo = builder.customerServiceInfo;
        /** @type {boolean} */
        this.warehouseDeal = builder.warehouseDeal;
        /** @type {number} */
        this.voucherSentDate = builder.voucherSentDate;
        /** @type {boolean} */
        this.alternativeReturnsProcess = builder.alternativeReturnsProcess;
        /** @type {number} */
        this.page = 0;
        /** @type {number} */
        this.pageSize = 0;
   }
    /**
     * Object equality - compare self with other instance
     * @param {Voucher} obj - Voucher instance
     * @returns {boolean}
     */
    equals( obj ) {
        return this == obj ||
               ( obj instanceof Voucher ) &&
               this.status === obj.status  &&
               this.orderLineStatus === obj.orderLineStatus &&
               this.dealId === obj.dealId;
    }

    isPopulated() {
        return this.status != null &&
               this.orderLineStatus != null  &&
               this.dealId != null ;
    }
    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Voucher Builder
         * @class
         * @alias VoucherBuilder
         * @example
         * new Voucher.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.status = "inactive";
                this.orderLineStatus = "inactive";
                this.dealId = 0;
                this.page = 0;
                this.pageSize = 0;
            }
            /**
             * Set environment
             * @param {string} env API endpoint
             * @returns {Builder}
             */
            withEnvironment(env) {
                this.environment = env;
                return this;
            }
            /**
             * Set status
             * @param {string} status status of the voucher
             * @returns {Builder}
             */
            withStatus(status) {
                this.status = status;
                return this;
            }
            /**
             * Set order line status
             * @param {string} orderLineStatus orderLineStatus of the voucher
             * @returns {Builder}
             */
            withOrderLineStatus(orderLineStatus) {
                this.orderLineStatus = orderLineStatus;
                return this;
            }
            /**
             * Set deal ID
             * @param {string} dealId dealId of the voucher
             * @returns {Builder}
             */
            withDealId(dealId) {
                this.dealId = dealId;
                return this;
            }

            withVoucherCode(voucherCode) {
                this.voucherCode = voucherCode;
                return this;
            }

            withPage(page) {
                this.page = page;
                return this;
            }

            withPageSize(pageSize) {
                this.pageSize = pageSize;
                return this;
            }

            /**
             * Create Voucher instance
             * @returns {Voucher}
             */
            build() {
                return new Voucher(this);
            }
        }
        return Builder;
    }
}
module.exports = Voucher;