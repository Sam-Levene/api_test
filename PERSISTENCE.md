#Unlimited Persistence API

An API is available to store key value pairs between features.  The key value pairs will be stored until explicity deleted.  The is is a file-based
implementation of the HTML 5 local storage API.  All methods are static members of NodeStorage.  Both key and value must be strings - store objects 
as JSON strings.


## Usage

### How to run the script
```
node scripts/createUser.js [ENVIRONMENT]
```

### How to implement the code yourself

#### 1 ) Declare usage

```const NodeStorage = require("./api/support/class/universal-storage");```

#### 2) Instantiation

``` let myStorage = new NodeStorage```

#### 3 ) Put

```myStorage.store("key", "value" )```

#### 4 ) Get

```myStorage.fetch("token")```

#### 5 ) Delete
```myStorage.delete("key")```

#### 6 ) Clear
```myStorage.clear() // clear all key value pairs```