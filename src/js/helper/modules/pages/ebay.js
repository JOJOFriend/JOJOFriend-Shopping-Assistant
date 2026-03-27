($ => {
    "use strict";
  
    /**
     * @param {*} ext 
     */
    $.EbayHelper = function (ext, platformConfig) {

        const platform = platformConfig.platformId;
        const defaultCouponDetailTemplateHelper = new $.DefaultCouponDetailemplateHelper(ext, platform);
        
        this.detail = async function(){
            const visitUrl = window.location.href;
            const id = ext.helper.util.getGoodsIdByLink(visitUrl);
            const varG = ext.helper.util.getSearchParameter(window.location.href, "var");
            if(!id){
                return;
            }

            const marketplace = ext.helper.util.getCommonMarketplace(visitUrl);
            let idsG = id;
            if(!!varG){
                idsG += "@"+varG;
            }

            try{
                const params = {
                    ids:idsG,
                    qu:"",
                    platform:platform,
                    marketplace:marketplace,
                    mul:false
                };
                const data = await ext.helper.request.getCouponQuery(params);
                if(data.code=="success" && !!data.result){
                    const json = JSON.parse(data.result);
                    ext.logger("info", "EbayHelper", "detail", "detail request json=",json);
                    await this.detailAnalyze(json,marketplace);
                }
            }catch(e){
                ext.logger("info", "EbayHelper", "detail", "request,exception",e);
            }
        };

        this.detailAnalyze = async function(json, marketplace){
            let couponResult = null;
            let qrcodeResult = null;
        
            const {css, coupon, mscan} = defaultCouponDetailTemplateHelper.generate(json.ebay);
            ext.helper.styleHelper.addStylesheetsByContent(css, "ebay-coupon-query-detail");

            if(!!coupon){
                const {handler, html, templateId, distinguish, hint, mid} = coupon;
                const element = await $.forceGetElement(handler);

                ext.logger("info", "EbayHelper", "detailAnalyze", "coupon insert: element", element);
                if(element){
                    couponResult = {"element":element, "html":html, "templateId":templateId, "distinguish":distinguish, "hint":hint, "mid":mid}
                }
            }
        
            if(!!mscan){
                const {qrId, templateId, canvasId, html, distinguish, handler} = mscan;
            
                const params = {
                    id:qrId,
                    marketplace:marketplace,
                    platform:platform,
                };
                const allResult = await Promise.all([
                    $.forceGetElement(handler),
                    ext.helper.request.getCouponQrCode(params)
                ]);
                let element = null, qrcodeData = null;
                for (let i = 0; i < allResult.length; i++) {
                    const item = allResult[i];
                    if (item) {
                        if (item.hasOwnProperty("code")) {
                            qrcodeData = item;
                        } else {
                            element = item;
                        }
                    }
                }
            
                ext.logger("info", "EbayHelper", "detailAnalyze", "qrcode insert: element", element);
                if(element && qrcodeData){
                    qrcodeResult = {"element":element, "html":html, "canvasId":canvasId, "qrcodeData":qrcodeData, "distinguish":distinguish}
                }
            }
        
            ext.helper.util.loopTask(()=>{
                if(couponResult){
                    ext.helper.util.distinguishRemoveAndTry(couponResult.distinguish, ()=>{
                        this.detailCouponAnalyze(couponResult);
                    });
                }
                if(qrcodeResult){
                    ext.helper.util.distinguishRemoveAndTry(qrcodeResult.distinguish, ()=>{
                        this.detailMscanAnalyze(qrcodeResult);
                    });
                }
            });
        };

        this.detailCouponAnalyze = function(result){
            const {element, html, templateId, hint, mid} = result;
        
            element.insertAdjacentHTML('afterend', html);
            const templateIdEle = document.querySelector("div[id='"+templateId+"']");
            if(templateIdEle){
                const couponCodeElement = templateIdEle.querySelector(".jox-acq-code");
                if(couponCodeElement){
                    const promoCode = ext.helper.util.decryptStr(couponCodeElement.getAttribute("data-encryptcode"));
                    templateIdEle.addEventListener("click", ()=>{
                        ext.helper.util.setClipboard(promoCode).then(()=>{
                            ext.helper.toast.show({"message":hint});
                            
                            if(mid && mid.hasOwnProperty("config")){
                                const {target, link, delay}  = mid.config, linkDecrypt = ext.helper.util.decryptStr(link);
                                setTimeout(()=>{
                                    if(target==="_blank"){
                                        ext.helper.util.openInTab(linkDecrypt);
                                    }else if(target==="_self"){
                                        window.location.href = linkDecrypt;
                                    }else if(target==="_replace"){
                                        window.location.replace(linkDecrypt);
                                    }
                                },delay);
                            }
                
                        });
                    });
                }
            }
        };

        this.detailMscanAnalyze = function(result){
            const {element, html, qrcodeData, canvasId} = result;
        
            element.insertAdjacentHTML('afterend', html);
            if(!!qrcodeData && qrcodeData.code==="success" && !!qrcodeData.result){
                const mscanImg = JSON.parse(qrcodeData.result).mscanImg;
                if(!!mscanImg){
                    const canvasElement = document.getElementById(canvasId);
                    if(canvasElement){
                        const cxt = canvasElement.getContext("2d");
                        const imgData = new Image();
                        imgData.src = mscanImg;
                        imgData.onload=function(){
                            cxt.drawImage(imgData, 0, 0, imgData.width, imgData.height);
                        }
                    }
                }
            }
        };

        this.run = function(){
            const visitUrl = window.location.href;
            if(platformConfig.detailUrlPattern.test(visitUrl)){
                this.detail();
            }
        };
    };
})(jsu);