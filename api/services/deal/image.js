// Image for API Classes
/**
 * The Image object to be passed into and from Image Service API
 * @class
 */
class Image{

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        /** @type {string} */
        this.id = builder.id;
        /** @type {string} */
        this.caption = builder.caption;
        /** @type {string} */
        this.alt = builder.alt;
        /** @type {string} */
        this.link = builder.link;
        /** @type {string} */
        this.extension = builder.extension;
        /** @type {string} */
        this.height = builder.height;
        /** @type {string} */
        this.width = builder.width;
        /** @type {string} */
        this.mobileImage = builder.mobileImage;
        /** @type {string} */
        this.status = builder.status;
        /** @type {string} */
        this.imageUrl = builder.imageUrl;
        /** @type {string} */
        this.mobileImageUrl = builder.mobileImageUrl;
    }

    /**
     * Object equality - compare self with other instance
     * @param {Image} other - Image instance
     * @returns {boolean}
     */
    equals(other) {
        return this === other ||
            ( other instanceof Image ) &&
            // Specific API checks
            ( other.id === this.id);
    }

    /**
     * JSON Serialise class as JSON
     * @returns {string}
     */
    toString() {
        for (let key in this) {
            if (this[key] !== '' && this[key] !== undefined) {
                console.log(key + ": " + this[key]);
            }
        }
    }

    /**
     * Obtain class builder.
     * @returns {Builder}
     */
    static get Builder() {
        /**
         * Image Builder
         * @class
         * @alias ImageBuilder
         * @example
         * new Image.Builder().with withEnvironment(environment).build()
         */
        class Builder {
            constructor() {
                // Fields can be defaulted here
                this.id = '';
                this.caption = '';
                this.alt = '';
                this.link = '';
                this.extension = '';
                this.height = '';
                this.width = '';
                this.mobileImage = '';
                this.status = '';
                this.imageUrl = '';
                this.mobileImageUrl = '';
            }
            /**
             * Set ID
             * @param {string} id The ID
             * @returns {Builder}
             */
            withId(id) {
                this.id = id;
                return this
            }
            /**
             * Set caption
             * @param {string} caption The image caption
             * @returns {Builder}
             */
            withCaption(caption) {
                this.caption = caption;
                return this
            }
            /**
             * Set alt
             * @param {string} alt The image alternative
             * @returns {Builder}
             */
            withAlt(alt) {
                this.alt = alt;
                return this
            }
            /**
             * Set link
             * @param {string} link The image link
             * @returns {Builder}
             */
            withLink(link) {
                this.link = link;
                return this
            }
            /**
             * Set extension
             * @param {string} extension The image extension
             * @returns {Builder}
             */
            withExtension(extension) {
                this.extension = extension;
                return this
            }
            /**
             * Set height
             * @param {string} height The image height
             * @returns {Builder}
             */
            withHeight(height) {
                this.height = height;
                return this
            }
            /**
             * Set width
             * @param {string} width The image width
             * @returns {Builder}
             */
            withWidth(width) {
                this.width = width;
                return this
            }
            /**
             * Set mobile image boolean
             * @param {string} mobileImage boolean if the image is a mobile image or not
             * @returns {Builder}
             */
            withMobileImage(mobileImage) {
                this.mobileImage = mobileImage;
                return this
            }
            /**
             * Set status
             * @param {string} status The image status
             * @returns {Builder}
             */
            withStatus(status) {
                this.status = status;
                return this
            }
            /**
             * Set image url
             * @param {string} imageUrl The image's URL
             * @returns {Builder}
             */
            withImageUrl(imageUrl) {
                this.imageUrl = imageUrl;
                return this
            }
            /**
             * Set mobile image url
             * @param {string} mobileImageUrl The mobile image url
             * @returns {Builder}
             */
            withMobileImageUrl(mobileImageUrl) {
                this.mobileImageUrl = mobileImageUrl;
                return this
            }
            /**
             * Create Image instance
             * @returns {Image}
             */
            build() {
                return new Image(this);
            }
        }
        return Builder;
    }
}
module.exports = Image;