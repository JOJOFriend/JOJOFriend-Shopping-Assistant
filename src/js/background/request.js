($ => {
    "use strict";
  
    $.RequestHelper = function (b) {

        const request = (method, url, params = {}, headers, timeout) => {
            if (!url) {
                return Promise.reject({ "code": "exception", "result": null });
            }
            if (!timeout || timeout < 0) {
                timeout = 20 * 1000;
            }
            if (!method) {
                method = "GET";
            }

            const config = { method: method.toUpperCase(), headers: headers };
            const controller = new AbortController(); //Create an instance of AbortController
            const signal = controller.signal; //Get signal object
            config.signal = signal; //Add signal to the fetch configuration

            if (config.method === "POST") {
                config.headers = headers ?? { "Content-Type": "application/json;charset=UTF-8" };
                config.body = JSON.stringify(params);
            }
            //Set timeout
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            return fetch(url, config)
                .then((response) => (response.ok ? response.text() : Promise.reject(response.statusText)))
                .then((result) => {
                    clearTimeout(timeoutId); //Clear timeout timer
                    return { "code": "success", "result": result };
                })
                .catch((error) => {
                    clearTimeout(timeoutId); //Clear timeout timer
                    if (error.name === "AbortError") {
                        return { "code": "error", "result": "Request timeout" }; //Timeout Error Handling
                    }
                    return { "code": "error", "result": error };
                });
        };

        this.getServerData = (opts) => request(opts.method, opts.url, opts.params, opts.headers, opts.timeout);
    };
})(jsu);