const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Category = require ("./category");
const DealCategory = require ("./deal-category");
const CategoryLocation = require ("./category-location.js");
const SubCategory = require ("./subcategory");
const RelatedSubCategory = require ("./related-subcategory");
const path = '/v1/category';

/**
 * The Category API
 * @class
 * @hideconstructor
 */
class CategoryService {
    /**
     * Get all Categories
     * @param {Category} category Category object
     * @returns {Promise<Response<Category>>}
     */
    static getAllCategories(category) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(category.environment)
            .withMethod('GET')
            .withPath(path)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve){
            HttpsRequest.get(header).then((res) => {
                category.update(res);
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let categoryIndex = 0; categoryIndex < res.length; categoryIndex++) {
                    response.add(categoryIndex, new Category(res[categoryIndex]));
                }
                resolve(response);
            })
        })
    }
    /**
     * Get Deal category location by specific ID
     * @param {Category} category Category object
     * @returns {Promise<Category>}
     */
    static getDealCategoryLocationById(category) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(category.environment)
            .withMethod('GET')
            .withPath(path)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let categoryIndex = 0; categoryIndex < res.length; categoryIndex++) {
                    if (res[categoryIndex].id === category.id) {
                        category.update(res[categoryIndex]);
                        for(let dealCategoryIndex = 0; dealCategoryIndex < res[categoryIndex].dealCategories.length; dealCategoryIndex++) {
                            for(let locationIndex = 0; locationIndex < res[categoryIndex].dealCategories[dealCategoryIndex].locations.length; locationIndex++) {
                                response.add(locationIndex, res[categoryIndex].dealCategories[dealCategoryIndex].locations[locationIndex])
                            }
                        }
                    }
                }
                resolve(response);
            })
        })
    }

    /**
     * Get Sub category location by specific ID
     * @param {Category} category Category object
     * @returns {Promise<Category>}
     */
    static getSubCategoryLocationById(category) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(category.environment)
            .withMethod('GET')
            .withPath(path)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let categoryIndex = 0; categoryIndex < res.length; categoryIndex++) {
                    if (res[categoryIndex].id === category.id) {
                        category.update(res[categoryIndex]);
                        for(let dealCategoryIndex = 0; dealCategoryIndex < res[categoryIndex].subCategories.length; dealCategoryIndex++) {
                            for(let locationIndex = 0; locationIndex < res[categoryIndex].subCategories[dealCategoryIndex].locations.length; locationIndex++) {
                                response.add(locationIndex, res[categoryIndex].subCategories[dealCategoryIndex].locations[locationIndex])
                            }
                        }
                    }
                }
                resolve(response);
            })
        })
    }
}

module.exports = CategoryService;



