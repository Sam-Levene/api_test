const Meta = require('../../support/class/meta.js');
/**
 *  The Location object to be passed into and from Location Service API
 * @class
 *
 */

class Location extends Meta {
    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        super(builder.environment, builder.brand);
        /** @type {string} */
        this.id = builder.id;
        /** @type {string} */
        this.name = builder.name;
        /** @type {string} */
        this.shortName = builder.shortName;
        /** @type {string} */
        this.lat = builder.lat;
        /** @type {string} */
        this.long = builder.long;
        /** @type {string} */
        this.brand = builder.brand;
        /** @type {string} */
        this.countryCode = builder.countryCode;
        /** @type {string} */
        this.domain = builder.domain;
        /** @type {string} */
        this.siteGroup = builder.siteGroup;
        /** @type {string} */
        this.score = builder.score;
        /** @type {string} */
        this.description = builder.description;
        /** @type {string} */
        this.status = builder.status;
        /** @type {String} */
        this.latLon = builder.latLon;
    }
    /**
     * Object equality method.  compare self with other instance
     * @param {location} obj. Location instance
     * @returns {boolean} true: Objects are equal. false otherwise.
     */
    equals(obj) {
        return this === obj ||
            (obj instanceof Location) &&
            this.lat === obj.lat &&
            this.long === obj.long;
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toJsonString() {
        return (JSON.stringify(this, this.replacer));
    }

    isPopulated() {
        return this.countryCode !== undefined &&
               this.name !== undefined &&
               this.shortName !== undefined &&
               this.latLon.lon !== null &&
               this.latLon.lon !== null;
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Location Builder
         * @class
         * @alias LocationBuilder
         * @example
         * new Location.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor(){
                this.environment = '';
                this.id = '';
                this.name = '';
                this.shortName = '';
                this.lat = '';
                this.long = '';
                this.brand = '';
                this.countryCode = '';
                this.siteGroup = '';
                this.description = '';
                this.domain = '';
                this.status = '';
                this.score = '';
            }

            /**
             * Set environment
             * @param {string} environment API Endpoint
             * @returns {Builder}
             */
            withEnvironment(environment) {
                this.environment = environment;
                return this
            }
            /**
             * Set Indentifier
             * @param {string} identifier Identifier
             * @returns {Builder}
             */
            withId(identifier)
            {
                this.id = identifier;
                return this;
            }
            /**
             * Set Name
             * @param {string} name Name
             * @returns {Builder}
             */
            withName(name)
            {
                this.name = name;
                return this;
            }
            /**
             * Set Short Name
             * @param {string} shortName Short Name
             * @returns {Builder}
             */
            withshortName(shortName)
            {
                this.shortName = shortName;
                return this;
            }
            /**
             * Set Latitude
             * @param {string} latitude Latitude
             * @returns {Builder}
             */
            withLatitude(latitude)
            {
                this.lat = latitude;
                return this;
            }
            /**
             * Set Longitude
             * @param {string} longitude Longitude
             * @returns {Builder}
             */
            withLongitude(longitude)
            {
                this.long = longitude;
                return this;
            }
            /**
             * Set Brand
             * @param {string} brand Brand
             * @returns {Builder}
             */
            withBrand(brand)
            {
                this.brand = brand;
                return this;
            }
            /**
             * Set Country Code
             * @param {string} countryCode Country Code
             * @returns {Builder}
             */
            withCountryCode(countryCode)
            {
                this.countryCode = countryCode;
                return this;
            }
            /**
             * Set Site Group
             * @param {string} siteGroup Site Group
             * @returns {Builder}
             */
            withSiteGroup(siteGroup)
            {
                this.siteGroup = siteGroup;
                return this;
            }
            /**
             * Set Description
             * @param {string}  description Description
             * @returns {Builder}
             */
            withDescription(description)
            {
                this.description = description;
                return this;
            }
            /**
             * Set Domain
             * @param {string} domain Domain
             * @returns {Builder}
             */
            withDomain(domain)
            {
                this.domain = domain;
                return this;
            }
            /**
             * Set Status
             * @param {string} status Status
             * @returns {Builder}
             */
            withStatus(status)
            {
                this.status = status;
                return this;
            }
            /**
             * Set Score
             * @param {string} score Score
             * @returns {Builder}
             */
            withScore(score)
            {
                this.score = score;
                return this;
            }

            /**
             * Create Location instance
             * @returns {Location}
             */
            build()
            {
                return new Location(this);
            }
        }
        return Builder;
    }
}
module.exports = Location;