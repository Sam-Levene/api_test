const ApiEmailService = require ("../api/services/email/email-service");
const chai = require('chai');
const expect = chai.expect;
const Email = require("../api/services/email/email");
const UserUtilities = require("../api/services/user/utils/user");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.env.ENVIRONMENT);

describe("Get an Email", function() {
    it("Creates an object builder", function () {
        let firstEmailUser = new Email.Builder()
            .withEmail('test@domain.co.uk')
            .withLocation('London')
            .build();

        let secondEmailUser = new Email.Builder()
            .withEmail('test@domain.co.uk')
            .withLocation('London')
            .build();

        let thirdEmailuser = new Email.Builder()
            .withEmail('newtestuser@anotherdomain.co.uk')
            .withLocation('Nottingham')
            .build();
        expect(firstEmailUser.equals(firstEmailUser)).to.equal(true);
        expect(firstEmailUser.equals(secondEmailUser)).to.equal(true);
        expect(firstEmailUser.equals(thirdEmailuser)).to.equal(false);
    });

    it("Registers a new Subscriber Successfully", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail(wowcherUser.email)
            .withLocation('london')
            .build();

        return ApiEmailService.registerEmail(subscribedEmail).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(subscribedEmail.isPopulated()).to.equal(true);
            expect(response.get().message).to.equal('Subscribed successfully');
            expect(response.get().newEmail).to.equal(true);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("New email is false when subscribing exisiting user", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail(wowcherUser.email)
            .withLocation('london')
            .build();

        return ApiEmailService.registerEmail(subscribedEmail).then((response) => {
           expect(response.entries()).to.not.equal(0);
           expect(subscribedEmail.isPopulated()).to.equal(true);
           expect(response.get().message).to.equal('Subscribed successfully');
           expect(response.get().newEmail).to.equal(false);
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 400 error code if no email is sent", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail('')
            .withLocation('london')
            .build();

        return ApiEmailService.registerEmail(subscribedEmail).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(subscribedEmail.isPopulated()).to.equal(true);
            expect(response.get().message).to.equal('Validation Error');
            expect(response.get().newEmail).to.equal(false);
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 400 error code if invalid email is sent", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail('test@yopmail')
            .withLocation('london')
            .build();

        return ApiEmailService.registerEmail(subscribedEmail).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(subscribedEmail.isPopulated()).to.equal(true);
            expect(response.get().message).to.equal('Validation Error');
            expect(response.get().newEmail).to.equal(false);
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 500 error code if no location is sent", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail(wowcherUser.email)
            .withLocation("")
            .build();

        return ApiEmailService.registerEmail(subscribedEmail).then((response)=> {
            expect(response.entries()).to.not.equal(0);
            expect(subscribedEmail.isPopulated()).to.equal(false);
            expect(HttpResponseCodes.isInternalServerError(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 400 error code if invalid location is sent", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail('test@domain.co.uk')
            .withLocation('pool')
            .build();

        return ApiEmailService.registerEmail(subscribedEmail).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(subscribedEmail.isPopulated()).to.equal(true);
            expect(response.get().message).to.equal('Validation Error');
            expect(response.get().newEmail).to.equal(false);
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    /*it("Can unsubscribe an email address", function(){
        let unsubscribedEmail = new Email.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withEmail(wowcherUser.email)
            .withSubscriptionSource('wow-api')
            .withToken('8d73f3af-7531-4516-9218-de752ae1a8d7')
            .build();

        console.log(unsubscribedEmail);

        return ApiEmailService.deleteEmail(unsubscribedEmail).then((response) => {
            console.log(response);
        });
    }).timeout(10000);*/

});