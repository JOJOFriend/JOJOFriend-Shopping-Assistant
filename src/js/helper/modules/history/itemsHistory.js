($ => {
    "use strict";

    /**
     * @param {object} ext
     * @constructor
     */
    $.ItemsHistoryHelper = function (ext, platformConfig) {
        const keys = $.opts.storageKeys;

        /** 
         * Unified API: access dao/util via ext.helper on each call to avoid failures from capturing references before dao.init()
         * @type {object}
         */
        const api = {
            getRecord: () => ext.helper.dao.getData(keys.history.record, ext.helper.dao.getDefaults().h.record),
            getNumber: () => ext.helper.dao.getData(keys.history.number, ext.helper.dao.getDefaults().h.number),
            getOffset: () => ext.helper.dao.getData(keys.history.offset, ext.helper.dao.getDefaults().h.offset),
            getOffsetDefault: () => ext.helper.dao.getDefaults().h.offset,
            getToolbarNumber: () => ext.helper.dao.getDefaults().h.toolbar_number,
            getExchangeInfo: () => ext.helper.dao.getData(keys.website.exchangeInfo, ext.helper.dao.getDefaults().w.exchangeInfo),
            saveRecord: (record) => ext.helper.dao.setDataByKey(keys.history.record, record),
            saveOffset: (offset) => ext.helper.dao.setDataByKey(keys.history.offset, offset),
            openLink: (encryptedHref) => ext.helper.util.openInTab(ext.helper.util.decryptStr(encryptedHref)),
            dateFormat: (date, format) => ext.helper.util.dateFormat(date, format),
            encryptStr: (str) => ext.helper.util.encryptStr(str),
            i18n: {
                get: (k) => ext.helper.i18n.get(k),
                getDir: () => ext.helper.i18n.getDir()
            },
            logger: (level, ...args) => ext.logger(level, ...args),
            file: () => ext.helper.file,
            styleHelper: () => ext.helper.styleHelper,
            elementUtil: () => ext.helper.elementUtil
        };

        const models = { history: "history-model" };
        this._container = null;

        this.push = (platform, obj) => {
            try {
                const record = api.getRecord();
                const number = api.getNumber();
                const histories = record[platform] ?? [];
                if (histories.length >= number) {
                    histories.splice(0, parseInt(number / 5, 10)); // remove forward 1/5
                }
                const newArr = histories.filter((item) => item.id !== obj.id);
                newArr.push(obj);
                record[platform] = newArr;
                api.saveRecord(record);
            } catch (error) {
                api.logger("error", "ItemsHistoryHelper", "push", "historyGood push item has exception", error);
            }
        };

        this.get = (platform, num = -1) => {
            const record = api.getRecord();
            const histories = record[platform] ?? [];
            if (num > 0) return histories.slice(-num).reverse();
            return histories;
        };

        this.remove = (platform, id) => {
            const record = api.getRecord();
            const histories = record[platform] ?? [];
            const newArr = histories.filter((item) => item.id !== id);
            record[platform] = newArr;
            api.saveRecord(record);
        };

        this.getGoodsByDateGroup = function (platform) {
            const histories = this.get(platform).reverse();
            const group = [];
            const today = new Date();
            const yesterday = new Date(today);
            const format = "dd/MM";
            yesterday.setDate(today.getDate() - 1);

            const todayStr = api.dateFormat(today, format);
            const yesterdayStr = api.dateFormat(yesterday, format);
            const showDateFormat = (todayStr, yesterdayStr, current) => {
                if (current === todayStr) {
                    return { str: api.i18n.get("history_box_hit_today"), langueKey: "history_box_hit_today" };
                }
                if (current === yesterdayStr) {
                    return { str: api.i18n.get("history_box_hit_yesterday"), langueKey: "history_box_hit_yesterday" };
                }
                return { str: " —— " + current + " —— ", langueKey: "" };
            };

            let items = [];
            let cacheDateStr = null;
            let currentDateStr = null;
            for (let i = 0; i < histories.length; i++) {
                today.setTime(histories[i].date);
                currentDateStr = api.dateFormat(today, format);
                if (cacheDateStr != null) {
                    if (cacheDateStr !== currentDateStr) {
                        const langueFormat = showDateFormat(todayStr, yesterdayStr, cacheDateStr);
                        group.push({ str: langueFormat.str, langueKey: langueFormat.langueKey, items });
                        items = [];
                        cacheDateStr = currentDateStr;
                    }
                } else {
                    cacheDateStr = currentDateStr;
                }
                items.push(histories[i]);
            }
            if (items.length !== 0) {
                const langueFormat = showDateFormat(todayStr, yesterdayStr, cacheDateStr);
                group.push({ str: langueFormat.str, langueKey: langueFormat.langueKey, items });
            }
            return group;
        };

        this.showOrHideHistoryBox = (platform) => {
            const { outerDIV, shadowRoot } = this._container;
            const self = this;
            const group = this.getGoodsByDateGroup(platform);
            const contentElement = outerDIV.querySelector(".history-panel-aside-main .panel-aside-main-content");
            contentElement.innerHTML = "";

            const historiesBoxHtml = group.map((g) => {
                const itemsHtml = g.items.map((item) => {
                    const jumpUrl = this.pretreatmentJumpUrl(item.url, platform);
                    const imgUrl = this.pretreatmentImageUrl(item.pic, platform);
                    return `
                    <div class="histories-box-review_item">
                        <a title="${item.title}" jump-tag="true" href="javascript:void(0);" jump-url="${jumpUrl}" target="_blank">
                        <div class="review-shadow">
                            <div class="delete-btn" data-id="${item.id}">×</div>
                        </div>
                        <div class="review-img"><img src="${imgUrl}" /></div>
                        <div class="review-text">${item.price}</div>
                        </a>
                    </div>`;
                }).join("");
                return `<div class="panel-aside-main-item">
                <div class="item-title" langue-extension-text="${g.langueKey}">${g.str}</div>
                <div class="item-container">${itemsHtml}</div>
                </div>`;
                
            }).join("");
            contentElement.innerHTML = historiesBoxHtml;

            outerDIV.querySelectorAll(".history-panel-aside-main .delete-btn").forEach((ele) => {
                ele.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    const id = this.getAttribute("data-id");
                    this.parentNode.parentNode.parentNode.remove();
                    self.remove(platform, id);
                });
            });

            const items = outerDIV.querySelectorAll(".history-panel-aside-main .histories-box-review_item > a");
            items.forEach((ele) => {
                ele.addEventListener("mouseover", function () {
                    this.querySelector(".review-shadow").style.display = "block";
                });
                ele.addEventListener("mouseout", function () {
                    this.querySelector(".review-shadow").style.display = "none";
                });
            });

            outerDIV.querySelectorAll(".history-panel-aside-main a[jump-tag='true']").forEach((ele) => {
                ele.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    api.openLink(this.getAttribute("jump-url"));
                });
            });
        };

        this.pretreatmentJumpUrl = (url, platform) => {
            const { redirect } = api.getExchangeInfo();
            return api.encryptStr(redirect + encodeURIComponent(url));
        };

        this.pretreatmentImageUrl = (imgUrl, platform) => {
            if (platform === "aliexpress") {
                return imgUrl.replace(/_\d+x\d+\./, "_150x150.");
            }
            return imgUrl;
        };

        this.createHistoryBox = async (platform) => {
            const { outerDIV } = this._container;

            const wrapperOffset = api.getOffset();
            const histories = this.get(platform, api.getToolbarNumber());
            const goodsHtml = histories.map((h) => {
                const jumpUrl = this.pretreatmentJumpUrl(h.url, platform);
                return `
                    <div class="goods-review-item">
                        <a title="${h.title}" jump-tag="true" jump-url="${jumpUrl}" target="_blank">
                            <div class="review-shadow">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAVlJREFUWEftlsGRgzAMRS26wBQTUtluKltSDKYLlJUHMY6xZMGFi7lkCObr6cuWAHfzBTfHdw2gOdAcOOXAPM+/fGwB4OGcG7f7iX4R8d113dT3fby3XCYACgwAPxZBBiKYYRh2YOldFUAKjIivNNNlWUZEJEB2ZI9HazUQEUALLgluIH95thpEESCEQCKHbADgyfXNACcAeNEzpVyT9/6Zwx0ApOD/QFFAypKEvfdR74x7XwCaOGevANIpiPXWNm1eji8ATZyzCyGgdhos63gN6eQAorhFmMugOcml3PtJmo3FukpPqO6TdCMfHLBuIKkMiUvFU5RnXwSgP6W9kG6gbQ0tpya0NxvFftsx5JJIVucWWkp4uhHVIMhKajy0jptPtLMwLy634kJm6fSrzqVa4OIpqKlSfdd1HbdRHOufTj9+3zIFLwHUAK88N30PXBG2vtMAmgPNgQ/i7v8h6Um2jAAAAABJRU5ErkJggg==" />
                            </div>
                            <img src="${h.pic}" />
                        </a>
                    </div>`;
            }).join("");

            const icons = await api.file().readContent("images/svg/", [
                { name: "icon-settings", ext: "svg" },
                { name: "icon-close", ext: "svg" },
                { name: "icon-history", ext: "svg" }
            ]);

            const html = `
                <div class="history-panel-wrapper" data-re-mark-tag="${platform}" style="bottom:${wrapperOffset.bottom}px; right:${wrapperOffset.right}px;">
                    <div class="history-panel-aside-main" data-extension-direction="${api.i18n.getDir()}" style="display:none;">
                    <div class="panel-aside-main-inner">
                        <div class="panel-aside-main-header">
                        <div class="logo-header">${icons["icon-history"]}</div>
                        <div class="title-header" langue-extension-text="history_box_title">${api.i18n.get("history_box_title")}</div>
                        <div class="btns-header">
                            <div class="setting">${icons["icon-settings"]}</div>
                            <div class="close">${icons["icon-close"]}</div>
                        </div>
                        </div>
                        <div class="panel-aside-main-content"></div>
                    </div>
                    </div>
                    <div class="history-panel-aside-body">
                    <div class="goods-expand">
                        <svg focusable="false" class="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="20" height="20"><path d="M317.84959998 926.1056a46.08 46.08 0 0 1 10.8544-29.9008L643.68639998 521.216a13.312 13.312 0 0 0 0-18.432l-3.6864-3.072L328.70399998 127.7952a46.4896 46.4896 0 0 1 71.0656-59.8016l311.0912 370.68799999a105.8816 105.8816 0 0 1 0 146.63680002l-311.0912 370.68799999a46.2848 46.2848 0 0 1-81.92-29.9008z" fill="#bfbfbf" p-id="1366"></path></svg>
                    </div>
                    <div class="goods-review">
                        ${goodsHtml}
                    </div>
                    <div class="history-box-expand">
                        ${icons["icon-history"]}
                        <label langue-extension-text="history_bar_hint">${api.i18n.get("history_bar_hint")}</label>
                    </div>
                    <div class="wrapper-drag-handle">
                        <svg focusable="false" class="icon-i87i-svg" viewBox="0 0 24 24" data-testid="DragIndicatorIcon"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" fill="#bfbfbf"></path></svg>
                    </div>
                    </div>
                </div>
            `;
            
            outerDIV.insertAdjacentHTML('beforeend', html);
            this.addEventListener(platform);
        };

        this.addDragEventListener = () => {
            const { outerDIV } = this._container;

            //Add right-click to move
            const draggable = outerDIV.querySelector(".history-panel-wrapper .wrapper-drag-handle");
            const wrapper = outerDIV.querySelector(".history-panel-wrapper");
        
            const offsetWrapper = Object.assign({}, api.getOffsetDefault());
            let isDragging = false, startY, elementBottom;
            let windowHeight = window.innerHeight;
            let bottomMax = parseInt(windowHeight / 3, 10) * 2;
            const bottomMin = api.getOffsetDefault().bottom;
        
            //Update window height (when window size changes)
            window.addEventListener('resize', () => {
                windowHeight = window.innerHeight;
                bottomMax = parseInt(windowHeight / 3, 10) * 2;
            });
            function onMouseUp() { //Mouse release event
                if (!isDragging) return;
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                api.saveOffset(offsetWrapper);
            }
            function onMouseMove(e) { //Mouse movement event
                if (!isDragging) return;
                const deltaY = e.clientY - startY; //Mouse Y-axis movement offset
                let newBottom = elementBottom - deltaY; //Calculate the new bottom value
                //Restrict the range of the bottom value
                if (newBottom <= bottomMin) {
                    newBottom = bottomMin;
                } else if (newBottom > bottomMax) { //Control the upward range
                    newBottom = bottomMax;
                }
                //Update component position and record values
                wrapper.style.bottom = `${newBottom}px`;
                offsetWrapper.bottom = newBottom;
            }
            draggable.addEventListener('mousedown', (e) => {
                e.preventDefault();
                //Ensure the wrapper's style is set to absolute or fixed.
                if (window.getComputedStyle(wrapper).position !== 'absolute' &&
                    window.getComputedStyle(wrapper).position !== 'fixed') {
                    console.error('The wrapper element must have position set to "absolute" or "fixed".');
                    return;
                }
                isDragging = true;
                startY = e.clientY; //Record the Y coordinate when the mouse is pressed.
                //Get the current bottom value, ensuring it is parsed as a number.
                elementBottom = parseInt(window.getComputedStyle(wrapper).bottom, 10)
                    || api.getOffsetDefault().bottom;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        };

        this.addEventListener = (platform) => {
            const { outerDIV, shadowRoot } = this._container;
            
            const self = this;
            const items = outerDIV.querySelectorAll(".goods-review >.goods-review-item >a");
            items.forEach((ele)=>{
                ele.addEventListener('mouseover', function() {
                    this.querySelector(".review-shadow").style.display="block";
                });
                ele.addEventListener('mouseout', function() {
                    this.querySelector(".review-shadow").style.display="none";
                });
            });
        
            // Expand bottom tool products
            const goodsExpandEle = outerDIV.querySelector(".history-panel-wrapper .goods-expand");
            if (goodsExpandEle) {
                goodsExpandEle.addEventListener("click", function () {
                    const goodsReviewEle = this.nextElementSibling;
                    const svgEle = this.querySelector("svg");
                    svgEle.style.webkitTransition = "transform 0.3s";
                    svgEle.style.transition = "transform 0.3s";
                    if (goodsReviewEle.style.width === "0px") {
                        goodsReviewEle.style.width = "auto";
                        svgEle.style.webkitTransform = "rotate(0deg)";
                        svgEle.style.transform = "rotate(0deg)";
                    } else {
                        goodsReviewEle.style.width = "0px";
                        svgEle.style.webkitTransform = "rotate(180deg)";
                        svgEle.style.transform = "rotate(180deg)";
                    }
                });
            }
        
            // Large history box, close
            const historyBoxExpandEles = [
                outerDIV.querySelector(".history-panel-wrapper .history-box-expand"),
                outerDIV.querySelector(".history-panel-wrapper .close")
            ];
            const asideMainEle = outerDIV.querySelector(".history-panel-wrapper >.history-panel-aside-main");
            if (asideMainEle) {
                historyBoxExpandEles.forEach((ele) => {
                    if (ele) {
                        ele.addEventListener("click", function () {
                            const computedDisplay = window.getComputedStyle(asideMainEle).display;
                            if (computedDisplay === "none") {
                                self.showOrHideHistoryBox(platform);
                                asideMainEle.style.display = "block";
                            } else {
                                asideMainEle.style.display = "none";
                            }
                        });
                    }
                });
            }
        
            // Click outside the history record pop-up to hide the large history record box.
            document.addEventListener("click", function (event) {
                const path = event.composedPath();
                const clickedInsideShadow = path.some((el) => el === outerDIV || el === shadowRoot);
                if (!clickedInsideShadow && asideMainEle) {
                    asideMainEle.style.display = "none";
                }
            });

            // Pop up settings window
            const headerSettingElement = outerDIV.querySelector(".history-panel-wrapper .setting");
            if (headerSettingElement) {
                headerSettingElement.addEventListener("click", () => {
                    new $.SettingHelper(ext).showDialog(() => {
                        outerDIV.querySelector(".history-panel-aside-body .goods-review").innerHTML = "";
                        outerDIV.querySelector(".history-panel-aside-main .panel-aside-main-content").innerHTML = "";
                    });
                });
            }

            // Bind click event
            outerDIV.querySelectorAll(".history-panel-aside-body a[jump-tag='true']").forEach((ele) => {
                ele.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    api.openLink(this.getAttribute("jump-url"));
                });
            });
        
            self.addDragEventListener();
        };

        this.show = () => {
            const outerDIV = this._container?.outerDIV;
            if (outerDIV) outerDIV.style.display = "block";
        };

        this.hide = () => {
            const outerDIV = this._container?.outerDIV;
            if (outerDIV) outerDIV.style.display = "none";
        };

        this.run = async () => {
            try {
                if (platformConfig.historyRecord.disabled) return;

                const files = ["shadow/base", "shadow/itemsHistory"];
                const styleObj = await api.styleHelper().readCssContent(files);
                const styles = files.map((file) => styleObj[file]).join("\n");

                const container = api.elementUtil().generateShadowDomRoot(platformConfig.platformId + "-" + models.history, styles);
                this._container = container;

                this.createHistoryBox(platformConfig.platformId);
            } catch (e) {
                api.logger("error", "ItemsHistoryHelper", "run", "history is exception:" + e);
            }
        };
    };

})(jsu);
