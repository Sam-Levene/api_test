const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Response = require ("../../support/class/response");
const Robot = require ("./robot");
const path = '/v1/robot';
/**
 * The Template API
 * @class
 * @hideconstructor
 */
class RobotService {

    /**
     * Get all Robots
     * @param {Robot} robot Robot object
     * @returns {Promise<Response<Robot>>}
     */
    static getAllRobots(robot){
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(robot.environment)
            .withMethod('GET')
            .withPath(path)
            .withBrand('')
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject){
            HttpsRequest.get(header).then((res) => {
                let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                for(let index = 0; index < res.length; index++) {
                    response.add(new Robot(res[index]))
                }
                resolve(response);
            })
        })
    }
}
module.exports=RobotService;





