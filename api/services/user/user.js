const Meta = require('../../support/class/meta.js');
/**
 * The User object to be passed into and from User Service API
 * @class
 */
class User extends Meta {
    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.brand = builder.brand;
        /** @type {string} */
        this.title = builder.title;
        /** @type {string} */
        this.firstName = builder.firstName;
        /** @type {string} */
        this.surname = builder.surname;
        /** @type {string} */
        this.addressLine1 = builder.addressLine1;
        /** @type {string} */
        this.addressLine2 = builder.addressLine2;
        /** @type {string} */
        this.city = builder.city;
        /** @type {string} */
        this.postCode = builder.postCode;
        /** @type {string} */
        this.email = builder.email;
        /** @type {string} */
        this.emailConfirmation = builder.emailConfirmation;
        /** @type {string} */
        this.password = builder.password;
        /** @type {string} */
        this.passwordConfirmation = builder.passwordConfirmation;
        /** @type {string} */
        this.customerToken = builder.customerToken;
        /** @type {string} */
        this.businessOwner = builder.businessOwner;
        /** @type {string} */
        this.apiAuthToken = builder.apiAuthToken;
        /** @type {string} */
        this.subscriptionsCount = builder.subscriptionsCount;
        /** @type {string} */
        this.rejectDMGTContact = builder.rejectDMGTContact;
        /** @type {string} */
        this.location = builder.location;
    }

    /*
    updater.title if this is undefined, then we do not update this.title.
    in the case updater
                    user.apiAuthToken = res.data.apiAuthToken;
                user.customerToken = res.data.customerToken;
                user.subscriptionsCount = res.data.subscriptionsCount;
     */

    /**
     * Object equality - compare self with other instance
     * @param {User} other - User instance
     * @returns {boolean}
     */

    equals(other) {
        return this === other || ( other instanceof User ) &&
               (other.title === this.title &&
                other.firstName === this.firstName &&
                other.lastName === this.lastName &&
                other.email === this.email &&
                other.addressLine1 === this.addressLine1 &&
                other.town === this.town &&
                other.postcode === this.postcode);
    }

    /**
     * Method to check User object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.title != null &&
            this.firstName != null &&
            //this.lastName != null &&
            this.email != null &&
            this.addressLine1 != null &&
            //this.town != null &&
            this.postCode != null;
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toRegistrationString() {
        return ('{ "requestRegistration": ' + JSON.stringify(this, this.replacer) + '}');
    }
    /**
     * JSON Serialise class as JSON for update operation
     * @returns {string}
     */
    updateUser() {
        return (JSON.stringify({
            "title": this.title,
            "firstName": this.firstName,
            "lastName": this.surname,
            "email": this.email,
            "addressLine1": this.addressLine1,
            "addressLine2": this.addressLine2,
            "town": this.city,
            "postcode": this.postCode
        }))
    }

    /**
     * JSON Serialise class as JSON for account status operation
     * @returns {string}
     */
    accountStatus() {
        return( JSON.stringify({
            "email": this.email
        }))
    }

    /**
     * JSON Serialise class as JSON for account details operation
     * @returns {string}
     */
    addressDetails() {
        return( JSON.stringify({
            "addressLine1": this.addressLine1,
            "addressLine2": this.addressLine2,
            "city": this.city,
            "postcode": this.postCode
        }))
    }
    /**
     * JSON Serialise class as JSON for changed password operation
     * @returns {string}
     */
    changePassword() {
        return(JSON.stringify({
            "oldPassword": this.password,
            "newPassword": "someOtherPass"
        }))
    }

    /**
     * Set User
     */
    setEmail(email) {
       this.email = email;
    }

    /**
     * Set Password
     */
    setPassword(password) {
        this.password = password;
    }

    setAuthToken(token) {
        this.apiAuthToken = token;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * User Builder
         * @class
         * @alias UserBuilder
         * @example
         * new User.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                this.environment = '';
                this.brand = '';
                this.title = '';
                this.firstName = '';
                this.surname = '';
                this.email = '';
                this.emailConfirmation = '';
                this.password = '';
                this.passwordConfirmation = '';
                this.addressLine1 = '';
                this.addressLine2 = '';
                this.city = '';
                this.postCode = '';
                this.customerToken = '';
                this.businessOwner = false;
                this.apiAuthToken = '';
                this.subscriptionsCount = '';
                this.location = 'london';
                this.rejectDMGTContact = false;
            }

            /**
             * Set environment
             * @param {string} environment API endpoint
             * @returns {Builder}
             */
            withEnvironment(environment) {
                this.environment = environment;
                return this
            }
            /**
             * Set brand
             * @param {string} brand brand type
             * @returns {Builder}
             */
            withBrand(brand) {
                this.brand = brand;
                return this
            }
            /**
             * Set Title
             * @param {string} title The Title
             * @returns {Builder}
             */
            withTitle(title) {
                this.title = title;
                return this
            }
            /**
             * Set First Name
             * @param {string} firstName The First Name
             * @returns {Builder}
             */
            withFirstName(firstName) {
                this.firstName = firstName;
                return this
            }
            /**
             * Set Surname
             * @param {string} surname The Surname
             * @returns {Builder}
             */
            withSurname(surname) {
                this.surname = surname;
                return this
            }
            /**
             * Set Email
             * @param {string} email The Email
             * @returns {Builder}
             */
            withEMail(email) {
                this.email = email;
                return this
            }
            /**
             * Set Email Confirmation
             * @param {string} emailConfirmation The Email Confirmation
             * @returns {Builder}
             */
            withEMailConfirmation(emailConfirmation) {
                this.emailConfirmation = emailConfirmation;
                return this
            }
            /**
             * Set Password
             * @param {string} password The Password
             * @returns {Builder}
             */
            withPassword(password) {
                this.password = password;
                return this
            }
            /**
             * Set Password Confirmation
             * @param {string} passwordConfirmation The Password Confirmation
             * @returns {Builder}
             */
            withPasswordConfirmation(passwordConfirmation) {
                this.passwordConfirmation = passwordConfirmation;
                return this
            }
            /**
             * Set Address Line1
             * @param {string} addressLine1 The Address Line1
             * @returns {Builder}
             */
            withAddressLine1(addressLine1) {
                this.addressLine1 = addressLine1;
                return this
            }
            /**
             * Set Address Line2
             * @param {string} addressLine2 The Address Line2
             * @returns {Builder}
             */
            withAddressLine2(addressLine2) {
                this.addressLine2 = addressLine2;
                return this
            }
            /**
             * Set City
             * @param {string} city The City
             * @returns {Builder}
             */
            withCity(city) {
                this.city = city;
                return this
            }
            /**
             * Set Post Code
             * @param {string} postCode The Post Code
             * @returns {Builder}
             */
            withPostCode(postCode) {
                this.postCode = postCode;
                return this
            }
            /**
             * Set API Auth Token
             * @param {string} apiAuthToken The API Auth Token
             * @returns {Builder}
             */
            withApiAuthToken(apiAuthToken) {
                this.apiAuthToken = apiAuthToken;
                return this
            }
            /**
             * Set Business Owner
             * @param {string} businessOwner The Business Owner
             * @returns {Builder}
             */
            withBusinessOwner(businessOwner) {
                this.businessOwner = businessOwner;
                return this
            }
            /**
             * Set apiKey
             * @param {string} customerToken The Customer Token
             * @returns {Builder}
             */
            withCustomerToken(customerToken) {
                this.customerToken = customerToken;
                return this
            }
            /**
             * Set apiKey
             * @param {string} apiKey The Subscriptions Count
             * @returns {Builder}
             */
            withSubscriptionsCount(subscriptionsCount) {
                this.subscriptionsCount = subscriptionsCount;
                return this
            }
            /**
             * Set Location
             * @param {string} location The Location
             * @returns {Builder}
             */
            withLocation(location) {
                this.location = location;
                return this
            }
            /**
             * Set Reject DMGT Contact
             * @param {string} rejectDMGTContact The Reject DMGT Contact
             * @returns {Builder}
             */
            withRejectDMGTContact(rejectDMGTContact) {
                this.rejectDMGTContact = rejectDMGTContact;
                return this
            }
            /**
             * Create User instance
             * @returns {User}
             */
            build() {
                return new User(this);
            }
        }
        return Builder;
    }
}
module.exports = User;