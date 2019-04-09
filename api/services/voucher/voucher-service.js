const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require("../../support/class/response");
const Voucher = require ("./voucher");
const VoucherDetail = require ("./voucher-detail");

const path = '/v1/voucher';
/**
 * The Voucher API
 * @class
 * @hideconstructor
 */
class VoucherService {

    /**
     * Get vouchers for a user
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {User} user User object
     * @returns {Promise<Response<Voucher>>}
     */
    static getVouchersForUser(user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path)
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path)
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let voucherIndex = 0; voucherIndex < res.length; voucherIndex++) {
                    response.add(voucherIndex, new Voucher(res[voucherIndex]));
                }
                resolve(response);
            })
        });
    }

    /**
     * Get vouchers based on a voucher code
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @param {User} user User object
     * @returns {Promise<Response<Voucher>>}
     */
    static getVoucherByCode(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/code/' + voucher.voucherCode)
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/code/' + voucher.voucherCode)
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(new Voucher(res));
                resolve(response);
            })
        });
    }

    /**
     * Get voucher details based on a voucher code
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @returns {Promise<Response<Voucher>>}
     */
    static getVoucherDetailsByCode(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/' + voucher.voucherCode)
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/' + voucher.voucherCode)
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let voucherIndex = 0; voucherIndex < res.length; voucherIndex++) {
                    response.add(voucherIndex, new Voucher(res[voucherIndex]));
                }
                resolve(response);
            })
        });
    }

    /**
     * Get printable voucher details based on a voucher code
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @param {User} user User object
     * @returns {Promise<Response<Voucher>>}
     */
    static getVoucherPrintable(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/' + voucher.voucherCode + '/print')
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/' + voucher.voucherCode + '/print')
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let voucherIndex = 0; voucherIndex < res.length; voucherIndex++) {
                    response.add(voucherIndex, new Voucher(res[voucherIndex]));
                }
                resolve(response);
            })
        });
    }

    /**
     * Get redeem instructions of a voucher based on voucher code
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @param {User} user User object
     * @returns {Promise<Response<Voucher>>}
     */
    static getVoucherRedeemInstructions(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/' + voucher.voucherCode + '/redeemInstructions')
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/' + voucher.voucherCode + '/redeemInstructions')
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for (let voucherIndex = 0; voucherIndex < res.length; voucherIndex++) {
                    response.add(voucherIndex, new Voucher(res[voucherIndex]));
                }
                resolve(response);
            })
        });
    }

    /**
     * Get vouchers of a user based on page
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @param {User} user User object
     * @returns {Promise<Response<Voucher>>}
     */
    static getPaginatedVouchers(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/'+voucher.page)
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/'+voucher.page)
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for (let voucherIndex = 0; voucherIndex < res.length; voucherIndex++) {
                    response.add(voucherIndex, new Voucher(res[voucherIndex]));
                }
                resolve(response);
            })
        });
    }

    /**
     * Get vouchers of a user based on page and page size
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @param {User} user User object
     * @returns {Promise<Response<Voucher>>}
     */
    static getPaginatedVouchersWithPageSize(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/'+voucher.page+'/'+voucher.pageSize)
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/'+voucher.page+'/'+voucher.pageSize)
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for (let voucherIndex = 0; voucherIndex < res.length; voucherIndex++) {
                    response.add(voucherIndex, new Voucher(res[voucherIndex]));
                }
                resolve(response);
            })
        });
    }

    /**
     * Gets Voucher details
     * Mandatory fields should be set using the Builder : withHostName(user.environment) and all mandatory fields.  See Swagger UI.
     * @param {Voucher} voucher Voucher object
     * @param {User} user User object
     * @returns {Promise<Response<VoucherDetails>>}
     */
    static getVoucherDetails(voucher, user) {
        let httpHeader = new HttpsHeader();
        if (user.brand === "living-social") {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/'+voucher.voucherCode)
                .withBrand(user.brand)
                .withApiAuthToken(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }
        else {
            httpHeader = httpHeader.createHeader()
                .withHostName(user.environment)
                .withMethod('GET')
                .withPath(path + '/'+voucher.voucherCode)
                .withBrand(user.brand)
                .withWowcherUser(user.apiAuthToken)
                .withCountryCode('GB')
                .withAccept('application/json')
                .withContentType('application/json');
        }

        return new Promise(function (resolve) {
            HttpsRequest.get(httpHeader).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                let voucherDetail = new VoucherDetail(res);
                response.add(voucherDetail);
                resolve(response);
            })
        });
    }
}
module.exports = VoucherService;