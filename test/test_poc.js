const chai = require('chai');
const expect = chai.expect;
const HttpResponseCodes = require("../api/support/https/http-response-codes");
const EmployeeService = require ("../api/services/employees/employee-service");
const Employee = require("../api/services/employees/employee");
const schema = require("../api/services/employees/json/employee-schema");

let environmentUrl = process.env.ENVIRONMENT;
let tv4 = require('tv4');
let customId, badId = "$SELECT%20*%20FROM%20*;";

describe("Get an Employee", function() {
    it("Creates an object builder", function () {
    	
    	let firstEmployee = new Employee.Builder()
    		.withEmployeeName("John Smith")
    		.withEmployeeAge("28")
    		.withEmployeeSalary("£45,000")
    		.build();
    	
    	let secondEmployee = new Employee.Builder()
			.withEmployeeName("John Smith")
			.withEmployeeAge("28")
			.withEmployeeSalary("£45,000")
			.build();
        
    	let thirdEmployee = new Employee.Builder()
			.withEmployeeName("Jane Doe")
			.withEmployeeAge("35")
			.withEmployeeSalary("£50,000")
			.build();

        expect(firstEmployee.equals(firstEmployee)).to.equal(true);
        expect(firstEmployee.equals(secondEmployee)).to.equal(true);
        expect(firstEmployee.equals(thirdEmployee)).to.equal(false);
        expect(firstEmployee.equals(new String("I am not an Employee Object"))).to.equal(false);
    }).timeout(10000);
    
    it("gets all employees from dummy api", function() {
	    return EmployeeService.getEmployees(environmentUrl).then((result) => {
	    	customId = result.map.get('0').id
	        expect(result.entries).to.not.equal(0);
	        expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
	        expect(tv4.validate(result.map, schema.getAllEmployees)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("gets a single employee from dummy api with id", function() {
    	return EmployeeService.getEmployeeById(environmentUrl, customId).then((result) => {
	        expect(result.entries).to.not.equal(0);
	        expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
	        expect(tv4.validate(result.map, schema.getOneEmployee)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("doesn't get an employee from dummy api with an invalid id", function() {
    	return EmployeeService.getEmployeeById(environmentUrl, badId).then((result) => {
	        expect(HttpResponseCodes.isNotAcceptable(result.statusCode)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("creates an employee and posts it to the dummy api", function() {
    	let testEmployee = new Employee.Builder()
		.withEmployeeName("Jon Stark")
		.withEmployeeAge("28")
		.withEmployeeSalary("45000")
		.build();
    	
    	return EmployeeService.createNewEmployee(environmentUrl, testEmployee.toJson()).then((result) => {
	        expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
	        expect(result.entries).to.not.equal(0);
	        expect(tv4.validate(result.map, schema.createAnEmployee)).to.equal(true);
	        customId = result.get().id;
	    });
    }).timeout(10000);
    
    it("doesn't creates an employee with a bad data format", function() {
    	let testEmployee = new Employee.Builder()
		.withEmployeeName(null)
		.withEmployeeAge(null)
		.withEmployeeSalary(null)
		.build();
    	
    	return EmployeeService.badCreate(environmentUrl, testEmployee.toJson()).then((result) => {
    		 expect(HttpResponseCodes.isNotAllowed(result.statusCode)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("updates an employee from the dummy api with id", function() {
    	let testEmployee = new Employee.Builder()
		.withEmployeeName("Jon Snow")
		.withEmployeeAge("29")
		.withEmployeeSalary("48000")
		.withId(customId)
		.build();
    	
    	return EmployeeService.updateEmployeeById(environmentUrl, customId, testEmployee.toJson()).then((result) => {
	        expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
	        expect(result.entries).to.not.equal(0);
	        expect(tv4.validate(result.map, schema.createAnEmployee)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("doesn't update an employee from dummy api with an invalid id", function() {
    	let invalidEmployee = new Employee.Builder()
		.withEmployeeName("Jon Snow")
		.withEmployeeAge("29")
		.withEmployeeSalary("48000")
		.withId(badId)
		.build();
    	
    	return EmployeeService.updateEmployeeById(environmentUrl, badId, invalidEmployee.toJson()).then((result) => {
	        expect(HttpResponseCodes.isNotAcceptable(result.statusCode)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("deletes an employee from the dummy api with id", function() {
    	return EmployeeService.deleteEmployeeById(environmentUrl, customId).then((result) => {
	        expect(HttpResponseCodes.isOK(result.statusCode)).to.equal(true);
	    });
    }).timeout(10000);
    
    it("doesn't delete an employee from the dummy api with an invalid id", function() {
    	return EmployeeService.deleteEmployeeById(environmentUrl, badId).then((result) => {
	        expect(HttpResponseCodes.isNotAcceptable(result.statusCode)).to.equal(true);
	    });
    }).timeout(10000);
});