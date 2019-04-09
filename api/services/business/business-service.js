const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Business = require ("../../services/business/business");
const path = '/v1/business';
/**
 * The Business API
 * @class
 * @hideconstructor
 */
class BusinessService {

    /**
     * Get Business by id. Business should be set by the Business Builder : withField(field)
     * @param {Business} business Business Object
     * @returns {Promise<Response<Deal>>}
     */
    static getBusinessByID(business) {
        let businessPath = path + '/' + business.id.toString();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(business.environment)
            .withMethod('GET')
            .withPath(businessPath)
            .withBrand('living-social')
            .withCountryCode('gb')
            .withAccept('aplication/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                business.update(res);
                response.add(business);
                resolve(response);
            })
        })
    }
    /**
     * Get Business by id. Business should be set by the Business Builder : withField(field)
     * @param {Business} business Business Object
     * @returns {Promise<Response<Deal>>}
     */
    static getBusinessByLocation(business) {
        let businessPath = path + '/' + business.location.toString() + '/' + business.id.toString();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(business.environment)
            .withMethod('GET')
            .withPath(businessPath)
            .withBrand('living-social')
            .withCountryCode('gb')
            .withAccept('aplication/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                business.update(res);
                response.add(business);
                resolve(response);
            })
        })
    }
}
module.exports = BusinessService;