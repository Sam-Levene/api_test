const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const MainDeal = require ("../../services/deal/main-deal");
const Response = require ("../../support/class/response");
const Query = require("../../support/class/query");
const Deal = require ("../../services/deal/deal");
const DealMap = require("./utils/deal-map");
const searchPath = '/v1/search';
const path = '/v1/deal';

/**
 * The Deal API
 * @class
 * @hideconstructor
 */
class DealService {

    /**
     * Get Deal Recommendations by a User's customerToken. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealRecommendations(deal) {
        let httpsHeader = new HttpsHeader();
        let queryString = new Query(deal);
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.ct + "/recommendations" + queryString.toString())
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.body.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }
    /**
     * Get Gift-finder Deal by location, category and ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getGiftFinderDeal(deal) {
        let httpsHeader = new HttpsHeader();
        let queryString = new Query(deal);
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/gift-finder" + queryString.toString())
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }
    /**
     * Get Deal by Deal ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<MainDeal>>}
     */
    static getDealById(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.id)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(new MainDeal(res));
                resolve(response);
            })
        })
    }
    /**
     * Get Redemption Info for a Deal by Deal ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getRedemptionInfoDealById(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.id + "/redemption-info")
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.length; index++) {
                    response.add(new Deal(res[index]))
                }
                resolve(response);
            })
        })
    }

    /**
     * Get Live Deals by Deal ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getLiveDealsById(deal) {
        let httpsHeader = new HttpsHeader();
        let queryString = new Query(deal);
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/live" + queryString.toString())
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(index, new MainDeal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }

    /**
     * Get Deal by location. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} locationDeal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealsByLocation(locationDeal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(locationDeal.environment)
            .withMethod('GET')
            .withPath(path + "/" + locationDeal.location)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                locationDeal.canonicalUrl = res.canonicalUrl;
                locationDeal.mainDeal = new MainDeal(res.mainDeal);
                for(let dealIndex = 0; dealIndex < res.deals.length; dealIndex++) {
                    locationDeal.deals.set(dealIndex, new Deal(res.deals[dealIndex]));
                }
                response.add(locationDeal);
                resolve(response);
            })
        })
    }

    /**
     * Get Deal by location and category. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealByLocationAndCategory(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/" + deal.category)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.length; index++) {
                    response.add(new Deal(res[index]))
                }
                resolve(response);
            })
        })
    }
    /**
     * Get Deal by location and ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealByLocationAndId(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/" + deal.id)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }
    /**
     * Get Deal by location, category and ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealByLocationCategoryAndId(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/" + deal.category + "/" + deal.id)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }
    /**
     * Get Deal by location, category and subcategory. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealBySubcat(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/" + deal.category + "/" + deal.subCat)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }

    /**
     * Get Deal by location, category, subcategory and ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getDealBySubcatAndId(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/" + deal.category + "/" + deal.subCat + "/" + deal.id)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }

    /**
     * Get related deal by location, category and subcategory category and ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getRelatedDealBySubcat(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/" + deal.category + "/" + deal.subCat + "/related")
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                if (res.deals === undefined) {
                    resolve(response)
                }
                else {
                    for (let index = 0; index < res.deals.length; index++) {
                        response.add(new Deal(res.deals[index]))
                    }
                    resolve(response);
                }
            })
        })
    }
    /**
     * Get Special Deal by location, category and ID. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getSpecialDeal(deal) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(path + "/" + deal.location + "/special/" + deal.searchTag)
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }

    /**
     * Get Deal by searched term. This is equivalent of searching by location and free text. Deal should be set by the Deal Builder : withField(field)
     * @param {Deal} deal Deal Object
     * @returns {Promise<Response<Deal>>}
     */
    static getSearchedDeal(deal) {
        let httpsHeader = new HttpsHeader();
        let queryString = new Query(deal);
        let header = httpsHeader.createHeader()
            .withHostName(deal.environment)
            .withMethod('GET')
            .withPath(searchPath + "/" + deal.location + queryString.toString())
            .withBrand("wowcher")
            .withCountryCode("GB")
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.deals.length; index++) {
                    response.add(new Deal(res.deals[index]))
                }
                resolve(response);
            })
        })
    }


}
module.exports = DealService;