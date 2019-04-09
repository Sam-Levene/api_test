// Template for API Classes
const Meta = require('./meta.js');
/**
 * The Template object to be passed into and from Template Service API
 * @class
 */
class Template extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.field = builder.field;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Template} other - Template instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Template ) &&
               // Specific API checks
               ( other.field === this.field);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Address Builder
         * @class
         * @alias TemplateBuilder
         * @example
         * new Template.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.field = 'defaultValue';
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
             * Set field
             * @param {string} field The Field
             * @returns {Builder}
             */
            withField(field) {
                this.field = field;
                return this
            }
            /**
             * Create Template instance
             * @returns {Template}
             */
            build() {
                return new Template(this);
            }
        }
        return Builder;
    }
}
module.exports = Template;