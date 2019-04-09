const RobotService = require ("../api/services/robot/robot-service");
const chai = require('chai');
const expect = chai.expect;
const Robot = require("../api/services/robot/robot");
const HttpResponseCodes = require("../api/support/https/http-response-codes");


describe("Get a Robot", async function() {
    it("Creates an object builder", function () {
        let firstBrand = new Robot.Builder().withBrand('wowcher').build();
        let secondBrand = new Robot.Builder().withBrand('wowcher').build();
        let thirdBrand = new Robot.Builder().withBrand('livingsocial').build();

        let firstUrl = new Robot.Builder().withUrl('https://www01.nxtwowcher.co.uk/deals').build();
        let secondUrl = new Robot.Builder().withUrl('https://www01.nxtwowcher.co.uk/deals').build();
        let thirdUrl = new Robot.Builder().withUrl('https://www01.nxtlivingsocial.co.uk/deals/london').build();

        let firstId = new Robot.Builder().withId(1).build();
        let secondId = new Robot.Builder().withId(1).build();
        let thirdId = new Robot.Builder().withId(2).build();

        expect(firstBrand.equals(firstBrand)).to.be.true;
        expect(firstBrand.equals(secondBrand)).to.be.true;
        expect(firstBrand.equals(thirdBrand)).to.be.false;
        expect(firstBrand.equals(new String("I am not a Robot Object"))).to.be.false;

        expect(firstUrl.equals(firstUrl)).to.be.true;
        expect(firstUrl.equals(secondUrl)).to.be.true;
        expect(firstUrl.equals(thirdUrl)).to.be.false;
        expect(firstUrl.equals(new String("I am not a Robot Object"))).to.be.false;

        expect(firstId.equals(firstId)).to.be.true;
        expect(firstId.equals(secondId)).to.be.true;
        expect(firstId.equals(thirdId)).to.be.false;
        expect(firstId.equals(new String("I am not a Robot Object"))).to.be.false;

    });

    it("Successfully gets all robots", async function () {
        let robot =  new Robot.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withBrand('wowcher')
            .build();
        return RobotService.getAllRobots(robot).then((response) => {
            expect(response.entries).to.not.equal(0);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(robot.isPopulated()).to.equal(true);
        });
    }).timeout(10000);
});