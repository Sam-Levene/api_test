const NavigationService = require ("../api/services/navigation/navigation-service");
const chai = require('chai');
const expect = chai.expect;
const Navigation = require("../api/services/navigation/navigation");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Get a Navigation", async function() {
    it("Creates an object builder", function () {
        let firstNavigation = new Navigation.Builder().withLocation("derby").build();
        let secondNavigation = new Navigation.Builder().withLocation("derby").build();
        let thirdNavigation = new Navigation.Builder().withLocation("location").build();

        expect(firstNavigation.equals(firstNavigation)).to.equal(true);
        expect(firstNavigation.equals(secondNavigation)).to.equal(true);
        expect(firstNavigation.equals(thirdNavigation)).to.equal(false);
        expect(firstNavigation.equals("I am not a Location Object")).to.equal(false);
    });

    it("Will return all navigation items in a location", async function () {
       let navigation = new Navigation.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withLocation("london")
           .build();

       return NavigationService.getNavigationByLocation(navigation).then((response) =>{
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(navigation.isPopulated()).to.equal(true);
       });
    }).timeout(10000);
});