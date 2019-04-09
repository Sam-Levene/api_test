const SailthruService = require ("../../api/services/sailthru/sailthru-service");
const chai = require('chai');
const expect = chai.expect;
const Sailthru = require("../../api/services/sailthru/sailthru");
const Response = require("../../api/support/class/response");
const HttpResponseCodes = require("../../api/support/https/http-response-codes");
let newResponse = new Response.Builder().build();
let oldDataDealResponse = new Response.Builder().build();
let oldDataLocationResponse = new Response.Builder().build();

describe("Gets Sailthru Deal Data", function() {
    it("Creates a Sailthru object via builder", function () {
        let firstSailthru = new Sailthru.Builder().withPath('/dealMerged').build();
        let secondSailthru = new Sailthru.Builder().withPath('/dealMerged').build();
        let thirdSailthru = new Sailthru.Builder().withPath('/email').build();

        expect(firstSailthru.equals(firstSailthru)).to.equal(true);
        expect(secondSailthru.equals(firstSailthru)).to.equal(true);
        expect(thirdSailthru.equals(firstSailthru)).to.equal(false);
        expect(firstSailthru.equals("I am not a Sailthru Object")).to.equal(false);
    }).timeout(10000);

    it("Queries the SailThu API and retrieves the new merged data feed", async function () {
        let sailThruQuery = new Sailthru.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPath("/dealMerged")
            .withSolus("false")
            .build();

        await SailthruService.getDealMerged(sailThruQuery).then((result) => {
            for (let i = 0; i < 10; i++) {
                newResponse.add(i, result.map.get(0).content[i]);
            }
        });

        sailThruQuery = new Sailthru.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPath("/email/dealdata")
            .build();

        await SailthruService.getDealMerged(sailThruQuery).then((result) => {
            for (let i = 0; i < result.map.get(0).content.length; i++) {
                for (let j = 0; j < newResponse.map.size; j++) {
                    if (result.map.get(0).content[i].deal_Id === newResponse.get(j).deal_Id) {
                        oldDataDealResponse.add(j, result.map.get(0).content[i]);
                    }
                }
            }
        });

        sailThruQuery = new Sailthru.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withPath("/email/deallocations")
            .build();

        await SailthruService.getDealMerged(sailThruQuery).then((result) => {
            for (let i = 0; i < result.map.get(0).content.length; i++) {
                for (let j = 0; j < newResponse.map.size; j++) {
                    if (result.map.get(0).content[i].DEAL_ID === newResponse.get(j).deal_Id) {
                        oldDataLocationResponse.add(j, result.map.get(0).content[i]);
                    }
                }
            }
        });

        for (let i = 0; i < newResponse.map.size; i++) {
            for (let j = 0; j < oldDataDealResponse.map.size; j++) {
                for (let k = 0; k < oldDataLocationResponse.map.size; k++) {
                    if (newResponse.map.get(i).deal_Id === oldDataDealResponse.map.get(j).deal_Id && newResponse.map.get(i).deal_Id === oldDataLocationResponse.map.get(k).DEAL_ID) {
                        for (let newLocations in newResponse.map.get(i).deal_localData) {
                            let keys = Object.keys(oldDataLocationResponse.map.get(k).vars);
                            for (let l = 0; l < keys.length; l++) {
                                if (newResponse.map.get(i).deal_localData[newLocations].LOCATION_NAME === keys[l]) {
                                }
                            }
                        }
                    }
                }
            }
        }
    }).timeout(120000);
});
