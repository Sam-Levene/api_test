const ShortcutService = require ("../api/services/shortcut/shortcut-service");
const chai = require('chai');
const expect = chai.expect;
const Shortcut = require("../api/services/shortcut/shortcut");
const HttpResponseCodes = require("../api/support/https/http-response-codes");



describe("Get an Shortcut", async function() {

    it("Creates an object builder", function () {
        let firstShortcut = new Shortcut.Builder().withId('123').build();
        let secondShortcut = new Shortcut.Builder().withId('123').build();
        let thirdShortcut = new Shortcut.Builder().withId('456').build();

        expect(firstShortcut.equals(firstShortcut)).to.equal(true);
        expect(secondShortcut.equals(secondShortcut)).to.equal(true);
        expect(firstShortcut.equals(thirdShortcut)).to.equal(false);
        expect(firstShortcut.equals(new String("I am not a Shortcut Object"))).to.equal(false);
    }).timeout(10000);

    it("Successfully looks up shortcuts using identifiers", async function () {
        // Permanent shortcuts - see TAPI-76 attachment
        getShortcut('callbacks/todays_deal.php', '/deals' );
        getShortcut('deal', '/deals' );
        getShortcut('blah', '/deals' );
        getShortcut('christmas', 'http://www.wowcher.co.uk/search?tags=zMetroChristmas&location=london' );

    }).timeout(10000);

    it("Returns status 404  looks up shortcuts using identifiers", async function () {
        let shortcut = new Shortcut.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId('dealz')
            .withBrand('wowcher')
            .build();

        return ShortcutService.getShortcut(shortcut).then((response) => {
            expect(HttpResponseCodes.isNotFound(response.statusCode)).to.equal(true);
        });
    }).timeout(10000);

    function getShortcut( id, expectedShortcut ) {
        let shortcut =  new Shortcut.Builder()
            .withEnvironment(process.env.ENVIRONMENT)
            .withId(id)
            .withBrand('wowcher')
            .build();

        return ShortcutService.getShortcut(shortcut).then((response) => {
            expect(HttpResponseCodes.isOK(response.statusCode)).to.equal(true);
            expect(response.get().isPopulated()).to.equal(true);
            expect(response.get().redirectUrl).to.equal(expectedShortcut);
        });
        
    }
});