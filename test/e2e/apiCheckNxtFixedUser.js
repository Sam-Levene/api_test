const chai = require('chai');
const expect = chai.expect;
const LocationService = require ("../../api/services/location/location-service");
const Token = require("../../api/services/payment/token");
const DealService = require ("../../api/services/deal/deal-service");
const Address = require ("../../api/services/address/address");
const AddressService = require ("../../api/services/address/address-service");
const AddressSupport = require ("../../api/support/class/address");
const Business = require ("../../api/services/business/business");
const BusinessService = require ("../../api/services/business/business-service");
const Email = require ("../../api/services/email/email");
const EmailService = require ("../../api/services/email/email-service");
const Robot = require ("../../api/services/robot/robot");
const RobotService = require ("../../api/services/robot/robot-service");
const Navigation = require ("../../api/services/navigation/navigation");
const NavigationService = require ("../../api/services/navigation/navigation-service");
const Category = require ("../../api/services/category/category");
const CategoryService = require ("../../api/services/category/category-service");
const LocationDeal = require("../../api/services/deal/location-deal");
const Deal = require("../../api/services/deal/deal");
const VoucherService = require ("../../api/services/voucher/voucher-service");
const BasketService = require ("../../api/services/basket/basket-service");
const PaymentService = require("../../api/services/payment/payment-service");
const CsPaymentType = require("../../api/services/payment/utils/cs-payment-type");
const ApiServiceUser = require ("../../api/services/user/user-service");
const UserUtilities = require("../../api/services/user/utils/user");
const Location = require("../../api/services/location/location");
const HttpResponseCodes = require("../../api/support/https/http-response-codes");
const Random = require('../../api/support/class/random');
const Basket = require("../../api/services/basket/basket");
const Product = require('../../api/services/basket/product');
const RegistrationUtilities = require('../../api/services/user/utils/registration');
const LoginService = require ("../../api/services/login/login-service");
const UniversalStorage = require("../../api/support/class/universal-storage");

// Globals

let wowcherUser = UserUtilities.generateWowcherUser(process.env.PUBLIC_ENDPOINT);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.env.PUBLIC_ENDPOINT);
let customerToken = '';
let mainDealId = '';
let dealIdList = '';
let location = undefined;
let product1Id = '';
let product2Id = '';
let product3Id = '';
let dealsByLocation = '';
let nextDeal = undefined;
let totalPrice = '';
let basket = undefined;
let basketIdentifier = '';
let product1 = undefined;
let product2 = undefined;
let product3 = undefined;
let cybersourceToken = '';
let actualCSToken = '';
let myPaymentType = '';

describe("Site Check", async function() {

    it("i.   Registers a new Subscriber", function(){
        let subscribedEmail = new Email.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withEmail(RegistrationUtilities.generateEmail())
            .withLocation('london')
            .build();

        return EmailService.registerEmail(subscribedEmail).then((response) => {
            //console.log('registerEmail '+JSON.stringify(response));
            expect(response.entries()).to.not.equal(0);
            expect(response.get().message).to.equal('Subscribed successfully');
            expect(response.get().newEmail).to.equal(true);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("ii.    Logs in as a Registered User", async function () {
        wowcherUser.setEmail(process.env.USER);
        wowcherUser.setPassword(process.env.PASSWORD);

        return LoginService.login(wowcherUser).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("iii.    Retrieves all Robots", async function () {
        let robot =  new Robot.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withBrand('wowcher')
            .build();
        return RobotService.getAllRobots(robot).then((response) => {
            expect(response.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(robot.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("iv.     Retrieves navigation items by Location", async function () {
        let navigation = new Navigation.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withLocation("london")
            .build();

        return NavigationService.getNavigationByLocation(navigation).then((response) =>{
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(navigation.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("v.    Looks up address using random postcode", async function () {
        let addressSupport = new AddressSupport.Builder().build();
        let postCode =  new Address.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withPostCode(addressSupport.getRandomPostcode())
            .build();
        return AddressService.getAddress(postCode).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().address).to.not.equal("No matches");
            for( let index = 0; index < response.entries(); index++) {
                expect( response.get(index).isPopulated()).to.equal(true);
            }
        });
    }).timeout(10000);

    it("vi.   Locates business by Identifier", async function () {
        let business =  new Business.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withID('16521877')
            .withBrand('wowcher')
            .withCountryCode('gb')
            .build();

        return BusinessService.getBusinessByID(business).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(business.isPopulated()).to.equal(true);
            expect(response.get().canonicalUrl).not.to.equal(undefined);
            expect(response.get().business).not.to.equal(undefined);
            expect(response.get().deals).not.to.equal(undefined);
            expect(response.get().similarDeals).not.to.equal(undefined);

        });
    }).timeout(10000);

    it("vii.  Retrieves all Categories", async function () {
        let category =  new Category.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
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

    it("viii.    Retrieves all Locations", async function () {

        let locations = new Location.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .build();

        return LocationService.getAllLocations(locations).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);

            for (let loc of response.map.values()) {
                expect(loc.isPopulated()).to.equal(true);
            }
            location = Random.map(response.map).shortName;
        });
    }).timeout(10000);

    it("ix.     Retrieves Deal by Location", async function () {
        let locationDeals = new LocationDeal.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withBrand("wowcher")
            .withLocation(location)
            .build();

        return DealService.getDealsByLocation(locationDeals).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);

            dealsByLocation = response.get();
            expect(dealsByLocation.isPopulated()).to.equal(true);

            for (let deal of dealsByLocation.deals.values()) {
                expect(deal.isPopulated()).to.equal(true);
            }
            // Using dealsByLocation which will have a mail deal and subsidiary deals
            // compile a set of product identifiers

            mainDealId = dealsByLocation.getMainDealID();
            dealIdList = dealsByLocation.getDealIds();
            totalPrice = dealsByLocation.mainDeal.products[0].totalPrice;
            product1Id = dealsByLocation.mainDeal.products[0].id;
            nextDeal = dealsByLocation.deals.get(0).id;
        });
    }).timeout(10000);

    it("x.    Retrieves Deals by Identifiers", async function () {

        let deal = new Deal.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withBrand("wowcher")
            .withID(nextDeal)
            .build();

        return DealService.getDealById(deal).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);

            let dealById = response.get();

            expect(dealById.isPopulated()).to.equal(true);

            product2Id = dealById.products[0].id;

            nextDeal = dealsByLocation.deals.get(1).id;
            deal = new Deal.Builder()
                .withEnvironment(process.env.PUBLIC_ENDPOINT)
                .withBrand("wowcher")
                .withID(nextDeal)
                .build();

            return DealService.getDealById(deal).then((response) => {
                expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
                expect(response.entries()).to.not.equal(0);

                dealById = response.get();

                expect(dealById.isPopulated()).to.equal(true);

                product3Id = dealById.products[0].id;
            });
        });
    }).timeout(10000);

    it("xi.   Creates a Basket with Products", async function () {
        product1 = new Product.Builder()
            .withProductId(product1Id)
            .withDealId(mainDealId)
            .withQuantity(1)
            .withPayDeposit(false)
            .withGift(false)
            .build();
        product2 = new Product.Builder()
            .withProductId(product2Id)
            .withDealId(dealIdList.get(0))
            .withQuantity(1)
            .withPayDeposit(false)
            .withGift(false)
            .build();

        product3 = new Product.Builder()
            .withProductId(product3Id)
            .withDealId(dealIdList.get(1))
            .withQuantity(1)
            .withPayDeposit(false)
            .withGift(false)
            .build();

        basket = new Basket.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withBrand('wowcher')
            .withCustomerToken(customerToken)
            .withProducts(
                [
                    product1.jsonThis(),
                    product2.jsonThis(),
                    product3.jsonThis()
                ]
            )
            .build();

        //Creates a new basket for a registered user

        return BasketService.createNewBasket(basket).then((response) => {
            expect(HttpResponseCodes.isCreated(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
            basketIdentifier = response.get().id;
            basket.id = basketIdentifier;
        });
    }).timeout(10000);

    it("xii.  Retrieves a Basket By Identifier", async function () {
        let basketWithIdentifier = new Basket.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withId(basketIdentifier)
            .build();

        return BasketService.getBasketByID(basketWithIdentifier).then((res) => {
            expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
            expect(res.entries()).to.not.equal(0);
            expect(res.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("xiii.   Removes Basket Product by Identifier", async function () {

        return BasketService.deleteProductFromBasket(basket).then((res) => {
            expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("xiv.    Removes all Basket Products by Identifier", async function () {
        let basketWithIdentifier = new Basket.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withId(basketIdentifier)
            .build();


        return BasketService.deleteAllProductsFromBasket(basket).then((res) => {
            expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("xv.   Deletes Basket by Identifier", async function () {
        let basketWithIdentifier = new Basket.Builder()
            .withEnvironment(process.env.PUBLIC_ENDPOINT)
            .withId(basketIdentifier)
            .build();

        return BasketService.deleteBasket(basket).then((res) => {
            expect(HttpResponseCodes.isOK(res.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    it("xvi.  Obtains a token from Payment API", async function() {
        // Payment
        // -> With the previously generated user, make a payment with default card information (4111-1111-1111-1111).
        wowcherUser.environment = process.env.PAYMENT_ENDPOINT;
        return PaymentService.getCyberSourceToken(wowcherUser).then((tokenResponse) => {
            expect(HttpResponseCodes.isOK(tokenResponse.statusCode)).to.equal(true);
            cybersourceToken = new Token.Builder()
                .withKeyId(tokenResponse.map.get(0).clientToken)
                .withCardInfo(UserUtilities.cardInfo())
                .build();
        });
    }).timeout(10000);

    it ("xvii. Uses the Payment API token to get an actual Cybersourse token from Cybersource with card information", async function() {
        return PaymentService.getActualCSToken(cybersourceToken).then((newTokenResponse) => {
            expect(HttpResponseCodes.isOK(newTokenResponse.statusCode)).to.equal(true);
            actualCSToken = newTokenResponse.map.get(0).token;
            myPaymentType = CsPaymentType.generatePaymentBody(totalPrice, product1Id, actualCSToken);
        });
    }).timeout(10000);

    it("xviii. Makes a payment using the new Cybersource token and deal information", async function() {
        return PaymentService.getCyberSourcePayment(myPaymentType, wowcherUser.apiAuthToken, wowcherUser.environment).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            wowcherUser.environment = process.env.PUBLIC_ENDPOINT;
        });
    }).timeout(10000);

    it("xix.  Retrieves Customer Vouchers", async function () {
        // Voucher
        // -> With the previously generated user, get their voucher codes *NOTE* this requires a purchase to have been made.
        return VoucherService.getVouchersForUser(wowcherUser).then((voucherResponse) => {
            //console.log("getVouchersForUser status code : "+voucherResponse.statusCode);
            expect(HttpResponseCodes.isOK(voucherResponse.statusCode)).to.equal(true);
        });
    }).timeout(10000);
});