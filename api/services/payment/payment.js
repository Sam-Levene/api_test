// Payment for API Classes
/**
 * The Payment object to be passed into and from Payment Service API
 * @class
 */
class Payment {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {number} */
        this.cashAmount = builder.cashAmount;
        /** @type {string} */
        this.location = builder.location;
        /** @type {string} */
        this.purchaseSource = builder.purchaseSource;
        /** @type {boolean} */
        this.containsGift = builder.containsGift;
        /** @type {boolean} */
        this.walletUsed = builder.walletUsed;
        /** @type {number} */
        this.walletAmount = builder.walletAmount;
        /** @type {string} */
        this.promoCode = builder.promoCode;
        /** @type {array} */
        this.orderLines = builder.orderLines;
        /** @type {string} */
        this.cvv = builder.cvv;
        /** @type {string} */
        this.deviceFingerprintId = builder.deviceFingerprintId;
        /** @type {json} */
        this.details = builder.details;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Payment} other - Payment instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Payment ) &&
               // Specific API checks
               ( other.field === this.field);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Payment Builder
         * @class
         * @alias PaymentBuilder
         * @example
         * new Payment.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.field = 'defaultValue';
                this.environment = '';
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
             * Set field
             * @param {string} field The Field
             * @returns {Builder}
             */
            withField(field) {
                this.field = field;
                return this
            }
            /**
             * Create Template instance
             * @returns {Payment}
             */
            build() {
                return new Payment(this);
            }
        }
        return Builder;
    }
}
module.exports = Payment;