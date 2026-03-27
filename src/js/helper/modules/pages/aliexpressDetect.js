($ => {
    "use strict";
  
    /**
     * @param {*} ext 
     */
    $.AliexpressDetectHelper = function (ext, platformConfig) {
        
        const couponExistTemplate = new $.CouponExistTemplateHelper(ext);
        const platform = platformConfig.platformId;
        const couponExistPer = platformConfig.couponExistPer || 10;

        this.loopIsComplete = true;
        this.cacheLinkDoms = {}; //Save the collected link DOM.

        this.isInbusinessPage = function(){
            return /inbusiness\.aliexpress\.com\/web\/search-products/.test(window.location.href);
        };

        this.isItemLink = function(url){
            return platformConfig.detailUrlPattern.test(url);
        };

        this.pickUpWholesale = async function(selectors, language, currency, marketplace){
            const items = [];
            try{
                selectors.forEach((elementObj)=>{
                        if(elementObj.element){
                            const elements = document.querySelectorAll(elementObj.element+":not(["+$.attr.couponProcessMark+"='true'])");
                            ext.logger("info", "AliexpressDetectHelper", "pickUpWholesale", "search coupon elements======>", elements.length);
                            const findA = elementObj.findA;
                            elements.forEach((element)=>{
                                if(element && ext.helper.elementUtil.isElementDisplayed(element) && !element.getAttribute($.attr.couponProcessMark)){
                                    const goodsLink = ext.helper.util.getGoodsLinkByElement(element, findA);
                                    let id = null;
                                    if(this.isItemLink(goodsLink)){
                                        id = ext.helper.util.getGoodsIdByLink(goodsLink.getAttribute("href"));
                                    }
                                    if(id){
                                        items.push({
                                            "id":id, "platform":this.currentPlatform, "handler":element, "findA":findA, "from":"wholesale"
                                        });
                                        this.cacheLinkDoms[id] = goodsLink;
                                    }
                                }
                            });
                        }
                });
                if(items.length>0){
                    await this.search(items, language, currency, marketplace);
                }
            }catch(e){
                ext.logger("error", "AliexpressDetectHelper", "pickUpWholesale", "pickUpWholesale: ", e);
            }
        };

        this.pickUpInbusiness = async function(language, currency, marketplace){
            const validate = this.isInbusinessPage();
            if(!validate) return;
        
            try{
                const iceContainerElement = document.querySelector("#ice-container");
                const loadMoreElement = await $.waitForSelector("#loadMore", {"target":iceContainerElement});
                if(loadMoreElement){
                    const array = [];
                    const containerElement = loadMoreElement.previousElementSibling;
                    if(containerElement && containerElement.tagName==='DIV'){
                        const childNodes = containerElement.childNodes;
                        childNodes.forEach((child)=>{
                            if(child.tagName==="A" && ext.helper.elementUtil.isElementDisplayed(child) && !child.getAttribute($.attr.couponProcessMark)){
                                const id = ext.helper.util.getGoodsIdByLink(child.getAttribute("href"));
                                if(id){
                                    array.push({
                                        "id":id, "platform":platform, "handler":child, "from":"inbusiness"
                                    });
                                    this.cacheLinkDoms[id] = child;
                                }
                            }
                        });
                    }
                    await this.search(array, language, currency, marketplace);
                }
            }catch(e){
                ext.logger("error", "AliexpressDetectHelper", "pickUpInbusiness", "pickUpInbusiness: ", e);
            }
        };

        this.search = function(array, language, currency, marketplace){
            const groups = ext.helper.util.calcRequestGroup(array, couponExistPer);
            return new Promise((resolve, reject) => {
                if (groups.length <= 0) {
                    resolve("complete");
                    return;
                }
            
                const promises = [];
                for(let i=0; i<groups.length; i++){
                    promises.push(this.createItemHtml(groups[i], language, currency, marketplace));
                }
                Promise.all(promises).then((data)=>{
                    resolve("complete");
                });
            });
        };

        this.createItemHtml = function(group, language, currency, marketplace){
            return new Promise((resolve, reject)=>{
                try{
                    if(Array.isArray(group) && group.length === 0){
                        resolve("exception");
                        return;
                    }
            
                    let reqId = "";
                    for (let i = 0; i < group.length; i++) {
                        if(group[i].handler.getAttribute($.attr.couponProcessMark)){
                            continue;
                        }
                        reqId += group[i].id+",";
                        //Add markers before starting the request to avoid duplicate requests.
                        group[i].handler.setAttribute($.attr.couponProcessMark, "true");
                    }
                    if (reqId.endsWith(",")) {
                        reqId = reqId.slice(0, -1);
                    }
            
                    ext.logger("info", "AliexpressDetectHelper", "search", "request start >>>>>>>>>>>>>", group);

                    const params = {
                        platform:platform,
                        ids: reqId,
                        lang: language,
                        currency: currency,
                        marketplace: marketplace
                    };
                    ext.helper.request.getCouponExist(params).then((data)=>{
                        ext.logger("info", "AliexpressDetectHelper", "search", "request finish >>>>>>>>>>>>>");
                        delete ext.helper.request.removeRequest(data.requestKey); //delete current cache request
                
                        if(data.code!="success" || !data.result){
                            resolve("exception");
                            return;
                        }
                
                        const json = JSON.parse(data.result);
                        ext.logger("info", "AliexpressDetectHelper", "search", "json", json);
                        let isBroken = false;
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
                                
                            // Exception currentGoodsId != request id
                            // avoid current request
                            const elementA = ext.helper.util.getGoodsLinkByElement(handler, findA);
                            const currentId = elementA ? ext.helper.util.getGoodsIdByLink(elementA.getAttribute("href")) : "";
                            if(currentId != key){
                                group.forEach((gItem)=>{
                                    const ele = gItem.handler;
                                    ele.removeAttribute($.attr.couponProcessMark);
                                    const tipElement = ele.querySelector("div[name^='ali-gogo-coupon-']");
                                    if(tipElement){
                                        tipElement.remove();
                                    }
                                });
                                ext.logger("info", "AliexpressDetectHelper", "search", "exception currentGoodsId != request id", key);
                                isBroken = true;
                                break;

                            }else{
                                handler.style.position = "relative";
                                handler.insertAdjacentHTML('beforeend', couponExistTemplate.generate(distinguish, tip, direction));
                                ext.logger("info", "AliexpressDetectHelper", "search", "exist coupon >>>>>>>>>>>>>", key);
                            }
                        }
                        resolve(isBroken ? "broken" :"complete");
                    });
                }catch(e){
                    ext.logger("error", "AliexpressDetectHelper", "search", "createItemHtml: ", e);
                    resolve("exception");
                }
            });
        };

        this.isRun = function(){
            let run = false;
            if(window.location.host.indexOf("aliexpress.")!=-1){
                run = !/\/(item|trade|checkout)\//.test(window.location.pathname)
            }
            return run;
        };


        this.changePageEvent = function(){
             //AliExpress pagination loading reuses elements.
            let hookDivTimer = null, removeTagIsComplete = true;

            const onInitDom = () => {
                if (!removeTagIsComplete) return;

                removeTagIsComplete = false;
                const attr = $.attr.couponProcessMark;
                document.querySelectorAll(`*[${attr}='true']`).forEach(el => {
                    el.removeAttribute(attr);
                    const tip = el.querySelector("*[name^='ali-gogo-coupon-']");
                    if (tip){
                    tip.remove();
                    }
                });
                removeTagIsComplete = true;

                this.cacheLinkDoms = {};  //Clear
            };

            const checkObjectValues = () => {
                const obj = this.cacheLinkDoms;
                const keys = Object.keys(obj);
                let notContain = 0;
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const el = obj[key];
                    try {
                        const href = el.getAttribute("href");
                        if (!href.includes(key)) {
                            if (++notContain > 2) return true;
                        }
                    } catch (e) {
                        ext.logger("info", "AliexpressDetectHelper", "checkObjectValues", "checkObjectValues exception======>", e);
                    }
                }
                return false;
            };

            //Currently, it is listening for the disappearance of the loading modal box. If AliExpress makes modifications, you can choose to use URL changes.
            //Using MutationObserver is more efficient.
            const observer = new MutationObserver(mutations => {
                //Is there a deletion node at the first level of the body?
                const hasDelete = mutations.some(m =>
                    m.target === document.body && m.removedNodes.length > 0
                );
                if (!hasDelete) return;

                //This deletion event will only be triggered once.
                if (hookDivTimer) clearTimeout(hookDivTimer);

                hookDivTimer = setTimeout(() => {
                    hookDivTimer = null;
                    if (checkObjectValues()) onInitDom();
                }, 500);
            });
            observer.observe(document.body, { childList: true, subtree: false });
        };


        this.run = async function(){
            
            if(!this.isRun()) return;

            let removeTagIsComplete = true;
            const language = ext.helper.coupon.aliexpress.getLang();
            const currency = await ext.helper.coupon.aliexpress.getCurrency();
            const marketplace = await ext.helper.coupon.aliexpress.getMarketplace(platformConfig.marketplace);

            const confString = await ext.helper.request.requestCouponExistConf();
            ext.logger("info", "AliexpressDetectHelper", "run", "conf ======>", confString);
            if(!confString){
                return;
            }

            const selectors = ext.helper.util.pickupGoodsItem(platform, confString);
            ext.logger("info", "AliexpressDetectHelper", "run", "search coupon selectors======>", selectors);
            setInterval(async ()=>{
            if(removeTagIsComplete && this.loopIsComplete){
                this.loopIsComplete = false;
                await this.pickUpInbusiness(language, currency, marketplace);
                await this.pickUpWholesale(selectors, language, currency, marketplace);
                this.loopIsComplete = true;
            }
            }, 1700);

            
            //Only takes effect when clicking the next page.
            //Principle Explanation: When the loading div is removed, check if there has been any change in the DOM.
            if(selectors.length != 0 && window.location.pathname!="/"){
                this.changePageEvent();
            }
        };

    };
})(jsu);
