/* Copyright 2018 Schibsted Products & Technology AS. Licensed under the terms of the MIT license.
 * See LICENSE.md in the project root.
 */

'use strict';

const { assert, isStr, isNonEmptyString, isUrl } = require('./validate');
const { urlMapper } = require('./url');
const { ENDPOINTS } = require('./config');
const EventEmitter = require('tiny-emitter');
const JSONPClient = require('./JSONPClient');
const Cache = require('./cache');
const spidTalk = require('./spidTalk');

const DEFAULT_CACHE_EXPIRES_IN = 0;
const globalWindow = window;

/**
 * Provides features related to monetization
 */
class Monetization extends EventEmitter {
    /**
     * @param {object} options
     * @param {string} options.clientId - Mandatory client id
     * @param {string} [options.redirectUri] - Redirect uri
     * @param {string} [options.env=PRE] - Schibsted Account environment: `PRE`, `PRO` or `PRO_NO`
     * @throws {SDKError} - If any of options are invalid
     */
    constructor({ clientId, redirectUri, env = 'PRE', window = globalWindow }) {
        super();
        spidTalk.emulate(window);
        // validate options
        assert(isNonEmptyString(clientId), 'clientId parameter is required');

        this.cache = new Cache(window && window.sessionStorage);
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this._setSpidServerUrl(env);
    }

    /**
     * Set SPiD server URL
     * @private
     * @param {string} url
     * @returns {void}
     */
    _setSpidServerUrl(url) {
        assert(isStr(url), `url parameter is invalid: ${url}`);
        this._spid = new JSONPClient({
            serverUrl: urlMapper(url, ENDPOINTS.SPiD),
            defaultParams: { client_id: this.clientId, redirect_uri: this.redirectUri },
        });
    }

    /**
     * Checks if the user has access to a particular product
     * @param {string} productId
     * @param {string} spId - The spId that was obtained from {@link Identity#hasSession}
     * @returns {Object} The data object returned from Schibsted Account
     */
    async hasProduct(productId, spId) {
        const cacheKey = `prd_${productId}`;
        const cachedVal = this.cache.get(cacheKey);
        if (cachedVal) {
            return cachedVal;
        }
        const params = { product_id: productId }
        if (spId !== undefined) {
            params.sp_id = spId;
        }
        const data = await this._spid.get('ajax/hasproduct.js', params);
        if (!data.result) {
            return null;
        }
        const expiresIn = (data.expiresIn || DEFAULT_CACHE_EXPIRES_IN) * 1000;
        this.cache.set(cacheKey, data, expiresIn);
        this.emit('hasProduct', { productId, data });
        return data;
    }

    /**
     * Checks if the user has access to a particular subscription
     * @param {string} subscriptionId
     * @param {string} spId - The spid that was obtained from {@link Identity#hasSession}
     * @returns {Object} The data object returned from Schibsted Account
     */
    async hasSubscription(subscriptionId, spId) {
        const cacheKey = `sub_${subscriptionId}`;
        const cachedVal = this.cache.get(cacheKey);
        if (cachedVal) {
            return cachedVal;
        }
        const params = { product_id: subscriptionId }
        if (spId !== undefined) {
            params.sp_id = spId;
        }
        const data = await this._spid.get('ajax/hassubscription.js', params);
        if (!data.result) {
            return null;
        }
        const expiresIn = (data.expiresIn || DEFAULT_CACHE_EXPIRES_IN) * 1000;
        this.cache.set(cacheKey, data, expiresIn);
        this.emit('hasSubscription', { subscriptionId, data });
        return data;
    }

    /**
     * Get the url for the end user to review the subscriptions
     * @param {string} [redirectUri=this.redirectUri]
     * @return {string} - The url to the subscriptions review page
     */
    subscriptionsUrl(redirectUri = this.redirectUri) {
        assert(isUrl(redirectUri), `subscriptionsUrl(): redirectUri is invalid`);
        return this._spid.makeUrl('account/subscriptions', { redirect_uri: redirectUri });
    }

    /**
     * Get the url for the end user to review the products
     * @param {string} [redirectUri=this.redirectUri]
     * @return {string} - The url to the products review page
     */
    productsUrl(redirectUri = this.redirectUri) {
        assert(isUrl(redirectUri), `productsUrl(): redirectUri is invalid`);
        return this._spid.makeUrl('account/products', { redirect_uri: redirectUri });
    }
}

module.exports = Monetization;
