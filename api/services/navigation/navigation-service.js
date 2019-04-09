const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Navigation = require ("./navigation");
const path = '/v1/navigation';
const Response = require ("../../support/class/response");

/**
 * The Navigation API
 * @class
 * @hideconstructor
 */
class NavigationService {

    /**
     * Get Navigation by Location. Navigation should be set by the Navigation Builder : withLocation(field)
     * @param {Navigation} navigation Navigation Object
     * @returns {Promise<Map<Location>>}
     */
    static getNavigationByLocation(navigation) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(navigation.environment)
            .withMethod('GET')
            .withPath(path + '/' + navigation.location)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
                // res is array of navigations - [{navigation}, {navigation}, {navigation}]
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.length; index++) {
                        response.add( index, new Navigation(res[index]) )
                }
                resolve(response);
            })
        })
    }
}
module.exports = NavigationService;