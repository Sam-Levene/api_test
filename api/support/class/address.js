// Address for API Classes
/**
 * The Address object to be passed into and from Query Service API
 * @class
 */
class Address {

    /**
     * @constructor
     * @param {ClassConstructor} builder See Type.
     */
    constructor(builder) {
        this.postCodes = builder.postCodes;
    }

    /**
     * Returns a random postcode from a list of valid postcodes
     * @returns string postCodes[i]
     **/
    getRandomPostcode() {
        let i = Math.floor(Math.random() * (99 - 0)) + 0;
        return this.postCodes[i];
    }

    /**
     * Returns the complete array of postcodes
     * @returns Array postCodes
     **/
    getAllPostcodes() {
        return this.postCodes;
    }
    /**
     * Returns a specific postcode by index provided
     * @param {int} index Postcode index to use
     * @returns Array postCodes
     **/
    getPostcodeByIndex(index){
        return this.postCodes[index];
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
                //this.postCodes = ["NP78SB"];
                this.postCodes = ["NP78SB", "TA119AY", "BD227SW", "BS35QG", "OX47WR", "NP182HB", "BN79LE", "BN99TT", "AB316JA", "CB235FN", "RG206QP", "S426BP", "PO227SF", "BT308EN", "BT635BX", "BS345NB", "W37HF", "DN350HS", "HR60DZ", "L318EB", "CT68JH", "N193QS", "RG278UA", "GL543NE", "S63ND", "SP78AE", "HR35WX", "KA137JP", "DL128HQ", "M54UT", "LN117JW", "HP179UP", "DL15EZ", "TA12NY", "NN128RB", "E13WG", "TN341JJ", "CH89PT", "BS361JH", "SW97NL", "EX151QS", "SE182QG", "NR13UA", "G523BZ", "TQ148SD", "E97DA", "GL103HU", "HU53LT", "BN124LG", "SO158QQ", "SG87QD", "TW122NS", "LS125BE", "GU185RD", "AL87SB", "TW92LD", "IV170YA", "CB12AJ", "TA82SD", "BL17JN", "SP63DZ", "PA167EL", "GL516SY", "S211GU", "RH107WS", "KA55TD", "PA168SF", "IG110UF", "AL13AX", "EH35HY", "SY235NW", "SN126SQ", "DE233YY", "BS32SZ", "BA228JP", "TA42BG", "NP223SN", "CV116NS", "G59ST", "CV82BF", "BT602PY", "ST35DF", "SN31AF", "G680ET", "NP115BX", "TA245JE", "SK73PQ", "HR95BA", "MK57GH", "GL51JP", "DN159AZ", "OL82UA", "M206RA", "HX38DF", "TA109PX", "ME121JX", "ME37SW", "TA26SL", "GY14BF", "SE10BB"];
            }

            /**
             * Sets post codes
             * @param {array} postCodeArray the array of postcodes to use
             * @returns {Builder}
             */
            withOrderBy(postCodeArray) {
                this.postCodes = postCodeArray;
                return this
            }

            /**
             * Create Query instance
             * @returns {Query}
             */
            build() {
                return new Address(this);
            }
        }
        return Builder;
    }
}
module.exports = Address;