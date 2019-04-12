/**
 * HTTP header definitions
 * Class construction :
 * @example
 * httpsHeader = new HttpsHeader();
 * let header = httpsHeader.createHeader()
 * .withHostName(environment)
 * .withMethod('GET')
 * .withPath(path)
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
        /** @type {number} */
        this.port = undefined;
        /** @type {string} */
        this.protocol = '';
        
    }

    /**
     * Generate header
     * @returns {{withHostName: withHostName, withMethod: withMethod, withPath: withPath, withAccept: withAccept, withContentType: withContentType, withContentLength: withContentLength, toJson: toJson}}
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
            withPort: function(n) {
            	this.port = n;
            	return this;
            },
            withProtocol: function(n) {
            	this.protocol = n;
            	return this;
            },
            toJson: function () {
            	return JSON.stringify({
            		'hostname': this.host,
                    'method': this.method,
                    'path': this.path,
                    'port': this.port,
                    'protocol': this.protocol,
                    'headers': {
                        'Accept': this.accept,
                        'Content-Length': this.contentLength,
                        'Content-Type': this.contentType
                    }
                });                
            }
        }
    }
}
module.exports = HttpHeaderOptions;