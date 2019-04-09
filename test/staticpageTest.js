const ApiStaticPageService = require ("../api/services/staticpage/staticpage-service");
const chai = require('chai');
const expect = chai.expect;
const StaticPage = require("../api/services/staticpage/staticpage");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let staticPageId = '997633';

describe("Get a Static Page", function(){
    it("Creates an object builder", function () {
       let firstStaticPage = new StaticPage.Builder()
           .withId('1')
           .withBrand('wowcher')
           .withUrl('/test')
           .build();

       let secondStaticPage = new StaticPage.Builder()
           .withId('1')
           .withBrand('wowcher')
           .withUrl('/test')
           .build();


        let thirdStaticPage = new StaticPage.Builder()
           .withId('123')
           .withBrand('brand')
           .withUrl('/third')
           .build();

       expect(firstStaticPage.equals(firstStaticPage)).to.equal(true);
       expect(firstStaticPage.equals(secondStaticPage)).to.equal(true);
       expect(firstStaticPage.equals(thirdStaticPage)).to.equal(false);
    });

    it("Gets Static Pages by id", async function(){
        let staticPage = new StaticPage.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId(staticPageId)
            .withBrand('wowcher')
            .build();

        return ApiStaticPageService.getStaticPageByID(staticPage).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
            expect(response.get().id.toString()).to.equal(staticPageId);
        });
    }).timeout(10000);

    it("Will return a 404 error when invalid ID is passed", async function(){
        let staticPage = new StaticPage.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('111')
            .withBrand('wowcher')
            .build();

        return ApiStaticPageService.getStaticPageByID(staticPage).then((response) =>{
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(false);
        })
    }).timeout(10000);

    it("Gets static pages by url", async function(){
        let staticPage = new StaticPage.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withUrl('need-help.html')
            .withBrand('wowcher')
            .build();

        return ApiStaticPageService.getStaticPageByUrl(staticPage).then((response) =>{
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
            expect(response.get().id.toString()).to.equal(staticPageId);
        });
    }).timeout(10000);

    it("Will return a 404 error when invalid path is passed", async function(){
        let staticPage = new StaticPage.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withUrl('non-existant.html')
            .withBrand('wowcher')
            .build();

        return ApiStaticPageService.getStaticPageByUrl(staticPage).then((response) =>{
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(false);
        });
    }).timeout(10000);
});