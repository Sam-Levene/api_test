const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Strings = require ("../../support/class/strings");
const Address = require ("./address");

const path = '/v1/address/';
/**
 * The Address API
 * @class
 * @hideconstructor
 */
class AddressService {

    /**
     * Get Address by Address ( Postcode ). Postcode should be set by the Address Builder : withPostCode(postCode)
     * @param {Address} address Address Object
     * @returns {Promise<Response<Address>>}
     */
    static getAddress(address) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(address.environment)
            .withMethod('GET')
            .withPath(path+address.postCode)
            .withApiKey(address.apiKey)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                if( Strings.hasContent(res)) {
                    if (res.data !== undefined) {
                        for (let index = 0; index < res.data.apiAddressReferencesVO.addressReferences.length; index++) {
                            let addr = new Address(address);
                            // Populate the address field
                            addr.update(res.data.apiAddressReferencesVO.addressReferences[index]);
                            response.add(index, addr);
                        }
                    }
                }
                resolve(response);
            })
        })
    }
}
module.exports = AddressService;

