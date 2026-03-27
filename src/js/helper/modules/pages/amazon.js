($ => {
    "use strict";
  
    /**
     * @param {*} ext 
     */
    $.AmazonHelper = function (ext, platformConfig) {

        const platform = platformConfig.platformId;
        const amazonCouponQueryTemplateHelper = new $.AmazonCouponQueryTemplateHelper(ext);

        this.detail = async function(){
            const visitUrl = window.location.href;
            const id = ext.helper.util.getGoodsIdByLink(visitUrl);
            if(!id){
                return;
            }
            const marketplace = ext.helper.util.getCommonMarketplace(visitUrl);

            try{
                const params = {
                    ids:id,
                    qu:"",
                    platform:platform,
                    marketplace:marketplace,
                    mul:false
                };
                const data = await ext.helper.request.getCouponQuery(params);
                if(data.code=="success" && !!data.result){
                    const json = JSON.parse(data.result);
                    ext.logger("info", "AmazonHelper", "detail", "detail request json=",json);
                    await this.detailAnalyze(json);
                }
            }catch(e){
                ext.logger("info", "AmazonHelper", "detail", "request,exception",e);
            }
        };

        this.detailAnalyze = async function(json){
            if(!!json && json.hasOwnProperty("amazon")){
                const { html, css, handler, distinguish } = amazonCouponQueryTemplateHelper.generate(json.amazon);
                ext.helper.styleHelper.addStylesheetsByContent(css, "amazon-coupon-query-detail");
            
                const element = await $.forceGetElement(handler);
                ext.logger("info", "AmazonHelper", "detailAnalyze", "coupon insert: element", element);
                if(element){
                    ext.helper.util.loopTask(()=>{
                        ext.helper.util.distinguishRemoveAndTry(distinguish, ()=>{
                            element.insertAdjacentHTML('afterend', html);
                        });
                    });   
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