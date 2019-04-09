const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Login = require ("./login");
const Response = require ("../../support/class/response");
const path = '/v1/login';
const fbPath = '/v1/loginfacebook';

/**
 * The LoginService API
 * @class
 * @hideconstructor
 */
class LoginService {

    /**
     * Logs in to the site using a user's credentials.
     * @param {User} user User Object
     * @returns {Promise<Login>}
     */
    static login(user) {
        let myLogin = new Login.Builder()
            .withUsername(user.email)
            .withPassword(user.password)
            .build();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(user.environment)
            .withMethod('POST')
            .withPath(path)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(header, myLogin.toJsonString()).then((res) => {
                user.setAuthToken(res.response.data);
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res; index++) {
                    response.add(new Login(res[index]))
                }
                resolve(response);
            })
        })
    }

    /**
     * Logs in to the site using a user's facebook credentials.
     * @param {Login} user Login Object
     * @returns {Promise<Login>}
     */
    static loginWithFacebook(user) {
        let myLogin = new Login.Builder()
            .withUsername(user.email)
            .withPassword(user.password)
            .build();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(user.environment)
            .withMethod('POST')
            .withPath(fbPath)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(header, myLogin.facebookRequest()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res; index++) {
                    response.add(new Login(res[index]))
                }
                resolve(response);
            })
        })
    }
}
module.exports = LoginService;