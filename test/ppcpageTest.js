const ApiPPCPageService = require ("../api/services/ppcpage/ppcpage-service");
const chai = require('chai');
const expect = chai.expect;
const PPCPage = require("../api/services/ppcpage/ppcpage");
const PPC = require("../api/services/ppcpage/ppc");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Get a PPC Page", function() {
    it("Creates an object builder", function () {
        let firstPPCPage = new PPCPage.Builder()
            .withPath('london')
            .withLocation('london')
            .build();

        let secondPPCPage = new PPCPage.Builder()
            .withPath('london')
            .withLocation('london')
            .build();

        let thirdPPCPage = new PPCPage.Builder()
            .withPath('aberdeen')
            .withLocation('aberdeen')
            .build();

        expect(firstPPCPage.equals(firstPPCPage)).to.equal(true);
        expect(firstPPCPage.equals(secondPPCPage)).to.equal(true);
        expect(firstPPCPage.equals(thirdPPCPage)).to.equal(false);
    });

    it("Gets PPC Pages by path", function(){
        let ppcPage = new PPCPage.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPath('london')
            .withLocation('london')
            .build();

        return ApiPPCPageService.getPPCPage(ppcPage).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            //expect(ppcPage.isPopulated()).to.equal(true);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a selected location", async function () {
        let ppcPage = new PPCPage.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPath('london')
            .withLocation('aberdeen')
            .build();

        return ApiPPCPageService.getPPCPage(ppcPage).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
            expect(response.get().selectedLocation).to.equal(ppcPage.selectedLocation.toString());
        });
    }).timeout(10000);

    it("Will return 404 error if no path is specified", async function(){
       let ppcPage = new PPCPage.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .build();

       return ApiPPCPageService.getPPCPage(ppcPage).then((response) => {
           expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(false);
       });
    }).timeout(10000);
});