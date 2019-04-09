const PromoCodeService = require ("../api/services/promocode/promocode-service");
const chai = require('chai');
const expect = chai.expect;
const User = require('../api/services/user/user');
const ApiServiceUser = require("../api/services/user/user-service");
const ApiServiceLogin = require("../api/services/login/login-service");
const PromoCode = require("../api/services/promocode/promoCode");
const UserUtilities = require("../api/services/user/utils/user");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);

describe("Get a PromoCode", function() {
    it("Creates an object builder", function () {
        let firstPromoCode = new PromoCode.Builder()
            .withCode('JAXTEST3')
            .withDealId('124')
            .withApiAuthToken('dGVzdC51c2VyMUB3b3djaGVyLmNvLnVrOjE1NjIxNDgxMzkxODg6Mzk1NzcxMTllODBlYzlhZDdiOTU0MjQzNjc2YzMwZTI')
            .withWowcherUser('1234')
            .withBrand('wowcher')
            .withPurchaseSource('paypal')
            .withAppPlatform('webapp')
            .build();

        let secondPromoCode = new PromoCode.Builder()
            .withCode('JAXTEST3')
            .withDealId('124')
            .withApiAuthToken('dGVzdC51c2VyMUB3b3djaGVyLmNvLnVrOjE1NjIxNDgxMzkxODg6Mzk1NzcxMTllODBlYzlhZDdiOTU0MjQzNjc2YzMwZTI')
            .withWowcherUser('1234')
            .withBrand('wowcher')
            .withPurchaseSource('paypal')
            .withAppPlatform('webapp')
            .build();

        let thirdPromoCode = new PromoCode.Builder()
            .withCode('PROMOCODE1')
            .withDealId('123456')
            .withApiAuthToken('aaaa')
            .withWowcherUser('bbbb')
            .withBrand('living-social')
            .withPurchaseSource('cybersource')
            .withAppPlatform('webapp')
            .build();

        expect(firstPromoCode.equals(firstPromoCode)).to.equal(true);
        expect(firstPromoCode.equals(secondPromoCode)).to.equal(true);
        expect(firstPromoCode.equals(thirdPromoCode)).to.equal(false);
    });

    it("Successfully returns 200 when valid promocode and deal id provided ", async function () {
        //Login with user first before request to promocode end point is made
        UserUtilities.generateUser(process.env.ENVIRONMENT);
        wowcherUser = new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withTitle("Mr")
            .withFirstName("Test")
            .withSurname("User")
            .withEMail(UserUtilities.getUsername())
            .withEMailConfirmation(UserUtilities.getUsername())
            .withAddressLine1("12-27 Swan Yard")
            .withAddressLine2("")
            .withCity("London")
            .withPostCode("N11SD")
            .withPassword(UserUtilities.getPassword())
            .withPasswordConfirmation(UserUtilities.getPassword())
            .build();

        await ApiServiceUser.registerUser(wowcherUser).then((result) => {
            expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);
        });
        await ApiServiceLogin.login(wowcherUser).then((result2) => {
            expect(HttpResponseCodes.isOK(result2.statusCode)).to.equal(true);
        });

        let promocode =  new PromoCode.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withCode('JAXTEST3')
            .withDealId('1')
            .withBrand('wowcher')
            .withAppPlatform('webapp')
            .withWowcherUser(wowcherUser.apiAuthToken)
            .withApiAuthToken(wowcherUser.apiAuthToken)
            .withPurchaseSource('paypal')
            .build();

        return PromoCodeService.getPromoCode(promocode).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(promocode.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Successfully returns 200 when invalid promocode is provided with error message ", async function () {
        let promocode =  new PromoCode.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withCode('CODE1')
            .withDealId('1')
            .withBrand('wowcher')
            .withAppPlatform('webapp')
            .withWowcherUser(wowcherUser.apiAuthToken)
            .withApiAuthToken(wowcherUser.apiAuthToken)
            .withPurchaseSource('paypal')
            .build();

        return PromoCodeService.getPromoCode(promocode).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(promocode.isPopulated()).to.equal(true);
            expect(response.get().inValidCode).to.equal(true)
            expect(response.get().message).to.equal('Sorry, code ' + promocode.code.toString() + ' is invalid code.');
        });
    }).timeout(10000);

    it("Will return 401 Unathorised error if user is not valid", async function (){
        let promocode = new PromoCode.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withCode('JAXTEST3')
            .withDealId('1')
            .withWowcherUser('1234')
            .withApiAuthToken('1234')
            .build();

        return PromoCodeService.getPromoCode(promocode).then((response) =>{
            expect(HttpResponseCodes.isUnauthorized(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(promocode.isPopulated()).to.equal(false);
        })
    }).timeout(10000);

    it("Will return 400 error code when request is not valid", async function () {
        let promocode = new PromoCode.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withCode('JAXTEST3')
            .withDealId('1')
            .build();
        return PromoCodeService.getPromoCodeInvlaidRequest(promocode).then((response) =>{
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(promocode.isPopulated()).to.equal(false);
        });
    }).timeout(10000);

    it("Will return true when code has expired along with expiry error message", async function(){
        let promocode =  new PromoCode.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withCode('BASKET610')
            .withDealId('1')
            .withBrand('wowcher')
            .withAppPlatform('webapp')
            .withWowcherUser(wowcherUser.apiAuthToken)
            .withApiAuthToken(wowcherUser.apiAuthToken)
            .withPurchaseSource('paypal')
            .build();

        return PromoCodeService.getPromoCode(promocode).then((response) =>{
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(promocode.isPopulated()).to.equal(true);
            expect(response.get().expired).to.equal(true);
            expect(response.get().message).to.equal('Code ' + promocode.code.toString() + ' has expired.');
        });
    }).timeout(10000);
});