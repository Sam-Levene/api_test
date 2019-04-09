const User = require("../user");
const RegistrationUtilities = require('./registration');
const Random = require('../../../support/class/random');

class UserUtilities {

    constructor() {
    this.generatedEmail = '';
    this.generatedPassword = '';
    this.user = null;
    }


    /**
     * Generate WowcherUser Registration Object for the given environment.  For use with UserService methods.
     * @param environment
     * @returns {User}
     */
    static generateWowcherUser(environment) {
        const wowcherUser = this.generateUser(environment);
        wowcherUser.brand = 'wowcher';
        return wowcherUser;
    }

    /**
     * Generate Living Social Registration Object for the given environment.  For use with UserService methods.
     * @param environment
     * @returns {User}
     */
    static generateLivingSocialUser(environment) {
        const livingSocialUser = this.generateUser(environment);
        livingSocialUser.brand = 'living-social';
        return livingSocialUser;
    }

    static cardInfo() {
         let cardNumber = "4111111111111111";
         let cardType = "001";
         let cardExpirationMonth = "12";
         let cardExpirationYear = "2025";

        return {
            "cardNumber": cardNumber,
            "cardType": cardType,
            "cardExpirationMonth": cardExpirationMonth,
            "cardExpirationYear": cardExpirationYear
        };
    }

    /**
     * Generate non specific Registration Object for the given environment.  Set brand with [User].brand = [brand]  For use with UserService methods.
     * @param environment
     * @returns {User}
     */

    static generateUser(environment) {
        const registrationTemplate = RegistrationUtilities.getRegistrationTemplate();
        this.generatedEmail = RegistrationUtilities.generateEmail();
        this.generatedPassword = Random.string(6);
        this.user =  new User.Builder(environment)
                .withEnvironment(environment)
                .withTitle(registrationTemplate.requestRegistration.title)
                .withFirstName(registrationTemplate.requestRegistration.firstName)
                .withSurname(registrationTemplate.requestRegistration.surname)
                .withEMail(this.generatedEmail)
                .withEMailConfirmation(this.generatedEmail)
                .withAddressLine1(registrationTemplate.requestRegistration.addressLine1)
                .withAddressLine2(registrationTemplate.requestRegistration.addressLine2)
                .withCity(registrationTemplate.requestRegistration.city)
                .withPostCode(registrationTemplate.requestRegistration.postCode)
                .withPassword(this.generatedPassword)
                .withPasswordConfirmation(this.generatedPassword)
                .build();
        return this.user;
    }

    /**
     * Get current User email
     * @return {string}
     */
    static getUsername() {
        return this.user.email;
    }

    /**
     * Get current User password
     * @return {string}
     */
    static getPassword() {
        return this.user.password;
    }

    /**
     * Get current User
     * @return {string}
     */
    static getUser() {
        return this.user;
    }
}
module.exports = UserUtilities;