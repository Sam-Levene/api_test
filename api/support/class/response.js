/**
 * Generic Response class
 * Contains :
 * Return codes from public REST API endpoints
 * Return message from public REST API endpoints
 * A Map of TAPI API objects
 * Map accessor functions
 * @class
 */
class Response {

    constructor(builder) {
        /** @type {string} */
        this.result = builder.result;
        /** @type {string} */
        this.statusMessage = builder.statusMessage;
        /** @type {string} */
        this.statusCode = builder.statusCode;
        /** @type {Map} */
        this.map = new Map();
        /** @type {string} */
        this.responseHeaders = builder.responseHeaders;
    }

    /**
     * Add to Map.  If the Response is handling a single return object such as User
     * then no index needs to be given : add( new User ).  If there are multiple return
     * objects such as Location or Category then an index should be provided for later
     * retrieval.
     *
     * @param index
     * @param instance
     */
    add(index, instance) {
        // Add a single object only one parameter is passed
        // so index = instance
        if( instance === undefined) this.map.set( 0, index );
        else this.map.set( index, instance );
    }

    /**
     * The internal Map size
     * @return {number}
     */
    entries() {
        return this.map.size;
    }
    /**
     * Retrieve from Map.  If the Response is handling a single return object such as User
     * then no index needs to be given : get().  If there are multiple return
     * objects such as Location or Category then an index should be provided for later
     * retrieval.
     *
     * @param index
     * @returns the Map entry
     */
    get(index) {
        if( index === undefined ) {
            return this.map.get(0);
        }
        else {
            return this.map.get(index);
        }
    }

    /**
     * Returns the Map
     * @return {Map}
     */
    getMap() {
        return this.map;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Response Builder
         * @class
         * @alias ResponseBuilder
         * @example
         * new Response.Builder().withStatusCode(statusCode).build()
         */
        class Builder {
            constructor() {
                this.result = '';
                this.statusMessage = '';
                this.statusCode = '';
                this.responseHeaders = '';
            }
            /**
             * Set result
             * @param {string} result
             * @returns {Builder}
             */
            withResult(result) {
                this.result = result;
                return this
            }
            /**
             * Set Status Message
             * @param {string} statusMessage
             * @returns {Builder}
             */
            withStatusMessage(statusMessage) {
                this.statusMessage = statusMessage;
                return this
            }
            /**
             * Set Status Code
             * @param {string} statusCode
             * @returns {Builder}
             */
            withStatusCode(statusCode) {
                this.statusCode = statusCode;
                return this
            }

            /**
             * Set Response Headers
             * @param {string} responseHeaders
             * @returns {Builder}
             */
            withResponseHeaders(responseHeaders){
                this.responseHeaders = responseHeaders;
                return this
            }

            /**
             * Create Response instance
             * @returns {Response}
             */
            build() {
                return new Response(this);
            }
        }
        return Builder;
    }
}

module.exports = Response;