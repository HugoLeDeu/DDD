/*global process*/

var LOCAL_PORT = process.env.PORT || 5000,
    getUrlFor,
    getRootUrl;

/**
 * Permet d'obtenir l'url avec le port.
 */
getUrlFor = function (suffix) {
    return "http://localhost:" + LOCAL_PORT + suffix;
};

/**
 * Permet d'obtenir l'url racine avec le port.
 */
getRootUrl = function () {
    return "http://localhost:" + LOCAL_PORT;
};

exports.getUrlFor = getUrlFor;
exports.getRootUrl = getRootUrl;