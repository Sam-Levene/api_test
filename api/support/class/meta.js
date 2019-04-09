/**
 * Meta class extended by all API User objects
 * @class
 */
class Meta {
    /**
     * Class constructor
     * @param {string} env - endpoint environment
     */
    constructor(env) {
        /** @type {string} */
        this.environment = env;
    }

    /**
     * When updating an API Object filter and ignore
     * any Meta fields
     * @param key
     * @param value
     * @returns value if key not part of Meta, undefined otherwise
     */
    replacer(key,value)
    {
        if (key==="environment") return undefined;
        else if (key==="brand") return undefined;
        else if (key ==="customerToken") return undefined;
        else if (key ==="subscriptionsCount") return undefined;
        else if (key ==="businessOwner") return undefined;
        else if (key ==="apiAuthToken") return undefined;
        else return value;
    }

    /**
     * Update class fields with JSON object that contains, in whole or a subset of, API class fields
     * @param {ClassConstructor} updater Update Object
     */
    update(updater) {
        for (let item in updater) {
            if (updater.hasOwnProperty(item)) {
                if (updater[item] !== undefined) {
                    this[item] = updater[item];
                }
            }
        }
        return this;
    }
    clone() {
        return JSON.parse(JSON.stringify(this));
    }
}

module.exports = Meta;