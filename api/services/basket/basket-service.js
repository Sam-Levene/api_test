const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Basket = require ("./basket");
const Query = require("../../support/class/query");
const path = '/v1/basket';
/**
 * The Basket API
 * @class
 * @hideconstructor
 */
class BasketService {

    /**
     * Create Basket
     * Mandatory fields should be set using the Builder : withHostName(basket.environment) and all mandatory fields. See Swagger UI
     * @param {Basket} basket Basket Object
     * @returns {Promise<Basket>}
     */
    static createNewBasket(basket) {
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('POST')
            .withPath(path)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(httpsHeader, basket.generateBody()).then(() => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.setIdFromLocationUrl(HttpsRequest.getResponseHeaders().location);
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }


    /**
     * Get Basket Details By CustomerToken
     * Mandatory fields should be set using the Builder :  withHostName(user.environment) and withCustomerToken(user.customerToken)
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static getBasketByCustomerToken(basket) {
        let queryString = new Query(basket);
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('GET')
            .withBrand('wowcher')
            .withCustomerToken(basket.customerToken)
            .withPath(path + queryString.toString())
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                basket.update(res);
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /**
     * Get Basket by ID
     * Mandatory fields should be set using the Builder :  withHostName(user.environment) and withId(user.customerToken)
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static  getBasketByID(basket){
        let basketPathById = path + '/' + basket.id;
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('GET')
            .withBrand('wowcher')
            .withPath(basketPathById)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then(() => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /**
     * Add product to Basket
     * Mandatory fields should be set using the Builder : withId(basket.Id)
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static AddProductToBasket(basket){
        let basketPath = path + '/' + basket.id;
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('PATCH')
            .withId(basket.id)
            .withPath(basketPath)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.patch(httpsHeader, basket.generateBodies()).then(() => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /**
     * Replace Basket
     * Mandatory fields should be set using the Builder : withId(basket.Id)
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static replaceBasketProduct(basket){
        let basketPath= path + '/' + basket.id;
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('PUT')
            .withId(basket.id)
            .withPath(basketPath)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function(resolve){
            HttpsRequest.put(httpsHeader, basket.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.update(res);
                response.add(new Basket(basket));
                resolve(response);
            });
        })
    }

    /**
     * Delete product from Basket
     * Mandatory fields should be set using the Builder : withId(basket.Id) and withProductId()
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static deleteProductFromBasket(basket) {
        let basketPath= path + '/' + basket.id + '/product/' + basket.products[0].id;
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('DELETE')
            .withPath(basketPath)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.delete(httpsHeader, basket.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.update(res);
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /**
     * This endpoint will return the basket product for the given BasketId and ProductId
     * Mandatory fields should be set using the Builder : withId(basket.Id) and withProductId()
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static getBasketProductByID(basket){
        let basketPathById = path + '/' + basket.id + '/product/' + basket.products[0].id;
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('GET')
            .withBrand('wowcher')
            .withPath(basketPathById)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then(() => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /***
     * Retrieve a Basket product by BasketId and ProductId
     * Mandatory fields should be set using the Builder : withId(basket.Id) and withProductId()
     * @param basket
     * @returns {Promise<Response<Basket>>}
     */
    static replaceBasketByID(basket){
        let basketPath= path + '/' + basket.customerToken;
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('PUT')
            .withId(basket.customerToken)
            .withPath(basketPath)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');
        return new Promise(function(resolve){
            HttpsRequest.put(httpsHeader, basket.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.update(res);
                response.add(new Basket(basket));
                resolve(response);
            });
        })
    }

    /**
     * Patch a basket product by given BBasketId and ProductId
     * Mandatory fields should be set using the Builder : withId(basket.Id), withProductId(), withProductBody()
     * @param basket
     * @returns {Promise<Response<Basket>>}
     */
    static updateBasketProduct(basket){
        let basketPathById = path + '/' + basket.id + '/product/' + basket.products[0].id;
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('PATCH')
            .withPath(basketPathById)
            .withId(basket.id)
            .withProductId(basket.products[0].id)
            .withAccept('application/json')
            .withContentType('application/json');
        let body = basket.products[0];

        return new Promise(function (resolve){
            HttpsRequest.patch(httpsHeader, JSON.stringify(body)).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.update(res);
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /**
     * Delete all products from Basket
     * Mandatory fields should be set using the Builder : withId(basket.Id)
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static deleteAllProductsFromBasket(basket){
        let basketPath= path + '/' + basket.id + '/product';
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('DELETE')
            .withPath(basketPath)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.delete(httpsHeader, basket.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.update(res);
                response.add(new Basket(basket));
                resolve(response);
            });
        });
    }

    /**
     * Delete a Basket
     * Mandatory fields should be set using the Builder : withId(basket.Id)
     * @param {Basket} basket Basket object
     * @returns {Promise<Response<Basket>>}
     */
    static deleteBasket(basket){
        let basketPath= path + '/' + basket.id;
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('DELETE')
            .withPath(basketPath)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.delete(httpsHeader, basket.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                basket.update(res);
                resolve(response);
            });
        });
    }

    /**
     * Create Basket with existing CustomerToken
     * Mandatory fields should be set using the Builder : withHostName(basket.environment) and all mandatory fields. See Swagger UI
     * @param {Basket} basket Basket Object
     * @returns {Promise<Basket>}
     */
    static createNewBasketWithExistingCustomerToken(basket) {
        let httpsHeader = new HttpsHeader();
        httpsHeader = httpsHeader.createHeader()
            .withHostName(basket.environment)
            .withMethod('POST')
            .withPath(path)
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.post(httpsHeader, basket.toJsonString()).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).withResponseHeaders(HttpsRequest.getResponseHeaders()).build();
                resolve(response);
            });
        });
    }

}
module.exports = BasketService;