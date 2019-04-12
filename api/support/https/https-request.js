const https = require('https');
const http = require('http');
let statusCode = '';
let statusMessage = '';
let responseHeaders = '';
/**
 * HTTP Request Services
 * @class
 */

class HttpsRequest {
    /**
     * HTTP GET
     * @param {HttpHeaderOptions} options
     * @returns {Promise<JSON>}
     */
    static get(options) {
        return new Promise(function (resolve, reject) {
            const header = options.toJson();
            if (options.host.indexOf("https://") > -1) {
	            let request = https.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	
	                let data = '';
	                res.on('data', (d) => {
	                    data += d;
	                });
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	                    try {
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	
	            request.end();
            }
            else {
            	 let request = http.request(JSON.parse(header), (res) => {
 	                statusCode = res.statusCode;
 	                statusMessage = res.statusMessage;
 	
 	                let data = '';
 	                res.on('data', (d) => {
 	                    data += d;
 	                });
 	                res.on('end', () => {
 	                    if(data === "") {
 	                        data = "{}";
 	                    }
 	                    try {
 	                        let result = JSON.parse(data);
 	                        resolve(result);
 	                    } catch (error) {
 	                        resolve("{}");
 	                    }
 	                });
 	            });
 	
 	            request.on('error', (e) => {
 	                console.error(e);
 	            });
 	
 	            request.end();
            }
        }).catch(error => {
            console.log(error);
        });
    
    }
    /**
     * HTTP POST
     * @param {HttpHeaderOptions} options
     * @param {string} requestBody - JSON Request Body
     * @returns {Promise<JSON>}
     */
    static post(options, requestBody) {
    	return new Promise(function (resolve, reject) {
    		if (options.host.indexOf("https://") > -1) {
	            const header = options.toJson();
	            let request = https.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                responseHeaders = res.headers;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	        	 
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	
	            request.write(requestBody);
	            request.end();
	        }
    		else {
    			const header = options.toJson();
	            let request = http.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                responseHeaders = res.headers;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	        	 
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	
	            request.write(requestBody);
	            request.end();
    		}
        }).catch(error => {
            console.log(error);
        });
    }
    /**
     * HTTP PUT
     * @param {HttpHeaderOptions} options
     * @param {string} requestBody - JSON Request Body
     * @returns {Promise<JSON>}
     */
    static put(options, requestBody) {
        return new Promise(function (resolve, reject) {
        	if (options.host.indexOf("https://") > -1) {
	            const header = options.toJson();
	            let request = https.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        //console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	            request.write(requestBody);
	            request.end();
        	}
        	else {
        		const header = options.toJson();
	            let request = http.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        //console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	            request.write(requestBody);
	            request.end();
        	}

        }).catch(error => {
            console.log(error);
        });
    }
    /**
     * HTTP PATCH
     * @param {HttpHeaderOptions} options
     * @param {string} requestBody - JSON Request Body
     * @returns {Promise<JSON>}
     */
    static patch(options, requestBody) {
        return new Promise(function (resolve, reject) {
        	if (options.host.indexOf("https://") > -1) {
	            const header = options.toJson();
	            let request = https.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                responseHeaders = res.headers;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        //console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	            request.write(requestBody);
	            request.end();
        	}
        	else {
	            const header = options.toJson();
	            let request = http.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                responseHeaders = res.headers;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        //console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	            request.write(requestBody);
	            request.end();
        	}

        }).catch(error => {
            console.log(error);
        });
    }
    /**
     * HTTP DELETE
     * @param {HttpHeaderOptions} options
     * @returns {Promise<JSON>}
     */
    static delete(options) {
        return new Promise(function (resolve, reject) {
        	if (options.host.indexOf("https://") > -1) {
	            const header = options.toJson();
	            const request = https.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        //console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	            request.end();
        	}
        	else {
        		const header = options.toJson();
	            const request = http.request(JSON.parse(header), (res) => {
	                statusCode = res.statusCode;
	                statusMessage = res.statusMessage;
	                let data = '';
	
	                res.on('data', (d) => {
	                    data += d;
	                });
	
	                res.on('end', () => {
	                    if(data === "") {
	                        data = "{}";
	                    }
	
	                    try{
	                        let result = JSON.parse(data);
	                        resolve(result);
	                    } catch (error) {
	                        //console.log(error);
	                        resolve("{}");
	                    }
	                });
	            });
	
	            request.on('error', (e) => {
	                console.error(e);
	            });
	            request.end();
        	}
        }).catch(error => {
            console.log(error);

        })
    }

    /**
     * Get HTTP Status Code
     * @returns {string} HTTP Status Code
     */
    static getStatusCode() {
        return statusCode;
    }
    /**
     * Get HTTP Status Message
     * @returns {string} HTTP Status Message
     */
    static getStatusMessage() {
        return statusMessage;
    }

    /**
     * Get repsonse headers
     * @returns {string} Response Headers
     */
    static getResponseHeaders(){
        return responseHeaders;
    }
}
module.exports = HttpsRequest;