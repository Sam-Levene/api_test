const DealService = require ("../api/services/deal/deal-service");
const ApiServiceUser = require ("../api/services/user/user-service");
const chai = require('chai');
const expect = chai.expect;
const UserUtilities = require("../api/services/user/utils/user");
const Deal = require("../api/services/deal/deal");
const DealMap = require("../api/services/deal/utils/deal-map");
const LocationDeal = require("../api/services/deal/location-deal");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.env.ENVIRONMENT);


describe("Deal Endpoints", async function() {

    it("Registers successfully", async function () {
        return ApiServiceUser.registerUser(wowcherUser).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Gets live deals by ID", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withID(9583163)
            .build();

        return DealService.getLiveDealsById(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

   it("Gets deals by ID", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withID(9583163)
            .build();

        return DealService.getDealById(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);

        });
   }).timeout(10000);

    // This needs an External Voucher Redeemer account (Settable in WPS)
    //
    // it("Gets redemption info for a deal by ID", function () {
    //     let newDeal = new Deal.Builder()
    //         .withEnvironment(process.env.ENVIRONMENT)
    //         .withBrand("wowcher")
    //         .withID(8112471)
    //         .build();
    //
    //     return DealService.getRedemptionInfoDealById(newDeal).then((result) => {
    //         expect(result.entries()).to.not.equal(0);
    //         expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
    //     });
    // }).timeout(10000);

   it("Gets deals by location", function () {
       let deal = new LocationDeal.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withBrand("wowcher")
           .withLocation("london")
           .build();

       return DealService.getDealsByLocation(deal).then((response) => {
           expect(response.entries()).to.not.equal(0);
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.get().canonicalUrl).not.to.equal(undefined);
       });
   }).timeout(10000);

    it("Gets gift-finder deals by location", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .build();

        return DealService.getGiftFinderDeal(newDeal).then((result) => {
            if (result.map.length === 0) {
                expect(result.entries()).to.not.equal(0);
                expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
                expect(newDeal.isPopulated()).to.equal(true);
            }
            else {
                expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            }

        });
    }).timeout(10000);

    it("Gets gift-finder deals by location and search tag", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withSearchTag("/gifts-for-him")
            .build();

        return DealService.getGiftFinderDeal(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets special deals by location and search tag", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withSearchTag("gifts-for-him")
            .build();

        return DealService.getSpecialDeal(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);

        });
    }).timeout(10000);

    it("Gets deals by location and category", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withCategory("beauty")
            .build();

        return DealService.getDealByLocationAndCategory(newDeal).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets deals by location, category and ID", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withCategory("healthcare")
            .withID(6612236)
            .build();

        return DealService.getDealByLocationCategoryAndId(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets deals by location, category and subcategory", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withCategory("beauty")
            .withSubCategory("spa")
            .build();

        return DealService.getDealBySubcat(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets related deals by location, category and subcategory", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withCategory("beauty")
            .withSubCategory("spa")
            .build();

        return DealService.getRelatedDealBySubcat(newDeal).then((result) => {
            if (result.map.length === 0) {
                expect(result.entries()).to.not.equal(0);
                expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
                expect(newDeal.isPopulated()).to.equal(true);
            }
            else {
                expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
                expect(newDeal.isPopulated()).to.equal(true);
            }
        });
    }).timeout(10000);

    it("Gets deals by location, category, subcategory and ID", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withCategory("healthcare")
            .withSubCategory("other")
            .withID(7950793)
            .build();

        return DealService.getDealBySubcatAndId(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets deals by location and ID", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .withID(7950793)
            .build();

        return DealService.getDealByLocationAndId(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);
    // This needs deal recommendations to be set in WPS
    //
    // it("Gets deal recommendations by user", function () {
    //     let newDeal = new Deal.Builder()
    //         .withEnvironment(process.env.ENVIRONMENT)
    //         .withCustomerToken(wowcherUser.customerToken)
    //         .withLimit(40)
    //         .withPageSize(25)
    //         .withPage(1)
    //         .build();
    //     return DealService.getDealRecommendations(newDeal).then((result) => {
    //         expect(result.entries()).to.not.equal(0);
    //         expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
    //     });
    // }).timeout(10000);

    it("Gets deal by search term", function () {
        let newDeal = new Deal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withLocation("london")
            .withQ("Ring")
            .build();
        return DealService.getSearchedDeal(newDeal).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(newDeal.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets deal by price", function() {
        let myLocationDeal = new LocationDeal.Builder().withEnvironment("Test").withDeals(DealMap.getDealObject()).build();

        let lessThanMap = myLocationDeal.getDealsLessThanPrice(50);
        let numberOfReturnedValues = lessThanMap.size;

        // Less than
        for(let i = 0; i < numberOfReturnedValues; i++) {
            expect(lessThanMap.get(i).price).to.be.below(50);
        }

        let counter = 0;
        for(let i = 0; i < myLocationDeal.deals.size; i++) {
            if (myLocationDeal.deals.get(i).price < 50) {
                counter++;
            }
        }
        expect(counter).to.equal(numberOfReturnedValues);

        // More than
        let moreThanMap = myLocationDeal.getDealsMoreThanPrice(50);
        numberOfReturnedValues = moreThanMap.size;

        for(let i = 0; i < numberOfReturnedValues; i++) {
            expect(moreThanMap.get(i).price).to.be.above(50);
        }

        counter = 0;
        for(let i = 0; i < myLocationDeal.deals.size; i++) {
            if (myLocationDeal.deals.get(i).price > 50) {
                counter++;
            }
        }
        expect(counter).to.equal(numberOfReturnedValues);

        // Equal to
        let equalToTMap = myLocationDeal.getDealsEqualToPrice(50);
        numberOfReturnedValues = equalToTMap.size;

        for(let i = 0; i < numberOfReturnedValues; i++) {
            expect(equalToTMap.get(i).price).to.be.equal(50);
        }

        counter = 0;
        for(let i = 0; i < myLocationDeal.deals.size; i++) {
            if (myLocationDeal.deals.get(i).price === 50) {
                counter++;
            }
        }
        expect(counter).to.equal(numberOfReturnedValues);
    }).timeout(10000);
});
