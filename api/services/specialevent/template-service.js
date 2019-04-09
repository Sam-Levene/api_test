const HttpsRequest = require("path/support/https/https-request");
const HttpsHeader = require ("path/support/https/https-header");
const Template = require ("path/template");
const path = '/v1/pathToService';
/**
 * The Template API
 * @class
 * @hideconstructor
 */
class TemplateService {

    /**
     * Get Template by Template. Template should be set by the Template Builder : withField(field)
     * @param {Address} address Address Object
     * @returns {Promise<Template>}
     */
    static getTemplateService(template) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(template.environment)
            .withMethod('GET')
            .withPath(path)
            .withField('aField')
            .withAccept('aplication/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
                // Populate fields where required
                template.field = res.field;
                // Populate meta - see meta.js
                template.code = HttpsRequest.getStatusCode;
                resolve(template);
            })
        })
    }

    /**
     * Create Template by Template. Template should be set by the Template Builder : withField(field)
     * @param {Address} address Address Object
     * @returns {Promise<Template>}
     */
    static createTemplateService(template) {
        template = new Template.Builder.withField('aField');
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(template.environment)
            .withMethod('POST')
            .withPath(path)
            .withField('aField')
            .withAccept('aplication/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
                // Populate fields where required
                template.field = res.field;
                // Populate meta - see meta.js
                template.code = HttpsRequest.getStatusCode;
                resolve(template);
            })
        })
    }
}
module.exports = TemplateService