
const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const PromoCode = require ("./promoCode");
const Query = require("../../support/class/query");
const path = '/v1/promocode/verify';
/**
 * The PromoCode API
 * @class
 * @hideconstructor
 */
class PromocodeService {

    /**
     * Get PromoCode service by PromoCode. PromoCode should be set by the PromoCode Builder : withCode(code) withDealID(dealID)
     * @param {PromoCode} promocode PromoCode Object
     * @returns {Promise<Template>}
     */
    static getPromoCode(promocode) {
        let queryString = new Query(promocode);
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(promocode.environment)
            .withWowcherUser(promocode.apiAuthToken)
            .withMethod('GET')
            .withPath(path + queryString.toString())
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve){
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                promocode.update(res);
                response.add(new PromoCode(promocode));
                resolve(response);
            })
        })
    }

    /**
     * Get PromoCode service by PromoCode. PromoCode should be set by the PromoCode Builder : withCode(code) withDealID(dealID)
     * @param {PromoCode} promocode PromoCode Object
     * @returns {Promise<Template>}
     */
    static getPromoCodeInvlaidRequest(promocode) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(promocode.environment)
            .withMethod('GET')
            .withPath(path)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve){
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                promocode.update(res);
                response.add(new PromoCode(promocode));
                resolve(response);
            })
        })
    }
}
module.exports = PromocodeService