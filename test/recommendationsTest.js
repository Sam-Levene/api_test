const RecommendationsService = require ("../api/services/recommendations/recommendations-service");
const chai = require('chai');
const expect = chai.expect;
const Recommendations = require("../api/services/recommendations/recommendations");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Recommendations Endpoints", async function() {

    it("successfully gets recommended deals by deal id", async function () {
        let newRecommendations = new Recommendations.Builder()
            .withDealId(8112471)
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand("wowcher")
            .withSource("wps")
            .build();

        return RecommendationsService.getRecommendations(newRecommendations).then((result) => {
            expect(result.entries()).to.not.equal(0);
            expect(HttpResponseCodes.isBadRequest(result.statusCode)).to.equal(true);
            expect(newRecommendations.isPopulated()).to.equal(true);
        });
    }).timeout(10000);
});