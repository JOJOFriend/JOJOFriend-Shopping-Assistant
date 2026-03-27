($ => {
    "use strict";

    /**
     * @param {*} ext
     * @param {*} platformConfig
     * @param {*} platformConfigs
     */
    $.CouponInspectHelper = function (ext, platformConfig, platformConfigs) {

        const platform = platformConfig ? platformConfig.platformId : "unknown";

        const commonTemplate = new $.DetectCommonTemplateHelper(ext);
        const detectCouponListTemplate = new $.DetectCouponListTemplateHelper(ext, commonTemplate);
        const detectFlyoutTemplate = new $.DetectFlyoutTemplateHelper(ext, commonTemplate);
        
        const activate = new $.ActivateHelper(ext); // Activate button
        const couponListModal = new $.CouponListModalHelper(ext, platformConfigs, detectCouponListTemplate); // Coupon List Modal
        const progressModal = new $.ProgressModalHelper(ext, platformConfigs);
        
        const modelNames = {
            flyout: "flyout-model",
            detect: "detect-model"
        };

        let inspectData = null; // Basic data of HTML elements
        this._container = null;

        // Prepare the data needed for inspection.
        const buildInspectDataFromInfo = (infoJson) => {
            const iconJson = infoJson.icon;
            const cggJson = infoJson.cgg;
            const observerTime = cggJson.observer_time ?? 20 * 1000;
            // If not returned, use the local one.
            const logoBase64OrUrl = cggJson.logo || $.api.runtime.getURL("images/logo/logo.png");

            return {
                activate: {
                    show: infoJson.show, // Display activation button on the current page?
                    toolbarIconFlyout: infoJson.toolbar_icon_flyout, // Can it be displayed through the top menu icon?
                    toolbarIconFlash: infoJson.toolbar_icon_flash, // Whether to show the toolbar icon animation on load
                    historyShow: infoJson.history_show, // Whether to display the history record function
                    couponTotal: infoJson.coupon_total, // Number of badges in the upper left corner
                    modalPosition: infoJson.modal, // Modal box pop-up data
                    badgeData: iconJson.badge,
                    dragData: iconJson.drag,
                    interfaceData: iconJson.interface
                },
                couponListModal: {
                    autoOpen: cggJson.auto_open, // Open automatically?
                    modalTitle: cggJson.current_platform,
                    logoBase64OrUrl,
                    flyoutData: infoJson.flyoutData
                },
                elements: {
                    moveToEnd: cggJson.move_to_end,
                    observerTime,
                    container: { outerDIV: null, shadowRoot: null } // Outermost container
                }
            };
        };

        /**
         * Initializing loading data
         */
        const initInspectData = async () => {
            try {
                if (inspectData) return; // If initialization is already complete, return directly.

                const infoJson = await ext.helper.request.getDetectCtrlResult();
                if (!infoJson) return;

                ext.logger("info", "CouponInspectHelper", "initInspectData", "detect info=========>", infoJson);

                // Send update message request
                ext.sendBackgroundMessage($.opts.messageActions.updateToolbar, {
                    text: infoJson.toolbar_coupon_badge || "",
                    toolbarIconFlash: infoJson.toolbar_icon_flash
                });

                inspectData = buildInspectDataFromInfo(infoJson);
            } catch (error) {
                inspectData = null;
                ext.logger("error", "CouponInspectHelper", "initInspectData", "req exception", error);
            }
        };

        const showFlyout = async (container, flyoutData) => {
            const { outerDIV, shadowRoot } = container;
            const { css, html, conf } = await detectFlyoutTemplate.generate(flyoutData);
            if (!css || !html || !conf) return;

            ext.helper.elementUtil.addShadowRootStyle(shadowRoot, modelNames.detect, css); // Add css
            outerDIV.insertAdjacentHTML("beforeend", html); // Add html

            const { flyOutContainerName, flyOutCashbackBtnName, flyOutCouponApplyBtnName,
                delay, closeAnimation, flyOutCloseBtnClassName} = conf;

            const closeFlyout = () => {
                const flyoutEl = outerDIV.querySelector(`[name='${flyOutContainerName}']`);
                if (flyoutEl) {
                    if(closeAnimation){
                        flyoutEl.classList.add(closeAnimation);
                    } 
                    flyoutEl.addEventListener("animationend", () => flyoutEl.remove(), { once: true });
                }
            };
            if (conf.delay > 0){
                setTimeout(closeFlyout, delay);
            }

            // Close button event
            const closeButton = outerDIV.querySelector(flyOutCloseBtnClassName);
            if (closeButton){
                closeButton.addEventListener("click", closeFlyout);
            }

            // // Add Activation Authorization Event
            ext.helper.util.bindCustomEvent(outerDIV.querySelector(`[name='${flyOutCashbackBtnName}']`), (option) => {
                if (!option) {
                    return;
                }
                if (option.dismissAfter) {
                    closeFlyout();
                }
                if (option.callbackEvent) {
                    ext.helper.util.addActivateCallbackEvent(outerDIV, option, detectFlyoutTemplate.getActivateEventConfig());
                }
            });

            // Add automatic coupon verification event.
            ext.helper.util.bindApplyCouponsEvent(outerDIV.querySelector(`[name='${flyOutCouponApplyBtnName}']`), (dataJson) => {
                const { codes, check, open } = dataJson;
                Promise.resolve().then(() => {
                    progressModal.generate(
                        inspectData.couponListModal.logoBase64OrUrl,
                        container, platform, codes, check
                    );
                });
                Promise.resolve().then(() => {
                    if (open) {
                        try {
                            ext.helper.util.openUrl(open); 
                        } catch (e) { 
                            ext.logger("error", "CouponInspectHelper", "showFlyout", "detect error", e); 
                        }
                    }
                });
            });
        };

        /**
         * @returns {Promise<{outerDIV: HTMLElement, shadowRoot: ShadowRoot}>}
         * outerDIV needs to be exposed, and all subsequent elements will be children of this element.
         */
        const generateOuterContainer = async () => {
            const dir = ext.helper.i18n.getDir();
            const { moveToEnd, observerTime } = inspectData.elements;
            const styles = Object.values(
                await ext.helper.styleHelper.readCssContent(["shadow/base", "shadow/inspect", "shadow/skeleton"])
              ).join("\n");
            return ext.helper.elementUtil.generateShadowDomRoot(
                `${platformConfig.platformId}-${modelNames.detect}`, styles, dir, moveToEnd, observerTime);
        };

        /**
         * @param {number} openedFrom 1: Activate from current page, 2: Activate from tool menu
         */
        const generate = async (openedFrom = 1) => {
            const windowShow = await ext.helper.featureToggle.isEnabled($.opts.featureToggleKeys.windowShow);
            await initInspectData();

            // If there is no initial data, return directly.
            if (!inspectData) return;

            const { show, toolbarIconFlyout, historyShow, couponTotal, modalPosition, badgeData, dragData, interfaceData } = inspectData.activate;
            const { autoOpen, modalTitle, logoBase64OrUrl, flyoutData } = inspectData.couponListModal;

            if (historyShow && openedFrom === 1) {
                ext.helper.coupon.itemsHistory.run().then(() => {
                    // Whether the history record is displayed is subject to the settings.
                    if (!windowShow) ext.helper.coupon.itemsHistory.hide();
                });
            }

            // If not displayed, return directly.
            if ((!show && openedFrom === 1) || (!toolbarIconFlyout && openedFrom === 2)) return;

            // Generate the outermost container
            let container = inspectData.elements.container;
            if (!container.outerDIV || !container.shadowRoot) {
                container = await generateOuterContainer();
                container.outerDIV.setAttribute("data-re-mark-tag", platform);
                inspectData.elements.container = container;
            }
            this._container = container;

            const { outerDIV } = container;
            if (openedFrom === 1) {
                const { activateWidget, trigger } = activate.generate(couponTotal, badgeData, dragData, interfaceData); // Generate activation button
                outerDIV.append(activateWidget);
                // The display of the right button and the automatic display of the coupon list should be affected by the settings.
                activateWidget.style.display = windowShow ? "" : "none";
                if (windowShow && autoOpen) {
                    couponListModal.generate(logoBase64OrUrl, container, modalTitle, modalPosition);
                }
                trigger.addEventListener("click", () => couponListModal.generate(logoBase64OrUrl, container, modalTitle, modalPosition)); // Click event
            } else if (openedFrom === 2) {
                couponListModal.generate(logoBase64OrUrl, container, modalTitle, modalPosition);
            }

            // Add flyout, ensure the right button is displayed first, then show the flyout.
            if (openedFrom === 1) {
                setTimeout( async () => {
                    await showFlyout(container, flyoutData);
                    outerDIV.setAttribute("status", "complete");
                }, 1000);
            }
        };

        // Show right activation button (used by couponListModal)
        this.showRightWidget = () => {
            const widget = this._container?.outerDIV?.querySelector(".activate-widget");
            if (widget) widget.style.display = "block";
        };

        // Hide right activation button (used by couponListModal)
        this.hideRightWidget = () => {
            const widget = this._container?.outerDIV?.querySelector(".activate-widget");
            if (widget) widget.style.display = "none";
        };

        this.run = async (openedFrom = 1) => {
            await generate(openedFrom);
        };
    };
})(jsu);