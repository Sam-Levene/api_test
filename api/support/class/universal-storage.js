const LocalStorage = require('node-localstorage').LocalStorage;

/**
 * UniversalStorage class to save some data to a file in order to be able to persist beyond a single iteration
 * @class
 */
class UniversalStorage {
    /**
     * Class constructor - sets up the storage, but ignores new creation if it already exists
     */
    constructor() {
        this.localStore = new LocalStorage('./storage_properties');

    }

    /**
     * Stores a key, value pairing into a local storage
     */
    store(key, value) {

        if (this.isNullOrUndefinedOrNotString(key, value)) {
            throw new TypeError("UniversalStorage : store() : The key or value pairing is either null or missing or invalid");
        }
        else {
            this.localStore.setItem(key, value);
        }

    }

    /**
     * Retrieves a local storage item based on key value
     */
    fetch(key) {

        if (this.isNullOrUndefinedOrNotString(key)) {
            throw new TypeError("UniversalStorage : fetch() : The key is either null or missing or invalid");
        }

        let val = this.localStore.getItem(key);

        if(val === null) {
            throw new ReferenceError("UniversalStorage : fetch() : Key not present in store");
        }
        return val;
    }

    /**
     * Deletes a local storage item based on key value
     */
    delete(key) {
        if (this.isNullOrUndefinedOrNotString(key)) {
            throw new TypeError("UniversalStorage : delete() : The key is either null or missing");
        }
        this.localStore.removeItem(key);
    }

    /**
     * Completely clears out a local storage item
     */
    clear() {
        this.localStore.clear();
    }

    exists(key) {
        let res = this.localStore.getItem(key) === null ? false : true ;
        return res;
    }

    isNullOrUndefinedOrNotString() {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] === null ||
                arguments[i] === undefined ||
                typeof arguments[i] !== 'string' )
            {
                return true
            }
        }
        return false;
    }
    toString() {
        let str = 'Univeral Store\n';
        for(let i=0; i < this.localStore.length; i++) {
            let val = this.localStore.key(i);
            str+="\n"+ i + " : " + val + " = " +this.localStore.getItem(val);
        }
        return str;
    }


}

module.exports = UniversalStorage;