const getAllEmployees = {
	"type": "object",
	"items": {
		"type": "object",
		"properties": {
			"id": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"employee_name": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"employee_salary": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"employee_age": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"profile_image": {
				"type": "string",
				"pattern": "^(.*)$"
			}
		}
	}
};
module.exports.getAllEmployees = getAllEmployees;

const getOneEmployee = {
		"type": "object",
		"properties": {
			"id": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"employee_name": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"employee_salary": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"employee_age": {
				"type": "string",
				"pattern": "^(.*)$"
			},
			"profile_image": {
				"type": "string",
				"pattern": "^(.*)$"
			}
		}
};
module.exports.getOneEmployee = getOneEmployee;

const createAnEmployee = {
		"type": "object",
		"properties": {
			"name": {
				"type": "string",
				"pattern": "^(.*)$"
			  },
			  "salary": {
			    "type": "string",
			    "pattern": "^(.*)$"
			  },
			  "age": {
			    "type": "string",
			    "pattern": "^(.*)$"
			  },
			  "id": {
			    "type": "string",
			    "pattern": "^(.*)$"
			  }
		}	
};
module.exports.createAnEmployee = createAnEmployee;