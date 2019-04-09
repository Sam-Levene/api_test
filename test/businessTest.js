const BusinessService = require ("../api/services/business/business-service");
const chai = require('chai');
const expect = chai.expect;
const Business = require("../api/services/business/business");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Get a Business", async function() {
    it("Creates an object builder", function () {
        let firstBusiness = new Business.Builder().withID('13366624').withBrand('living-social').withLocation('london').build();
        let secondBusiness = new Business.Builder().withID('00000000').withBrand('wowcher').withLocation('derby').build();
        let thirdBusiness = new Business.Builder().withID('13366624').withBrand('living-social').withLocation('london').build();

        expect(firstBusiness.equals(firstBusiness)).to.be.true;
        expect(firstBusiness.equals(secondBusiness)).to.be.false;
        expect(firstBusiness.equals(thirdBusiness)).to.be.true;
    });

    it("Successfully gets business by id", async function () {
        let business =  new Business.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withID('13366624')
            .withBrand('living-social')
            .withCountryCode('gb')
            .build();

        return BusinessService.getBusinessByID(business).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(business.isPopulated()).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);
            expect(response.get().business).not.to.equal(undefined);
            expect(response.get().deals).not.to.equal(undefined);
            expect(response.get().similarDeals).not.to.equal(undefined);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Successfully gets business by location and ID", async function () {
        let business =  new Business.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withID('13366624')
            .withLocation('london')
            .withBrand('living-social')
            .withCountryCode('gb')
            .build();

        return BusinessService.getBusinessByLocation(business).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(business.isPopulated()).to.equal(true);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);
            expect(response.get().business).not.to.equal(undefined);
            expect(response.get().deals).not.to.equal(undefined);
            expect(response.get().similarDeals).not.to.equal(undefined);

        });
    }).timeout(10000);
});