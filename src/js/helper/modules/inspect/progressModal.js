($ => {
    "use strict";

    /**
     * @param {*} ext
     * @param {*} platformConfigs
     */
    $.ProgressModalHelper = function (ext, platformConfigs) {
        const ALERT_HIDDEN_DELAY_MS = 4000;

        this.checkIsStop = false; // Check if stopped
        const maskHelper = new $.MaskHelper(ext);
        const autoDetectUtil = new $.AutoDetectUtilHelper(ext, platformConfigs);
        const customAlert = new $.AlertHelper();

        const _start = () => {
            this.checkIsStop = false;
            document.body.style.overflow = 'hidden';
        };

        const _end = () => {
            document.body.style.overflow = 'auto';
            this.checkIsStop = true;
        };

        const initProgress = (progressBar) => {
            progressBar.style.width = "0%";
        };

        const updateProgressValue = (progressBar, value) => {
            progressBar.style.width = value*100+"%";
        };

        const activeCouponItem = (couponItem) => {
            couponItem.classList.add("coupon-item-active");
        };

        const inactiveCouponItem = (couponItem) => {
            ext.helper.elementUtil.removeClass(couponItem, "coupon-item-lose");
            couponItem.classList.add("coupon-item-lose");
        };

        const closeModal = (mask) => {
            mask.remove();
            _end();
        };

        const addCloseEventListener = (mask, modal) => {
            modal.querySelector("div[class^='close']").addEventListener("click", () => {
                closeModal(mask);
            });
        };

        const couponScrollToCenter = (couponsWarpper, element) => {
            const couponsWarpperRect = couponsWarpper.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const scrollLeft = couponsWarpper.scrollLeft + (elementRect.left + elementRect.width / 2) - (couponsWarpperRect.left + couponsWarpperRect.width / 2);
            couponsWarpper.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        };

        const showCouponItems = async (mask, modal, platform, coupons, supportData) => {
            const couponsWarpper = modal.querySelector("div[class^='deal-coupons-warpper']");
            const progressBar = modal.querySelector("div[class^='progress-bar']");
            const progressText = modal.querySelector("span[class^='progress-text']");

            const icons = await ext.helper.file.readContent("images/svg/", [
                { name: "icon-success", ext: "svg" },
                { name: "icon-error", ext: "svg" }
            ]);

            //Dynamically generate HTML
            const couponElements = coupons.map((coupon)=>{
                return {
                    "element":ext.helper.elementUtil.createElement("div",{
                        className:"coupon-item",
                        text:coupon
                    }),
                    "code":coupon
                }
            });
            couponElements.forEach((item, index) => {
                couponsWarpper.append(item.element);
            });

            const total = coupons.length;
            initProgress(progressBar);
            
            //Start verifying tickets: Preparations
            const validateData = await autoDetectUtil.validate(platform, supportData);
            if (!validateData || !validateData.result) {
                closeModal(mask);
                customAlert.show({
                    icon: icons["icon-error"],
                    message: ext.helper.i18n.get("inspect_autoDetect_alert_error"),
                    delay: ALERT_HIDDEN_DELAY_MS
                });
                return;
            }

            const results = [];
            for (let index = 0; index < total; index++) {
                if (this.checkIsStop) {
                    break;
                }
                const { element, code } = couponElements[index];
                if (index !== 0) {
                    inactiveCouponItem(couponElements[index - 1].element);
                }
                progressText.textContent = `(${index + 1}/${total})`;

                activeCouponItem(element);
                couponScrollToCenter(couponsWarpper, element);
                updateProgressValue(progressBar, (index + 1) / total);
            
                let result = await autoDetectUtil.tryCode(platform, supportData, code);
                results.push({ "code": code, "result": result });
                if (result) {
                    break;
                }
            }
            // If none are effective in the end, simply close or execute other logic.
            closeModal(mask);
            const successCodeObj = results.find((item) => item.result === true);
            customAlert.show({
                icon: icons[successCodeObj ? "icon-success" : "icon-error"],
                message: ext.helper.i18n.get(successCodeObj ? "inspect_autoDetect_alert_success" : "inspect_autoDetect_alert_error"),
                delay: ALERT_HIDDEN_DELAY_MS
            });
        };

        this.generate = async (logoBase64OrUrl, container, platform, coupons, supportData) => {
            const icons = await ext.helper.file.readContent("images/svg/", [{ name: "icon-close", ext: "svg" }]);

            //TEST================
            // supportData = {
            //   "promoContainerSelector":"div[class*='CheckoutSummaryRedesign__container']",
            //   "expandCodeBoxSelectors":[
            //     "div[class*='RedCheckoutSummaryRedesign_Coupon__coupon__'] span[class*='Coupon__couponText']",
            //     "div[class*='RedCheckoutSummaryRedesign_TotalPrice__container__'] span[class*='Coupon__couponText']",
            //     "div[class*='RedCheckoutSummaryRedesign_TotalPrice__container__'] span[class*='TotalPrice']"
            //   ],
            //   "couponInputSelector":"div[class^='RedCheckoutSummaryRedesign_Coupon__inputWrap__'] input",
            //   "submitButtonSelector":"div[class^='RedCheckoutSummaryRedesign_Coupon__button__'] >button",
            //   "applyErrorSelector":"div[class^='RedCheckoutSummaryRedesign_Coupon__inputWrap__'] span[class*='Input__error']",
            //   "existingCodeSelector":"", // Determine via input
            //   "removeCodeAction":"",
            //   "onlyOneCanBeUsed":false,
            //   "finalPriceSelector":""
            // }
            // coupons = ["12345", "7FOR70", "7SAF2YVI", "12345"]; //7FOR70
            //TEST================

            _start();
            const modalHtml = `
                <div class="modal-header">
                    <div class="logo"><img src="${logoBase64OrUrl}" /></div>
                    <div class="title"></div>
                    <div class="btns"><div class="close">${icons["icon-close"]}</div></div>
                </div>
                <div class="modal-body">
                    <div class="deal-pic-warpper">
                        <img src="${$.api.runtime.getURL("images/progress.gif")}"/>
                    </div>
                    <div class="deal-description-warpper">
                        <div class="title" langue-extension-text="inspect_autoDetect_modal_description">
                            ${ext.helper.i18n.get("inspect_autoDetect_modal_description")}
                        </div>
                        <div class="sub-title" langue-extension-text="inspect_autoDetect_modal_secondary_description">
                            ${ext.helper.i18n.get("inspect_autoDetect_modal_secondary_description")}<span class="progress-text">(1/${coupons.length})</span>
                        </div>
                    </div>
                    <div class="deal-coupons-warpper"></div>
                    <div class="deal-progress-warpper">
                        <div class="progress-container">
                            <div class="progress-bar" style="width:0px;"></div>
                        </div>
                    </div>
                </div>
            `;

            //Generate a blurred background
            const mask = maskHelper.generate();
            //Generate popup body
            const modal = ext.helper.elementUtil.createElement("div", {
                className:"modal-content",
                html:modalHtml
            });
            mask.append(modal);
            container.outerDIV.append(mask);

            showCouponItems(mask, modal, platform, coupons, supportData);
            addCloseEventListener(mask, modal);
        };
    };
})(jsu);