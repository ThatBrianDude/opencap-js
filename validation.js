/**
 * Validates alias format 
 * @param {string} alias 
 */
function isValidAlias(alias) {
    if (!isEmail(alias))
        return false

    return true
}

/**
 * Tests if the given string is an email
 * @param {string} email 
 */
function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

module.exports = {
    isValidAlias
}