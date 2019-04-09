const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Location = require("./location");
const path = '/v1/location';
/**
 * @class
 * @hideconstructor
 */

class LocationService {

    /**
     * Get Location by Location ( Latitude, Longitude ).
     * Latitude and Longitude should be set by the Location Builder : withLatitude(latitude) and withLongitude(longitude)
     * @param {Location} location Location object
     * @returns {Promise<Location>}
     */
    static getLocation(location) {
        let locationPath = path + '/' + location.lat.toString() + '/' + location.long.toString();
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(location.environment)
            .withMethod('GET')
            .withPath(locationPath)
            .withBrand('wowcher')
            .withCountryCode('GB')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve) {
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                location.update(res);
                location.update(res.latLon);
                response.add(location);
                resolve(response);
            });
        });
    }

    /**
     * Get all locations
     * Latitude and Longitude should be set by the Location Builder : withLatitude(latitude) and withLongitude(longitude)
     * @param {Location} location Location object
     * @returns @returns {Promise<Response<Location>>}
     */
    static getAllLocations(location){
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(location.environment)
            .withPath(path)
            .withMethod('GET')
            .withBrand('wowcher')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject){
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                // res is array of locations - [{location}, {location}, { location}]
                for(let index = 0; index < res.length; index++) {
                    response.add(index, new Location(res[index]));
                }
                resolve(response);
            })
        })
    }
}
module.exports = LocationService;