const ApiServiceUser = require ("../api/services/user/user-service");
const chai = require('chai');
const expect = chai.expect;
const User = require("../api/services/user/user");
const UserUtilities = require("../api/services/user/utils/user");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.env.ENVIRONMENT);

describe("Get a User", function() {
      it("Creates an object builder", function () {
        let firstUser = new User.Builder()
            .withTitle("Mr")
            .withFirstName("Test")
            .withSurname("User")
            .withEMail("foo@bar.com")
            .withAddressLine1("12 - 27 Swan Yard")
            .withCity("London")
            .withPostCode("N1 1SD")
            .build();

        let secondUser = new User.Builder()
            .withTitle("Mr")
            .withFirstName("Test")
            .withSurname("User")
            .withEMail("foo@bar.com")
            .withAddressLine1("12 - 27 Swan Yard")
            .withCity("London")
            .withPostCode("N1 1SD")
            .build();

        let thirdUser = new User.Builder()
            .withTitle("Ms")
            .withFirstName("Tester")
            .withSurname("Useress")
            .withEMail("bar@foo.com")
            .withAddressLine1("12 - 27 Swan Yard")
            .withCity("London")
            .withPostCode("N1 1SD")
            .build();

        expect(firstUser.equals(firstUser)).to.equal(true);
        expect(firstUser.equals(secondUser)).to.equal(true);
        expect(firstUser.equals(thirdUser)).to.equal(false);
        expect(firstUser.equals("I am not a User Object")).to.equal(false);
    });

   /* it("Is able to update a user's details", function () {
        let firstUser = new User.Builder()
            .withTitle("Mr")
            .withFirstName("Test")
            .withSurname("User")
            .withAddressLine1("12 - 27 Swan Yard")
            .withCity("London")
            .withPostCode("N1 1SD")
            .build();

        let myJson = {
            "email": "foo@bar.com"
        };

        expect(firstUser.update(myJson)).to.have.property("email");
        expect(firstUser.email).to.equal("foo@bar.com");
    });*/

    it("Registers successfully", async function () {
        return ApiServiceUser.registerUser(wowcherUser).then((response) => {
            expect(response.entries).to.not.equal(0);
            expect(HttpResponseCodes.isCreated(response.statusCode)).to.equal(true);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

   /* it("Retrieves account details", function() {
        return ApiServiceUser.getDetails(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Changes account details", async function () {
        return ApiServiceUser.updateData(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Requests account status", async function () {
       return ApiServiceUser.getAccountStatus(wowcherUser).then((result) => {
           expect(result.entries).to.not.equal(0);
           expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
           expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Changes address details", async function () {
        return ApiServiceUser.changeAddressDetails(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Retrieves push notifications", async function () {
        return ApiServiceUser.getPushNotifications(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Retrieves wallet information", async function () {
        return ApiServiceUser.getWalletInformation(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Changes the login password", async function () {
        return ApiServiceUser.changePassword(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Requests a forgotten password link or email", async function () {
        return ApiServiceUser.requestPasswordChange(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
            expect(wowcherUser.isPopulated()).to.equal(true);
        });
    }).timeout(10000);*/
});