const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Query = require("../../support/class/query");
const Response = require ("../../support/class/response");
const Payment = require ("./payment");
const cybersourceTokenPath = '/token-cs';
const cybersourcePaymentPath = '/pay-cs';
const braintreeTokenPath = '/token';
const braintreePaymentPath = '/pay';
let header = '';
    /**
 * The Payment API
 * @class
 * @hideconstructor
 */
class PaymentService {

    /**
     * Get cybersource token by user auth token. Payment should be set by the Payment Builder : withField(field)
     * @param {User} user User Object
     * @returns {Promise<Response<Token>>}
     */
    static getCyberSourceToken(user) {
        let httpsHeader = new HttpsHeader();
            header = httpsHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(cybersourceTokenPath)
                .withAccept('application/json')
                .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(res);
                resolve(response);
            })
        })
    }

    /**
     * Get cybersource token by user auth token. Payment should be set by the Payment Builder : withField(field)
     * @param {Token} token Token Object
     * @returns {Promise<Payment>}
     */

    static getActualCSToken(token) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName("testflex.cybersource.com")
            .withMethod('POST')
            .withApiAuthToken()
            .withPath("/cybersource/flex/v1/tokens")
            .withContentType('application/json')
            .withContentLength(Buffer.byteLength(token.toJsonString()))
            .withAccept('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(header, token.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(res);
                resolve(response);
            })
        })
    }

    /**
     * Get braintree token by user auth token. Payment should be set by the Payment Builder : withField(field)
     * @param {User} user User Object
     * @returns {Promise<Payment>}
     */
    static getBrainTreeToken(user) {
        let httpsHeader = new HttpsHeader();
        if (user.brand === "wowcher") {
            header = httpsHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withWowcherUser(user.apiAuthToken)
                .withPath(braintreeTokenPath)
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            header = httpsHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withApiAuthToken(user.apiAuthToken)
                .withPath(braintreeTokenPath)
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
            })
        })
    }
    /**
     * Get cybersource payment by user auth token. Payment should be set by the Payment Builder : withField(field)
     * @param {JSON} payment The Payment Object
     * @param {string} apiAuthToken The customer's Auth Token
     * @param {string} environment The environment to use.
     * @returns {Promise<Payment>}
     */
    static getCyberSourcePayment(payment, apiAuthToken, environment) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(environment)
            .withMethod('POST')
            .withWowcherUser(apiAuthToken)
            .withPath(cybersourcePaymentPath)
            .withBrand("wowcher")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(header, JSON.stringify(payment)).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(res);
                resolve(response);
            })
        })
    }
    /**
     * Get braintree payment by user auth token. Payment should be set by the Payment Builder : withField(field)
     * @param {Payment} payment Payment Object
     * @returns {Promise<Payment>}
     */
    static getBrainTreePayment(payment) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(payment.environment)
            .withMethod('POST')
            .withPath(braintreePaymentPath)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(header, payment).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
            })
        })
    }

}
module.exports = PaymentService;