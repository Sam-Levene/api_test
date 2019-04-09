const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Shortcut = require ("./shortcut");
const Response = require ("../../support/class/response");
const path = '/v1/shortcut';
/**
 * The Shortcut API
 * @class
 * @hideconstructor
 */
class ShortcutService {

    /**
     * Get shortcut by identifier. Shortcut should be set by the Shortcut Builder : withField(field) ...
     * @param {Shortcut} shortcut Shortcut Object
     * @returns {Promise<Response<Shortcut>>}
     */
    static getShortcut(shortcut) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(shortcut.environment)
            .withMethod('GET')
            .withPath(path + '/' + shortcut.id)
            .withAccept('application/json')
            .withContentType('application/json')
            .withBrand(shortcut.brand);

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(new Shortcut(res));
                resolve(response);
            })
        })
    }
}
module.exports = ShortcutService;