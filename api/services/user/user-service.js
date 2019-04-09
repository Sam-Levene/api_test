const HttpRequest = require("../../support/https/https-request");
const HttpHeader = require ("../../support/https/https-header");
const User = require ("../../services/user/user");
const Response = require("../../support/class/response");
const HttpResponseCodes = require("../../support/https/http-response-codes");
// const tv4 = require('tv4');
// const createUserSchema = require("./json/post-new-user");
const path = '/v1/user';

/**
 * The User API
 * @class
 * @hideconstructor
 * @package
 */

class UserService {

     /**
     * Register User
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandaatory fields.  See Swagger UI.
     * See also : UserUtilities.generateWowcherUser(), generateLivingSocialUser, generateUser() for auto-generated users.
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static registerUser(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withMethod('POST')
            .withPath(path)
            .withBrand(user.brand)
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.post(httpHeader, user.toRegistrationString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                    if( ! HttpResponseCodes.isCreated(response.statusCode)) {
                        resolve(response);
                    }

                    user.apiAuthToken = res.data.apiAuthToken;
                    user.customerToken = res.data.customerToken;
                    user.subscriptionsCount = res.data.subscriptionsCount;
                    response.add(new User(user));
                    resolve(response);
            })
        })
    }

    /**
     * Get User Details
     * Mandatory fields should be set using the Builder :  withHostName(user.environment) and withWowcherUser(user.apiAuthToken)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */

    static getDetails(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod('GET')
            .withPath(path)
            .withBrand(user.brand)
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.get(httpHeader).then(() => {
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }

    /**
     * Update User Details
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and withWowcherUser(user.apiAuthToken)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static updateData(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod("PUT")
            .withPath(path)
            .withBrand(user.brand)
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.put(httpHeader, user.updateUser()).then((res) => {
                user.update(res);
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }

    /**
     * Get User Account Status
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and withWowcherUser(user.apiAuthToken)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static getAccountStatus(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod("POST")
            .withPath(path + "/account-status")
            .withBrand(user.brand)
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.post(httpHeader, user.accountStatus()).then(() => {
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }

    /**
     * Get User Address Details
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and withWowcherUser(user.apiAuthToken)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
        static changeAddressDetails(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod("PUT")
            .withPath(path + "/address")
            .withBrand(user.brand)
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.put(httpHeader, user.addressDetails()).then((res) => {
                user.update(res);
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }

    /**
     * Change User Password
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and withEmail(email)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static changePassword(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod("PATCH")
            .withPath(path + "/password")
            .withBrand(user.brand)
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.patch(httpHeader, user.changePassword()).then((res) => {
                user.update(res);
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }

    /**
     * Change User Password
     * Mandatory fields should be set using the Builder : withHostName(user.environment) & withEmail(email)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static requestPasswordChange(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withMethod("POST")
            .withPath(path + "/password-reset")
            .withBrand(user.brand)
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.post(httpHeader, user.accountStatus()).then(() => {
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }
    /**
     * Get User Push Notifications
     * Mandatory fields should be set using the Builder : withHostName(user.environment) & withWowcherUser(user.apiAuthToken)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static getPushNotifications(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod("GET")
            .withPath(path + "/push")
            .withBrand(user.brand)
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.get(httpHeader).then(() => {
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }
    /**
     * Get User Wallet Information
     * Mandatory fields should be set using the Builder : withHostName(user.environment) & withWowcherUser(user.apiAuthToken)
     * @param {User} user User object
     * @returns {Promise<Response<User>>}
     */
    static getWalletInformation(user) {
        let httpHeader = new HttpHeader();
        httpHeader = httpHeader.createHeader()
            .withHostName(user.environment)
            .withWowcherUser(user.apiAuthToken)
            .withMethod("GET")
            .withPath(path + "/wallet")
            .withBrand(user.brand)
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function (resolve) {
            HttpRequest.get(httpHeader).then(() => {
                let response = new Response.Builder().withStatusCode(HttpRequest.getStatusCode()).build();
                response.add(new User(user));
                resolve(response);
            })
        })
    }
}
module.exports = UserService;