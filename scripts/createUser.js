const UniversalStorage = require("../api/support/class/universal-storage");
const ApiServiceUser = require ("../api/services/user/user-service");
const UserUtilities = require("../api/services/user/utils/user");
const HttpResponseCodes = require("../api/support/https/http-response-codes");

let wowcherUser = UserUtilities.generateWowcherUser(process.argv[2]);
let livingSocialUser = UserUtilities.generateLivingSocialUser(process.argv[2]);

ApiServiceUser.registerUser(wowcherUser).then((result) => {
   if(!HttpResponseCodes.isCreated(result.statusCode)) {
       throw("I couldn't create the user: " + wowcherUser + "in the environment: " + process.argv[2])
   }
   else {
       let myStorage = new UniversalStorage();
       myStorage.store("wowcher_user", result.get());
   }
});

ApiServiceUser.registerUser(livingSocialUser).then((result) => {
    if(!HttpResponseCodes.isCreated(result.statusCode)) {
        throw("I couldn't create the user: " + livingSocialUser + "in the environment: " + process.argv[2])
    }
    else {
        let myStorage = new UniversalStorage();
        myStorage.store("living_social_user", result.get());
    }
});