($ => {
    "use strict";
  
    /**
     * All automatic ticket verification calls are made here.
     * The entire process draws inspiration from: Shop Mail
     * https://chromewebstore.google.com/detail/shop-mail-%E2%80%94-the-only-coup/hjimmklopenmealinniilgohbmglfooi?hl=zh-CN&utm_source=ext_sidebar
     */
    //This is an internal method and is not allowed to be called in other JavaScript files.
    const DetectHelper = function(ext){
        /**
         * Expands the coupon input box by clicking expand selectors. Only for platforms that require it.
         */
        this._tryClickExpand = function (supportData) {
            //If the input box is found, return it directly.
            const {couponInputSelector, expandCodeBoxSelectors} = supportData;
            const couponInput = document.querySelector(couponInputSelector);
            if(couponInput){
                return new Promise((resolve) => { resolve(true); });
            }
            //If couponInput does not exist, but the selector is not expanded, this is an error and should be returned directly.
            //This is a configuration error.
            if(!expandCodeBoxSelectors || expandCodeBoxSelectors.length ==0){
                return new Promise((resolve) => {
                    resolve(false);
                });
            }
            //Start performing click operations after the configuration check is completed.
            return new Promise(async (resolve) => {
                let result = false;
                for(let i=0; i<expandCodeBoxSelectors.length; i++){
                    const elements = document.querySelectorAll(expandCodeBoxSelectors[i]);
                    for(let j=0; j<elements.length; j++){
                        let element = elements[j];
                        ext.logger("info", "AutoDetectUtilHelper", "_tryClickExpand", "expand element##############",element);
                        element.click();

                        result = await new Promise((resolveInner) => {
                            let elapsed = 0;
                            const interval = 200, maxTime = 6000;
                            //The only criterion for determining success is whether there is a code input box.
                            const timer = setInterval(() => {
                                let hasCouponInput = document.querySelector(couponInputSelector);
                                if (hasCouponInput) {
                                    clearInterval(timer);
                                    resolveInner(true);
                                } else if (elapsed >= maxTime) {
                                    clearInterval(timer);
                                    resolveInner(false);
                                }
                                elapsed += interval;
                            }, interval);
                        });
                        if(result){
                            break;
                        }
                    }
                    if(result){
                        break;
                    }
                }
                resolve(result);
            });
        };

        /**
         * @param {Object} support
         * Try to open the input code box group; only after it is successfully opened can subsequent processing be performed.
         * For platforms that do not require opening, directly return true.
         */
        this.isPrepared = function (supportData) {
            return new Promise((resolve) => {
                //1. Verify the overall existence
                ext.logger("info", "AutoDetectUtilHelper", "isPrepared", "##############","step 1: Verify that the container exists");
                $.waitForSelector(supportData.promoContainerSelector, {"target":document.body, "allowEmpty":true, "timeout":5*1000}).then((promoContainerElement)=>{
                    if(promoContainerElement){
                        //2. Verify whether the code input box needs to be expanded.
                        ext.logger("info", "AutoDetectUtilHelper", "isPrepared", "##############","step 2: Verify whether the code input box needs to be expanded");
                        this._tryClickExpand(supportData).then((result)=>{
                            ext.logger("info", "AutoDetectUtilHelper", "isPrepared", "##############","step 3: Expanded result", result);
                            //Return verification result
                            resolve(result);
                        });
                    }else{ //If the outermost frame does not exist, return false directly.
                        resolve(false);
                    }
                }).catch(()=>{
                    resolve(false);
                });
            });
        };
    };

    /**
     * For external js, call this method where validation is needed.
     */
    $.AutoDetectUtilHelper = function(ext, platformConfigs){

        const detectHelper = new DetectHelper(ext);

        this.validate = async function (platform, supportData) {
            ext.logger("info", "AutoDetectUtilHelper", "validate", "platform=========>", platform);
            ext.logger("info", "AutoDetectUtilHelper", "validate", "supportData=========>", supportData);
            const preparedData = { result: false };
            if (platform && supportData) {
                const isPrepared = await detectHelper.isPrepared(supportData);
                preparedData.result = isPrepared;
            }
            ext.logger("info", "AutoDetectUtilHelper", "validate", "validate data=========>", preparedData);
            return preparedData;
        };

        /**
         * Each platform performs the following coupon verification operation according to different logics.
         * @param {string} platform
         * @param {Object} supportData {domain, data} = support
         * @param {string} code
         * @returns {Promise<boolean>|null}
         */
        this.tryCode = function (platform, supportData, code) {
            const platformHelpers = {
                [platformConfigs.aliexpress.platformId]: $.AliexpressAutoDetectHelper,
                [platformConfigs.ebay.platformId]: $.EbayAutoDetectHelper,
                [platformConfigs.amazon.platformId]: $.AmazonAutoDetectHelper
            };
            const HelperClass = platformHelpers[platform];
            if (!HelperClass) return null;
            try {
                return new HelperClass(ext).start(supportData, code);
            } catch (e) {
                ext.logger("error", "AutoDetectUtilHelper", "tryCode", "auto try code,", e);
                return null;
            }
        };
    };
})(jsu);