/**
 * HTTP and Wowcher header definitions
 * All headers will be sent to the Public API.  Headers not relevant to the API endpoint are ignored.
 * Class construction :
 * @example
 * httpsHeader = new HttpsHeader();
 * let header = httpsHeader.createHeader()
 * .withHostName(environment)
 * .withMethod('GET')
 * .withPath(path)
 * .withApiKey(apiKey)
 * .withAccept('application/json')
 * .withContentType('application/json');
 * @class
 */

class HttpHeaderOptions {

    constructor() {
        /** @type {string} */
        this.host = '';
        /** @type {string} */
        this.method = '';
        /** @type {string} */
        this.path = '';
        /** @type {string} */
        this.accept = '';
        /** @type {string} */
        this.contentType = '';
        /** @type {number} */
        this.contentLength = undefined;
        /** @type {string} */
        this.brand = '';
        /** @type {string}  */
        this.wowcherUser ='';
        /** @type {string}  */
        this.countryCode = '';
        /** @type {string}  */
        this.apiAuthToken = '';
        /** @type {string}  */
        this.lat = '';
        /** @type {string}  */
        this.long = '';
        /** @type {string} */
        this.customerToken = '';
        /** @type {string} */
        this.id = '';
        /** @type {string} */
        this.productId = '';
    }

    /**
     * Generate header
     * @returns {{withHostName: withHostName, withMethod: withMethod, withPath: withPath, withAccept: withAccept, withContentType: withContentType, withBrand: withBrand, withApiKey: withApiKey, withWowcherUser: withWowcherUser, withContentLength: withContentLength, withCountryCode: withCountryCode, withApiAuthToken: withApiAuthToken, withLat: withLat, withLong: withLong, toJson: toJson}}
     */
    createHeader() {
        return {
            withHostName: function (n) {
                this.host = n;
                return this
            },
            withMethod: function (n) {
                this.method = n;
                return this
            },
            withPath: function (n) {
                this.path = n;
                return this
            },
            withAccept: function (n) {
                this.accept = n;
                return this;
            },
            withContentType: function (n) {
                this.contentType = n;
                return this;
            },
            withContentLength: function (n) {
                this.contentLength = n;
                return this;
            },
            withBrand: function (n) {
                this.brand = n;
                return this;
            },
            withApiKey: function (n) {
                this.apiKey = n;
                return this;
            },
            withWowcherUser: function (n) {
                this.wowcherUser = n;
                return this;
            },
            withCountryCode: function (n) {
                this.countryCode = n;
                return this;
            },
            withApiAuthToken: function (n) {
                this.apiAuthToken = n;
                return this;
            },
            withLat: function(n){
                this.lat = n;
                return this;
            },
            withLong: function(n){
                this.long = n;
                return this;
            },
            withCustomerToken: function(n){
              this.customerToken = n;
              return this;
            },
            withId: function(n){
              this.id = n;
              return this;
            },
            withProductId: function(n){
                this.productId = n;
                return this;
            },
            toJson: function () {
                if (this.brand === "wowcher") {
                    return JSON.stringify({
                        'hostname': this.host,
                        'method': this.method,
                        'path': this.path,
                        'headers': {
                            'Cookie': 'wowcher_user=' + this.wowcherUser,
                            'Accept': this.accept,
                            'Country-Code': this.countryCode,
                            'Content-Length': this.contentLength,
                            'Content-Type': this.contentType,
                            'brand': this.brand,
                            'wowcher_user': this.wowcherUser,
                            'apiAuthToken': this.apiAuthToken,
                            'lat': this.lat,
                            'lon': this.long,
                            'apiKey': this.apiKey,
                            'customerToken': this.customerToken,
                            'id': this.id,
                            'productId': this.productId
                        }
                    });
                }
                else {
                    return JSON.stringify({
                        'hostname': this.host,
                        'method': this.method,
                        'path': this.path,
                        'headers': {
                            'Cookie': 'apiAuthToken=' + this.apiAuthToken,
                            'Accept': this.accept,
                            'Country-Code': this.countryCode,
                            'Content-Length': this.contentLength,
                            'Content-Type': this.contentType,
                            'brand': this.brand,
                            'wowcher_user': this.wowcherUser,
                            'apiAuthToken': this.apiAuthToken,
                            'lat': this.lat,
                            'lon': this.long,
                            'apiKey': this.apiKey,
                        }
                    });
                }
            }
        }
    }
}
module.exports = HttpHeaderOptions;