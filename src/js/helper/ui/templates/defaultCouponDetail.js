($ => {
    "use strict";

    /**
     * @param {*} ext
     */
    $.DefaultCouponDetailemplateHelper = function (ext, platform) {
        const baseCss = `
            :root {
                --jox-acq-primary-color: #d3021b !important;
                --jox-acq-secondary-color: #000000 !important;
            }

            .jox-acq-card{
                font-family: TT Norms Pro, Open Sans, Roboto, Arial, Helvetica, sans-serif, SimSun !important;
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-orient: horizontal !important;
                -webkit-box-direction: normal !important;
                -webkit-flex-direction: row !important;
                -ms-flex-direction: row !important;
                flex-direction: row !important;
                -webkit-box-pack: start !important;
                -webkit-justify-content: flex-start !important;
                -ms-flex-pack: start !important;
                justify-content: flex-start !important;
                position: relative !important;
                max-width: 500px !important;
                width: 100% !important;
                margin: 15px 0 !important;
            }

            .jox-acq-card > .jox-acq-card__left{
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-orient: horizontal !important;
                -webkit-box-direction: normal !important;
                -webkit-flex-direction: row !important;
                -ms-flex-direction: row !important;
                flex-direction: row !important;
                -webkit-box-pack: start !important;
                -webkit-justify-content: flex-start !important;
                -ms-flex-pack: start !important;
                justify-content: flex-start !important;
                -webkit-box-align: center !important;
                -webkit-align-items: center !important;
                -ms-flex-align: center !important;
                align-items: center !important;
                background: -webkit-radial-gradient(circle at right top, transparent 8px, #fff 0) top left / 100% 51% no-repeat, -webkit-radial-gradient(circle at right bottom, transparent 8px, #fff 0) bottom left / 100% 51% no-repeat !important;
                background: radial-gradient(circle at right top, transparent 8px, #fff 0) top left / 100% 51% no-repeat, radial-gradient(circle at right bottom, transparent 8px, #fff 0) bottom left / 100% 51% no-repeat !important;
                -webkit-filter: drop-shadow(2px 2px 3px #888) !important;
                filter: drop-shadow(2px 2px 3px #888) !important;
                width: 80% !important;
                padding: 5px 0 !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__icon{
                padding: 4px 0 0 5px !important;
                margin-right: 5px !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__icon > img{
                width: 50px !important;
                height: 50px !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text{
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-orient: vertical !important;
                -webkit-box-direction: normal !important;
                -webkit-flex-direction: column !important;
                -ms-flex-direction: column !important;
                flex-direction: column !important;
                -webkit-box-align: start !important;
                -webkit-align-items: flex-start !important;
                -ms-flex-align: start !important;
                align-items: flex-start !important;
                -webkit-box-pack: center !important;
                -webkit-justify-content: center !important;
                -ms-flex-pack: center !important;
                justify-content: center !important;
                margin-right: 5px !important;
                width: -webkit-calc(100% - 65px) !important;
                width: calc(100% - 65px) !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__info{
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-orient: horizontal !important;
                -webkit-box-direction: normal !important;
                -webkit-flex-direction: row !important;
                -ms-flex-direction: row !important;
                flex-direction: row !important;
                -webkit-box-pack: start !important;
                -webkit-justify-content: flex-start !important;
                -ms-flex-pack: start !important;
                justify-content: flex-start !important;
                -webkit-box-align: center !important;
                -webkit-align-items: center !important;
                -ms-flex-align: center !important;
                align-items: center !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__info > .jox-acq-card__amount{
                color: var(--jox-acq-primary-color) !important;
                font-size: 25px !important;
                margin-left: 0 !important;
                display: -webkit-inline-box !important;
                display: -webkit-inline-flex !important;
                display: -ms-inline-flexbox !important;
                display: inline-flex !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__info > .jox-acq-card__amount > em{
                font-size: 30px !important;
                margin-right: 1px !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__info > .jox-acq-card__amount > .jox-acq-card__unit{
                margin-right: 2px !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__info > .jox-acq-card__hint{
                color: var(--jox-acq-primary-color) !important;
                font-size: 18px !important;
                margin-left: 2px !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__condition{
                font-size: 14px !important;
                color: var(--jox-acq-secondary-color) !important;
                word-wrap: break-word !important;
                -webkit-overflow-wrap: break-word !important;
                overflow-wrap: break-word !important;
                width: 100% !important;
            }

            .jox-acq-card > .jox-acq-card__left > .jox-acq-card__text > .jox-acq-card__condition > span:last-child{
                color: var(--jox-acq-secondary-color) !important;
                text-decoration: underline !important;
                margin-left: 6px !important;
            }

            .jox-acq-card > .jox-acq-card__divider{
                background: #fb0f3a url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsSAAALEgHS3X78AAAAzUlEQVQYlS3NMUoDQRiG4Xcmu9lAXBQbq+1CCqucwsbOO3gAS29h4Qm8gRdIMKVglQVBFiSFjYKBqWZ2d/7PIvYPPE6SMCHvcD8HuLzBUsIKDyY8AN4RU+J9/8nH8oLYJ3wWchxBjJHtZkN1fsbp9omvhzv6ccDjQJLatlXXdZIk5awkKVzdKk9W8gBFUVDXNQA2jJTA7GSOmR2LpmkIIWA546spvO5wL29Qz3GSBBCHnnwIzO4f0fMaYoKy/Acm8A6+fxkX15ANqimY8QemCm920r1aUAAAAABJRU5ErkJggg==) repeat-y !important;
                margin-top: 10px !important;
                margin-bottom: 10px !important;
                width: 7px !important;
                z-index: 2 !important;
                -webkit-filter: none !important;
                filter: none !important;
            }

            .jox-acq-card > .jox-acq-card__right{
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-orient: horizontal !important;
                -webkit-box-direction: normal !important;
                -webkit-flex-direction: row !important;
                -ms-flex-direction: row !important;
                flex-direction: row !important;
                -webkit-box-align: center !important;
                -webkit-align-items: center !important;
                -ms-flex-align: center !important;
                align-items: center !important;
                -webkit-filter: drop-shadow(2px 2px 3px #888) !important;
                filter: drop-shadow(2px 2px 3px #888) !important;
                background: -webkit-radial-gradient(circle at left top, transparent 8px, #fff 0) top right / 100% 51% no-repeat, -webkit-radial-gradient(circle at left bottom, transparent 8px, #fff 0) bottom right / 100% 50% no-repeat !important;
                background: radial-gradient(circle at left top, transparent 8px, #fff 0) top right / 100% 51% no-repeat, radial-gradient(circle at left bottom, transparent 8px, #fff 0) bottom right / 100% 50% no-repeat !important;
            }

            .jox-acq-card > .jox-acq-card__right > .jox-acq-code{
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-orient: vertical !important;
                -webkit-box-direction: normal !important;
                -webkit-flex-direction: column !important;
                -ms-flex-direction: column !important;
                flex-direction: column !important;
                -webkit-box-align: center !important;
                -webkit-align-items: center !important;
                -ms-flex-align: center !important;
                align-items: center !important;
                -webkit-box-pack: center !important;
                -webkit-justify-content: center !important;
                -ms-flex-pack: center !important;
                justify-content: center !important;
                height: 100% !important;
            }

            .jox-acq-card > .jox-acq-card__right > .jox-acq-code > .jox-acq-code__copy{
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                -webkit-box-pack: center !important;
                -webkit-justify-content: center !important;
                -ms-flex-pack: center !important;
                justify-content: center !important;
                -webkit-box-align: center !important;
                -webkit-align-items: center !important;
                -ms-flex-align: center !important;
                align-items: center !important;
                color: var(--jox-acq-primary-color) !important;
                font-size: 16px !important;
                cursor: pointer !important;
                margin-left: 5px !important;
            }

            .jox-acq-card > .jox-acq-card__right > .jox-acq-code > .jox-acq-code__copy > span{
                margin-left: 4px !important;
            }

            .jox-acq-card > .jox-acq-card__right > .jox-acq-code__qrcode{
                display: none !important;
            }

            .jox-acq-card[data-direction='right']{
                direction: rtl !important;
            }
        `;

        const ebayCss = () => {
            const css = `
                ${baseCss}
                .jox-acq-card[data-lang='ru']{
                    -webkit-box-pack: center !important;
                    -webkit-justify-content: center !important;
                    -ms-flex-pack: center !important;
                    justify-content: center !important;
                }
            `;
            return css;
        };

        const aliexpressCss = () => {
            return (baseCss + `
                .jox-acq-card[data-lang='ru']{
                    -webkit-box-pack: center !important;
                    -webkit-justify-content: center !important;
                    -ms-flex-pack: center !important;
                    justify-content: center !important;
                    width: 330px !important;
                }
                .jox-acq-card[data-lang='ru'] > .jox-acq-card__left{
                    margin-left: 20px !important;
                }
            `);
        };

        const commonHtml = `
            <div class="jox-acq-code" data-encryptcode="#{couponCode}">
                <div class="jox-acq-code__copy">
                    <svg t="1721376021692" class="jox-acq-code__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4642" width="20" height="20"><path d="M931.84 675.84c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48V419.84c0-34.816-26.624-61.44-61.44-61.44h-409.6c-34.816 0-61.44 26.624-61.44 61.44v409.6c0 34.816 26.624 61.44 61.44 61.44h409.6c34.816 0 61.44-26.624 61.44-61.44v-45.056c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v45.056c0 57.344-45.056 102.4-102.4 102.4h-409.6c-57.344 0-102.4-45.056-102.4-102.4v-409.6c0-57.344 45.056-102.4 102.4-102.4h409.6c57.344 0 102.4 45.056 102.4 102.4v256z m-225.28-454.656c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48V194.56c0-34.816-26.624-61.44-61.44-61.44h-409.6c-34.816 0-61.44 26.624-61.44 61.44v409.6c0 34.816 26.624 61.44 61.44 61.44h32.768c12.288 0 20.48 8.192 20.48 20.48s-8.192 20.48-20.48 20.48h-32.768c-57.344 0-102.4-45.056-102.4-102.4v-409.6c0-57.344 45.056-102.4 102.4-102.4h409.6c57.344 0 102.4 45.056 102.4 102.4v26.624z" fill="#f23030" p-id="4643"></path></svg>
                    <span>#{copyCodeText}</span>
                </div>
            </div>
        `;
        
        const ebayHtml = `
            <div class="jox-acq-code" data-encryptcode="#{couponCode}">
                <div class="jox-acq-code__copy">
                    <svg t="1733453018275" class="jox-acq-code__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1460" width="20" height="20"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 960C262.4 960 64 761.6 64 512S262.4 64 512 64s448 198.4 448 448-198.4 448-448 448z m192-691.2l-51.2 38.4L768 448H192v64h569.6L646.4 652.8l51.2 38.4L876.8 480 704 268.8z" fill="#d3021b" p-id="1461"></path></svg>
                    <span>#{copyCodeText}</span>
                </div>
            </div>
        `;

        const couponHtml = `
            <div id="#{templateId}" name="#{distinguish}">
                <div class="jox-acq-card" data-lang="#{lang}" data-direction="#{direction}">
                    <div class="jox-acq-card__left">
                        <div class="jox-acq-card__icon">
                            <img src="${$.api.runtime.getURL("images/coupon-reminder.gif")}" alt="coupon-reminder">
                        </div>
                        <div class="jox-acq-card__text">
                            <div class="jox-acq-card__info">
                                <span class="jox-acq-card__amount">
                                    <em>#{amount}</em>
                                    <em class="jox-acq-card__unit">#{unit}</em>
                                </span>
                                <span class="jox-acq-card__hint">#{couponLabel}</span>
                            </div>
                            <div class="jox-acq-card__condition">
                                <span>#{condition}</span>
                                <span>#{expired}</span>
                            </div>
                        </div>
                    </div>
                    <div class="jox-acq-card__divider"></div>
                    <div class="jox-acq-card__right">
                        #{include}
                    </div>
                </div>
            </div>
        `;
        const mscanHtml = `
            <div id="#{templateId}" style="padding:5px !important;background-color: transparent !important;margin-top: 10px !important;width: 100% !important;" name="#{distinguish}">
                <div style="font-size:14px !important;color:#000000 !important;font-weight:600 !important;text-align:#{align} !important;direction:#{direction} !important;" name="#{distinguishIndex0}">
                    #{tip}
                </div>
                <div style="display: flex !important;flex-direction: row !important;justify-content: left !important;" name="#{distinguish}">
                    <canvas  style="width:160px!important;height:160px!important;" width="#{size}" height="#{size}" id="#{canvasId}"></canvas>
                </div>
            </div>
        `;

        const generateCoupon = (coupon, html) => {
            const { handler, amount, condition, unit, expire, hint, promoCode, couponLabel, copyCodeText, lang, direction } = coupon;
            const includeTemplate = platform === "ebay" ? ebayHtml : commonHtml;
            const includeHtml = ext.helper.util.fillTemplate(includeTemplate, { couponCode: promoCode, copyCodeText });

            const templateId = "qr" + ext.helper.util.randomUUID();
            const distinguish = ext.helper.util.randomUUID();

            const filledHtml = ext.helper.util.fillTemplate(html, {
                include: includeHtml,
                templateId,
                distinguish,
                amount,
                unit,
                condition,
                expired: expire,
                lang,
                direction,
                couponLabel
            });

            return {
                html: filledHtml,
                templateId,
                distinguish: [distinguish],
                handler,
                hint
            };
        };

        const generateMscan = (coupon, mscan, html) => {
            const { handler, size, align, direction, tip } = mscan;
            const { promoCode } = coupon || {};

            const canvasId = "mscan" + ext.helper.util.randomUUID();
            const templateId = "mscan" + ext.helper.util.randomUUID();
            const distinguish = [ext.helper.util.randomUUID()];
            const distinguishVal = distinguish[0];

            const filledHtml = ext.helper.util.fillTemplate(html, {
                templateId,
                align,
                direction,
                size,
                couponCode: promoCode,
                tip,
                canvasId,
                distinguishIndex0: distinguish[0],
                distinguish: distinguishVal
            });

            return {
                html: filledHtml,
                templateId,
                canvasId,
                distinguish,
                handler
            };
        };

        this.generate = (payload) => {
            if(!payload){
                return {};
            }
            
            const css = (platform === "ebay") ? ebayCss() : aliexpressCss();
            const {coupon, id, mscan} = payload;
            ext.logger("info", "DefaultCouponQueryTemplateHelper", "payload", payload);

            let couponObj = null, mscanObj = null;
            if(coupon){
                couponObj = generateCoupon(coupon, couponHtml);
            }
            if(mscan){
                mscanObj = generateMscan(coupon, mscan, mscanHtml);
            }

            return {
                css: css,
                coupon: couponObj==null ? null : {
                    templateId:couponObj.templateId,
                    html:couponObj.html,
                    handler:couponObj.handler,
                    distinguish:couponObj.distinguish,
                    hint:couponObj.hint,
                    mid:(coupon.hasOwnProperty("mid")) ? coupon.mid : null
                },
                mscan: mscanObj==null ? null : {
                    qrId: id, //get qrcode
                    templateId:mscanObj.templateId,
                    canvasId:mscanObj.canvasId,
                    html:mscanObj.html,
                    distinguish:mscanObj.distinguish,
                    handler:mscanObj.handler
                }
            }
        };
    };
})(jsu);
