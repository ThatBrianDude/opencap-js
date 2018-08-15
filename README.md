# opencap-js
A javascript library for interacting with an OpenCap server.

## Installation

    npm i --save opencap

## Usage

#### First: Import library
```javascript
const opencap = require("opencap")
```

#### Fetch all addresses for a given alias
```javascript
const addresses = opencap.getAddresses("example@domain.tld")
```

#### Fetch specific address for a given alias
```javascript
const address = opencap.getAddress("example@domain.tld", 100 /* Bitcoin */)
```

#### Add/Update an address
```javascript
const authenticationResult = await opencap.authenticate("example@domain.tld", "examplepassword")
    
await opencap.putAddress("example@domain.tld", 100, "example_address", authenticationResult.jwt)        
```

#### Remove an address
```javascript
const authenticationResult = await opencap.authenticate("example@domain.tld", "examplepassword")
    
await opencap.deleteAddress("example@domain.tld", 100, authenticationResult.jwt)        
```

#### Remove all addresses
```javascript
const authenticationResult = await opencap.authenticate("example@domain.tld", "examplepassword")
    
await opencap.deleteAllAddress("example@domain.tld", authenticationResult.jwt)        
```

