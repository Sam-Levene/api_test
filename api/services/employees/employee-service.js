const HttpsRequest = require("../../support/https/https-request");
const HttpsHeader = require ("../../support/https/https-header");
const Employee = require ("./employee");
const Response = require("../../support/class/response");
const path1 = "/api/v1/employees";
const path2 = "/api/v1/employee";
const path3 = "/api/v1/create";
const path4 = "/api/v1/update";
const path5 = "/api/v1/delete";

/**
 * The Employee API
 * @class
 * @hideconstructor
 */
class EmployeeService {
    /**
     * Get Employee by Employee. Employee should be set by the Employee Builder : withField(field)
     * @param {Employee} employee Employee Object
     * @returns {Promise<Employee>}
     */
    static getEmployees(environment) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(environment)
            .withMethod('GET')
            .withPath(path1)
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
            	let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
            	for (let employee in res) {
            		response.add(employee, new Employee(res[employee]));
            	}
                resolve(response);
            })
        })
    }
    
    static getEmployeeById(environment, id) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(environment)
            .withMethod('GET')
            .withPath(path2 + "/" + id)
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.get(header).then((res) => {
            	let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
            	for (let employee in res) {
            		response.add(employee, new Employee(res[employee]));
            	}
                resolve(response);
            })
        })
    }
    
    static createNewEmployee(environment, employee) {
        let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(environment)
            .withMethod('POST')
            .withPath(path3)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.post(header, JSON.stringify(employee)).then((res) => {
            	let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
            	response.add(new Employee.Builder().withEmployeeName(res.name).withEmployeeSalary(res.salary).withEmployeeAge(res.age).withId(res.id).build());
            	resolve(response);
            })
        })
    }
    
    static updateEmployeeById(environment, id, employee) {
    	let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(environment)
            .withMethod('PUT')
            .withPath(path4 + "/" + id)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.put(header, JSON.stringify(employee)).then((res) => {
            	let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
            	response.add(new Employee.Builder().withEmployeeName(res.name).withEmployeeSalary(res.salary).withEmployeeAge(res.age).withId(res.id).build());
                resolve(response);
            })
        })
    }
    
    static deleteEmployeeById(environment, id) {
    	let httpsHeader = new HttpsHeader();
        let header = httpsHeader.createHeader()
            .withHostName(environment)
            .withMethod('DELETE')
            .withPath(path5 + "/" + id)
            .withAccept('application/json')
            .withContentType('application/json');

        return new Promise(function (resolve, reject) {
            HttpsRequest.delete(header).then((res) => {
            	let response = new Response.Builder().withStatusCode(HttpsRequest.getStatusCode()).build();
                resolve(response);
            })
        })
    }
}
module.exports = EmployeeService