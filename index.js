const validation = require("./validation")
const parse = require("./parsing.js")
const request = require("request-promise-native")

/**
 * Requests and returns JWT from the server at the host provided in the alias. 
 * @param {string} alias 
 * @param {string} password 
 */
async function authenticate(alias, password) {
    if (!validation.isValidAlias(alias))
        throw new Error("Invalid Alias. (example@domain.tld)")

    const host = parse.hostFromAlias(alias)
    const url = `https://opencap.${host}/v1/auth`

    const result = await request({
        method: 'post',
        body: {
            alias,
            password
        },
        json: true,
        url: url
    })

    if (result.jwt)
        return result

    throw result
}

/**
 * Adds or Updates the given address type for the given user
 * @param {string} alias The alias the address belongs to
 * @param {number} type The address type e.g 100 (Bitcoin)
 * @param {string} address The value of the address
 * @param {string} jwt The jwt of the user behind the given alias
 *  
 */
async function putAddress(alias, type, address, jwt) {
    if (!validation.isValidAlias(alias))
        throw new Error("Invalid Alias. (example@domain.tld)")

    const host = parse.hostFromAlias(alias)
    const url = `https://opencap.${host}/v1/addresses`

    const result = await request({
        method: 'put',
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        body: {
            address_type: type,
            address
        },
        json: true,
        url: url
    })

    return result
}

/**
 * Requests and returns JWT from the server at the host provided in the alias. 
 * @param {string} alias The alias the address belongs to
 * @param {number} type The address type e.g 100 (Bitcoin)
 * @param {string} jwt The jwt of the user behind the given alias
 *  
 */
async function deleteAddress(alias, type, jwt) {
    if (!validation.isValidAlias(alias))
        throw new Error("Invalid Alias. (example@domain.tld)")

    const host = parse.hostFromAlias(alias)
    const url = `https://opencap.${host}/v1/addresses/${type}`

    const result = await request({
        method: 'delete',
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        json: true,
        url: url
    })

    return result
}

/**
 * Requests and returns JWT from the server at the host provided in the alias. 
 * @param {string} alias The alias the addresses belong to
 * @param {string} jwt The jwt of the user behind the given alias
 *  
 */
async function deleteAllAddresses(alias, jwt) {
    if (!validation.isValidAlias(alias))
        throw new Error("Invalid Alias. (example@domain.tld)")

    const host = parse.hostFromAlias(alias)
    const url = `https://opencap.${host}/v1/addresses`

    const result = await request({
        method: 'delete',
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        json: true,
        url: url
    })

    return result
}

/**
 * Fetches all addresses behind the given alias
 * @param {string} alias The alias the addresses belong to
 *  
 */
async function getAddresses(alias) {
    if (!validation.isValidAlias(alias))
        throw new Error("Invalid Alias. (example@domain.tld)")

    const host = parse.hostFromAlias(alias)
    const url = `https://opencap.${host}/v1/addresses`

    const result = await request({
        method: 'get',
        json: true,
        url: url
    })

    return result
}

/**
 * Fetches all addresses behind the given alias
 * @param {string} alias The alias the addresses belong to
 * @param {number} type The address type to be fetched
 * 
 *  
 */
async function getAddress(alias, type) {
    if (!validation.isValidAlias(alias))
        throw new Error("Invalid Alias. (example@domain.tld)")

    const host = parse.hostFromAlias(alias)
    const url = `https://opencap.${host}/v1/addresses?alias=${alias}&address_type=${type}`

    const result = await request({
        method: 'get',
        json: true,
        url: url
    })

    return result
}

module.exports = {
    authenticate,
    getAddresses,
    getAddress,
    putAddress,
    deleteAllAddresses,
    deleteAddress,
}
