const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Email = require ("./email");
const path = '/v1/email';

/**
 * The Email API
 * @class
 * @hideconstructor
 */
class EmailService {

    /**
     * Get Email by Email. Email should be set by the Email Builder : withEmail(email)
     * @param {Email} email Email Object
     * @returns {Promise<Email>}
     */
    static registerEmail(email) {
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(email.environment)
            .withMethod('POST')
            .withBrand('wowcher')
            .withPath(path)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(httpsHeader, email.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                email.update(res);
                response.add(new Email(email));
                resolve(response);
            })
        })
    }

    /**
     * Delete Email by Email. Email should be set by the Email Builder : withEmail(email)
     * @param {Email} email Email Object
     * @param {subscriptionSource} subcriptionSource Email Object
     */
    static deleteEmail(email){
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(email.environment)
            .withMethod('DELETE')
            .withPath(path)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(httpsHeader, email.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                email.update(res);
                response.add(new Email(email));
                resolve(response);
            })
        })
    }
}
module.exports = EmailService;