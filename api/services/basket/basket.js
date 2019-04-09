const Meta = require('../../support/class/meta.js');
const Product = require('./product');
/**
 * The Basket object to be passed into and from Basket Service API
 * @class
 */
class Basket extends Meta {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment);
        /** @type {string} */
        this.id = builder.id;
        /** @type {string} */
        this.customerToken = builder.customerToken;
        /** @type {string} */
        this.brand = builder.brand;
        /** @type {JSON[]} */
        this.products = builder.products;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Basket} other - Basket instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
               ( other instanceof Basket ) &&
               // Specific API checks
               ( other.id === this.id &&
               other.customerToken === this.customerToken &&
               other.brand === this.brand);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    generateBody() {
        return JSON.stringify({
            "brand": this.brand,
            "products": this.products
        })
    }

    generateBodies() {
        return JSON.stringify({
            "id": this.id,
            "customerToken": this.customerToken,
            "brand": this.brand,
            "products": this.products
        })
    }

    replacer(key,value)
    {
        if (key==="environment") return undefined;
        else if (key ==="subscriptionsCount") return undefined;
        else if (key ==="businessOwner") return undefined;
        else if (key ==="apiAuthToken") return undefined;
        else return value;
    }

    /**
     * Get number of products in this Basket
     * @returns {number}
     */
    getProductsCount() {
        return this.products.size();
    }
    /**
     * Method to check Basket object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.id != null &&
            this.brand != null;
            //&& this.products.isPopulated() == true;
    }

    /**
     * Method to get the basketId from the location header returned from the create basket request
     * @param location
     * @returns {string}
     */
    setIdFromLocationUrl(location){
        let str = new String(location);
        let n = str.lastIndexOf('/');
        location = str.substr(n+1);
        return this.id = location;
    }

    /**
     * Method to search through Product Array to check product is present in basket
     * returns {boolean}
     */
    isProductPresent(basketProduct){
        let found = false;
        for (let index = 0; index < this.products.length; index++) {
            let product = new Product(this.products[index]);
            if(product.equals(basketProduct)) {
                found = true;
            }
        }
        return found;
    }

    /**
     * Method to Add a product to the basket via parameter
     * @param {JSON} product the product as JSON object to add.
     */
     addProduct(product) {
     this.products.push(product);
    }

    /**
     * Method to return the number of products in the basket
     * @returns {number}
     */
    productSize(){
        return this.products.length;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Basket Builder
         * @class
         * @alias Basket
         * @example
         * new Basket.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.environment = '';
                this.id = '';
                this.customerToken = '';
                this.brand = '';
                this.products = new Product.Builder().build();
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
             * @param {string} id The Basket Id
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            /**
             * Set customerToken
             * @param {string} customerToken The Customer Token
             * @returns {Builder}
             */
            withCustomerToken(customerToken){
                this.customerToken = customerToken;
                return this
            }
            /**
             * Set brand
             * @param {string} brand The Brand
             * @returns {Builder}
             */
            withBrand(brand){
                this.brand = brand;
                return this
            }

            /**
             * Set Products
             * @param {{}[]} products The products
             * @returns {Builder}
             */
            withProducts(products){
                this.products = products;
                return this
            }

            /**
             * Create Basket instance
             * @returns {Basket}
             */
            build() {
                return new Basket(this);
            }
        }
        return Builder;
    }
}
module.exports = Basket;