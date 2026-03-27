($ => {
    "use strict";

    /**
     * Detect page Flyout popup template and generation logic; depends on DetectCommonTemplateHelper.
     * Uses a dedicated name prefix to avoid conflicts with detectCouponList.
     * @param {*} ext
     */
    $.DetectFlyoutTemplateHelper = function (ext, commonTemplate) {

        // Container/button names (for external binding) use an independent prefix to avoid conflicts
        const flyOutContainerName = "flyout-container-dom";
        const flyOutCashbackBtnName = "flyout-cashback-click-event";
        const flyOutCouponApplyBtnName = "flyout-coupon-apply-click-event";
        const flyOutCloseBtn = "jox-acq-close-btn";

        // Sub-component templates
        const closeComponentHtml = `
            <button class="${flyOutCloseBtn}">×</button>
        `;
        const couponApplyComponentHtml = `
            <div class="jox-acq-coupon-apply-btn-container">
                <div class="jox-acq-activate-suggestion">
                    <span class="hand-down-animate">👇</span>
                    <span>#{hintText}</span>
                </div>
                <button class="jox-acq-coupon-apply-btn" data-content='#{content}' name="${flyOutCouponApplyBtnName}">
                    #{couponBtnText}
                </button>
            </div>
        `;

        const rootHtml = `
            <div class="jox-acq-container #{activateState}" name="${flyOutContainerName}" style="z-index:2147483647 !important;">
                <div class="jox-acq-flyout #{position}">
                    <div class="jox-acq-flyout-header">
                        <img src="#{logoBase64}">
                        <span class="jox-acq-flyout-title">#{title}</span>
                        #{closeHtml}
                    </div>
                    <div class="jox-acq-flyout-body">
                        <div class="jox-acq-messages">
                            #{mainHtml}
                            #{termsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const deactivateHtml = `
           #{cashbackBtnComponentHtml}
        `;

        const activateHtml = `
            <span class="jox-acq-activate-state">
               #{stateText}
            </span>
        `;

        const overrideHtml = `
            <span class="jox-acq-activate-state">#{stateText}</span>
            #{cashbackBtnComponentHtml}
        `;

        const reminderHtml = `
            #{cashbackBtnComponentHtml}
            #{couponApplyComponentHtml}
        `;

        const generateMainContentHtml = (body) => {
            const { reminder, activate, override, type, deactivate } = body;
            if (!type) return "";

            if (type === "deactivate" && deactivate) {
                const { qrCodeBase64, mode } = deactivate.activateButton;
                let html = "";
                if (mode === "scan" && qrCodeBase64) {
                    html += commonTemplate.generateScanHtml(deactivate.activateButton);
                }
                if (mode === "normal") {
                    html += ext.helper.util.fillTemplate(deactivateHtml, {
                        cashbackBtnComponentHtml: commonTemplate.generateCashbackBtnHtml(deactivate.activateButton, flyOutCashbackBtnName)
                    });
                }
                return html;
            }

            if (type === "activate" && activate) {
                return ext.helper.util.fillTemplate(activateHtml, { stateText: activate.stateText });
            }

            if (type === "reminder" && reminder && reminder.showReminder) {
                const { activateButton, couponApply, showActivateButton, showCouponApply } = reminder;
                const cashbackPart = showActivateButton && activateButton 
                    ? commonTemplate.generateCashbackBtnHtml(activateButton, flyOutCashbackBtnName) : "";

                const couponPart = showCouponApply && couponApply
                    ? ext.helper.util.fillTemplate(couponApplyComponentHtml, {
                        content:ext.helper.util.escapeHTML(JSON.stringify(couponApply.content)),
                        hintText: couponApply.hintText,
                        couponBtnText: couponApply.couponBtnText
                    }) : "";

                return ext.helper.util.fillTemplate(reminderHtml, {
                    cashbackBtnComponentHtml: cashbackPart,
                    couponApplyComponentHtml: couponPart
                });
            }

            if (type === "override" && override) {
                const { stateText, activateButton } = override;
                return ext.helper.util.fillTemplate(overrideHtml, {
                    cashbackBtnComponentHtml: commonTemplate.generateCashbackBtnHtml(activateButton, flyOutCashbackBtnName),
                    stateText
                });
            }

            return "";
        };

        const generateTermsHtml = (terms) => commonTemplate.generateTermsHtml(terms);

        const generateExtraAnimationCss = (animation) => {
            if (!animation) return "";
            const { cggContainerAnimation, cggCggFlyoutAnimation, handBounceAnimation, handLeftAnimation } = animation;
            return `
                .jox-acq-container {
                    ${cggContainerAnimation}!important;
                }
                .jox-acq-flyout {
                    ${cggCggFlyoutAnimation}!important;
                }
                .hand-down-animate {
                    ${handBounceAnimation}!important;
                }
                .hand-left-animate {
                    ${handLeftAnimation}!important;
                }
            `;
        };

        this.getActivateEventConfig = () => {
            return commonTemplate.getActivateEventConfig();
        };

        this.generate = async (payload) => {
            ext.logger("info", "DetectFlyoutTemplateHelper", "payload", payload);
            if (!payload) return {};
            const { activateState, showClose, conf, logoBase64, position, body, title, animation } = payload;
            const styleObj = await ext.helper.styleHelper.readCssContent(["shadow/detect", "shadow/detectFlyout"]);
            const css = (styleObj["shadow/detect"] || "") + "\n" + (styleObj["shadow/detectFlyout"] || "") + generateExtraAnimationCss(animation);
            const mainHtml = generateMainContentHtml(body);
            const termsHtml = generateTermsHtml(body.terms);
            const html = ext.helper.util.fillTemplate(rootHtml, {
                closeHtml: showClose ? closeComponentHtml : "",
                activateState,
                position: "jox-acq-" + position,
                title,
                logoBase64,
                mainHtml,
                termsHtml
            });
            return {
                css,
                html,
                conf: {
                    flyOutContainerName,
                    flyOutCashbackBtnName,
                    flyOutCouponApplyBtnName,
                    delay: conf.delay,
                    closeAnimation: conf.showAnimation ? "jox-acq-fade-out" : "",
                    flyOutCloseBtnClassName: "." + flyOutCloseBtn
                }
            };
        };
    };
})(jsu);
