const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Query = require("../../support/class/query");
const Response = require("../../support/class/response");
const Sailthru = require ("./sailthru");

/**
 * The Sailthru API
 * @class
 * @hideconstructor
 */
class SailthruService {

    /**
     * Get Sailthru by Sailthru. Sailthru should be set by the Sailthru Builder : withField(field)
     * @param {Sailthru} sailthru Sailthru Object
     * @returns {Promise<Template>}
     */
    static getDealMerged(sailthru) {
        let httpsHeader = new HttpsHeader();
        let myQuery = new Query.Builder()
            .withSolus(sailthru.solus)
            .build();
        let header = httpsHeader.createHeader()
            .withHostName(sailthru.environment)
            .withMethod('GET')
            .withPath(sailthru.path + myQuery.toString())
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
module.exports = SailthruService;