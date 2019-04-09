const ApiBasketService = require ("../api/services/basket/basket-service");
const chai = require('chai');
const expect = chai.expect;
const Basket = require("../api/services/basket/basket");
const Product = require('../api/services/basket/product');
const HttpResponseCodes = require("../api/support/https/http-response-codes");
const ApiServiceUser = require("../api/services/user/user-service");
const ApiServiceLogin = require("../api/services/login/login-service");
const UserUtilities = require("../api/services/user/utils/user");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
let basket = new Basket.Builder()
    .withEnvironment(process.env.ENVIRONMENT)
    .withId('')
    .withBrand('wowcher')
    .withProducts([new Product.Builder()
        .withProductId('892936')
        .withDealId('6612236')
        .withQuantity('1')
        .withPayDeposit(false)
        .withGift(false)
        .build().jsonThis()]
    )
    .build();

let productToAdd = new Product.Builder()
    .withProductId('852277')
    .withDealId('9616420')
    .withQuantity('1')
    .withPayDeposit(false)
    .withGift(false)
    .build();

 describe("Basket Endpoints", async function() {
   it("Creates an object builder", function () {
        let firstBasket = new Basket.Builder()
            .withId('1')
            .withCustomerToken("3a5d9eb5-400e-4cfb-9453-308391cbf37d")
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('658959')
                .withDealId('8105707')
                .withQuantity('1')
                .withPayDeposit(false)
                .withGift(false)
                .withCheckInDate('01-01-2018')
                .withCheckOutDate('01-01-2018')
                .build().jsonThis()]
            )
            .build();

       let secondBasket = new Basket.Builder()
            .withId('1')
            .withCustomerToken('3a5d9eb5-400e-4cfb-9453-308391cbf37d')
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('658959')
                .withDealId('8105707')
                .withQuantity('1')
                .withPayDeposit(false)
                .withGift(false)
                .withCheckInDate('01-01-2018')
                .withCheckOutDate('01-01-2018')
                .build().jsonThis()]
            )
            .build();

       let thirdBasket = new Basket.Builder()
            .withId('123456')
            .withCustomerToken('287f11c7-0a18-426b-935c-d3d15b3dd29a')
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('454545')
                .withDealId('999999')
                .withQuantity('3')
                .withPayDeposit(true)
                .withGift(true)
                .build().jsonThis()]
            )
            .build();

       expect(firstBasket.equals(firstBasket)).to.equal(true);
       expect(firstBasket.equals(secondBasket)).to.equal(true);
       expect(firstBasket.equals(thirdBasket)).to.equal(false);
    });

   it("Can create a new basket", async function(){
        //Login with user first before request to promocode end point is made
        await ApiServiceUser.registerUser(wowcherUser).then((result) => {
            expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);
            basket.customerToken = result.get().customerToken;
        });
        await ApiServiceLogin.login(wowcherUser).then((result) => {
            expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
        });

        return ApiBasketService.createNewBasket(basket).then((response) => {
            expect(HttpResponseCodes.isCreated(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

   it("Gets basket by customerToken", async function(){
       let customerBasket = new Basket.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withId(basket.id)
           .withCustomerToken(wowcherUser.customerToken)
           .withBrand('wowcher')
           .build();

       return ApiBasketService.getBasketByCustomerToken(customerBasket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
       });
    }).timeout(10000);

   it("Gets basket by id", async function(){
       return ApiBasketService.getBasketByID(basket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(response.get().id).to.equal(basket.id);
       });
    }).timeout(10000);

   it("Checks that basket is equal", async function(){
       let customerResponse = new Basket.Builder()
           .withId(basket.id)
           .withEnvironment(process.env.ENVIRONMENT)
           .withCustomerToken(wowcherUser.customerToken)
           .withBrand('wowcher')
           .build();
       let basketIDResponse = basket;

       await ApiBasketService.getBasketByCustomerToken(basket).then((customerResponse) => {
           expect(HttpResponseCodes.isOK(customerResponse.statusCode)).to.equal(true);
       });

        await ApiBasketService.getBasketByID(basket).then((basketIDResponse) =>{
            expect(HttpResponseCodes.isOK(basketIDResponse.statusCode)).to.equal(true);
        });
        expect(customerResponse.equals(basketIDResponse)).to.equal(true);
   });

   it("Adds a product to the Basket", async function(){
       let newBasket = new Basket.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withId(basket.id)
           .withBrand('wowcher')
           .withCustomerToken(null)
           .withProducts([productToAdd.jsonThis()])
           .build();

       await ApiBasketService.AddProductToBasket(newBasket).then((response) =>{
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
       });

       basket.products.push(productToAdd.jsonThis());

       return ApiBasketService.getBasketByID(basket).then((response) => {
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(response.get().id).to.equal(basket.id);
           expect(basket.productSize()).to.equal(2);
           expect(basket.isProductPresent(productToAdd));
       });
   }).timeout(10000);

   it("Get a Basket product by basket and product id", async function(){
       return ApiBasketService.getBasketProductByID(basket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(response.get().id).to.equal(basket.id);
           expect(basket.isProductPresent(productToAdd));
       });
   }).timeout(10000);

   it('Can delete product from basket', async function() {
       return ApiBasketService.deleteProductFromBasket(basket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           basket.products.shift();
           expect(basket.productSize()).to.equal(1);
       });
    }).timeout(10000);

   it("Can replace basket contents with the given id", async function(){
       let replacementProduct = new Product.Builder()
           .withProductId('636015')
           .withDealId('7926280')
           .withQuantity('1')
           .withPayDeposit(false)
           .withGift(false)
           .build();
       let replacementBasket = new Basket.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withId(basket.id)
           .withBrand('wowcher')
           .withCustomerToken(wowcherUser.customerToken)
           .withProducts([replacementProduct.jsonThis()])
           .build();

       await ApiBasketService.replaceBasketProduct(replacementBasket).then((response) =>{
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
       });

       return ApiBasketService.getBasketByID(replacementBasket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(response.get().id).to.equal(basket.id);
           expect(replacementBasket.productSize()).to.equal(1);
           expect(replacementBasket.isProductPresent(replacementProduct));
       });
   }).timeout(10000);

   it("Creates a new basket using PUT where basket id does not yet exist", async function(){
       let newBasket = new Basket.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withBrand('wowcher')
           .withProducts([new Product.Builder()
               .withProductId('639422')
               .withDealId('7943699')
               .withQuantity('1')
               .withPayDeposit(false)
               .withGift(false)
               .build().jsonThis()]
           )
           .build();

       let newWowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
       await ApiServiceUser.registerUser(newWowcherUser).then((result) => {
           expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);
           newBasket.customerToken = result.get().customerToken;
       });
       await ApiBasketService.replaceBasketByID(newBasket).then((response) => {
           expect(HttpResponseCodes.isCreated(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
       });
       return ApiBasketService.getBasketByCustomerToken(newBasket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
       });
   }).timeout(10000);

   it("Can patch a basket product by basket id and product id", async function(){
       let productToUpdate = new Product.Builder()
           .withProductId('892936')
           .withDealId('6612236')
           .withQuantity('2')
           .withPayDeposit(true)
           .withGift(true)
           .build();

       let basketProduct = new Basket.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .withId(basket.id)
           .withBrand('wowcher')
           .withCustomerToken(wowcherUser.customerToken)
           .withProducts([productToUpdate.jsonThis()])
           .build();

       return ApiBasketService.updateBasketProduct(basketProduct).then((response) => {
           console.log(response);
           console.log(basket.generateBodies());
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(basketProduct.productSize()).to.equal(1);
           expect(basketProduct.isProductPresent(productToUpdate));
       });
   }).timeout(10000);

   it("Delete all basket products by basket id", async function(){
       await ApiBasketService.deleteAllProductsFromBasket(basket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
       });
       basket.products.shift();
       return ApiBasketService.getBasketByID(basket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(response.get().id).to.equal(basket.id);
           expect(basket.productSize()).to.equal(0);
       });
   }).timeout(10000);

   it("Deletes basket by basket id", async function(){
       await ApiBasketService.deleteBasket(basket).then((response) => {
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.equal(0);
       });
       basket.products.shift();
       //Check basket no longer exists
       return ApiBasketService.getBasketByID(basket).then((response) => {
           expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           expect(response.get().isPopulated()).to.equal(true);
           expect(basket.productSize()).to.equal(0);
       });
   }).timeout(10000);

    it("Will return a 400 error if customer token is not provided", async function (){
        let duplicateBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand('wowcher')
            .build();
        return ApiBasketService.getBasketByCustomerToken(duplicateBasket).then((customerResponse) => {
            expect(HttpResponseCodes.isBadRequest(customerResponse.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 400 error if invalid request is sent when creating a basket", async function(){
        let invalidBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .withCustomerToken('287f11c7-0a18-426b-935c-d3d15b3dd29a')
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('0')
                .withDealId('0')
                .withQuantity('0')
                .withPayDeposit(false)
                .withGift(false)
                .build().jsonThis()]
            )
            .build();
        return ApiBasketService.createNewBasket(invalidBasket).then((response) => {
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 409 error code when Basket with customer token already exists", async function(){
        let duplicateBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withCustomerToken(wowcherUser.customerToken)
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('639422')
                .withDealId('7943699')
                .withQuantity('1')
                .withPayDeposit(false)
                .withGift(false)
                .build().jsonThis()]
            )
            .build();
        // Create new basket
        await ApiBasketService.createNewBasket(basket).then((response) => {
            expect(HttpResponseCodes.isCreated(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
        return ApiBasketService.createNewBasketWithExistingCustomerToken(duplicateBasket).then((response) => {
            expect(HttpResponseCodes.isConflict(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("will return a 404 error when trying to delete a basket that does not exist", async function() {
        let basket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .build();
        return ApiBasketService.deleteBasket(basket).then((response) => {
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.equal(0);
        });

    }).timeout(10000);

    it("Will return a 400 error code when invalid request is sent when patching a basket", async function(){
        let invalidBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .withCustomerToken('287f11c7-0a18-426b-935c-d3d15b3dd29a')
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('0')
                .withDealId('0')
                .withQuantity('0')
                .withPayDeposit(false)
                .withGift(false)
                .build().jsonThis()]
            )
            .build();
        return ApiBasketService.AddProductToBasket(invalidBasket).then((response) =>{
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("will return a 404 error when trying to patch a basket that does not exist", async function() {
        let invalidBasket = new Basket.Builder()
        .withEnvironment(process.env.ENVIRONMENT)
        .withId('4884d670-9712-41a6-acd1-374e142efb1d')
        .withCustomerToken(wowcherUser.customerToken)
        .withBrand('wowcher')
        .withProducts([new Product.Builder()
            .withProductId('0')
            .withDealId('0')
            .withQuantity('0')
            .withPayDeposit(false)
            .withGift(false)
            .build().jsonThis()]
        )
        .build();
        return ApiBasketService.AddProductToBasket(invalidBasket).then((response) =>{
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("will return a 409 error when trying to patch a basket that ", async function() {
        let invalidBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .withCustomerToken(wowcherUser.customerToken)
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('0')
                .withDealId('0')
                .withQuantity('0')
                .withPayDeposit(false)
                .withGift(false)
                .build().jsonThis()]
            )
            .build();
        return ApiBasketService.AddProductToBasket(invalidBasket).then((response) =>{
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 404 error when trying to retrieve a basket by id where the id does not exist", async function(){
        let invalidBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .build();
        return ApiBasketService.getBasketByID(invalidBasket).then((response) => {
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 400 error code when invalid request is sent when replacing a basket", async function(){
        let invalidBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .withCustomerToken('287f11c7-0a18-426b-935c-d3d15b3dd29a')
            .withBrand('wowcher')
            .withProducts([new Product.Builder()
                .withProductId('0')
                .withDealId('0')
                .withQuantity('0')
                .withPayDeposit(false)
                .withGift(false)
                .build().jsonThis()]
            )
            .build();
        return ApiBasketService.replaceBasketProduct(invalidBasket).then((response) =>{
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return a 404 error code when trying to retrieve a basket and product id where the id does not exist", async function(){
        let invalidBasket = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .withProducts([new Product.Builder()
                .withProductId('0')
                .build().jsonThis()]
            )
            .build();
        return ApiBasketService.getBasketProductByID(invalidBasket).then((response) => {
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);

        });
    }).timeout(10000);

    it("Will return a 404 when trying to patch a basket product by basket id and product id, where basket id does not exist", async function(){
        let productToUpdate = new Product.Builder()
            .withProductId('000000')
            .build();

        let basketProduct = new Basket.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('4884d670-9712-41a6-acd1-374e142efb1d')
            .withBrand('wowcher')
            .withProducts([productToUpdate.jsonThis()])
            .build();

        return ApiBasketService.updateBasketProduct(basketProduct).then((response) => {
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);

        });
    }).timeout(10000);
});