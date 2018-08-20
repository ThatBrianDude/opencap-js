/**
 * Validates if a given string is in the alias format 
 * @param {string} alias 
 */
function isValidAlias(alias) {
    const regex = /^(([^<>()\[\]\\.,;:\s\$"]+(\.[^<>()\[\]\\.,;:\s\$"]+)*)|(".+"))\$((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(alias).toLowerCase())
}

module.exports = {
    isValidAlias
}