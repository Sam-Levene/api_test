
class RegistrationUtilities {

    /**
     * Get Registration Template
     * @returns JSON Object :{{requestRegistration: {title: string, firstName: string, surname: string, addressLine1: string, addressLine2: string, city: string, postCode: string, email: string, emailConfirmation: string, password: string, passwordConfirmation: string, rejectDMGTContact: boolean, location: string}}}
     */
    static getRegistrationTemplate() {
        return {
            "requestRegistration":
                {
                    "title": "Ms",
                    "firstName": "Test",
                    "surname": "User",
                    "addressLine1": "12-27 Swan Yard",
                    "addressLine2": "",
                    "city": "London",
                    "postCode": "N1 1SD",
                    "email": "",
                    "emailConfirmation": "",
                    "password": "",
                    "passwordConfirmation": "",
                    "rejectDMGTContact": false,
                    "location": "london"
                }
        }
    }

    /**
     * Generate Random Email
     * @returns {string} Format ['wowcherautomation'][random number]['@gmail.com'][
     */
    static generateEmail() {
        const emailLocal = 'wowcherautomation';
        const emailDomain = '@gmail.com';
        let i = Math.floor(Math.random()*999999999);
        return emailLocal + '+' + i + emailDomain;
    }
}
module.exports = RegistrationUtilities;