($ => {
    "use strict";

    /**
     * @param {*} ext
     */
    $.AliexpressTradeTemplateHelper = function (ext, platform) {

        const css = `
            :root {
                --jox-acq-list-gap: 10px !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 {
                all: revert !important;
                background-color: transparent !important;
                width: 100% !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item {
                display: flex !important;
                flex-direction: column !important;
                justify-content: flex-start !important;
                border-top: 1px solid #d8d7d7 !important;
                padding: var(--jox-acq-list-gap) 0 !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .title {
                font-size: 14px !important;
                color: #222 !important;
                font-weight: 600 !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .title span > svg {
                margin: 0 5px -5px 0 !important;
                vertical-align: middle !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .title > .coupon-name {
                color: #3170ee !important;
                font-weight: 700 !important;
                padding-right: 5px !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .content {
                display: flex !important;
                flex-direction: column !important;
                gap: var(--jox-acq-list-gap) !important;
                margin-top: var(--jox-acq-list-gap) !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .content > .condition {
                font-size: 12px !important;
                color: #999 !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .content > .copy {
                display: inline-flex !important;
                align-items: center !important;
                gap: 3px !important;
                color: #f00633 !important;
                font-weight: 600 !important;
                cursor: pointer !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .content > .copy > svg {
                flex-shrink: 0 !important;
            }

            .jox-acq-alx-trade-list-a7f2k9 > .item > .content > .notice {
                color: #848282 !important;
                text-decoration: underline !important;
            }

            .jox-acq-alx-trade-list-a7f2k9[data-direction='right'] {
                direction: rtl !important;
            }
        `;
        const structureHtml = `
            <div id="#{templateId}" name="#{distinguish}" class="jox-acq-alx-trade-list-a7f2k9" data-lang="#{lang}" data-direction="#{direction}">
                #{items}
            </div>
        `;
        const itemHtml = `
            <div class="item" name="#{distinguish}">
                <div class="title" name="#{distinguish}-#{index0}">
                    <span class="coupon-name">#{tag}</span>
                    <span>#{title}</span>
                </div>
                <div class="content" name="#{distinguish}-#{index1}">
                    <span class="condition">#{condition}</span>
                    <span data-encryptcode="#{couponCode}" class="copy">
                        <svg t="1721643589973" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4696" width="14" height="14"><path d="M931.84 675.84c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48V419.84c0-34.816-26.624-61.44-61.44-61.44h-409.6c-34.816 0-61.44 26.624-61.44 61.44v409.6c0 34.816 26.624 61.44 61.44 61.44h409.6c34.816 0 61.44-26.624 61.44-61.44v-45.056c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v45.056c0 57.344-45.056 102.4-102.4 102.4h-409.6c-57.344 0-102.4-45.056-102.4-102.4v-409.6c0-57.344 45.056-102.4 102.4-102.4h409.6c57.344 0 102.4 45.056 102.4 102.4v256z m-225.28-454.656c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48V194.56c0-34.816-26.624-61.44-61.44-61.44h-409.6c-34.816 0-61.44 26.624-61.44 61.44v409.6c0 34.816 26.624 61.44 61.44 61.44h32.768c12.288 0 20.48 8.192 20.48 20.48s-8.192 20.48-20.48 20.48h-32.768c-57.344 0-102.4-45.056-102.4-102.4v-409.6c0-57.344 45.056-102.4 102.4-102.4h409.6c57.344 0 102.4 45.056 102.4 102.4v26.624z" fill="#fd384f" p-id="4697"></path></svg>
                        <span>#{copyText}</span>
                    </span>
                    <span class="notice">
                        <svg t="1733196453991" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5178" width="10" height="10"><path d="M512 958.708971c-246.312872 0-446.708971-200.396099-446.708971-446.708971S265.686105 65.290005 512 65.290005 958.708971 265.686105 958.708971 512 758.312872 958.708971 512 958.708971zM512 129.523959c-210.893174 0-382.476041 171.582867-382.476041 382.476041S301.106826 894.475018 512 894.475018s382.476041-171.582867 382.476041-382.476041S722.892151 129.523959 512 129.523959z" fill="#231815" p-id="5179"></path><path d="M442.364013 695.163623c-10.54824 10.226922-15.908318 23.071462-15.908318 38.140669 0 15.315824 5.434779 28.235065 16.154935 38.411844 10.498098 9.954723 23.046902 15.019065 37.275975 15.019066 14.697747 0 27.468608-5.13802 37.992289-15.265682 10.671037-10.251481 16.081257-23.097044 16.081257-38.165228 0-14.821567-5.384637-27.592428-16.006556-37.943171C496.956376 674.957419 463.163735 674.735361 442.364013 695.163623z" fill="#231815" p-id="5180"></path><path d="M610.142228 273.379321c-26.949792-23.960715-63.336514-36.114522-108.096951-36.114523-31.149441 0-61.163011 5.978155-89.274256 17.786086-24.454972 10.3006-40.265052 34.212196-40.265052 60.915371v33.175587c0 5.113461 3.087315 9.732665 7.80578 11.68411 4.668323 1.926886 10.127661 0.889253 13.783934-2.742461 28.852118-28.827559 61.21213-42.85811 98.956779-42.85811 22.849404 0 40.190351 5.656837 52.986795 17.267269 12.449543 11.313673 18.502399 25.368784 18.5024 42.98193 0 17.637706-4.124947 32.68133-12.647042 46.020127-8.892531 14.005992-24.282033 29.519314-45.723367 46.119387-24.727171 19.218714-41.549302 37.225833-51.454906 55.061036-10.029424 17.983583-15.092743 39.548738-15.092743 64.101947v26.29283c-0.01535 0.469698-0.26913 0.858554-0.269129 1.331321 0 22.569018 18.294668 40.866756 40.866756 40.866756 22.569018 0 40.866756-18.297738 40.866756-40.866756 0-0.515746-0.275269-0.944512-0.293689-1.454118V589.345576c0-16.525372 3.013637-29.222555 8.942673-37.695531 6.818289-9.732665 20.84884-23.49204 41.697681-40.857546 28.235065-23.343661 48.787146-46.119387 61.063751-67.733661 12.597923-22.157649 18.995633-47.057759 18.995633-74.007551C651.493008 329.897545 637.586277 297.685913 610.142228 273.379321z" fill="#231815" p-id="5181"></path></svg>
                        #{usage}
                    </span>
                </div>
            </div>
        `;
        
        /**
         * @param {*} json - payload with optional json.amazon, or direct amazon object
         * @returns {{ html: string, css: string, handler: string }}
         */
        this.generate = (payload) => {
            if(!payload){
                return {};
            }
            ext.logger("info", "DefaultCouponTradeTemplateHelper", "generate", payload);

            let itemsHtml = "";
            const templateId = "tr" + ext.helper.util.randomUUID();
            const distinguish = ext.helper.util.randomUUID();
            const {items, handler, lang, direction, copyHint} = payload;

            for(let i = 0; i < items.length; i++){
                let {amount, condition, unit, overAmount, copyText, usage, tag, title, couponCode} = items[i];
                itemsHtml += ext.helper.util.fillTemplate(itemHtml, {
                    distinguish,
                    index0: 0,
                    index1: 1,
                    couponCode,
                    condition,
                    title,
                    usage,
                    copyText,
                    tag
                });
            }

            const html = ext.helper.util.fillTemplate(structureHtml, {
                templateId,
                distinguish,
                items: itemsHtml,
                lang,
                direction
            });

            return {
                handler, 
                distinguish: [distinguish],
                hint: copyHint,
                html, 
                css, 
                templateId
            }
        };
    };
})(jsu);
