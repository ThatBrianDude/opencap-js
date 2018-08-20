/**
 * Parses the host from a given alias
 * example@domain.tld -> domain.tld
 * @param {string} alias 
 */
function hostFromAlias(alias) {
    return alias.replace(/.*\$/, "")
}

module.exports = {
    hostFromAlias
}