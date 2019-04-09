const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const PPCPage = require ("./ppcpage");
const path = '/v1/ppc/';
/**
 * The PPC Page API
 * @class
 * @hideconstructor
 */
class PPCPageService {

    /**
     * Get PPC Page by PPC Page. PPC Page should be set by the PPC Page Builder : withPath(path)
     * @param {PPCPage} PPCPage PPCPage Object
     * @returns {Promise<PPCPage>}
     */
    static getPPCPage(ppcPage) {
        let PPCPath = path + ppcPage.path.toString();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(ppcPage.environment)
            .withMethod('GET')
            .withPath(PPCPath)
            .withBrand('wowcher')
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                ppcPage.update(res);
                response.add(new PPCPage(ppcPage));
                resolve(response);
            });
        });
    }
}
module.exports = PPCPageService