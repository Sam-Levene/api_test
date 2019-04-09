// Query for API Classes
/**
 * The Query object to be passed into and from Query Service API
 * @class
 */
class Query {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {number} */
        this.id = builder.id;
        /** @type {number} */
        this.page = builder.page;
        /** @type {number} */
        this.pageSize = builder.pageSize;
        /** @type {number} */
        this.minSize = builder.minSize;
        /** @type {number} */
        this.maxSize = builder.maxSize;
        /** @type {number} */
        this.minPrice = builder.minPrice;
        /** @type {number} */
        this.maxPrice = builder.maxPrice;
        /** @type {number} */
        this.limit = builder.limit;
        /** @type {string} */
        this.solus = builder.solus;
        /** @type {string} */
        this.source = builder.page;
        /** @type {string} */
        this.apiAuthToken = builder.apiAuthToken;
        /** @type {string} */
        this.wowcher_user = builder.wowcher_user;
        /** @type {string} */
        this.excludedDeals = builder.excludedDeals;
        /** @type {string} */
        this.q = builder.q;
        /** @type {string} */
        this.category = builder.category;
        /** @type {string} */
        this.orderBy = builder.orderBy;
        /** @type {string} */
        this.order = builder.order;
        /** @type {string} */
        this.code = builder.code;
        /** @type {string} */
        this.dealId = builder.dealId;
        /** @type {string} */
        this.customerToken = builder.customerToken;

    }

    /**
     * Object equality - compare self with other instance
     * @param {Query} other - Query instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            ( other instanceof Query ) &&
            // Specific API checks
            ( other.id === this.id || other.q === this.q);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toString() {
        let query = "?";
        for (let key in this) {
            if (this[key] !== '' && this[key] !== undefined) {
                query += key + '=' + this[key] + '&';
            }
        }
        query = query.substring(0, query.length-1);
        return query;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Query Builder
         * @class
         * @alias QueryBuilder
         * @example
         * new Query.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.q = "";
                this.id = "";
                this.page = "";
                this.order = "desc";
                this.orderBy = "popularity";
                this.pageSize = "";
                this.category = "";
                this.minSize = "";
                this.maxSize = "";
                this.solus = "false";
                this.minPrice = "";
                this.maxPrice = "";
                this.limit = "";
                this.source = "";
                this.excludedDeals = "";
                this.code = "";
                this.dealId = "";
                this.customerToken = "";
            }

            /**
             * Sets Q
             * @param {string} Q The query
             * @returns {Builder}
             */
            withQ(Q) {
                this.q = Q;
                return this
            }

            /**
             * Sets ID
             * @param {string} id The ID
             * @returns {Builder}
             */
            withID(id) {
                this.id = id;
                return this
            }

            /**
             * Sets Category
             * @param {string} category The category
             * @returns {Builder}
             */
            withCategory(category) {
                this.category = category;
                return this
            }

            /**
             * Sets page number
             * @param {string} page The Page number
             * @returns {Builder}
             */
            withPage(page) {
                this.page = page;
                return this
            }

            /**
             * Sets order
             * @param {string} order The order of the deals
             * @returns {Builder}
             */
            withOrder(order) {
                this.order = order;
                return this
            }

            /**
             * Sets order by
             * @param {string} orderBy the method of which to order the deals by
             * @returns {Builder}
             */
            withOrderBy(orderBy) {
                this.orderBy = orderBy;
                return this
            }

            /**
             * Sets page size
             * @param {string} pageSize The page size
             * @returns {Builder}
             */
            withPageSize(pageSize) {
                this.pageSize = pageSize;
                return this
            }

            /**
             * Sets minimum price
             * @param {string} minPrice The minimum page size
             * @returns {Builder}
             */
            withMinPrice(minPrice) {
                this.minPrice = minPrice;
                return this
            }

            /**
             * Sets max price
             * @param {string} maxPrice The maximum page size
             * @returns {Builder}
             */
            withMaxPrice(maxPrice) {
                this.maxPrice = maxPrice;
                return this
            }

            /**
             * Sets minimum size
             * @param {string} minSize The minimum page size
             * @returns {Builder}
             */
            withMinSize(minSize) {
                this.minSize = minSize;
                return this
            }

            /**
             * Sets max size
             * @param {string} maxSize The maximum page size
             * @returns {Builder}
             */
            withMaxSize(maxSize) {
                this.maxSize = maxSize;
                return this
            }

            /**
             * Sets page limit
             * @param {string} limit The page limit
             * @returns {Builder}
             */
            withLimit(limit) {
                this.limit = limit;
                return this
            }

            /**
             * Sets solus flag
             * @param {string} solus The solus flag for SailThru API
             * @returns {Builder}
             */
            withSolus(solus) {
                this.solus = solus;
                return this
            }

            /**
             * Sets source
             * @param {string} source The source of the recommendation
             * @returns {Builder}
             */
            withSource(source) {
                this.source = source;
                return this
            }

            /**
             * Sets excluded deals
             * @param {string} excludedDeals The deals (in array form) to be excluded
             * @returns {Builder}
             */
            withExcludedDeals(excludedDeals) {
                this.excludedDeals = excludedDeals;
                return this
            }

            /**
             * Set the dealId
             * @param {string} the dealId
             * @returns {Builder}
             */
            withDealId(dealId){
                this.dealId = dealId;
                return this
            }

            /**
             * Sets the code for PromoCode
             * @param {string} the code for PromoCode
             * @returns {Builder}
             */
            withCode(code){
                this.code = code;
                return this
            }

            /**
             * Sets the customerToken for Basket
             * @param {string} the customerToken for Basket
             * @returns {Builder}
             */
            withCustomerToken(customerToken){
                this.customerToken = customerToken;
                return this
            }

            /**
             * Create Query instance
             * @returns {Query}
             */
            build() {
                return new Query(this);
            }
        }
        return Builder;
    }
}
module.exports = Query;