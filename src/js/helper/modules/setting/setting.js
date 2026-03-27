($ => {
    "use strict";
    /**
     * @param {*} ext 
     */
    $.SettingHelper = function (ext) {

        let settingDialogShadowRoot = null;

        /**
         * Set Language -> Refresh Language -> Refresh i18n -> Refresh UI
         * @param {string} language
         * @returns {Promise<void>}
         */
        const setLanguage = (language) => {
            return new Promise((resolve) => {
                const finish = () => { resolve(); };
                $.api.storage.local.set({ language }, () => {
                    ext.helper.dao.call("languageRefresh")
                        .then(() => ext.helper.i18n.init()
                            .then(() => {
                                SettingOperat.refreshUI();
                                finish();
                            })
                            .catch(finish))
                        .catch(finish);
                });
            });
        };

        /**
         * Get detailed data for the current language
         * @param {*} language 
         * @returns {langVars, name, label}
         */
        const getLanguageVars = (language) => {
            return ext.helper.dao.call("languageVars", { language });
        };

        const generateDialogHtml = async (number) => {
            const { number_min, number_max } = ext.helper.dao.getDefaults().h;
            const i18n = ext.helper.i18n;
            const html = `
                <div class="setting-piece">
                    <div class="setting-title" langue-extension-text="setting_modal_language_title">${i18n.get("setting_modal_language_title")}</div>
                    <div class="setting-description" langue-extension-text="setting_modal_language_description">${i18n.get("setting_modal_language_description")}</div>
                    <div class="language-switcher" id="language-switcher">
                        <div class="selected">
                            <span id="selected-language">${i18n.getLanguageLabel()}</span>
                        </div>
                        <ul id="language-options" class="switcher-ul"></ul>
                    </div>
                </div>
                <div class="setting-piece">
                    <div class="setting-title" langue-extension-text="setting_modal_history_title">${i18n.get("setting_modal_history_title")}</div>
                    <div class="setting-description" langue-extension-text="setting_modal_history_description">
                        ${i18n.get("setting_modal_history_description", [number_min, number_max])}
                    </div>
                    <input type="text" id="maximum-records"
                    langue-extension-placeholder="setting_modal_history_max_placeholder" placeholder="${i18n.get("setting_modal_history_max_placeholder")}" value="${number}">
                </div>
                <div class="setting-piece ">
                    <div class="setting-title" langue-extension-text="setting_modal_clear_title">${i18n.get("setting_modal_clear_title")}</div>
                    <div class="setting-description" langue-extension-text="setting_modal_clear_description">${i18n.get("setting_modal_clear_description")}</div>
                    <button class="setting-clear-cache" id="clear-cache" langue-extension-text="setting_modal_clear_btn">${i18n.get("setting_modal_clear_btn")}</button>
                </div>
            `;

            const styles = Object.values(
                await ext.helper.styleHelper.readCssContent(["shadow/base", "shadow/setting"])
              ).join("\n");
            return { styleSheet: styles, content: html };
        };

        /***
         * Language switching operation function
         */
        const SettingOperat = {
            //Implement custom language switching
            refreshUI: () => {
                const queryElementsInContainers = (containers, selector) =>
                    containers.flatMap(el => el ? Array.from(el.querySelectorAll(selector)) : []);

                const cacheContainers = ext.helper.cacheContainers.getAll();
                if (settingDialogShadowRoot) cacheContainers.push(settingDialogShadowRoot);

                const elementsWithLangue = queryElementsInContainers(cacheContainers, "*[langue-extension-text],*[langue-extension-placeholder]");
                const directions = queryElementsInContainers(cacheContainers, "*[data-extension-direction]");
                const { number_min, number_max } = ext.helper.dao.getDefaults().h;
                const i18n = ext.helper.i18n;

                directions.forEach(el => el.setAttribute("data-extension-direction", i18n.getDir()));

                elementsWithLangue.forEach((element) => {
                    const langueTextKey = element.getAttribute("langue-extension-text");
                    if (langueTextKey) {
                        element.innerText = langueTextKey === "setting_modal_history_description"
                            ? i18n.get(langueTextKey, [number_min, number_max])
                            : i18n.get(langueTextKey);
                    }
                    const languePlaceholderKey = element.getAttribute("langue-extension-placeholder");
                    if (languePlaceholderKey) {
                        element.setAttribute("placeholder", i18n.get(langueTextKey));
                    }
                });
            },
            changeLanguage: async ($content, language, languageLabel) => {
                $content.querySelector("#selected-language").innerText = languageLabel;
                SettingOperat.toggleDropdown($content, false);
                await setLanguage(language);
            },
            toggleDropdown: ($content, forceClose = null) => {
                const switcher = $content.querySelector("#language-switcher");
                const shouldClose = forceClose === false || switcher.classList.contains("open-ul");
                switcher.classList.toggle("open-ul", !shouldClose);
            },
            languageSwitcher: ($content, languageInfos) => {
                const languageOptions = $content.querySelector("#language-options");
                const switcher = $content.querySelector(".selected");

                Object.values(languageInfos).forEach((languageInfo) => {
                    const li = document.createElement("li");
                    li.classList.add("switcher-item-li");
                    li.textContent = languageInfo.languageLabel;
                    li.setAttribute("data-language", languageInfo.language);
                    li.addEventListener("click", () =>
                        SettingOperat.changeLanguage($content, languageInfo.language, languageInfo.languageLabel)
                    );
                    languageOptions.appendChild(li);
                });

                switcher.addEventListener("click", () => SettingOperat.toggleDropdown($content));
                $content.addEventListener("click", (e) => {
                    if (!switcher.contains(e.target)) SettingOperat.toggleDropdown($content, false);
                });
            }
        };


        this.showDialog = async (callback) => {
            const defaults = ext.helper.dao.getDefaults().h;
            const { number_min, number_max } = defaults;
            const currentNumber = ext.helper.dao.getData($.opts.storageKeys.history.number, defaults.number);

            const languageInfos = await ext.helper.dao.call("languageInfos");
            ext.logger("info", "SettingHelper", "initSettingDialog", "setting dialog language >", languageInfos);

            const { styleSheet, content } = await generateDialogHtml(currentNumber);
            const dialog = new $.DialogHelper(`${$.attr.shadowNamePrefix}setting-model`);
            const i18n = ext.helper.i18n;

            dialog.showMake({
                title: i18n.get("setting_modal_title"),
                content,
                styleSheet,
                direction: i18n.getDir(),
                onContentReady($that) {
                    SettingOperat.languageSwitcher($that.dialogContent, languageInfos.infos);
                    settingDialogShadowRoot = $that.shadowRoot;

                    const $input = $that.dialogContent.querySelector("#maximum-records");
                    const $clearCache = $that.dialogContent.querySelector("#clear-cache");

                    $input.onchange = function () {
                        const value = this.value;
                        if (value >= number_min && value <= number_max) {
                            ext.helper.dao.setDataByKey($.opts.storageKeys.history.number, value);
                        }
                    };
                    $clearCache.addEventListener("click", () => {
                        if (confirm(i18n.get("setting_modal_clear_confirm"))) {
                            if (callback) callback();
                            ext.helper.dao.setDataByKey($.opts.storageKeys.history.record, defaults.record);
                        }
                    });
                },
                onClose() {
                    settingDialogShadowRoot = null;
                }
            });
        };
    };
})(jsu);