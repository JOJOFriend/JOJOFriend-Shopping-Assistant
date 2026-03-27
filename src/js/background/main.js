($ => {
    "use strict";

    $.Background = function () {

        const apiAction = $.api.action || $.api.browserAction;
        this.animationInterval = null;
        this.icons = {};

        /**
         * Initialises the helper objects
         */
        const initHelpers = () => {
            this.helper = {
                dao: new $.DaoHelper(this),
                connect: new $.ConnectHelper(this),
                language: new $.LanguageHelper(this),
                upgrade: new $.UpgradeHelper(this),
                util: new $.UtilHelper(this),
                request: new $.RequestHelper(this),
                storageSession: new $.storageSessionHelper(this),
                platformConfigHelper: new $.PlatformConfigsHelper(this)
            };
        };

        /**
         * Checks if a URL is supported by the extension
         * @param {string} url - The URL to check
         * @returns {boolean} - True if the URL is supported
         */
        const isUrlSupported = (url) => {
            if (!url || !this.helper || !this.helper.platformConfigHelper) {
                return false;
            }
            const { platformConfig } = this.helper.platformConfigHelper.getConfigForUrl(url);
            return !!platformConfig || this.helper.platformConfigHelper.isPartnerPlatform(url);
        };

        /**
         * Calls the according method of the upgrade helper after installing or updating the extension,
         * waits 500ms if the helper is not initialized yet and calls itself again
         *
         * @param {object} details - Installation/update details
         * @param {number} retryCount - Current retry count (max 100)
         */
        const callOnInstalledCallback = (details, retryCount = 0) => {
            if (this.helper?.upgrade?.loaded) {
                if (details.reason === "install") {
                    this.helper.upgrade.onInstalled();
                } else if (details.reason === "update") {
                    this.helper.upgrade.onUpdated(details);
                }
            } else if (retryCount < 100) {
                $.delay(500).then(() => {
                    callOnInstalledCallback(details, retryCount + 1);
                });
            }
        };

        const chromeOrFirefox = () => {
            $.api.runtime.onInstalled.addListener((details) => {
                callOnInstalledCallback(details);
            });
        };

        const safari = () => {
            // All websites are popping up permission requests.
            $.api.tabs.onActivated.addListener(() => {
                $.api.tabs.query({ active: true, currentWindow: true }).then(() => {});
            });
            $.api.tabs.onUpdated.addListener(() => {
                $.api.tabs.query({ active: true, currentWindow: true }).then(() => {});
            });
        };

        /**
         * Monitor messages from content scripts
         */
        const addMessageListener = () => {
            $.api.runtime.onMessage.addListener((message, sender) => {
                const { action } = message;
                
                if (action === $.opts.messageActions.updateToolbar) {
                    updateBadgeAndAnimateIcon(sender.tab?.id, message.value);

                } else if (action === $.opts.messageActions.iconAvailable) {
                    updateIconAvailable(sender.tab?.id);
                    
                } else if (action === $.opts.messageActions.iconUnavailable) {
                    updateIconUnavailable(sender.tab?.id);
                }
            });
        };

        /**
         * Send message to content script
         * @param {number} tabId - Target tab ID
         * @param {string} action - Message action
         * @param {*} value - Message value
         * @param {Function} [callback] - Optional callback
         */
        const sendContentScriptMessage = (tabId, action, value, callback) => {
            if (!tabId) {
                return;
            }
            try {
                $.api.tabs.sendMessage(tabId, { action, value }, callback);
            } catch (err) {
                console.warn("Failed to send message:", err);
            }
        };

        /**
         * Generate icon paths for a specific folder
         * @param {string} folder - Icon folder name
         * @returns {object} - Icon paths object
         */
        const generateIcons = (folder) => {
            if (this.icons[folder]) {
                return this.icons[folder];
            }

            const iconSizes = ["16", "32", "48", "128", "512"];
            const paths = iconSizes.reduce((acc, size) => {
                acc[size] = $.api.runtime.getURL(`images/icon/${folder}/icon${size}.png`);
                return acc;
            }, {});

            const iconData = { path: paths };
            this.icons[folder] = iconData;
            return iconData;
        };

        /**
         * Update icon to available state
         * @param {number} [tabId] - Optional tab ID to update specific tab icon
         */
        const updateIconAvailable = (tabId) => {
            const iconData = generateIcons("default");
            if (tabId) {
                apiAction.setIcon({ path: iconData.path, tabId });
            } else {
                apiAction.setIcon(iconData);
            }
        };

        /**
         * Update icon to unavailable state
         * @param {number} [tabId] - Optional tab ID to update specific tab icon
         */
        const updateIconUnavailable = (tabId) => {
            const iconData = generateIcons("unavailable");
            if (tabId) {
                apiAction.setIcon({ path: iconData.path, tabId });
            } else {
                apiAction.setIcon(iconData);
            }
        };

        /**
         * Update tab icon based on support status
         * @param {number} tabId - Target tab ID
         * @param {string} url - Tab URL
         */
        const updateTabIcon = (tabId, url) => {
            if (!tabId || !url) {
                return;
            }
            const iconType = isUrlSupported(url) ? "default" : "unavailable";
            apiAction.setIcon({ path: generateIcons(iconType).path, tabId });
        };

        /**
         * Start icon animation: play frames in order at fixed interval, then stop and restore default icon
         * @param {number} tabId - Target tab ID for animated icon
         */
        const startIconAnimation = (tabId) => {
            if (this.animationInterval) {
                stopIconAnimation();
            }

            const ANIMATION_DELAY = 50;
            const PICTURE_GROUPS = 10;

            const icons = Array.from(
                { length: PICTURE_GROUPS },
                (_, i) => generateIcons(`effect/${i + 1}`)
            );

            let index = 0;
            this.animationInterval = setInterval(() => {
                const iconData = icons[index];
                if (tabId) {
                    apiAction.setIcon({ path: iconData.path, tabId });
                } else {
                    apiAction.setIcon(iconData);
                }
                index += 1;
                if (index >= icons.length) {
                    stopIconAnimation();
                    if (tabId) {
                        const defaultIcon = generateIcons("default");
                        apiAction.setIcon({ path: defaultIcon.path, tabId });
                    }
                }
            }, ANIMATION_DELAY);
        };

        /**
         * Stop icon animation
         */
        const stopIconAnimation = () => {
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            }
        };

        /**
         * Update badge text and background color, optionally animate icon
         * @param {number} tabId - Target tab ID
         * @param {object} value - Badge configuration containing text and icon animation flag
         */
        const updateBadgeAndAnimateIcon = (tabId, value) => {
            if (!tabId || !value) {
                return;
            }

            const { text, toolbarIconFlash } = value;
            apiAction.setBadgeText({ tabId, text });
            apiAction.setBadgeBackgroundColor({ tabId, color: "#F9EDE5" });

            if (toolbarIconFlash) {
                startIconAnimation(tabId);
            }
        };

        /**
         * Setup icon click listener
         */
        const setupIconClickListener = () => {
            apiAction.onClicked.addListener((tab) => {
                if (!tab?.id || !tab?.url) {
                    return;
                }
                if (!isUrlSupported(tab.url)) {
                    return;
                }
                sendContentScriptMessage(tab.id, $.opts.messageActions.toolbarIconClick, {});
            });
        };

        /**
         * Setup tab update listener for icon updates
         */
        const setupTabUpdateListener = () => {
            $.api.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                if (tab?.url) {
                    updateTabIcon(tabId, tab.url);
                } else {
                    updateIconUnavailable(tabId);
                }
            });
        };

        /**
         * Initialize helper dependencies
         */
        const initDependencies = () => {
            return this.helper.connect.init()
                .then(() => Promise.all([
                    this.helper.dao.init(),
                    this.helper.language.init()
                ]))
                .then(() => Promise.all([
                    this.helper.upgrade.init()
                ]));
        };

        /**
         * Main initialization method
         */
        this.run = () => {
            const startTime = Date.now();

            // Browser-specific setup
            if ($.browserName === "safari") {
                safari();
            } else {
                chromeOrFirefox();
            }

            // Initialize helpers
            initHelpers();

            // Setup event listeners
            setupIconClickListener();
            setupTabUpdateListener();
            addMessageListener();

            // Initialize dependencies
            initDependencies().then(() => {
                this.log("Finished bg script loading ", Date.now() - startTime);
            });
        };

        /**
         * Logging utility (No logs for the official version)
         * @param {...*} args - Values to log
         */
        this.log = (...args) => {
            if (!$.isDev) {
                return;
            }
            const time = new Date().toISOString();
            console.info("[bg]", time, ...args);
        };
    };
})(jsu);