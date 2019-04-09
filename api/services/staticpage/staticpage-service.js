const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const StaticPage = require ("./staticpage");
const path = '/v1/staticpage/';
/**
 * The StaticPage API
 * @class
 * @hideconstructor
 */
class StaticpageService {

    /**
     * Get StaticPage by StaticPage ID. StaticPage should be set by the StaticPage Builder : withId(id)
     * @param {StaticPage} staticPage StaticPage Object
     * @returns {Promise<StaticPage>}
     */
    static getStaticPageByID(staticPage) {
        let pathId = path + staticPage.id.toString();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(staticPage.environment)
            .withMethod('GET')
            .withPath(pathId)
            .withBrand('wowwcher')
            .withAccept('aplication/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                staticPage.update(res);
                response.add(new StaticPage(staticPage));
                resolve(response);
            });
        })
    }

    /**
     * Get StaticPage by StaticPage Url. StaticPage should be set by the StaticPage Builder : withUrl(url)
     * @param {StaticPage} staticPage StaticPage Object
     * @returns {Promise<StaticPage>}
     */
    static getStaticPageByUrl(staticPage){
        let pathUrl = path + staticPage.url.toString();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(staticPage.environment)
            .withMethod('GET')
            .withPath(pathUrl)
            .withBrand('wowwcher')
            .withAccept('aplication/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                staticPage.update(res);
                response.add(new StaticPage(staticPage));
                resolve(response);
            });
        })
    }
}
module.exports = StaticpageService