const VoucherService = require ("../api/services/voucher/voucher-service");
const chai = require('chai');
const expect = chai.expect;
const User = require("../api/services/user/user");
const Voucher = require("../api/services/voucher/voucher");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let voucherCode = '';

describe("Voucher Endpoint", async function() {
    it("Creates an object builder", function () {
        let firstVoucher = new Voucher.Builder().withStatus('status').withOrderLineStatus('orderLineStatus').withDealId('dealId').build();
        let secondVoucher = new Voucher.Builder().withStatus('status').withOrderLineStatus('orderLineStatus').withDealId('dealId').build();
        let thirdVoucher = new Voucher.Builder().withStatus('new_status').withOrderLineStatus('new_orderLineStatus').withDealId('new_dealId').build();

        expect(firstVoucher.equals(firstVoucher)).to.be.true;
        expect(firstVoucher.equals(secondVoucher)).to.be.true;
        expect(firstVoucher.equals(thirdVoucher)).to.be.false;

    }).timeout(10000);

    it("Gets Vouchers for a user", async function () {
        let user =  new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withApiAuthToken('d293Y2hlcmF1dG9tYXRpb24rODk5MDg5NjlAZ21haWwuY29tOjE1NjQ2NTc4MjMwMDU6OTBhMDNiOTgyMWQ3NjM4NzI0MWJjYTgzMWU4Zjg5ZDM')
            .withBrand('wowcher')
            .build();

        return VoucherService.getVouchersForUser(user).then((response) => {
            //console.log(JSON.stringify(response.get()));
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.not.equal(0);
            expect(response.get().isPopulated()).to.equal(true);
            voucherCode = response.get().voucherCode;
        });
    }).timeout(10000);

    it("Gets Voucher by code", async function () {
        let user =  new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withApiAuthToken('d293Y2hlcmF1dG9tYXRpb24rODk5MDg5NjlAZ21haWwuY29tOjE1NjQ2NTc4MjMwMDU6OTBhMDNiOTgyMWQ3NjM4NzI0MWJjYTgzMWU4Zjg5ZDM')
            .withBrand('wowcher')
            .build();
        let voucher = new Voucher.Builder().withVoucherCode(voucherCode).build();

        return VoucherService.getVoucherByCode(voucher,user).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.equal(1);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets paginated Vouchers", async function () {
        let user =  new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withApiAuthToken('d293Y2hlcmF1dG9tYXRpb24rODk5MDg5NjlAZ21haWwuY29tOjE1NjQ2NTc4MjMwMDU6OTBhMDNiOTgyMWQ3NjM4NzI0MWJjYTgzMWU4Zjg5ZDM')
            .withBrand('wowcher')
            .build();
        let voucher = new Voucher.Builder().withVoucherCode(voucherCode).withPage(0).build();

        return VoucherService.getPaginatedVouchers(voucher,user).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.equal(1);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets paginated Vouchers with page size", async function () {
        let user =  new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withApiAuthToken('d293Y2hlcmF1dG9tYXRpb24rODk5MDg5NjlAZ21haWwuY29tOjE1NjQ2NTc4MjMwMDU6OTBhMDNiOTgyMWQ3NjM4NzI0MWJjYTgzMWU4Zjg5ZDM')
            .withBrand('wowcher')
            .build();
        let voucher = new Voucher.Builder().withVoucherCode(voucherCode).withPage(0).withPageSize(0).build();

        return VoucherService.getPaginatedVouchersWithPageSize(voucher,user).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.equal(1);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Gets Voucher details", async function () {
        let user =  new User.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withApiAuthToken('d293Y2hlcmF1dG9tYXRpb24rODk5MDg5NjlAZ21haWwuY29tOjE1NjQ2NTc4MjMwMDU6OTBhMDNiOTgyMWQ3NjM4NzI0MWJjYTgzMWU4Zjg5ZDM')
            .withBrand('wowcher')
            .build();
        let voucher = new Voucher.Builder().withVoucherCode('JNYRXC-TDETQ4').build();

        return VoucherService.getVoucherDetails(voucher,user).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.entries()).to.equal(1);
            expect(response.get().isPopulated()).to.equal(true);
        });
    }).timeout(10000);

});



