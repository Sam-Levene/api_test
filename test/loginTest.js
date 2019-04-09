const LoginService = require ("../api/services/login/login-service");
const ApiServiceUser = require ("../api/services/user/user-service");
const chai = require('chai');
const expect = chai.expect;
const Login = require('../api/services/login/login');
const User = require('../api/services/user/user');
const UserUtils = require('../api/services/user/utils/user');
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Get a Login", function() {
    it("Creates a Login builder", function() {
        let firstLogin = new Login.Builder()
            .withPassword("bar")
            .withUsername("foo")
            .build();
        let secondLogin = new Login.Builder()
            .withPassword("bar")
            .withUsername("foo")
            .build();
        let thirdLogin = new Login.Builder()
            .withPassword("foo")
            .withUsername("bar")
            .build();

        expect(firstLogin.equals(firstLogin)).to.equal(true);
        expect(firstLogin.equals(secondLogin)).to.equal(true);
        expect(firstLogin.equals(thirdLogin)).to.equal(false);
        expect(firstLogin.equals("I am not a Login Object")).to.equal(false);
    }).timeout(10000);

    it("Logs in with a valid username and password", async function() {
        UserUtils.generateUser(process.env.ENVIRONMENT);
        let user = new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withTitle("Mr")
            .withFirstName("Test")
            .withSurname("User")
            .withEMail(UserUtils.getUsername())
            .withEMailConfirmation(UserUtils.getUsername())
            .withAddressLine1("12-27 Swan Yard")
            .withAddressLine2("")
            .withCity("London")
            .withPostCode("N11SD")
            .withPassword(UserUtils.getPassword())
            .withPasswordConfirmation(UserUtils.getPassword())
            .build();

        await ApiServiceUser.registerUser(user).then((result) => {
            expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);
        });

        return LoginService.login(user).then((result2) => {
            expect(HttpResponseCodes.isOK(result2.statusCode)).to.equal(true);
        })
    }).timeout(10000);

    // it("Logs in with a valid Facebook username and password", async function() {
    //     let user = new User.Builder()
    //         .withEnvironment(process.env.ENVIRONMENT)
    //         .build();
    //
    //     await ApiServiceUser.registerUser(user).then((result) => {
    //         expect(HttpResponseCodes.isBadRequest(result.statusCode)).to.equal(true);
    //     });
    //
    //     return LoginService.loginWithFacebook(user).then((result) => {
    //         expect(HttpResponseCodes.isInternalServerError(result.statusCode)).to.equal(true);
    //     });
    // }).timeout(10000);
});