($ => {
    "use strict";

    /**
     * @param {*} ext
     */
    $.AmazonCouponQueryTemplateHelper = function (ext) {
        const chartCss = `
            .jox-acq-flyout {
                all: revert !important;
                background: #fff !important;
                border-radius: 10px !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
                padding: 5px !important;
                margin: 12px 0 !important;
                max-width: 380px !important;
                font-family: Arial, sans-serif !important;
            }

            .jox-acq-flyout h3 {
                font-size: 15px !important;
                font-weight: bold !important;
                margin: 3px 5px !important;
                color:#0f1111 !important;
            }

            /* Tab content - animation compatible with Chrome/Safari/Firefox */
            .jox-acq-tab {
                display: block !important;
                -webkit-animation: jox-acq-fadein 0.3s ease-in !important;
                animation: jox-acq-fadein 0.3s ease-in !important;
            }

            @-webkit-keyframes jox-acq-fadein {
                from { opacity: 0 !important; } to { opacity: 1 !important; }
            }
            @keyframes jox-acq-fadein {
                from { opacity: 0 !important; } to { opacity: 1 !important; }
            }

            .jox-acq-price-link {
                -webkit-flex: 1 !important;
                flex: 1 !important;
                text-decoration: none !important;
                margin: 0 5px !important;
                display: -webkit-flex !important;
                display: flex !important;
            }

            .jox-acq-price-box {
                display: -webkit-flex !important;
                display: flex !important;
                justify-content: space-between !important;
                margin-bottom: 0px !important;
            }

            .jox-acq-price {
                -webkit-flex: 1 !important;
                flex: 1 !important;
                width: 100% !important;
                background: #f7f9fa !important;
                border-radius: 8px !important;
                padding: 8px 10px !important;
                margin: 0 5px !important;
                text-align: center !important;
                font-size: 13px !important;
                color: #555 !important;
            }
            .jox-acq-price span {
                display: block !important;
                font-size: 16px !important;
                font-weight: bold !important;
                color: #e47911 !important;
                margin-top: 4px !important;
            }

            .jox-acq-qr { text-align: center !important;}
            .jox-acq-qr p { font-size: 12px !important; color:#2162a1 !important;font-weight:600 !important;}

            .jox-acq-suggestion {
                margin: 0 0 10px 5px !important;
            }

            .jox-acq-suggestion > span {
                color: #c10015 !important;
                font-weight: 600 !important;
            }
        `;

        const contentHtml = `
            <div id="jox-acq-content-inner" class="jox-acq-tab">
                <div class="jox-acq-price-box">
                    <a href="javascript:void(0);" class="jox-acq-price-link"><div class="jox-acq-price">#{lowestTag}<br><span>#{lowest}</span></div></a>
                    <a href="javascript:void(0);" class="jox-acq-price-link"><div class="jox-acq-price">#{highestTag}<br><span>#{highest}</span></div></a>
                </div>
            </div>
        `;
        const suggestionHtml = `
            <div class="jox-acq-suggestion">
                <span>#{suggest}</span>
                #{purchaseHint}
            </div>
        `;
        const chartHtml = `
            <div class="jox-acq-flyout" name="#{distinguish}">
                <h3>#{title}</h3>
                #{suggestionHtml}
                <div class="jox-acq-content">
                #{contentHtml}
                <div class="jox-acq-qr">
                    <img src="#{qrcode}" style="display: block !important;">
                    <p>#{reminder}</p>
                </div>
            </div>
        `;

        /**
         * @param {*} json - payload with optional json.amazon, or direct amazon object
         * @returns {{ html: string, css: string, handler: string }}
         */
        this.generate = (payload) => {
            let contentHtmlStr = "";
            let suggestionHtmlStr = "";
            const hasPrice = payload.price && (payload.price.buyBox || payload.price.cheapest);

            if (hasPrice) {
                const p = payload.price;
                const cheapestPrice = p.cheapest ? (p.cheapest.currency || "") + (p.cheapest.amount ?? "") : "";
                const buyBoxPrice = p.buyBox ? (p.buyBox.currency || "") + (p.buyBox.amount ?? "") : "";
                
                contentHtmlStr = ext.helper.util.fillTemplate(contentHtml, {
                    lowestTag: p.cheapestLabel ?? "",
                    highestTag: p.buyBoxLabel ?? "",
                    lowest: cheapestPrice,
                    highest: buyBoxPrice
                });

                const suggestion = payload.suggestion ?? {};
                suggestionHtmlStr = ext.helper.util.fillTemplate(suggestionHtml, {
                    suggest: suggestion.suggestText ?? "",
                    purchaseHint: suggestion.purchaseHint ?? ""
                });
            }

            const distinguish = ext.helper.util.randomUUID();
            const html = ext.helper.util.fillTemplate(chartHtml, {
                contentHtml: contentHtmlStr,
                suggestionHtml: suggestionHtmlStr,
                distinguish,
                title: payload.title ?? "",
                reminder: payload.reminder ?? "",
                qrcode: payload.qrCodeBase64 ?? ""
            });

            return {
                html,
                css: chartCss,
                handler: payload.handler,
                distinguish: [distinguish]
            };
        };
    };
})(jsu);
