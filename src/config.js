/* Copyright 2018 Schibsted Products & Technology AS. Licensed under the terms of the MIT license.
 * See LICENSE.md in the project root.
 */

'use strict';

/*
 * This file declares configs that are essentially part of how the SDK works and interacts with our
 * backend servers.
 *
 * What goes here?
 * - The configurations that are likely to change over time
 * - Constants that are otherwise obscure (for example 7000 for a TIMEOUT)
 *
 * What doesn't go here?
 * - options that the users of the SDK are supposed to set or provide as a parameter to functions
 *   and classes.
 */

/**
 * Core configuration used by the SDK
 * @type {Object}
 * @memberof core
 * @prop {object} ENDPOINTS - URL to some of the services that users of this SDK may interact with
 * @prop {object} ENDPOINTS.SPiD - SPiD endpoints
 * @prop {string} ENDPOINTS.SPiD.LOCAL - Local endpoint (for Identity team)
 * @prop {string} ENDPOINTS.SPiD.DEV - Dev environment (for Identity team)
 * @prop {string} ENDPOINTS.SPiD.PRE - Staging environment
 * @prop {string} ENDPOINTS.SPiD.PRO - Production environment Sweden
 * @prop {string} ENDPOINTS.SPiD.PRO_NO - Production environment Norway
 * @prop {object} ENDPOINTS.HAS_SESSION - Endpoints to check whether a user has a valid session
 * @prop {string} ENDPOINTS.HAS_SESSION.LOCAL - Local endpoint (for Identity team)
 * @prop {string} ENDPOINTS.HAS_SESSION.DEV - Dev environment (for Identity team)
 * @prop {string} ENDPOINTS.HAS_SESSION.PRE - Staging environment
 * @prop {string} ENDPOINTS.HAS_SESSION.PRO - Production environment Sweden
 * @prop {string} ENDPOINTS.HAS_SESSION.PRO_NO - Production environment Norway
 * @prop {object} ENDPOINTS.BFF - Endpoints used with new GDPR-compliant web flows
 * @prop {string} ENDPOINTS.BFF.LOCAL - Local endpoint (for Identity team)
 * @prop {string} ENDPOINTS.BFF.DEV - Dev environment (for Identity team)
 * @prop {string} ENDPOINTS.BFF.PRE - Staging environment
 * @prop {string} ENDPOINTS.BFF.PRO - Production environment Sweden
 * @prop {string} ENDPOINTS.BFF.PRO_NO - Production environment Norway
 * @prop {object} JSONP
 * @prop {Number} JSONP.TIMEOUT=7000 - Timeout in milliseconds
 */
const config = {
    ENDPOINTS: {
        SPiD: {
            LOCAL: 'http://id.localhost',
            DEV: 'https://identity-dev.schibsted.com',
            PRE: 'https://identity-pre.schibsted.com',
            PRO: 'https://login.schibsted.com',
            PRO_NO: 'https://payment.schibsted.no'
        },
        HAS_SESSION: {
            LOCAL: 'http://session.id.localhost',
            DEV: 'https://session.identity-dev.schibsted.com',
            PRE: 'https://session.identity-pre.schibsted.com',
            PRO: 'https://session.login.schibsted.com',
            PRO_NO: 'https://session.payment.schibsted.no'
        },
        BFF: {
            LOCAL: 'http://id.localhost/authn/',
            DEV: 'https://identity-dev.schibsted.com/authn/',
            PRE: 'https://identity-pre.schibsted.com/authn/',
            PRO: 'https://login.schibsted.com/authn/',
            PRO_NO: 'https://payment.schibsted.no/authn/',
        },
    },
    JSONP: { TIMEOUT: 7000 }, // ms
}

module.exports = config;
