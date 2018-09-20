const request = require("request-promise-native")
const messages = require("./messages.json")
const validation = require("./validation")
const parse = require("./parsing")
const dns = require("dns")

/**
 * Requests and returns JWT from the server at the host provided in the alias. 
 * @param {string} alias 
 * @param {string} password 
 */
async function authenticate(alias, password) {
    if (!validation.isValidAlias(alias))
        throw new Error(messages.INVALID_ALIAS_FORMAT)

    const url = await getTargetUrl(alias, `/v1/auth`)

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
        throw new Error(messages.INVALID_ALIAS_FORMAT)

    const url = await getTargetUrl(alias, `/v1/addresses`)

    return await request({
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
        throw new Error(messages.INVALID_ALIAS_FORMAT)

    const url = await getTargetUrl(alias, `/v1/addresses/${type}`)

    return await request({
        method: 'delete',
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        json: true,
        url: url
    })
}

/**
 * Requests and returns JWT from the server at the host provided in the alias. 
 * @param {string} alias The alias the addresses belong to
 * @param {string} jwt The jwt of the user behind the given alias
 *  
 */
async function deleteAllAddresses(alias, jwt) {
    if (!validation.isValidAlias(alias))
        throw new Error(messages.INVALID_ALIAS_FORMAT)

    const url = await getTargetUrl(alias, "/v1/addresses")

    return await request({
        method: 'delete',
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        json: true,
        url: url
    })
}

/**
 * Fetches a specific address behind the given alias
 * @param {string} alias The alias the addresses belong to
 * @param {number} type The address type to be fetched
 * 
 *  
 */
async function getAddress(alias, type) {
    if (!validation.isValidAlias(alias))
        throw new Error(messages.INVALID_ALIAS_FORMAT)

    const url = await getTargetUrl(alias, `/v1/addresses?alias=${alias}&address_type=${type}`)

    return await request({
        method: 'get',
        json: true,
        url: url
    })
}

/**
 * Fetches all addresses behind the given alias.
 * @param {string} alias 
 *  
 */
async function getAddresses(alias) {
    if (!validation.isValidAlias(alias))
        throw new Error(messages.INVALID_ALIAS_FORMAT)

    const url = await getTargetUrl(alias, `/v1/addresses?alias=${alias}`)

    return await request({
        method: 'get',
        json: true,
        url: url
    })
}

/**
 * Resolves target host of the given alias and appends the given path. 
 * @param {string} alias 
 * @param {string} path 
 */
async function getTargetUrl(alias, path) {
    const target = await getTargetHost(alias)
    return `https://${target}${path}`
}

/**
 * Fetches the actual host behind an alias considering proxy domains via SRV Lookups.
 * @param {string} alias 
 */
async function getTargetHost(alias) {
    const host = parse.hostFromAlias(alias)
    const srvResult = await fetchOpenCAPSRVRecord(host)
    const targetHost = srvResult[0].name
    const targetPort = srvResult[0].port
    return `${targetHost}:${targetPort}`
}

/**
 * Fetches the opencap specific SRV record at the given domain. 
 * @param {string} domain 
 */
function fetchOpenCAPSRVRecord(domain) {
    const url = `_opencap._tcp.${domain}`
    return new Promise((resolve, reject) => {
        dns.resolveSrv(url, (error, result) => {
            if (error) {
                return reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = {
    authenticate,
    getAddresses,
    getAddress,
    putAddress,
    deleteAllAddresses,
    deleteAddress,
}
