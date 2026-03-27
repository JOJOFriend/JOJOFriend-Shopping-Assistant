($ => {
    "use strict";

    /**
     * @param {*} ext
     * @param {*} platformConfig
     * @param {*} platformConfigs
     */
    $.RequestHelper = function (ext, platformConfig, platformConfigs) {
        platformConfig = platformConfig || { platformId: "unsupported" };

        const cacheRequestMap = {};
        const baseUrl = $.opts.baseUrl;
        const urls = {
            exchangeInfo: { method: "GET", url: baseUrl + "/ext/deep/link" },
            getLangue: { method: "POST", url: baseUrl + "/ext/locales/lang" },
            couponExistConf: { method: "GET", url: baseUrl + "/ext/conf/load" },
            couponExist: { method: "GET", url: baseUrl + "/ext/c/e" },
            couponQrCode: { method: "GET", url: baseUrl + "/ext/c/c" },
            couponQuery: { method: "GET", url: baseUrl + "/ext/c/q" },
            detectCtrl: { method: "POST", url: baseUrl + "/ext/client/ctrl" },
            detectData: { method: "POST", url: baseUrl + "/ext/client/data" }
        };

        // -------------------------------------------------------------------------
        // Private: base params & extra params
        // -------------------------------------------------------------------------

        const getBaseParams = async () => {
            const eId = await ext.helper.dao.getEid();
            const token = ext.helper.dao.getData($.opts.storageKeys.website.token, "");
            const params = {
                v: $.opts.apiVersion,
                version: $.opts.apiVersion,
                no: $.opts.number,
                eId: eId || "",
                token: token || ""
            };
            ext.logger("info", "RequestHelper", "getBaseParams", "BaseParams url:", params);
            return params;
        };

        const addExtraParams = (params) => {
            if (!params.hasOwnProperty("url")) {
                params.url = encodeURIComponent(window.location.href);
            }
            return params;
        };

        /**
         * Build merged params and final GET URL for coupon-style requests.
         * @param {object} urlConfig - { method, url }
         * @param {object} params - request params
         * @param {string} logLabel - label for ext.logger
         * @returns {{ finalUrl: string, method: string, params: object }}
         */
        const buildCouponGetRequest = async (urlConfig, params, logLabel) => {
            const baseParams = await getBaseParams();
            params = addExtraParams(params);
            params = Object.assign({}, params, baseParams);

            const queryString = Object.entries(params)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const finalUrl = urlConfig.url + "?" + queryString;
            ext.logger("info", "RequestHelper", "buildCouponGetRequest", logLabel, finalUrl);
            
            return { finalUrl, method: urlConfig.method, params };
        };

        /**
         * Call dao.request and resolve with result or null (no JSON parse).
         */
        const callRequestResolveResult = (requestOpts) => {
            return new Promise((resolve) => {
                ext.helper.dao
                    .call("request", requestOpts)
                    .then((data) => {
                        resolve(data.code === "success" && !!data.result ? data.result : null);
                    })
                    .catch(() => resolve(null));
            });
        };

        /**
         * Call dao.request and resolve with parsed JSON or null.
         */
        const callRequestResolveJson = (requestOpts) => {
            return new Promise((resolve) => {
                ext.helper.dao
                    .call("request", requestOpts)
                    .then((data) => {
                        if (data.code === "success" && !!data.result) {
                            resolve(JSON.parse(data.result));
                        } else {
                            resolve(null);
                        }
                    })
                    .catch(() => resolve(null));
            });
        };

        // -------------------------------------------------------------------------
        // Public: XHR & cache
        // -------------------------------------------------------------------------

        this.requestAndSaveSate = function (method, url, param) {
            return new Promise((resolve) => {
                const key = "key_" + Date.now();
                const xhr = new XMLHttpRequest();
                cacheRequestMap[key] = xhr;

                if (method === "GET") {
                    let queryString = "";
                    if (param) {
                        queryString = "?" + new URLSearchParams(param).toString();
                    }
                    console.log("request get:", url + queryString);
                    xhr.open(method, url + queryString);
                    xhr.send();
                } else if (method === "POST") {
                    xhr.open(method, url);
                    xhr.setRequestHeader("Content - Type", "application/json");
                    xhr.send(JSON.stringify(param));
                } else {
                    resolve({ code: "error", requestKey: key, result: null });
                    return;
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== 4) return;
                    const ok = xhr.status >= 200 && xhr.status < 300;
                    try {
                        resolve({
                            code: ok ? "success" : "error",
                            requestKey: key,
                            result: ok ? xhr.responseText : null
                        });
                    } catch (e) {
                        resolve({ code: "error", requestKey: key, result: null });
                    }
                };
            });
        };

        this.removeRequest = function (requestKey) {
            delete cacheRequestMap[requestKey];
        };

        this.abortAllRequests = function () {
            Object.keys(cacheRequestMap).forEach((key) => {
                cacheRequestMap[key].abort();
                delete cacheRequestMap[key];
            });
        };

        // -------------------------------------------------------------------------
        // Public: Coupon query (details page)
        // -------------------------------------------------------------------------

        /**
         * Coupon Inquiry on Details Page
         */
        this.getCouponQuery = async (params) => {
            const { finalUrl, method, params: mergedParams } = await buildCouponGetRequest(
                urls.couponQuery,
                params,
                "couponQuery url:"
            );
            return ext.helper.dao.call("request", {
                url: finalUrl,
                method,
                params: mergedParams
            });
        };

        /**
         * Pull QR code on the details page
         */
        this.getCouponQrCode = async (params) => {
            const { finalUrl, method, params: mergedParams } = await buildCouponGetRequest(
                urls.couponQrCode,
                params,
                "couponQrCode url:"
            );
            return ext.helper.dao.call("request", {
                url: finalUrl,
                method,
                params: mergedParams
            });
        };

        /**
         * Search interface query whether the coupon exists (cross-origin, high frequency).
         * Ebay, Aliexpress
         */
        this.getCouponExist = async (params) => {
            const { finalUrl, method } = await buildCouponGetRequest(
                urls.couponExist,
                params,
                "getCouponExist url:"
            );
            return this.requestAndSaveSate(method, finalUrl, null);
        };

        /**
         * Pull configuration file (coupon query).
         */
        this.requestCouponExistConf = function () {
            const { method, url } = urls.couponExistConf;
            return callRequestResolveResult({ url, method, params: null });
        };

        // -------------------------------------------------------------------------
        // Public: Coupon exploration (detect)
        // -------------------------------------------------------------------------

        const getDynamicParams = async (platform) => {
            let marketplace = "",
                currency = "",
                countryCode = "";
            try {
                if (platform === platformConfigs.aliexpress.platformId) {
                    const aliexpress = ext.helper.coupon.aliexpress;
                    marketplace = await aliexpress.getMarketplace();
                    currency = await aliexpress.getCurrency();

                } else {
                    countryCode = ext.helper.util.getCommonMarketplace();
                    marketplace = encodeURIComponent(
                        JSON.stringify({ countryCode, className: "", html: "" })
                    );
                }
            } catch (error) {
                ext.logger("error", "RequestHelper", "getDynamicParams", "getDynamicParams===========>", error);
            }
            ext.logger("info", "RequestHelper", "getDynamicParams", "getDynamicParams===========>", platform, marketplace, currency);
            return { marketplace, currency };
        };

        const getDetectDataParams = async () => {
            const platform = platformConfig.platformId;
            const { marketplace, currency } = await getDynamicParams(platform);
            let lang = ext.helper.i18n.getLanguage();
            if (lang === "default") {
                lang = $.opts.manifest.default_locale;
            }
            const params = {
                platform: platformConfig.platformId,
                url: window.location.href,
                lang,
                marketplace,
                currency
            };
            const baseParams = await getBaseParams();
            return Object.assign({}, params, baseParams);
        };

        /**
         * Configuration file for obtaining coupon list.
         */
        this.getDetectCtrlResult = async function () {
            const params = await getDetectDataParams();
            const { method, url } = urls.detectCtrl;
            ext.logger("info", "RequestHelper", "getDetectCtrlResult", "detect info result params===========>", method, url, JSON.stringify(params));
            return callRequestResolveJson({ url, method, params });
        };

        /**
         * Get coupon list
         */
        this.getDetectDataResult = async function () {
            const params = await getDetectDataParams();
            const { method, url } = urls.detectData;
            ext.logger("info", "RequestHelper", "getDetectDataResult", "detect coupon result params===========>", method, url, JSON.stringify(params));
            return callRequestResolveJson({ url, method, params });
        };

        // -------------------------------------------------------------------------
        // Public: Init (tokens, exchange info)
        // -------------------------------------------------------------------------

        this.getactivateEvent = async (ticket) =>{
            const { method, url } = {url: baseUrl+ticket, method: "POST"};
            const baseParams = await getBaseParams();
            return callRequestResolveJson({ url, method, params: baseParams });
        };

        /**
         * Get token, combine 2 steps together.
         */
        this.initRequestData = async () => {
            try {
                const now = Date.now();
                let exchangeInfoLocal = ext.helper.dao.getData(
                    $.opts.storageKeys.website.exchangeInfo,
                    null
                );
                
                ext.logger("info", "RequestHelper", "initRequestData", "local=====>", exchangeInfoLocal, $.opts.updateExchangeInfoDelay);
                const needFetchConfig = !exchangeInfoLocal || (exchangeInfoLocal.time && now - exchangeInfoLocal.time > $.opts.updateExchangeInfoDelay);
                if (needFetchConfig) {
                    try {
                        const { url, method } = urls.exchangeInfo;
                        const exchangeInfoServer = await ext.helper.dao.call("request", {
                            url,
                            method,
                            params: null
                        });
                        ext.logger("info", "RequestHelper", "initRequestData", "exchangeInfo====>", url, method);
                        if (
                            exchangeInfoServer.code === "success" &&
                            !!exchangeInfoServer.result
                        ) {
                            const exchangeInfoJsonServer = JSON.parse(exchangeInfoServer.result);
                            const { certificate, redirect } = exchangeInfoJsonServer;
                            exchangeInfoLocal = {
                                certificate,
                                redirect,
                                time: now
                            };
                            ext.logger("info", "RequestHelper", "initRequestData", "server update=====>", exchangeInfoLocal);
                            await ext.helper.dao.setDataByKey(
                                $.opts.storageKeys.website.exchangeInfo,
                                exchangeInfoLocal
                            );
                        } else {
                            ext.logger("error", "RequestHelper", "initRequestData", "exchangeInfo====>null");
                        }
                    } catch (error) {
                        ext.logger("error", "RequestHelper", "initRequestData", "exchangeInfo====>error", error);
                    }
                }

                if (!exchangeInfoLocal || !exchangeInfoLocal.certificate) {
                    exchangeInfoLocal = ext.helper.dao.getDefaults().w.exchangeInfo;
                }

                try {
                    const tokenData = await ext.helper.dao.call("request", {
                        url: exchangeInfoLocal.certificate,
                        method: "post",
                        params: null
                    });
                    if (tokenData.code === "success" && !!tokenData.result) {
                        const { token } = JSON.parse(tokenData.result);
                        await ext.helper.dao.setDataByKey(
                            $.opts.storageKeys.website.token,
                            !!token ? encodeURIComponent(token) : ""
                        );
                        ext.logger("info", "RequestHelper", "initRequestData", "token====>", token);
                    } else {
                        ext.logger("info", "RequestHelper", "initRequestData", "Token====>null");
                    }
                } catch (error) {
                    ext.logger("error", "RequestHelper", "initRequestData", "get token error====>", error);
                }
            } catch (error) {
                ext.logger("error", "RequestHelper", "initRequestData", "get token error====>", error);
            }
        };
    };
})(jsu);
