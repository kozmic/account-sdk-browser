/* Copyright 2018 Schibsted Products & Technology AS. Licensed under the terms of the MIT license.
 * See LICENSE.md in the project root.
 */

'use strict'

const { assert, isNonEmptyString, isUrl, isNonEmptyObj } = require('./validate');

/**
 * A simple utility function that allows looking up URLs from a dictionary
 * @memberof core
 * @param {string} url - A url like http://example.com, or a key used for lookup
 * @param {object<string,string>} urlMap - A map of URLs like
 * `{ DEV: 'http://dev.example.com' }`
 * @throws {SDKError} - If the url is not an string or is an empty string
 * @return {string} The url that points to the server
 */
function urlMapper(url, urlMap) {
    if (isUrl(url, 'hostname')) {
        return url;
    }
    assert(isNonEmptyString(url), `"url" param must be a non empty string: ${typeof url}`);
    assert(isNonEmptyObj(urlMap), 'urlMap must be an object');
    const resultUrl = urlMap[url];
    assert(isUrl(resultUrl, 'hostname'), `The urlMap object does not have a url for ${url}`);
    return resultUrl;
}

module.exports = { urlMapper };
