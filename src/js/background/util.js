($ => {
    "use strict";

    $.UtilHelper = function (b) {

        /**
         * treat some Chrome specific urls differently to make them work in Edge, Opera, ...
         *
         * @param url
         * @returns {string|null}
         */
        this.getParsedUrl = (url) => {
            if (!url) {
                return url;
            }

            const browserAliases = $.opts.urlAliases[$.browserName];
            if (browserAliases && browserAliases[url]) {
                return browserAliases[url];
            }

            return url;
        };

        this.closeLink = (opts) => {
            if (opts && Object.prototype.hasOwnProperty.call(opts, "id")) {
                $.api.tabs.remove(opts.id);
            }
        };

        this.generatorIdentifier = () => {
            const prefix = ($.browserName || "unknown") + "-";
            let uuid;
            const g = globalThis; // window / worker / service worker

            try {
                if (g.crypto && typeof g.crypto.randomUUID === "function") {
                    uuid = g.crypto.randomUUID().replace(/-/g, "");

                } else if (g.crypto && typeof g.crypto.getRandomValues === "function") {
                    const buf = new Uint8Array(16);
                    g.crypto.getRandomValues(buf);

                    // RFC4122 v4
                    buf[6] = (buf[6] & 0x0f) | 0x40;
                    buf[8] = (buf[8] & 0x3f) | 0x80;

                    uuid = Array.from(buf, b =>
                        b.toString(16).padStart(2, "0")
                    ).join("");
                    
                } else {
                    throw new Error("No secure random");
                }

            } catch (e) {
                uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
                    const r = Math.random() * 16 | 0;
                    const v = c === "x" ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            return prefix + uuid;
        };


        /**
         * Opens the given url while regarding the specified parameters
         *
         * @param {object} opts
         * @returns {Promise}
         */
        this.openLink = (opts) => {
            return new Promise((resolve) => {
                let params = "";

                if (opts.params) { // params are given -> serialize
                    params = Object.entries(opts.params)
                        .map(([key, val]) => `${encodeURIComponent(key)}=${val}`)
                        .join("&");

                    if (params) {
                        params = "?" + params;
                    }
                }

                const url = this.getParsedUrl(opts.href) + params;

                const createTab = (idx = null) => {
                    $.api.tabs.query({active: true, currentWindow: true}, (tabs) => {
                        $.api.tabs.create({
                            url: url,
                            active: typeof opts.active === "undefined" ? true : !!(opts.active),
                            pinned: typeof opts.pinned === "undefined" ? false : !!(opts.pinned),
                            index: idx === null ? tabs[0].index + 1 : idx,
                            openerTabId: tabs[0].id
                        }, (tab) => {
                            resolve(tab.id);
                        });
                    });
                };

                if (opts.newTab && opts.newTab === true) { // new tab
                    if (opts.position === "afterLast") {
                        $.api.tabs.query({currentWindow: true}, (tabs) => {
                            let idx = 0;
                            tabs.forEach((tab) => {
                                idx = Math.max(idx, tab.index);
                            });
                            createTab(idx + 1);
                        });
                    } else if (opts.position === "beforeFirst") {
                        createTab(0);
                    } else {
                        createTab();
                    }
                } else if (opts.newWindow && opts.newWindow === true) { // new normal window
                    $.api.windows.create({url: url, state: "maximized"}, (tab) => {
                        resolve(tab.id);
                    });
                } else if (opts.incognito && opts.incognito === true) { // incognito window
                    $.api.windows.create({url: url, state: "maximized", incognito: true}, (tab) => {
                        resolve(tab.id);
                    });
                } else { // current tab
                    $.api.tabs.query({active: true, currentWindow: true}, (tabs) => {
                        $.api.tabs.update(tabs[0].id, {url: url}, (tab) => {
                            resolve(tab.id);
                        });
                    });
                }
            });
        };
    };

})(jsu);