class CsPaymentType {

    constructor() {
        this.deal = null;
    }

    static generatePaymentBody(amount, productId, token) {
        return {
            "cashAmount": amount,
            "location": "london",
            "purchaseSource": null,
            "containsGift": false,
            "walletUsed": false,
            "walletAmount": 0,
            "promoCode":null,
            "orderLines": [
                {
                    "dealVoucherProductId": productId,
                    "quantity": 1
                },
            ],
            "cvv": "123",
            "deviceFingerprintId": "9aa8e226-5ce8-4180-b604-654589e93bfc",
            "details": {
                "brand": "VISA",
                "maskedPan": "4111111111111111",
                "expiry": "12/2025",
                "token": token
            }
        }
    }
    static generateMultiplePayments(amount, products, token) {
        return {
            "cashAmount": amount,
            "location": "london",
            "purchaseSource": null,
            "containsGift": false,
            "walletUsed": false,
            "walletAmount": 0,
            "promoCode":null,
            "orderLines": products,
            "cvv": "123",
            "deviceFingerprintId": "9aa8e226-5ce8-4180-b604-654589e93bfc",
            "details": {
                "brand": "VISA",
                "maskedPan": "4111111111111111",
                "expiry": "12/2025",
                "token": token
            }
        }
    }
}
module.exports = CsPaymentType;