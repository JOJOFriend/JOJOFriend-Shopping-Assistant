($ => {
    "use strict";

    /**
     * Shared template and generation logic, reused by detectCouponList and detectFlyout.
     * Public methods: generateTermsHtml, generateCashbackBtnHtml, generateScanHtml; property: termsHtml.
     * @param {*} ext
     */
    $.DetectCommonTemplateHelper = function (ext) {

        // Shared fragment templates
        const gestureComponentHtml = `
            <span class="hand-left-animate">👉🏻</span>
        `;

        const deactivateQrcodeHtml = `
            <div class="jox-acq-cashback-qrcode-container">
                <div class="jox-acq-activate-suggestion">
                    <span>
                        #{conditionText}
                    </span>
                </div>
                <img src="#{qrCodeBase64}" class="jox-acq-qrcode">
            </div>
        `;

        const cashbackBtnComponentHtml = `
            #{rebateNoticeHtml}
             <div class="jox-acq-cashback-btn-container">
                <button class="jox-acq-cashback-btn #{disabled}" data-content='#{content}' name="#{btnName}">
                    #{gestureHtml}
                    #{buttonText}
                </button>
            </div>
        `;

        const rebateNoticeComponentHtml = `
            <div class="jox-acq-need-to-know"> 
                <b class="jox-acq-need-to-know-important">#{rebateNoticeEmphasis}</b> 
                <span>#{rebateNoticeNeedToKnow}</span> 
            </div>
        `;

        this.termsHtml = `
            <div class="panel-terms-section">
                <input type="checkbox" id="#{termsId}" style="display:none;">
                <label for="#{termsId}" class="jox-acq-terms-toggle">
                    <span>#{termTitle}</span>
                    <span class="jox-acq-arrow">▼</span>
                </label>
                <div class="jox-acq-terms-content">
                    <p>#{exclusions}</p>
                    <p>#{terms}</p>
                    <p>
                        By using this service, you agree to our <a href="#{privacyLink}" target="_blank">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        `;

        /**
         * Generate terms section HTML from terms data
         * @param {*} terms - { exclusions, privacyLink, termTitle, terms }
         * @returns {string}
         */
        this.generateTermsHtml = (terms) => {
            if (!terms) return "";
            const { exclusions, privacyLink, termTitle } = terms;
            return ext.helper.util.fillTemplate(this.termsHtml, {
                exclusions,
                termsId: "toggle-terms-" + ext.helper.util.randomUUID(),
                privacyLink,
                termTitle,
                terms: terms.terms
            });
        };

        this.generateCashbackBtnHtml = (buttonData, btnName) => {
            if (!buttonData) return "";

            const { buttonText, disabled, content, showGesture, rebateNoticeEmphasis, rebateNoticeNeedToKnow, showRebateNotice } = buttonData;
            const html = ext.helper.util.fillTemplate(cashbackBtnComponentHtml, {
                rebateNoticeHtml: showRebateNotice ? ext.helper.util.fillTemplate(rebateNoticeComponentHtml, {
                    rebateNoticeEmphasis,
                    rebateNoticeNeedToKnow
                }) : "",
                btnName
            });

            return ext.helper.util.fillTemplate(html, {
                disabled: disabled ? "disabled" : "",
                content:ext.helper.util.escapeHTML(JSON.stringify(content)),
                buttonText,
                gestureHtml: showGesture ? gestureComponentHtml : ""
            });
        };

        this.generateScanHtml = (scanData) => {
            if (!scanData) return "";
            const { qrCodeBase64, conditionText } = scanData;
            return ext.helper.util.fillTemplate(deactivateQrcodeHtml, { qrCodeBase64, conditionText });
        };

        this.getActivateEventConfig = () => {
            return {
                "notification": ".activate-widget__content .notification",
                "model": ".jox-acq-cashback-btn-container > .jox-acq-cashback-btn",
                "flyout": ".jox-acq-flyout .jox-acq-cashback-btn",
                "scan": ".cashback-panel .jox-acq-activate-suggestion"
            }
        };
    };
})(jsu);
