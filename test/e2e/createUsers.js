const ApiServiceUser = require ("../../api/services/user/user-service");
const User = require("../../api/services/user/user");
const RegistrationUtilities = require("../../api/services/user/utils/registration");
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

let randomizedEmail = RegistrationUtilities.generateEmail();

let wowcherUser = new User.Builder()
    .withEnvironment(process.env.PUBLIC_ENDPOINT)
    .withBrand("wowcher")
    .withTitle("Mr")
    .withFirstName("Test")
    .withSurname("User")
    .withEMail(randomizedEmail)
    .withEMailConfirmation(randomizedEmail)
    .withPassword("123456")
    .withPasswordConfirmation("123456")
    .withAddressLine1("12 - 27 Swan Yard")
    .withCity("London")
    .withPostCode("N11SD")
    .build();


describe("Get a wowcher user", function() {
    it("Registers successfully", async function () {
        let successfulRegistrations = [];
        let maxInteger = Number(process.env.USERS);

        for (let iterator = 0; iterator < 1; iterator++) {

            let randomizedEmail = RegistrationUtilities.generateEmail();

            let wowcherUser = new User.Builder()
                .withEnvironment(process.env.PUBLIC_ENDPOINT)
                .withBrand("wowcher")
                .withTitle("Mr")
                .withFirstName("Test")
                .withSurname("User")
                .withEMail(randomizedEmail)
                .withEMailConfirmation(randomizedEmail)
                .withPassword("123456")
                .withPasswordConfirmation("123456")
                .withAddressLine1("12 - 27 Swan Yard")
                .withCity("London")
                .withPostCode("N11SD")
                .build();

            await ApiServiceUser.registerUser(wowcherUser).then((response) => {
                if (response.statusCode !== 201) {
                    //iterator = iterator - 1;
                }
                else {
                    successfulRegistrations.push([wowcherUser.email, wowcherUser.password]);

                    let randomEmail = RegistrationUtilities.generateEmail();
                    wowcherUser.email = randomEmail;
                    wowcherUser.emailConfirmation = randomEmail;
                }
            });
        }

        successfulRegistrations.forEach(function(users) {
            for (let iterator = 0; iterator < users.length; iterator++) {
                fs.writeFile("./storage_properties/load_users.csv", users[iterator] + ',', {flag: 'a+'});
            }
            fs.writeFile("./storage_properties/load_users.csv", "\n", {flag: 'a+'})
        });

    }).timeout(360000);
});