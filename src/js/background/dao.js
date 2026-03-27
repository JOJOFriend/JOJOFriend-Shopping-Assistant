($ => {
    "use strict";

    $.DaoHelper = function (b) {

        let data = {};

        /**
         * All background data is stored in the "model" key.
         * @returns {Promise}
         */
        this.init = () => new Promise((resolve) => {
            $.api.storage.local.get(["model"], (obj) => {
                data = obj.model || {};

                // Initialize installation metadata if missing.
                if (typeof data.installationDate === "undefined") {
                    data.installationDate = +new Date();
                }

                if (typeof data.lastUpdateDate === "undefined") {
                    data.lastUpdateDate = +new Date();
                }

                // Generate and persist a unique identifier if missing.
                if (typeof data.eId === "undefined" || data.eId === "") {
                    data.eId = b.helper.util.generatorIdentifier();
                }

                saveModelData().then(resolve);
            });
        });

        /**
         * Saves the given value under the given name
         *
         * @param {string} key
         * @param {*} val
         * @returns {Promise}
         */
        this.setData = (key, val) => new Promise((resolve) => {
            data[key] = val;
            saveModelData().then(resolve);
        });

        /**
         * Convenience wrapper around setData using an options object.
         */
        this.setValue = (opts) => this.setData(opts.key, opts.value);

		/**
		 * Get the value by key
		 */
        this.getValue = (opts) => new Promise((resolve) => {
            resolve(this.getData(opts.key));
        });


        /**
         * Returns the value to the given name
         *
         * @param {string} key
         * @returns {*|null}
         */
        this.getData = (key) => data[key] || null;

        /**
         * get unique Identifier, Initialize values ​​during installation
         * @returns 
         */
        this.getEid = () => new Promise((resolve) => {
            resolve(data.eId || "");
        });

        /**
         * Saves the data object into the synced storage
         *
         * @returns {Promise}
         */
        const saveModelData = () => new Promise((resolve) => {
            if (Object.getOwnPropertyNames(data).length > 0) {
                $.api.storage.local.set(
                    {model: data}, () => {
                        // do nothing specific with the error -> is thrown if too many save attempts are triggered
                        $.api.runtime.lastError;
                        resolve();
                    }
                );
            } else {
                resolve();
            }
        });
    };

})(jsu);