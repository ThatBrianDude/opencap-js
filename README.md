# opencap-js
A javascript library for interacting with an OpenCAP server.
### Caution:
This package uses DNS lookups and will not work in browsers. 
In case you need OpenCAP in your browser app, use this package in your backend and provide the functionality through api endpoints.

## Known Issues: 
'UNABLE_TO_VERIFY_LEAF_SIGNATURE'

NodeJS by default blocks requests to servers signed by intermediary Certification Authorities, even trusted, commonly known ones.
This means that any alias hosted at a server with said certificate will not be resolved properly. To fix this there is a package that will inject intermediary certificates. Chrome for an example trusts these certificates by default. 

Install the following package: 'ssl-root-cas'

Then do as follows: 
```javascript
const sslRootCAs = require('ssl-root-cas/latest')

sslRootCAs.inject()
```

Once the certificates were downloaded and installed once, you may remove those lines from your application.

Your client can now perfectly resolve any OpenCAP alias.

## Installation

    npm i --save opencap

## Usage

#### First: Import library
```javascript
const opencap = require("opencap")
```

#### Fetch all addresses for a given alias
```javascript
const addresses = await opencap.getAddresses("example$domain.tld")
```

#### Fetch specific address for a given alias
```javascript
const address = await opencap.getAddress("example$domain.tld", 100 /* Bitcoin */)
```

#### Add/Update an address
```javascript
const authenticationResult = await opencap.authenticate("example$domain.tld", "examplepassword")
    
await opencap.putAddress("example$domain.tld", 100, "example_address", authenticationResult.jwt)        
```

#### Remove an address
```javascript
const authenticationResult = await opencap.authenticate("example$domain.tld", "examplepassword")
    
await opencap.deleteAddress("example$domain.tld", 100, authenticationResult.jwt)        
```

#### Remove all addresses
```javascript
const authenticationResult = await opencap.authenticate("example$domain.tld", "examplepassword")
    
await opencap.deleteAllAddress("example$domain.tld", authenticationResult.jwt)        
```

