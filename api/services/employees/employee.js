/**
 * The Template object to be passed into and from Employee Service API
 * @class
 */
class Employee {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {string} */
        this.id = builder.id;
        /** @type {string} */
        this.employee_name = builder.employee_name;
        /** @type {string} */
        this.employee_salary = builder.employee_salary;
        /** @type {string} */
        this.employee_age = builder.employee_age;
        /** @type {string} */
        this.profile_image = builder.profile_image;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Employee} other - Employee instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Employee ) &&
               // Specific API checks
               ( other.employee_name === this.employee_name) &&
               ( other.employee_age === this.employee_age);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }
    
    /**
     * Custom JSON Serialisation
     * @returns {string}
     */
    toJson() {
       return {
    	   name: this.employee_name,
    	   salary:this.employee_salary,
    	   age:this.employee_age
       };
    }

    
    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Address Builder
         * @class
         * @alias EmployeeBuilder
         * @example
         * new Employee.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
            	this.id = '';
                this.employee_name = '';
                this.employee_salary = '';
                this.employee_age = '';
                this.profile_image = '';
                this.environment = '';
            }
            
            /**
             * Set environment
             * @param {string} environment API endpoint
             * @returns {Builder}
             */
            withEnvironment(environment) {
                this.environment = environment;
                return this
            }
            
            /**
             * Set id
             * @param {string} id The id
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            
            /**
             * Set employeeName
             * @param {string} name The employee name
             * @returns {Builder}
             */
            withEmployeeName(name) {
                this.employee_name = name;
                return this
            }
            
            /**
             * Set employeeSalary
             * @param {string} salary The employee salary
             * @returns {Builder}
             */
            withEmployeeSalary(salary) {
                this.employee_salary = salary;
                return this
            }
            
            /**
             * Set employeeAge
             * @param {string} age The employee age
             * @returns {Builder}
             */
            withEmployeeAge(age) {
                this.employee_age = age;
                return this
            }
            
            /**
             * Set profileImage
             * @param {string} imageUrl The profile image url
             * @returns {Builder}
             */
            withProfileImage(imageUrl) {
                this.profile_image = imageUrl;
                return this
            }
            
            /**
             * Create Employee instance
             * @returns {Employee}
             */
            build() {
                return new Employee(this);
            }
        }
        return Builder;
    }
}
module.exports = Employee;