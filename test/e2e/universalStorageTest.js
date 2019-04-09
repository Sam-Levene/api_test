const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');
const UniversalStorage = require("../../api/support/class/universal-storage");
const ApiServiceUser = require ("../../api/services/user/user-service");
const User = require("../../api/services/user/user");
const UserUtilities = require("../../api/services/user/utils/user");
const HttpResponseCodes = require("../../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.env.ENVIRONMENT);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.env.ENVIRONMENT);

describe("UniversalStorage Endpoints", async function() {
    it("Completely clears out on initialisation successfully", async function () {
        let myStorage = new UniversalStorage();
        myStorage.clear();
        expect(myStorage.localStore.length).to.equal(0);
    }).timeout(10000);

    it("Creates a storage item successfully", async function () {
        let myStorage = new UniversalStorage();
        expect(myStorage.localStore.length).to.equal(0);
    }).timeout(10000);

    it("Adds a new element to a storage item successfully", async function() {
        let myStorage = new UniversalStorage();
        myStorage.store("myKey", "myValue");
        expect(myStorage.fetch("myKey")).to.equal("myValue");
        expect(myStorage.localStore.length).to.equal(1);
    }).timeout(10000);

    it("Requests a new element from a storage item successfully", async function() {
        let myStorage = new UniversalStorage();
        expect(myStorage.fetch("myKey")).to.equal("myValue");
    }).timeout(10000);

    it("Removes an element from a storage item successfully", async function() {
        let myStorage = new UniversalStorage();
        myStorage.delete("myKey");
        expect(myStorage.localStore.length).to.equal(0);
    }).timeout(10000);

    it("It can check for the existence of a key", async function() {
        let myStorage = new UniversalStorage();
        myStorage.store("myKey", "myValue" );
        expect(myStorage.exists("myKey")).to.equal(true);
        expect(myStorage.exists("notMyKey")).to.equal(false);
    }).timeout(10000);
});

/*describe("Register a wowcher user, clones it and stores it", async function() {
    it("Registers successfully", async function () {
        return ApiServiceUser.registerUser(wowcherUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);

            let newUser = result.get();
            let deepUserClone = _.cloneDeep(newUser);
            let myStorage = new UniversalStorage();

            myStorage.store("wowcher_user", JSON.stringify(newUser));
            let myReturn = JSON.parse(myStorage.fetch("wowcher_user"));
            let returnedUser = new User(myReturn);

            expect(returnedUser.equals(deepUserClone)).to.equal(true);
            expect(myStorage.localStore.length).to.equal(1);
        });
    }).timeout(10000);
});


describe("Register a living social user, clones it and stores it", async function() {
    it("Registers successfully", async function () {
        return ApiServiceUser.registerUser(livingSocialUser).then((result) => {
            expect(result.entries).to.not.equal(0);
            expect(HttpResponseCodes.isCreated(result.statusCode)).to.equal(true);

            let newUser = result.get();
            let deepUserClone = _.cloneDeep(newUser);
            let myStorage = new UniversalStorage();

            myStorage.store("living_social_user", JSON.stringify(newUser));
            let myReturn = JSON.parse(myStorage.fetch("living_social_user"));
            let returnedUser = new User(myReturn);

            expect(returnedUser.equals(deepUserClone)).to.equal(true);
            expect(myStorage.localStore.length).to.equal(2);
        });
    }).timeout(10000);
});

describe("Clear out all data previously saved for a new test run", async function() {
    it("Completely clears out on initialisation successfully", async function () {
        let myStorage = new UniversalStorage();
        myStorage.clear();
        expect(myStorage.localStore.length).to.equal(0);
    }).timeout(10000);
});*/

describe("Tests storage parameter types", async function() {
    it("Throws appropriate Errors", async function () {
        let myStorage = new UniversalStorage();
        expect(() => myStorage.store()).to.throw(TypeError);
        expect(() => myStorage.store(null)).to.throw(TypeError);
        expect(() => myStorage.store(null, null)).to.throw(TypeError);
        expect(() => myStorage.store(undefined)).to.throw(TypeError);
        expect(() => myStorage.store(undefined, undefined)).to.throw(TypeError);
        expect(() => myStorage.store(null, undefined)).to.throw(TypeError);
        expect(() => myStorage.store(undefined, null)).to.throw(TypeError);
        expect(() => myStorage.store(1, 1)).to.throw(TypeError);
        expect(() => myStorage.store(new Date(), new String)).to.throw(TypeError);
        expect(() => myStorage.store(true, false)).to.throw(TypeError);
        expect(() => myStorage.fetch()).to.throw(TypeError);
        expect(() => myStorage.fetch(null)).to.throw(TypeError);
        expect(() => myStorage.fetch(undefined)).to.throw(TypeError);
        expect(() => myStorage.delete()).to.throw(TypeError);
        expect(() => myStorage.delete(null)).to.throw(TypeError);
        expect(() => myStorage.delete(undefined)).to.throw(TypeError);
        expect(() => myStorage.store("key", "value")).to.not.throw(TypeError);
        expect(() => myStorage.fetch("key")).to.not.throw(TypeError);
        expect(() => myStorage.delete("key")).to.not.throw(TypeError);
        myStorage.store("key1", "value1");
        myStorage.store("key2", "value2");
        expect(myStorage.toString()).not.to.be.null;

        expect(() => myStorage.fetch("notAkey")).to.throw(ReferenceError);

    }).timeout(10000);
});