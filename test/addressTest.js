const AddressService = require ("../api/services/address/address-service");
const AddressSupport = require ("../api/support/class/address");
const chai = require('chai');
const expect = chai.expect;
const Address = require("../api/services/address/address");
const HttpResponseCodes = require("../api/support/https/http-response-codes");


describe("Get an Address", async function() {
    it("Creates an object builder", function () {
        let firstAddress = new Address.Builder().withPostCode('DE12BH').build();
        let secondAddress = new Address.Builder().withPostCode('DE12BH').build();
        let thirdAddress = new Address.Builder().withPostCode('N11SD').build();

        expect(firstAddress.equals(firstAddress)).to.equal(true);
        expect(firstAddress.equals(secondAddress)).to.equal(true);
        expect(firstAddress.equals(thirdAddress)).to.equal(false);
        expect(firstAddress.equals(new String("I am not a Address Object"))).to.equal(false);

    });

    it("Successfully looks up an address using a random postcode", async function () {
        let addressSupport = new AddressSupport.Builder()
            .build();
        let postCode =  new Address.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPostCode(addressSupport.getRandomPostcode())
            .build();
        return AddressService.getAddress(postCode).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            for( let index = 0; index < response.entries(); index++) {
                expect( response.get(index).isPopulated()).to.equal(true);
            }
        });
    }).timeout(100000);

    it("Successfully looks up an address using all postcodes", async function () {
        let addressSupport = new AddressSupport.Builder()
            .build();

        for (let i = 0; i < addressSupport.getAllPostcodes().length; i++) {
            let postCode = new Address.Builder()
                .withEnvironment(process.env.ENVIRONMENT)
                .withPostCode(addressSupport.getPostcodeByIndex(i))
                .build();

           AddressService.getAddress(postCode).then((response) => {
                expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
                expect(response.get().address).to.not.equal("No matches");
           });
        }
    }).timeout(100000);

    it("Sends request with invalid API token", async function () {
        let addressSupport = new AddressSupport.Builder()
            .build();
        let postCode =  new Address.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPostCode(addressSupport.getRandomPostcode())
            .withApiKey('fe46f6cb1hdsjhdks')
            .build();
        return AddressService.getAddress(postCode).then((response) => {
            expect(HttpResponseCodes.isUnauthorized(response.statusCode)).to.equal(true);
        });
    }).timeout(100000);

    it("Sends request with postcode with empty string", async function () {
        let postCode =  new Address.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPostCode('')
            .build();
        return AddressService.getAddress(postCode).then((response) => {
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
        });
    }).timeout(100000);
});