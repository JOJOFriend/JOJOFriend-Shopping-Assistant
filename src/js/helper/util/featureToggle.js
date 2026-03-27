($ => {
    "use strict";

    /**
     * Feature toggle: temporarily disable / session disable / enable, with per-site keys.
     * Uses chrome.storage.session when available; falls back to sessionStorage (e.g. Firefox, Safari).
     * @constructor
     * @param {*} ext - Extension context (helper.dao, logger).
     * @param {*} [platformConfig] - Platform config object with .platformId; used for key namespacing.
     */
    $.FeatureToggleHelper = function (ext, platformConfig) {

        /**
         * Session storage shim: chrome.storage.session or sessionStorage.
         */
        const sessionStorageShim = {
            set: (items) => {
                if ($.api.storage.session) {
                    return ext.helper.dao.call("storageSessionSet", { params: items });
                }
                for (const [key, value] of Object.entries(items)) {
                    sessionStorage.setItem(key, JSON.stringify(value));
                }
                return Promise.resolve();
            },
            get: (keys) => {
                if ($.api.storage.session) {
                    return ext.helper.dao.call("storageSessionGet", { params: keys });
                }
                const result = {};
                if (Array.isArray(keys)) {
                    for (const key of keys) {
                        const value = sessionStorage.getItem(key);
                        result[key] = value ? JSON.parse(value) : undefined;
                    }
                } else if (typeof keys === "string") {
                    const value = sessionStorage.getItem(keys);
                    result[keys] = value ? JSON.parse(value) : undefined;
                } else if (keys != null && typeof keys === "object") {
                    for (const key in keys) {
                        const value = sessionStorage.getItem(key);
                        result[key] = value ? JSON.parse(value) : keys[key];
                    }
                } else {
                    for (let i = 0; i < sessionStorage.length; i++) {
                        const key = sessionStorage.key(i);
                        result[key] = JSON.parse(sessionStorage.getItem(key));
                    }
                }
                return Promise.resolve(result);
            },
            remove: (keys) => {
                if ($.api.storage.session) {
                    return ext.helper.dao.call("storageSessionRemove", { params: keys });
                }
                const list = Array.isArray(keys) ? keys : [keys];
                list.forEach((key) => sessionStorage.removeItem(key));
                return Promise.resolve();
            },
            clear: () => {
                if ($.api.storage.session) {
                    return ext.helper.dao.call("storageSessionClear");
                }
                sessionStorage.clear();
                return Promise.resolve();
            },
        };

        const platform = platformConfig && platformConfig.platformId ? platformConfig.platformId : "unknown";

        /** Generate storage key names for a feature (per-site). */
        const createFeatureKey = (key) => ({
            until: `${key}_${platform}_disabledUntil`,
            session: `${key}_${platform}_sessionDisabled`,
        });

        /**
         * Temporarily disable feature for durationMs.
         * @param {string} key - Feature identifier
         * @param {number} durationMs - Disable duration (ms)
         */
        this.disableTemporarily = async (key, durationMs) => {
            const until = Date.now() + durationMs;
            await $.api.storage.local.set({
                [createFeatureKey(key).until]: until,
            });
        };

        /**
         * Disable feature for current session.
         * @param {string} key - Feature identifier
         */
        this.disableForSession = async (key) => {
            await sessionStorageShim.set({
                [createFeatureKey(key).session]: "true",
            });
        };

        /**
         * Enable feature (clear disabled state).
         * @param {string} key - Feature identifier
         */
        this.enable = async (key) => {
            const { until, session } = createFeatureKey(key);
            await $.api.storage.local.remove(until);
            await sessionStorageShim.remove(session);
        };

        /**
         * Whether the feature is currently enabled (not session-disabled nor time-disabled).
         * @param {string} key - Feature identifier
         * @returns {Promise<boolean>}
         */
        this.isEnabled = async (key) => {
            const { until, session } = createFeatureKey(key);
            const [sessionResult, localResult] = await Promise.all([
                sessionStorageShim.get(session),
                $.api.storage.local.get(until),
            ]);
            if (sessionResult[session] === "true") {
                return false;
            }
            const disabledUntil = localResult[until];
            if (disabledUntil && Date.now() < disabledUntil) {
                return false;
            }
            return true;
        };

        /**
         * Run callback only when feature is enabled; otherwise log.
         * @param {string} key - Feature identifier
         * @param {Function} callback - Function to run when enabled
         */
        this.runIfEnabled = async (key, callback) => {
            const enabled = await this.isEnabled(key);
            if (enabled) {
                callback();
            } else {
                ext.logger("info", "FeatureToggleHelper", "runIfEnabled", `[FeatureToggle] -- "${key}" is currently disabled`);
            }
        };
    };
})(jsu);
