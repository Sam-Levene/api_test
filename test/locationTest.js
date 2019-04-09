const LocationService = require ("../api/services/location/location-service");
const chai = require('chai');
const expect = chai.expect;
const Location = require("../api/services/location/location");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

describe("Get a Location", async function() {
   /* it("Creates an object builder", function () {
        let firstLocation =  new Location.Builder().withLatitude(50).withLongitude(50).build();
        let secondLocation = new Location.Builder().withLatitude(50).withLongitude(50).build();
        let thirdLocation = new Location.Builder().withLatitude(100).withLongitude(100).build();

        expect(firstLocation.equals(firstLocation)).to.equal(true);
        expect(firstLocation.equals(secondLocation)).to.equal(true);
        expect(firstLocation.equals(thirdLocation)).to.equal(false);
        expect(firstLocation.equals(new String("I am not a Location Object"))).to.equal(false);
    });

    it("Can query the api", async function(){
        let locations =  new Location.Builder().withEnvironment(process.env.ENVIRONMENT).build();
        return LocationService.getAllLocations(locations).then((response) =>{
            expect(response.entries()).to.not.equal(0);
            expect(response.get().name).not.to.equal(undefined);
            expect(response.get().latLon).not.to.equal(undefined);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(locations.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Can query the api for Lat and Long", async function(){
        let firstLocation =  new Location.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withLatitude(50)
            .withLongitude(50)
            .build();
        return LocationService.getLocation(firstLocation).then((response) => {
            expect(response.entries()).to.not.equal(0);
            expect(response.get().name).not.to.equal(undefined);
            expect(response.get().latLon).not.to.equal(undefined);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(firstLocation.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return when Derby when lat and long is specified", async function () {
        let firstLocation = new Location.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withLatitude(52.9)
            .withLongitude(-1.4)
            .build();
        return LocationService.getLocation(firstLocation).then((response) =>{
            expect(response.entries()).to.not.equal(0);
            expect(response.get().latLon).not.to.equal(undefined);
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(firstLocation.isPopulated()).to.equal(true);
            expect(response.get().name).to.equal('Derby');
        });
    }).timeout(10000);*/

    it("Will return all locations", async function () {
       let locations = new Location.Builder()
           .withEnvironment(process.env.ENVIRONMENT)
           .build();
       return LocationService.getAllLocations(locations).then((response) =>{
           expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
           expect(response.entries()).to.not.equal(0);
           for (let value of response.map.values()) {
               expect(value.isPopulated()).to.be.true;
           }

       });
    });

 /*   it("Will return a 400 error code if lat long is invalid", async function(){
        let firstLocation = new Location.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withLatitude(100)
            .withLongitude(190)
            .build();
        return LocationService.getLocation(firstLocation).then((response) =>{
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
            expect(firstLocation.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return 400 if values are non numeric", async function(){
        let firstLocation = new Location.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withLatitude('aaa')
            .withLongitude('bb')
            .build();
        return LocationService.getLocation(firstLocation).then((response) =>{
            expect(HttpResponseCodes.isBadRequest(response.statusCode)).to.equal(true);
            expect(firstLocation.isPopulated()).to.equal(true);
        });
    }).timeout(10000);

    it("Will return national deal when 0 0 lat long is specified", async function () {
        let location = new Location.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withLatitude(0)
            .withLongitude(0)
            .build();
        return LocationService.getLocation(location).then((response) =>{
            expect(response.entries()).to.not.equal(0)
            expect(response.get().name).to.equal('National Deal');
            //expect(response.get().name).to.equal('Travel');
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(location.isPopulated()).to.equal(true);
        });
    }).timeout(10000);*/
});