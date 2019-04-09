const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ('../../support/class/response');
const Socialcue = require ("./socialcue");
const path = '/v1/socialcue';

/**
 * The Template API
 * @class
 * @hideconstructor
 */
class SocialcueService {

    /**
     * Returns category and subcategory purchase aggregates based on a given deal id. Socialcue should be set by the Socialcue Builder : withField(field)
     * @param {Socialcue} socialcue Socialcue Object
     * @returns {Promise<Socialcue>}
     */
    static getCategoryAggregates(socialcue) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(socialcue.environment)
            .withMethod('GET')
            .withPath(path + "/categories/purchases/" + socialcue.id)
            .withBrand(socialcue.brand)
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
     * Returns purchase aggregates for a given deal id. Socialcue should be set by the Socialcue Builder : withField(field)
     * @param {Socialcue} socialcue Socialcue Object
     * @returns {Promise<Socialcue>}
     */
    static getPurchaseAggregates(socialcue) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(socialcue.environment)
            .withMethod('GET')
            .withPath(path + "/deal/" + socialcue.id)
            .withBrand(socialcue.brand)
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
     * Returns aggregated checkout views for a deal. Socialcue should be set by the Socialcue Builder : withField(field)
     * @param {Socialcue} socialcue Socialcue Object
     * @returns {Promise<Socialcue>}
     */
    static getCheckoutAggregates(socialcue) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(socialcue.environment)
            .withMethod('GET')
            .withPath(path + "view/checkouthit/" + socialcue.id)
            .withBrand(socialcue.brand)
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
     * Returns aggregated deal views for a deal. Socialcue should be set by the Socialcue Builder : withField(field)
     * @param {Socialcue} socialcue Socialcue Object
     * @returns {Promise<Socialcue>}
     */
    static getDealAggregates(socialcue) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(socialcue.environment)
            .withMethod('GET')
            .withPath(path + "view/dealhit/" + socialcue.id)
            .withBrand(socialcue.brand)
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
}
module.exports = SocialcueService;