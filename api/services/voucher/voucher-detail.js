// Needs completing
const Meta = require('../../support/class/meta.js');
/**
 * The Voucher Detail object to be returned endpoint Get Voucher Details
 * @class
 */
class VoucherDetail {
    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {

        /** @type {number} */
        this.dealId = builder.dealId;
        /** @type {string} */
        this.voucherCode = builder.voucherCode;
        /** @type {number} */
        this.productId = builder.productId;
        /** @type {string} */
        this.productTitle = builder.productTitle;
        /** @type {number} */
        this.orderNumber = builder.orderNumber;
        /** @type {string} */
        this.paymentMethod = builder.paymentMethod;
   }

    /**
     * Object equality - compare self with other instance
     * @param {VoucherDetail} obj - VoucherDetail instance
     * @returns {boolean}
     */
    equals( obj ) {

        return this == obj ||
               ( obj instanceof VoucherDetail ) &&
               this.dealId === obj.dealId  &&
               this.voucherCode === obj.voucherCode &&
               this.productId === obj.productId &&
               this.productTitle === obj.productTitle &&
               this.orderNumber === obj.orderNumber &&
               this.paymentMethod === obj.paymentMethod;
    }

    /**
     * Checks mandatory fields are populated
     * @returns {boolean}
     */
    isPopulated() {
        return this.dealId != null &&
               this.voucherCode != null &&
               this.productId != null &&
               this.productTitle != null &&
               this.orderNumber != null &&
               this.paymentMethod != null;
    }
}
module.exports = VoucherDetail;