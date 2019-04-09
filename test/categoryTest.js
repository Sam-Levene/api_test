const CategoryService = require ("../api/services/category/category-service");
const chai = require('chai');
const expect = chai.expect;
const Category = require("../api/services/category/category");
const HttpResponseCodes = require("../api/support/https/http-response-codes");


describe("Get categories", async function() {

    it("Successfully gets all sub categories", async function () {
        let category =  new Category.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .build();
        return CategoryService.getAllCategories(category).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            for (let [i = 0] of response.getMap()) {
                expect(response.get(i).id).not.to.equal(undefined);
                expect(response.get(i).name).not.to.equal(undefined);
                expect(response.get(i).shortName).not.to.equal(undefined);
                expect(response.get(i).position).not.to.equal(undefined);
                expect(response.get(i).dealCategories).not.to.equal(undefined);
                expect(response.get(i).subCategories).not.to.equal(undefined);
                i++;
            }
        });
    }).timeout(10000);

    it("Gets location of deal category by specific ID", async function() {
        let category = new Category.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId(42)
            .build();
        return CategoryService.getDealCategoryLocationById(category).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(category.isPopulated()).to.equal(true);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Gets location of sub categories by specific ID", async function() {
        let category = new Category.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId(42)
            .build();
        return CategoryService.getSubCategoryLocationById(category).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(category.isPopulated()).to.equal(true);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

});