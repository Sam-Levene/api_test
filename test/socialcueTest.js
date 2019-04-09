const SocialcueService = require ("../api/services/socialcue/socialcue-service");
const LocationDeal = require("../api/services/deal/location-deal");
const DealService = require ("../api/services/deal/deal-service");
const chai = require('chai');
const expect = chai.expect;
const Socialcue = require("../api/services/socialcue/socialcue");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Get a SocialCue", async function() {

    it("Creates an object builder", function () {
        let firstSocialcue = new Socialcue.Builder().withId('123').build();
        let secondSocialcue = new Socialcue.Builder().withId('123').build();
        let thirdSocialcue = new Socialcue.Builder().withId('456').build();

        expect(firstSocialcue.equals(firstSocialcue)).to.equal(true);
        expect(secondSocialcue.equals(secondSocialcue)).to.equal(true);
        expect(firstSocialcue.equals(thirdSocialcue)).to.equal(false);
        expect(firstSocialcue.equals("I am not a Shortcut Object")).to.equal(false);
    }).timeout(10000);

    it("Returns category and subcategory purchase aggregates based on a given deal id", async function () {
        let deal = new LocationDeal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .build();

        return DealService.getDealsByLocation(deal).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);

            let socialcue = new Socialcue.Builder()
                .withId(deal.getMainDealID())
                .withEnvironment(process.env.ENVIRONMENT)
                .withBrand("wowcher")
                .build();

            return SocialcueService.getCategoryAggregates(socialcue).then((res) => {
                expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
                expect(response.entries()).to.not.equal(0);
                expect(socialcue.isPopulated()).to.equal(true);
            });
        });
    }).timeout(10000);

    it("Returns purchase aggregates for a given deal id", async function () {
        let deal = new LocationDeal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .build();

        return DealService.getDealsByLocation(deal).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);

            let socialcue = new Socialcue.Builder()
                .withId(deal.getMainDealID())
                .withEnvironment(process.env.ENVIRONMENT)
                .withBrand("wowcher")
                .build();

            return SocialcueService.getPurchaseAggregates(socialcue).then((res) => {
                expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
                expect(response.entries()).to.not.equal(0);
                expect(socialcue.isPopulated()).to.equal(true);
            });
        });
    }).timeout(10000);

    it("Returns aggregated checkout views for a deal", async function () {
        let deal = new LocationDeal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .build();

        return DealService.getDealsByLocation(deal).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);

            let socialcue = new Socialcue.Builder()
                .withId(deal.getMainDealID())
                .withEnvironment(process.env.ENVIRONMENT)
                .withBrand("wowcher")
                .build();

            return SocialcueService.getCheckoutAggregates(socialcue).then((res) => {
                expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
                expect(response.entries()).to.not.equal(0);
                expect(socialcue.isPopulated()).to.equal(true);
            });
        });
    }).timeout(10000);

    it("Returns aggregated deal views for a deal", async function () {
        let deal = new LocationDeal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .build();

        return DealService.getDealsByLocation(deal).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);

            let socialcue = new Socialcue.Builder()
                .withId(deal.getMainDealID())
                .withEnvironment(process.env.ENVIRONMENT)
                .withBrand("wowcher")
                .build();

            return SocialcueService.getDealAggregates(socialcue).then((res) => {
                expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
                expect(response.entries()).to.not.equal(0);
                expect(socialcue.isPopulated()).to.equal(true);
            });
        });
    }).timeout(10000);
});