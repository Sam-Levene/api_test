const chai = require('chai');
const expect = chai.expect;
const Token = require("../../api/services/payment/token");
const DealService = require ("../../api/services/deal/deal-service");
const LocationDeal = require("../../api/services/deal/location-deal");
const VoucherService = require ("../../api/services/voucher/voucher-service");
const PaymentService = require("../../api/services/payment/payment-service");
const CsPaymentType = require("../../api/services/payment/utils/cs-payment-type");
const ApiServiceUser = require ("../../api/services/user/user-service");
const UserUtilities = require("../../api/services/user/utils/user");
const HttpResponseCodes = require("../../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.env.ENVIRONMENT);


describe("User Journey with CyberSource CreditCard", async function() {

    it("Registers successfully and pays for a deal via CyberSource", async function () {
        let deal = new LocationDeal.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withLocation("london")
            .build();

        // Register & Login
        return ApiServiceUser.registerUser(wowcherUser).then((res) => {
            let authToken = res.map.get(0).apiAuthToken;

            // Deal
            return DealService.getDealsByLocation(deal).then((response) => {
                let productId = response.map.get(0).mainDeal.products[0].id;
                let totalPrice = response.map.get(0).mainDeal.products[0].totalPrice;
                wowcherUser.environment = process.env.ENVIRONMENT02;

                // Payment
                // -> Get token by token-cs
                return PaymentService.getCyberSourceToken(wowcherUser).then((tokenResponse) => {
                    let cybersourceToken = new Token.Builder()
                        .withKeyId(tokenResponse.map.get(0).clientToken)
                        .withCardInfo(UserUtilities.cardInfo())
                        .build();

                    // -> Use card details to CS (3rd party endpoint) to get CS token
                    return PaymentService.getActualCSToken(cybersourceToken).then((newTokenResponse) => {
                        let csToken = newTokenResponse.map.get(0).token;
                        let myPaymentType = CsPaymentType.generatePaymentBody(totalPrice, productId, csToken);

                        // -> Make a purchase of the specified deal, token and user
                        return PaymentService.getCyberSourcePayment(myPaymentType, authToken, wowcherUser.environment).then(() => {
                            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
                            wowcherUser.environment = process.env.ENVIRONMENT;

                            // Voucher
                            // -> With the previously generated user, get their voucher codes *NOTE* this requires a purchase to have been made.
                            return VoucherService.getVouchersForUser(wowcherUser).then((voucherResponse) => {
                                expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
                                expect(voucherResponse.map.get(0).dealId).to.equal(response.map.get(0).mainDeal.id);
                                let voucherCode = voucherResponse.map.get(0).voucherCode;
                            });
                        })
                    })
                })
            })
        })
    }).timeout(10000);
});