/**
 * The Static Page Site object to be passed into and from StaticPage Service API
 * @class
 *
 **/
class Site {
    /**
     * @constructor
     * @param {ClassConstructor} builder
     */
    constructor(builder){
        this.id = builder.id;
        this.name = builder.name;
        this.shortName = builder.shortName;
        this.latLon = builder.latlon;
        this.brand = builder.brand;
        this.countryCode = builder.countryCode;
        this.siteGroup = builder.siteGroup;
        this.description = builder.description;
        this.domain = builder.domain;
        this.status = builder.status;
    }

    /**
     * Method to check Site response object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.id != null &&
        this.name != null &&
        this.shortName != null &&
        this.brand != null &&
        this.countryCode != null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Site Builder
         * @class
         * @alias Site Builder
         * @example
         * new Site.Builder().with().build()
         */
        class Builder {
            constructor() {
                this.id = '';
                this.name = '';
                this.shortName = '';
                this.latLon = '';
                this.brand = '';
                this.countryCode = '';
                this.siteGroup = '';
                this.description = '';
                this.domain = '';
                this.status = '';
            }

            /**
             * Set id
             * @param {string} id the ID
             * @returns {Builder}
             */
            withId(id){
                this.id = id;
                return this
            }
            /**
             * Set name
             * @param {string} name the Name
             * @returns {Builder}
             */
            withName(name){
                this.name = name;
                return this
            }
            /**
             * Set shortName
             * @param {string} shortname the ShortName
             * @returns {Builder}
             */
            withShortName(shortName){
                this.shortName = shortName;
                return this
            }
            /**
             * Set latlon
             * @param {string} latlon the LatLon
             * @returns {Builder}
             */
            withlatlon(latlon){
                this.latlon = latlon;
                return this
            }
            /**
             * Set brand
             * @param {string} brand the Brand
             * @returns {Builder}
             */
            withBrand(brand){
                this.brand = brand;
                return this
            }
            /**
             * Set country code
             * @param {string} country code the Country Code
             * @returns {Builder}
             */
            withCountryCode(countryCode){
                this.countryCode = countryCode;
                return this
            }
            /**
             * Set site group
             * @param {string} site group the Site Group
             * @returns {Builder}
             */
            withSiteGroup(siteGroup){
                this.siteGroup = siteGroup;
                return this
            }
            /**
             * Set description
             * @param {string} description the Description
             * @returns {Builder}
             */
            withDescription(description){
                this.description = description;
                return this
            }
            /**
             * Set domain
             * @param {string} domain the Domain
             * @returns {Builder}
             */
            withDomain(domain){
                this.domain = domain;
                return this
            }
            /**
             * Set status
             * @param {string} status the Status
             * @returns {Builder}
             */
            withStatus(status){
                this.status = status;
                return this
            }

            /**
             * Create Site instance
             * @returns {Site}
             */
            build(){
                return new Site(this);
            }
        }
        return Builder;
    }
}
module.exports = Site;
