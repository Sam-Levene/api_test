const LocationDeal = require("../location-deal");

class DealMap {

    constructor() {
        this.deal = null;
    }

    static getDealObject() {
        let dealMap = new Map();
        for (let i = 0; i < 100; i++) {
            dealMap.set(i, this.generateDeal(i));
        }
        return dealMap;
    }

    static generateDeal(iterator) {
        return {
            "id": iterator,
            "urlPrefix": "/clear-fixed-braces-699",
            "images": [ {
                "id": 343322,
                "caption": "post",
                "alt": "After clear braces",
                "link": null,
                "extension": "jpg",
                "height": null,
                "width": null,
                "mobileImage": true,
                "status": "live",
                "imageUrl": "https://static02.nxtwowcher.co.uk/images/deal/8044716/343322",
                "mobileImageUrl": "https://static02.nxtwowcher.co.uk/images/deal/8044716/343322-iphone" } ],
            "priceText": "now",
            "totalBought": 1,
            "totalRemaining": 9999,
            "price": (Math.floor(Math.random() * 100) + 1  ) ,
            "depositPrice": null,
            "pricePerPerson": false,
            "headline": "'Clear' Braces @ Capital Dental - Twickenham or Hampton!",
            "display": {
                "discountAmount": false,
                "quantity": false,
                "quantityRemaining": false,
                "endDate": false,
                "discount": true,
                "bought": true,
                "previousDeal": true,
                "deliveryAddress": true,
                "business": true,
                "timer": true,
                "flashDeal": true,
                "priceText": false,
                "lastChance": false },
            "priceIndicative": false,
            "discount": 50,
            "discountPercentage": 50,
            "originalPrice": 100,
            "closingDate": 1534719600000,
            "expiryDate": 1545264000000,
            "flashDealDate": 1532645999000,
            "currency": "gbp",
            "soldText": "Bought",
            "title": "TEST",
            "business": {
                "image":
                    {
                        "id": 4009300,
                        "caption": "cap-post",
                        "alt": "cap-post",
                        "link": null,
                        "extension": "png",
                        "height": null,
                        "width": null,
                        "mobileImage": null,
                        "status": "live",
                        "imageUrl": "https://static02.nxtwowcher.co.uk/images/business/16509533/4009300",
                        "mobileImageUrl": "null" } },
            "urlPath": "/deal/london/8044716/clear-fixed-braces-69"
        };
    }

}
module.exports = DealMap;