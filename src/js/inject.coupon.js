($ => {
    "use strict";

    /**
     * This JavaScript will only run on websites supported by
     * `PlatformConfigsHelper` (platform configs) and `SubscribeHelper.websites`,
     * and will not run on other websites.
     */
    const Extension = function () {

        // ----------------------------------------
        // Public API
        // ----------------------------------------

        /**
         * For unsupported platforms, the icon is grayed out.
         * 
         * This method allows you to clearly see whether an extension is running on the website.
         * @returns 
         */
        this.run = () => {
            const { platformConfig, platformConfigs } = (new $.PlatformConfigsHelper()).getConfigForUrl(window.location.href);
            if (!platformConfig) {
                return;
            }
            this.sendBackgroundMessage($.opts.messageActions.iconAvailable, {});

            initHelpers(platformConfig, platformConfigs);
            init(platformConfig, platformConfigs);
            addMessageListener();
        };

        this.sendBackgroundMessage = (action, value) => {
            $.api.runtime.sendMessage({ action, value });
        };

        this.logger = (level = "info", ...messages) => {
            if ($.isDev) this.helper.logger.log(level, ...messages);
        };

        // ----------------------------------------
        // Private: Helpers setup
        // ----------------------------------------

        const initHelpers = (platformConfig, platformConfigs) => {
            this.helper = {
                dao: new $.DaoHelper(this),
                i18n: new $.I18nHelper(this),
                cacheContainers: new $.DataStoreHelper(),
                toast: new $.ToastHelper(),
                logger: new $.LoggerHelper(this),
                styleHelper: new $.StyleHelper(this),
                file: new $.FileHelper(this),
                util: new $.UtilHelper(this),
                elementUtil: new $.ElementUtilHelper(this),
                request: new $.RequestHelper(this, platformConfig, platformConfigs),
                featureToggle: new $.FeatureToggleHelper(this, platformConfig),
                coupon: {
                    couponInspectHelper: new $.CouponInspectHelper(this, platformConfig, platformConfigs),
                    itemsHistory: new $.ItemsHistoryHelper(this, platformConfig),
                    itemsRecord: new $.ItemsRecordHelper(this, platformConfig)
                }
            };
        };

        const init = (platformConfig, platformConfigs) => {
            if ($.browserName === "safari") {
                this.sendBackgroundMessage($.opts.messageActions.updateToolbar, {
                    text: "",
                    toolbarIconFlash: false
                });
            }
            this.helper.dao.init().then(() => Promise.all([
                    this.helper.i18n.init(),
                    this.helper.request.initRequestData()
                ]))
                .then(() => {
                    $.onPageLoad(() => {
                        runPlatformAndTasks(platformConfig, platformConfigs);
                    });
                });
        };

        const runPlatformAndTasks = (platformConfig, platformConfigs) => {
            const platform = platformConfig.platformId;
            const tasksMap = {};
            
            const addPlatformWithDetect = (key, MainHelper, DetectHelper, config) => {
                const main = new MainHelper(this, config);
                const detect = new DetectHelper(this, config);
                this.helper.coupon[key] = main;
                this.helper.coupon[key + "Detect"] = detect;
                tasksMap[key] = [{ o: main, f: "run", p: null }];
                tasksMap[key + "Detect"] = [{ o: detect, f: "run", p: null }];
            };

            const addPlatform = (key, Helper, config) => {
                const instance = new Helper(this, config);
                this.helper.coupon[key] = instance;
                tasksMap[key] = [{ o: instance, f: "run", p: null }];
            };

            // Those css files will be inserted into the page.
            this.helper.styleHelper.addStylesheets(["page/base"]);
            if (platform === platformConfigs.aliexpress.platformId) {
                addPlatformWithDetect("aliexpress", $.AliexpressHelper, $.AliexpressDetectHelper, platformConfigs.aliexpress);
            } else if (platform === platformConfigs.ebay.platformId) {
                addPlatformWithDetect("ebay", $.EbayHelper, $.EbayDetectHelper, platformConfigs.ebay);
            } else if (platform === platformConfigs.banggood.platformId) {
                addPlatformWithDetect("banggood", $.BanggoodHelper, $.BanggoodDetectHelper, platformConfigs.banggood);
            } else if (platform === platformConfigs.amazon.platformId) {
                addPlatform("amazon", $.AmazonHelper, platformConfigs.amazon);
            } 

            this.helper.coupon.couponInspectHelper.run();
            this.helper.coupon.itemsRecord.run();
            for (const key in tasksMap) {
                tasksMap[key].forEach((task) => task.o[task.f](task.p));
            }
        };

        const addMessageListener = () => {
            $.api.runtime.onMessage.addListener((message) => {
                if (message.action === $.opts.messageActions.toolbarIconClick) {
                    this.helper.coupon.couponInspectHelper.run(2);
                }
            });
        };
    };

    new Extension().run();
})(jsu);
