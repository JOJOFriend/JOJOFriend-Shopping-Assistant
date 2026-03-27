($ => {
    "use strict";

    /**
     * @param {object} ext
     * @constructor
     */
    $.I18nHelper = function (ext) {
        let language = null;
        let languageLabel = null;
        let langVars = {};
        let dir = null;

        /**
         * Initialises the language file
         *
         * @returns {Promise}
         */
        this.init = async () => {
            const langvarsCall = async () => {
                const bgLangvars = await ext.helper.dao.call("langvars");
                if (bgLangvars && bgLangvars.language) {
                    language = bgLangvars.language;
                    languageLabel = bgLangvars.languageLabel;
                    langVars = bgLangvars.vars;
                    dir = bgLangvars.dir;
                }
            };

            return new Promise(async (resolve) => {
                await langvarsCall();

                const retryDelay = 500;
                const maxDelay = 4 * 1000;
                let allDelay = 0;

                if (!langVars || Object.keys(langVars).length === 0) {
                    const interval = setInterval(async () => {
                        await langvarsCall();
                        if (langVars && Object.keys(langVars).length !== 0) {
                            clearInterval(interval);
                            resolve();
                        }
                        if (allDelay >= maxDelay) {
                            clearInterval(interval);
                            resolve();
                        }
                        allDelay += retryDelay;
                    }, retryDelay);
                } else {
                    resolve();
                }
            });
        };

        /**
         * Returns the language which is used for the language variables
         *
         * @returns {string}
         */
        this.getLanguage = () => {
            return language;
        };

        this.getLanguageLabel = () => {
            return languageLabel;
        };

        /**
         * Returns whether the direction of the current language is right-to-left
         *
         * @returns {boolean}
         */
        this.isRtl = () => {
            return dir === "rtl";
        };

        this.getDir = () => {
            return dir;
        };

        /**
         * Returns the UI language of the browser in the format "de_DE" or "de"
         *
         * @returns {string}
         */
        this.getUILanguage = () => {
            try {
                let ret = $.api.i18n.getUILanguage();
                ret = ret.replace("-", "_");
                return ret;
            } catch (err) {}
            return $.opts.manifest.default_locale;
        };

        /**
         * Returns the default language of the extension
         *
         * @returns {string}
         */
        this.getDefaultLanguage = () => {
            return $.opts.manifest.default_locale;
        };

        /**
         * Sorts the Collator for comparing strings
         *
         * @returns {Intl.Collator}
         */
        this.getLocaleSortCollator = () => {
            return new Intl.Collator([this.getUILanguage(), this.getDefaultLanguage()]);
        };

        /**
         * Returns the given date in local specific format
         *
         * @param dateObj
         * @returns {string}
         */
        this.getLocaleDate = (dateObj) => {
            if (typeof dateObj === "number") {
                dateObj = new Date(dateObj);
            }
            return dateObj.toLocaleDateString([this.getUILanguage(), this.getDefaultLanguage()], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
        };

        this.parseHtml = (context) => {
            $(context).find(`[${$.attr.i18n}]`).forEach((elm) => {
                let msg = null;
                const val = $(elm).attr($.attr.i18n);

                if (val) {
                    let replaces = [];
                    const replacesRaw = $(elm).attr($.attr.i18nReplaces);
                    if (replacesRaw) {
                        replaces = replacesRaw.split(",");
                    }
                    msg = this.get(val, replaces);
                }

                if (msg) {
                    $(elm).removeAttr($.attr.i18n);
                    $(elm).removeAttr($.attr.i18nReplaces);
                    $(elm).html(msg);
                } else {
                    $(elm).remove();
                }
            });
        };

        /**
         * Returns the translated string matching the given message
         *
         * @param {string} msg
         * @param {Array} replaces
         * @param {boolean} encoded
         * @returns {string}
         */
        this.get = (msg, replaces = [], encoded = false) => {
            let ret = "";
            const langVar = langVars[msg];

            if (langVar && langVar.message) {
                ret = langVar.message;
                ret = ret.replace(/\{browserName\}/gi, $.browserName);

                if (replaces && replaces.length > 0) {
                    replaces.forEach((replace, i) => {
                        ret = ret.replace(new RegExp(`\\{${i + 1}\\}`), replace);
                    });
                }

                ret = ret.replace(/\[b\](.*)\[\/b\]/, "<strong>$1</strong>");
                ret = ret.replace(/\[a\](.*)\[\/a\]/, "<a href='#'>$1</a>");
                ret = ret.replace(/\[em\](.*)\[\/em\]/, "<em>$1</em>");
            }

            if (encoded) {
                ret = ret.replace(/'/g, "&#x27;");
            }
            return ret;
        };
    };
})(jsu);
