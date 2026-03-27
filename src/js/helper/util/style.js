($ => {
    "use strict";

    /**
     * @param {object} ext
     * @constructor
     */
    $.StyleHelper = function (ext) {
        /**
         * Get insert target (head or body when head is missing).
         * @returns {jQuery}
         */
        const getInsertObj = () => {
            const context = $(document);
            return context.find("head").length() === 0
                ? context.find("body")
                : context.find("head");
        };

        /**
         * Adds the stylesheets to the document.
         * @param {Array<string>} files - CSS file names (without .css)
         */
        this.addStylesheets = (files) => {
            return this.readCss(files, getInsertObj());
        };

        /**
         * Adds inline style by content and optional name.
         * @param {string} css - CSS text
         * @param {string} [name] - Optional name for selector
         * @param {jQuery} [head] - Optional insert target (default: getInsertObj())
         */
        this.addStylesheetsByContent = (css, name, head = null) => {
            if (head == null) {
                head = getInsertObj();
            }
            if(name){
                name = name.replaceAll("/","-");
            }
            if ($.cl && $.cl.page && $.cl.page.style && $.attr && $.attr.name) {
                const selector = "style." + $.cl.page.style + "[" + $.attr.name + "='" + name + "']";
                head.find(selector).remove();
                head.append(
                    "<style class='" + $.cl.page.style + "' " + $.attr.name + "='" + name + "'>" + css + "</style>"
                );
            } else {
                head.append("<style>" + css + "</style>");
            }
        };

        /**
         * Load CSS files and inject them into document.
         * @param {Array<string>} files - CSS file names (without .css)
         * @param {jQuery} [head] - Optional insert target
         * @returns {Promise<void>}
         */
        this.readCss = (files, head = null) => {
            return this.readCssContent(files)
                .then((cssObj) => {
                    for (const key in cssObj) {
                        this.addStylesheetsByContent(cssObj[key], key, head);
                    }
                })
                .catch(() => {});
        };

        /**
         * Read CSS file contents by file names.
         * @param {Array<string>} files - File names without .css
         * @returns {Promise<Object<string, string>>} - Map of file name to CSS text
         */
        this.readCssContent = (files) => {
            return new Promise((resolve) => {
                let loaded = 0;
                const text = {};
                files.forEach((file) => {
                    $.fetch($.api.runtime.getURL("css/" + file + ".css"))
                        .then((res) => {
                            res.text().then((data) => {
                                text[file] = data;
                                loaded++;
                                if (loaded >= files.length) {
                                    resolve(text);
                                }
                            });
                        })
                        .catch(() => {
                            resolve(text);
                        });
                });
            });
        };
    };
})(jsu);
