const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Recommendations = require ("../recommendations/recommendations");
const Query = require("../../support/class/query");
const Response = require ("../../support/class/response");
const path = '/v1/recommendations';
/**
 * The Recommendations API
 * @class
 * @hideconstructor
 */
class RecommendationsService {

    /**
     * Get deal recommendations by deal ID. Recommendations should be set by the Recommendations Builder : withDealId(ID)
     * @param {Recommendations} recommended Recommendations Object
     * @returns {Promise<Response<Recommendations>>}
     */
    static getRecommendations(recommended) {
        let httpsHeader = new HttpsHeader();
        let queryString = new Query(recommended);
        let header = httpsHeader.createHeader()
            .withHostName(recommended.environment)
            .withMethod('GET')
            .withPath(path + "/deals/" + recommended.dealId + queryString.toString())
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for (let index = 0; index < res.length; index++) {
                    response.add(new Recommendations(res[index]))
                }
                resolve(response);
            })
        })
    }

}
module.exports = RecommendationsService;