const Meta = require('../../support/class/meta.js');
const PPCPage = require('./ppcpage');
/**
 * The ppc object to be passed into and from PPCPage Service API
 * @class
 *
 **/
class PPC {
    /**
     * @constructor
     * @param {ClassConstructor} builder
     */
    constructor(builder){
        this.buttonText = builder.buttonText;
        this.titleTags = builder.titleTags;
        this.redirectUrl = builder.redirectUrl;
        this.defaultLocations = builder.defaultLocations;
        this.desktopImages = builder.desktopImages;
        this.displayName = builder.displayName;
        this.pageText = builder.pageText;
        this.displayLocations = builder.displayLocations;
        this._score = builder._score;
        this.path = builder.path;
        this.mobileImages = builder.mobileImages;
        this.id = builder.id;
        this.brand = builder.brand;
    }

    /**
     * Method to check PPC response object is populated
     * @returns {string}
     */
    isPopulated(){
        return this.buttonText != null &&
            this.titleTags != null &&
            this.redirectUrl != null &&
            this.defaultLocations != null &&
            this.desktopImages != null &&
            this.displayName != null &&
            this.pageText != null &&
            this.displayLocations != null &&
            this._score != null &&
            this.mobileImages != null &&
            this.id != null &&
            this.brand != null
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * PPC Builder
         * @class
         * @alias PPC Builder
         * @example
         * new PPC.Builder().with().build()
         */
        class Builder {
            constructor() {
                this.buttonText = '';
                this.titleTags = '';
                this.redirectUrl = '';
                this.defaultLocations = '';
                this.desktopImages = '';
                this.displayName = '';
                this.pageText = '';
                this.displayLocations = '';
                this._score = '';
                this.path = '';
                this.mobileImages = '';
                this.id = '';
                this.brand = '';
            }

            /**
             * Set button text
             * @param {string} button text the Button Text
             * @returns {Builder}
             */
            withButtonText(buttonText){
                this.buttonText = buttonText;
                return this
            }
            /**
             * Set title tags text
             * @param {string} title tags the Title Tags
             * @returns {Builder}
             */
            withTitleTags(titleTags){
                this.titleTags = titleTags;
                return this
            }
            /**
             * Set redirect Url
             * @param {string} redirect Url the Redirect Url
             * @returns {Builder}
             */
            withRedirectUrl(redirectUrl){
                this.redirectUrl = redirectUrl;
                return this
            }
            /**
             * Set default locations
             * @param {string} defualt locations the Default Locations
             * @returns {Builder}
             */
            withDefaultLocations(defaultLocations){
                this.defaultLocations = defaultLocations;
                return this
            }
            /**
             * Set desktop images
             * @param {string} desktop images the Desktop Images
             * @returns {Builder}
             */
            withDesktopImages(desktopImages){
                this.desktopImages = desktopImages;
                return this
            }
            /**
             * Set display name
             * @param {string} display name the Display Name
             * @returns {Builder}
             */
            withDisplayName(displayName){
                this.displayName = displayName;
                return this
            }
            /**
             * Set page text
             * @param {string} page text the Page Text
             * @returns {Builder}
             */
            withPageText(pageText){
                this.pageText = pageText;
                return this
            }
            /**
             * Set display locations
             * @param {string} display locations the Display Locations
             * @returns {Builder}
             */
            withDisplayLocations(displayLocations){
                this.displayLocations = displayLocations;
                return this
            }
            /**
             * Set score
             * @param {string} score the Score
             * @returns {Builder}
             */
            withScore(_score){
                this._score = _score;
                return this
            }
            /**
             * Set button text
             * @param {string} path the Path
             * @returns {Builder}
             */
            withPath(path){
                this.path = path;
                return this
            }
            /**
             * Set mobile images
             * @param {string} mobile images the Mobile Images
             * @returns {Builder}
             */
            withMobileImages(mobileImages){
                this.mobileImages = mobileImages;
                return this
            }
            /**
             * Set ID
             * @param {string} ID the ID
             * @returns {Builder}
             */
            withId(id){
                this.id = id;
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
             * Create PPC instance
             * @returns {PPC}
             */
            build(){
                return new PPC(this);
            }
        }
        return Builder;
    }
}
module.exports = PPC;
