($ => {
    "use strict";

    /**
     * @param {*} ext
     * @param {*} platformConfigs
     */
    $.CouponListModalHelper = function (ext, platformConfigs, detectCouponListTemplate) {

        const HIDE_30_MINUTES = 30;
        let hasModal = false; // Is there already a modal box?

        const progressModal = new $.ProgressModalHelper(ext, platformConfigs);
        const skeleton = new $.CouponListWidgetSkeleton(ext, 10);
        
        const toCssString = (obj) => Object.entries(obj || {})
            .map(([k, v]) => `${k.replace("_", "-")}:${v}`)
            .join(";");

        /**
         * Remove modal must call this method.
         */
        const removeModal = (modal) => {
            modal.remove();
            hasModal = false;
        };

        const addCloseEventListener = (button, modal) => {
            button.addEventListener("click", () => removeModal(modal));
        };

        const addShowSettingEventListener = (modal) => {
            const setting = modal.querySelector(".modal-header .btns > .setting");
            const dropdown = modal.querySelector(".modal-header #settingsDropdown");
            const settingsData = [
                {
                    category: ext.helper.i18n.get("setting_window_display_title"),
                    items: [
                        { id: "hide30m", label: ext.helper.i18n.get("setting_window_display_hide30m", [HIDE_30_MINUTES]) },
                        { id: "hideSession", label: ext.helper.i18n.get("setting_window_display_session") },
                        { id: "showAll", label: ext.helper.i18n.get("setting_window_display_all") }
                    ]
                },
                {
                    category: ext.helper.i18n.get("setting_window_general_title"),
                    items: [
                        { id: "general", label: ext.helper.i18n.get("setting_window_general_label") }
                    ]
                }
            ];

            const filterSettingsData = async () => {
                const windowShow = await ext.helper.featureToggle.isEnabled(
                    $.opts.featureToggleKeys.windowShow
                );
                return settingsData.map(group => ({
                    ...group,
                    items: group.items
                        .map(item => ({ ...item }))
                        .filter(item => {
                            // unsupported sessionStorage
                            if (!$.api.storage.session && item.id === "hideSession") {
                                return false;
                            }
                            if (windowShow) {
                                return item.id !== "showAll";
                            }

                            return item.id === "showAll" || item.id === "general";
                        })
                }));
            };

            const generateSettingMenus = () => {
                filterSettingsData().then((groups) => {
                    dropdown.innerHTML = '';
                    groups.forEach(group => {
                        const categoryDiv = document.createElement('div');
                        categoryDiv.className = 'setting-category';

                        const title = document.createElement('div');
                        title.className = 'setting-category-title';
                        title.textContent = group.category;
                        categoryDiv.appendChild(title);

                        group.items.forEach(item => {
                            const opt = document.createElement('div');
                            opt.className = 'setting-option';
                            opt.textContent = item.label;
                            opt.dataset.id = item.id;  //Set the data-id attribute
                            opt.addEventListener("click", () => {
                                if (item.id === "hide30m") {
                                    ext.helper.featureToggle.disableTemporarily($.opts.featureToggleKeys.windowShow, HIDE_30_MINUTES * 60 * 1000);
                                    hideAllComponents();
                                    removeModal(modal);
                                } else if (item.id === "hideSession") {
                                    ext.helper.featureToggle.disableForSession($.opts.featureToggleKeys.windowShow);
                                    hideAllComponents();
                                    removeModal(modal);
                                } else if (item.id === "showAll") {
                                    ext.helper.featureToggle.enable($.opts.featureToggleKeys.windowShow);
                                    showAllComponents();
                                } else if (item.id === "general") {
                                    removeModal(modal);
                                    new $.SettingHelper(ext).showDialog();
                                }
                                dropdown.classList.remove("active");
                            });
                            categoryDiv.appendChild(opt);
                        });
                        dropdown.appendChild(categoryDiv);
                    });
                });
            };

            setting.addEventListener('click', () => {
                dropdown.classList.toggle('active');
                if (dropdown.classList.contains('active')) {
                    generateSettingMenus();
                }
            });
            modal.addEventListener("click", (e) => { // Click outside the buttons to hide the settings box.
                if (!modal.querySelector(".modal-header .btns").contains(e.target)) {
                    dropdown.classList.remove("active");
                }
            });
        };

        const generateRequestStateBox = (modalBody) => {
            const requestState = ext.helper.elementUtil.createElement("div", {
                className:"request-state"
            });
            modalBody.append(requestState);
            return requestState;
        };

        const generateRequestLoadding = () => {
            return skeleton.generate();
        };

        const generateRequestLoaddingError = (icons, callback) => {
            const retry = ext.helper.elementUtil.createElement("div", {
                className:"loading-error-retry",
                text:ext.helper.i18n.get("inspect_couponList_retry"),
                attributes:{
                    "langue-extension-text":"inspect_couponList_retry"
                }
            });
            retry.addEventListener("click", ()=>{
                callback();
            });
            
            const error = ext.helper.elementUtil.createElement("div", {
                className:"loading-error",
                children:[
                    ext.helper.elementUtil.createElement("div", {
                        className:"loading-error-image",
                        html: icons["icon-network-error"]
                    }),
                    retry
                ]
            });
            return error;
        };

        const setCouponsHtml =  async (modal, icons) => {
            const {outerDIV} = this._container;
            const modalBody = modal.querySelector("div[name='modalBody']");

            //Generation status
            const requestStateBox = generateRequestStateBox(modalBody);
            const requestLoadding = generateRequestLoadding();
            const requestLoaddingError = generateRequestLoaddingError(icons, () => {
                requestStateBox.remove();
                setCouponsHtml(modal, icons);
            });
            requestStateBox.append(requestLoadding);

            try{
                const dataJson = await ext.helper.request.getDetectDataResult();
                if(!dataJson){
                    requestLoadding.remove();
                    requestStateBox.append(requestLoaddingError);
                    return;
                }
                requestStateBox.remove();  //Success removes the entire prompt node.

                ext.logger("info", "CouponListModalHelper", "getDetectDataResult", dataJson);
                const { css, html, names } = await detectCouponListTemplate.generate(dataJson);

                if(!!css && !!html){    
                    ext.helper.elementUtil.addShadowRootStyle(this._container.shadowRoot, "coupon-list-modal", css);
                    modalBody.innerHTML = html;
            
                    [`[name="${names.cashbackBtnName}"]`, `[name="${names.clickToJumpBtnName}"]`].flatMap(selector => {
                        return Array.from(modalBody.querySelectorAll(selector));
                    }).forEach((button) => {
                        ext.helper.util.bindCustomEvent(button, (option)=>{

                            //This is the activation of proprietary logic.
                            if(button.getAttribute("name") === names.cashbackBtnName){ 
                                ext.helper.util.addActivateCallbackEvent(outerDIV, option, detectCouponListTemplate.getActivateEventConfig());
                            }
                        });
                    });

            
                    //Binding Switch
                    const tabs = modalBody.querySelectorAll("a[data-toggle='tab']");
                    const tabPanes = modalBody.querySelectorAll(".tab-pane");
                    tabs.forEach((element)=>{
                        element.addEventListener("click", function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        
                        tabs.forEach(tab => tab.classList.remove("active"));
                        e.target.classList.add("active");
            
                        tabPanes.forEach(tab => tab.classList.remove("fade-in","active"));
                            const toggle = modalBody.querySelector(e.target.getAttribute("data-href") || e.target.getAttribute("href"));
                            toggle.classList.add("fade-in","active");
                        });
                    });
            
                    //Move-in and move-out event binding
                    const items = modalBody.querySelectorAll('.jox-acq-store-item');
                    items.forEach(item => {
                        item.addEventListener('mouseenter', (e) => {
                            e.target.querySelector("span").classList.add("underline-show");
                        });
                        item.addEventListener('mouseleave', (e) => {
                            e.target.querySelector("span").classList.remove("underline-show");
                        });
                    });
            
                    //Bind custom verification coupon function
                    const activateButton = modalBody.querySelector(`*[name='${names.couponApplyBtnName}']`);
                    ext.helper.util.bindApplyCouponsEvent(activateButton, (dataJson) => {
                        removeModal(modal);
                        const {platform, codes, check, open} = dataJson;
                        Promise.resolve().then(() => {
                            progressModal.generate(
                                this._logoBase64OrUrl,
                                this._container,
                                platform, codes, check);
                        });
                        Promise.resolve().then(() => {
                            if(!!open){
                                try {
                                    ext.helper.util.openUrl(open);
                                } catch (error) {
                                    ext.logger("error", "CouponListModalHelper", "generateCouponList", "detect error", error);
                                }
                            }
                        });
                    });
                }
 
            } catch (error) {
                requestLoadding.remove();
                requestStateBox.append(requestLoaddingError);
                ext.logger("info", "CouponListModalHelper", "generateCouponList", "generate coupon list error, ", error);
            }
        };

        const showAllComponents = () => {
            ext.helper.coupon.couponInspectHelper.showRightWidget();
            ext.helper.coupon.itemsHistory.show();
        };

        const hideAllComponents = () => {
            ext.helper.coupon.couponInspectHelper.hideRightWidget();
            ext.helper.coupon.itemsHistory.hide();
        };


        this._container = null;
        this._logoBase64OrUrl = null;
        /**
         * @param {Object} container The outermost DIV that contains all elements.
         * @param {Object} modalPosition The position information of this model
         * @param {Object} openedFrom Where it was opened from
         */
        this.generate = async (logoBase64OrUrl, container, title, modalPosition) => {
            if (hasModal) return;

            const { outerDIV } = container;
            const icons = await ext.helper.file.readContent("images/svg/", [
                { name: "icon-settings", ext: "svg" },
                { name: "icon-close", ext: "svg" },
                { name: "icon-network-error", ext: "svg" }
            ]);

            this._container = container;
            this._logoBase64OrUrl = logoBase64OrUrl;
            
            const contentHtml = `
                <div class="modal-header">
                    <div class="logo"><img src="${logoBase64OrUrl}" /></div>
                    <div class="title">${title}</div>
                    <div class="btns">
                        <div class="setting">${icons["icon-settings"]}</div>
                        <div class="setting-dropdown" id="settingsDropdown"></div>
                        <div class="close">${icons["icon-close"]}</div>
                    </div>
                </div>
                <div class="modal-body" name="modalBody"></div>
            `;
            const modal = ext.helper.elementUtil.createElement("div", {
                className: "coupon-list-widget-conent",
                html: contentHtml,
                attributes: { style: toCssString(modalPosition) }
            });
            outerDIV.append(modal);
            hasModal = true;
        
            //Get elements from HTML
            const close = modal.querySelector(".modal-header .btns> .close");

            addCloseEventListener(close, modal);
            addShowSettingEventListener(modal);
            setCouponsHtml(modal, icons);

            return modal;
        };
    };
})(jsu);