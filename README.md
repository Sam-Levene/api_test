## Installation ##
In the repository that you want to install this on, do the following:

1. In the `package.json` file add the line `"@wowcher/public-api-wowcher": "0.5.0",` to the dependencies
2. In the command line run `npm config set @wowcher:registry http://artifactory.devwowcher.prv:8081/artifactory/api/npm/npm-local/` 
(*NOTE:* You need to be either on the VPN or have NPM configured to bypass the proxy in order to make this work)
3. In the command line run `npm install`
4. In the files that you want to reference, call `"@wowcher/public-api-wowcher/directory/to/file"` 
(E.G: `const userService = "@wowcher/public-api-wowcher/api/services/user/user-service"`)

### NPM Packaging ###
This set of tests is designed to be a NPM module and as such; in order to save it to a private npm area; we need to connect to Wowcher's Artifactory server.

To do this the following commands will need to be run on a terminal (or equivalent command-line interface):

```
npm config set @wowcher:registry http://artifactory.devwowcher.prv:8081/artifactory/api/npm/npm-local/
npm login --registry "http://artifactory.devwowcher.prv:8081/artifactory/api/npm/npm-local/" --scope "@wowcher"
npm publish
```

Please contact Aron Neagu for credentials to use in the `npm login` step.


### Executing the tests ###

Currently, the API suite comes with a set of tests available to be run; these are documented in the `package.json` file 
and can be instantiated with the following commands:

```
npm install
npm run nxt02Tests
```

### Documentation Generation ###
```
npm run docgen
```
HTML files generated in project/out directory