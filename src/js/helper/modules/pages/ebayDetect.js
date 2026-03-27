($ => {
    "use strict";
  
    /**
     * @param {*} ext 
     */
    $.EbayDetectHelper = function (ext, platformConfig) {

        const couponExistTemplate = new $.CouponExistTemplateHelper(ext);
        const platform = platformConfig.platformId;
        const couponExistPer = platformConfig.couponExistPer || 10;
        this.loopIsComplete = true;

        this.isRun = function(){
            let run = false;
            if(window.location.host.indexOf("ebay.")!=-1){
              run = !/\/(item|itm|trade|checkout|rxo)\//.test(window.location.pathname)
            }
            return run;
        };

        this.isItemLink = function(url){
            return platformConfig.detailUrlPattern.test(url);
        };

        this.pickUpItems = async function(selectors, marketplace){
            const items = [];
            try{
                selectors.forEach((elementObj)=>{
                    if(elementObj.element){
                        const elements = document.querySelectorAll(elementObj.element+":not(["+$.attr.couponProcessMark+"='true'])");
                        ext.logger("info", "EbayDetectHelper", "pickUpItems", "search coupon elements======>", elements);
                        const findA = elementObj.findA;
                        elements.forEach((element)=>{
                            if(element && ext.helper.elementUtil.isElementDisplayed(element) && !element.getAttribute($.attr.couponProcessMark)){
                                const goodsLink = ext.helper.util.getGoodsLinkByElement(element, findA);
                                const priceQuery = elementObj.price;
								
								//ext.logger("info", "search price elements======>", element, priceQuery);
                                const price = ext.helper.util.getGoodsPriceByElement(element, priceQuery);
								//ext.logger("info", "search price======>", price);
                    
                                let id = null, varG = null;
                                if(this.isItemLink(goodsLink)){
                                    const goodsLinkHref = goodsLink.getAttribute("href");
                                    id = ext.helper.util.getGoodsIdByLink(goodsLinkHref);
                                    varG = ext.helper.util.getSearchParameter(goodsLinkHref, "var");
                                }
                                if(id){
                                    items.push({
                                        "id":id, "varG":varG, "price":price, "platform":platform, "handler":element, "findA":findA, "from":"search"
                                    });
                                }
                            }
                        });
                    }
                });
                ext.logger("info", "EbayDetectHelper", "pickUpItems", items);
                if(items.length>0){
                    await this.search(items, marketplace);
                }
            }catch(e){
                ext.logger("error", "EbayDetectHelper", "pickUpItems", "pickUpItems: ", e);
            }
        };

        this.search = async function(array, marketplace){
            const groups = ext.helper.util.calcRequestGroup(array, couponExistPer);
            return new Promise((resolve, reject) => {
                if (groups.length <= 0) {
                    resolve("complete");
                    return;
                }
            
                const promises = [];
                for(let i=0; i<groups.length; i++){
                    promises.push(this.createItemHtml(groups[i], marketplace));
                }
                Promise.all(promises).then((data)=>{
                    resolve("complete");
                });
            });
        };

        this.createItemHtml = function(group, marketplace){
            return new Promise((resolve, reject)=>{
                try{
                    if(Array.isArray(group) && group.length === 0){
                        resolve("exception");
                        return;
                    }
            
                    let reqId = "";
                    const platform = group[0].platform;
                    for (let i = 0; i < group.length; i++) {
                        if(group[i].handler.getAttribute($.attr.couponProcessMark)){
                            continue;
                        }
                        reqId += group[i].id;
                        if(!!group[i].varG){
                            reqId += "@"+group[i].varG;
                        }
                        reqId += ":"+group[i].price+",";

                        //Add markers before starting the request to avoid duplicate requests.
                        group[i].handler.setAttribute($.attr.couponProcessMark, "true");
                    }
                    if (reqId.endsWith(",")) {
                        reqId = reqId.slice(0, -1);
                    }
            
                    ext.logger("info", "EbayDetectHelper", "search", "request start >>>>>>>>>>>>>", group);
                    const params = {
                        platform:platform,
                        ids: reqId,
                        marketplace: marketplace
                    };

                    ext.helper.request.getCouponExist(params).then((data)=>{
                        ext.logger("info", "EbayDetectHelper", "search", "request finish >>>>>>>>>>>>>");
                        ext.helper.request.removeRequest(data.requestKey); //delete current cache request
                
                        if(data.code!="success" || !data.result){
                            resolve("exception");
                            return;
                        }
            
                        const json = JSON.parse(data.result);
                        for (let key in json) {
                            const { distinguish, tip, direction } = json[key];
                            if(!distinguish || !tip || !direction){
                                continue;
                            }
                
                            const item = group.find(obj => obj.id ===  key);
                            if(!item){
                                continue;
                            }
                            let handler = null, findA = null;
                            if(item.hasOwnProperty("handler") && item.hasOwnProperty("findA")){
                                handler = item.handler;
                                findA = item.findA;
                            }
                            if(!handler || !findA){
                                continue;
                            }
                
                            handler.style.position = "relative";
                            handler.insertAdjacentHTML('beforeend', couponExistTemplate.generate(distinguish, tip, direction));
                            ext.logger("info", "EbayDetectHelper", "search", "exist coupon >>>>>>>>>>>>>", key);
                        }
                        resolve("complete");
                    });
                }catch(e){
                    ext.logger("error", "EbayDetectHelper", "search", "createItemHtml: ", e);
                    resolve("exception");
                }
            });
        };

        this.run = async function(){
            if(!this.isRun()) return;

            const marketplace = ext.helper.util.getCommonMarketplace(window.location.href);
            const confString = await ext.helper.request.requestCouponExistConf();
            ext.logger("info", "EbayDetectHelper", "run", "conf ======>", confString);
            if(!confString){
                return;
            }

            const selectors = ext.helper.util.pickupGoodsItem(platform, confString);
            ext.logger("info", "EbayDetectHelper", "run", "search coupon selectors======>", selectors);

            setInterval(async ()=>{
                if(this.loopIsComplete){
                    this.loopIsComplete = false;
                    await this.pickUpItems(selectors, marketplace);
                    this.loopIsComplete = true;
                }
            }, 1700);
        };
    };
})(jsu);
