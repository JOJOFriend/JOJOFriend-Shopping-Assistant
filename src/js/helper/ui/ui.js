($ => {
    "use strict";

    /**
     * UI dialog helper. Styles are encapsulated in Shadow DOM; class prefix ext-ui-dialog avoids conflicts with page CSS.
     * @constructor
     */
    $.DialogHelper = function (name="default-dialog") {
        const createElements = (params) => {
            const container = document.createElement("div");
            container.setAttribute("style", "all: initial!important;z-index:2147483647!important;display:block!important;");
            container.setAttribute("data-model", name);
            (document.documentElement || document.body).appendChild(container);

            const mask = document.createElement("div");
            mask.classList.add("ext-ui-dialog-mask");
            const shadowRoot = container.attachShadow({ mode: "open" });
            shadowRoot.appendChild(mask);

            const content = document.createElement("div");
            content.classList.add("ext-ui-dialog-container");
            if (Object.prototype.hasOwnProperty.call(params, "direction")) {
                content.setAttribute("data-extension-direction", params.direction);
            }
            mask.appendChild(content);

            let styleText = `
                *[data-extension-direction='rtl'] { direction: rtl!important; }
                .ext-ui-dialog-mask {
                    width: 100%; height: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                    position: fixed; left: 0; top: 0; bottom: 0; right: 0;
                    z-index: 9999999999999;
                }
                .ext-ui-dialog-container {
                    max-width: 350px; width: 90%;
                    background-color: #fff;
                    -webkit-box-shadow: 0 0 2px #999;
                    -moz-box-shadow: 0 0 2px #999;
                    box-shadow: 0 0 2px #999;
                    position: absolute; left: 50%; top: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    -moz-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    border-radius: 5px;
                }
                .ext-ui-dialog-title {
                    width: 100%; height: 55px; line-height: 55px; box-sizing: border-box;
                    color: #000; text-align: center; font-weight: 700; font-size: 17px;
                    border-radius: 4px 4px 0 0; position: relative;
                    border-bottom: 1px solid #ebe6e6;
                }
                .ext-ui-dialog-close-btn {
                    text-decoration: none; color: #000;
                    position: absolute; top: 0; inset-inline-end: 15px;
                    font-size: 25px; display: inline-block;
                    cursor: pointer; user-select: none;
                }
                .ext-ui-dialog-content {
                    padding: 15px; max-height: 400px; overflow: auto;
                }
            `;
            if (Object.prototype.hasOwnProperty.call(params, "styleSheet")) {
                styleText += params.styleSheet;
            }
            const dialogStyle = document.createElement("style");
            dialogStyle.textContent = styleText;
            shadowRoot.insertBefore(dialogStyle, shadowRoot.firstChild);

            this.container = container;
            this.mask = mask;
            this.content = content;
            this.dialogStyle = dialogStyle;
            this.shadowRoot = shadowRoot;
        };

        const middleBox = (params) => {
            const { content } = this;
            content.replaceChildren();

            const title = document.createElement("div");
            title.classList.add("ext-ui-dialog-title");
            let titleText = "";
            if (typeof params === "string") {
                titleText = params;
            } else if (typeof params === "object" && params.title) {
                titleText = params.title;
            }

            const span = document.createElement("span");
            span.textContent = titleText;
            span.setAttribute("langue-extension-text", "setting_modal_title");
            title.appendChild(span);

            const closeBtn = document.createElement("span");
            closeBtn.textContent = "×";
            closeBtn.classList.add("ext-ui-dialog-close-btn");
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.close();
            };
            title.appendChild(closeBtn);
            content.appendChild(title);
            this.closeBtn = closeBtn;
        };

        this.showMake = function (params) {
            createElements(params);
            middleBox(params);
            this.params = params;

            const { content } = this;
            const dialogContent = document.createElement("div");
            dialogContent.classList.add("ext-ui-dialog-content");
            dialogContent.insertAdjacentHTML("beforeend", params.content || "");
            content.appendChild(dialogContent);
            this.dialogContent = dialogContent;

            if (typeof params.onContentReady === "function") {
                params.onContentReady(this);
            }
        };

        this.close = function () {
            if (this.container) {
                this.container.remove();
            }
            const params = this.params;
            if (params && typeof params.onContentReady === "function") {
                params.onClose();
            }
            this.params = null;
        };
    };

    /**
     * Toast helper. Class prefix ext-ui-toast avoids conflicts with page CSS.
     * @constructor
     */
    $.ToastHelper = function () {
        this.show = (params) => {
            let time = params.time;
            let background = params.background;
            let color = params.color;
            let position = params.position;
            const defaultMarginValue = 50;

            if (time == undefined || time == "") {
                time = 1500;
            }
            if (position == undefined || position == "") {
                position = "center-bottom";
            }

            const style = document.createElement("style");
            style.textContent = `
                @keyframes ext-ui-toast-fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @-webkit-keyframes ext-ui-toast-fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @-moz-keyframes ext-ui-toast-fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @-o-keyframes ext-ui-toast-fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @-ms-keyframes ext-ui-toast-fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes ext-ui-toast-fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
                @-webkit-keyframes ext-ui-toast-fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
                @-moz-keyframes ext-ui-toast-fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
                @-o-keyframes ext-ui-toast-fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
                @-ms-keyframes ext-ui-toast-fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
                .ext-ui-toast {
                    position: fixed; background: rgba(0,0,0,0.7); color: #fff;
                    font-size: 14px; line-height: 1; padding: 10px; border-radius: 3px;
                    left: 50%; transform: translateX(-50%);
                    -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%);
                    -o-transform: translateX(-50%); -ms-transform: translateX(-50%);
                    z-index: 999999999999999999999999999; white-space: nowrap;
                }
                .ext-ui-toast-in { -webkit-animation: ext-ui-toast-fadeIn .5s; animation: ext-ui-toast-fadeIn .5s; }
                .ext-ui-toast-out { -webkit-animation: ext-ui-toast-fadeOut .5s; animation: ext-ui-toast-fadeOut .5s; }
            `;
            const el = document.createElement("div");
            if (background != undefined && background != "") {
                el.style.backgroundColor = background;
            }
            if (color != undefined && color != "") {
                el.style.color = color;
            }
            el.setAttribute("class", "ext-ui-toast");
            el.innerText = params.message;
            el.style.zIndex = 999999999;
            if (position === "center-bottom") {
                el.style.bottom = defaultMarginValue + "px";
            } else {
                el.style.top = defaultMarginValue + "px";
            }

            document.body.appendChild(el);
            document.head.appendChild(style);
            el.classList.add("ext-ui-toast-in");

            const removeToast = () => {
                if (el.parentNode) document.body.removeChild(el);
                if (style.parentNode) document.head.removeChild(style);
            };
            setTimeout(function () {
                el.classList.remove("ext-ui-toast-in");
                el.classList.add("ext-ui-toast-out");
                el.addEventListener("animationend", removeToast);
                el.addEventListener("webkitAnimationEnd", removeToast);
            }, time);
        };
    };

    /**
     * Alert helper: icon + message, auto-remove after delay.
     * Class prefix ext-ui-alert + random suffix avoids conflicts with page CSS.
     * @constructor
     */
    $.AlertHelper = function () {
        /**
         * @param {Object} params - icon, message, delay
         */
        this.show = function (params) {
            const suffix = "_" + Math.ceil(Math.random() * 100000000);
            const style = document.createElement("style");
            style.textContent = `
                .ext-ui-alert-container` + suffix + ` {
                    position: fixed; bottom: 30px; left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%); z-index: 2147483647; width: 250px;
                }
                .ext-ui-alert-content` + suffix + ` {
                    display: flex; flex-direction: column; align-items: center;
                    background-color: #FFF; border: 1px solid #ecebeb;
                    border-radius: 5px;
                    -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    -moz-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 10px; opacity: 1;
                    -webkit-animation: ext-ui-alert-fadein` + suffix + ` 0.5s;
                    animation: ext-ui-alert-fadein` + suffix + ` 0.5s;
                }
                .ext-ui-alert-icon` + suffix + ` { margin-bottom: 10px; }
                .ext-ui-alert-message` + suffix + ` {
                    font-size: 15px; color: #333; text-align: center;
                }
                @-webkit-keyframes ext-ui-alert-fadein` + suffix + ` {
                    from { opacity: 0; -webkit-transform: translateY(-10px); transform: translateY(-10px); }
                    to { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }
                }
                @keyframes ext-ui-alert-fadein` + suffix + ` {
                    from { opacity: 0; -webkit-transform: translateY(-10px); transform: translateY(-10px); }
                    to { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }
                }
                @-webkit-keyframes ext-ui-alert-fadeout` + suffix + ` {
                    from { opacity: 1; } to { opacity: 0; }
                }
                @keyframes ext-ui-alert-fadeout` + suffix + ` {
                    from { opacity: 1; } to { opacity: 0; }
                }
            `;

            const container = document.createElement("div");
            container.className = "ext-ui-alert-container" + suffix;
            const alertContent = document.createElement("div");
            alertContent.className = "ext-ui-alert-content" + suffix;
            container.appendChild(alertContent);

            if (params.icon) {
                const icon = document.createElement("div");
                icon.className = "ext-ui-alert-icon" + suffix;
                icon.innerHTML = params.icon;
                alertContent.appendChild(icon);
            }

            const text = document.createElement("div");
            text.className = "ext-ui-alert-message" + suffix;
            text.textContent = params.message;
            alertContent.appendChild(text);

            document.body.appendChild(container);
            document.head.appendChild(style);

            const onAlertFadeOut = () => {
                container.remove();
                style.remove();
            };
            setTimeout(() => {
                alertContent.style.webkitAnimation = "ext-ui-alert-fadeout" + suffix + " 0.5s";
                alertContent.style.animation = "ext-ui-alert-fadeout" + suffix + " 0.5s";
                alertContent.addEventListener("animationend", onAlertFadeOut);
                alertContent.addEventListener("webkitAnimationEnd", onAlertFadeOut);
            }, params.delay);
        };
    };

    /**
     * @param {*} ext
     */
    $.MaskHelper = function (ext) {
        this.generate = function () {
            const maskStyles = Object.freeze({
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "2147483647",
                webkitTransition: "opacity 0.3s ease, visibility 0.3s ease",
                transition: "opacity 0.3s ease, visibility 0.3s ease"
            });
            return ext.helper.elementUtil.createElement("div", { style: maskStyles });
        };
    };

    /**
     * Generates a skeleton UI for loading state of coupon list widget.
     * @constructor
     * @param {*} ext - Extension context
     * @param {string} containerId - Container element ID
     * @param {number} cardCount - Number of skeleton cards to generate
     */
    $.CouponListWidgetSkeleton = function(ext, cardCount = 10){

        const containerId = "widget-skeleton";
        const containerIdOuter = "widget-skeleton-outer";

        /**
         * Create skeleton avatar element
         * @returns {HTMLElement}
         */
        const createAvatar = () => {
            return ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-avatar'
            });
        };

        /**
         * Create skeleton lines row (for amount placeholders)
         * @returns {HTMLElement}
         */
        const createLinesRow = () => {
            const confirmed = ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-line'
            });
            const pending = ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-line'
            });
            return ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-lines-row',
                children: [confirmed, pending]
            });
        };

        /**
         * Create skeleton button element
         * @returns {HTMLElement}
         */
        const createButton = () => {
            return ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-button'
            });
        };

        /**
         * Create skeleton tabs element
         * @param {number} tabCount - Number of tabs
         * @returns {HTMLElement}
         */
        const createTabs = (tabCount = 2) => {
            const tabs = [];
            for (let i = 0; i < tabCount; i++) {
                tabs.push(ext.helper.elementUtil.createElement('div', {
                    className: 'skeleton-tab'
                }));
            }
            return ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-tabs',
                children: tabs
            });
        };

        /**
         * Create skeleton card element
         * @returns {HTMLElement}
         */
        const createCard = () => {
            const title = ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-title'
            });
            const desc = ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-desc'
            });
            const left = ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-card-left',
                children: [title, desc]
            });
            const btn = ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-btn'
            });
            return ext.helper.elementUtil.createElement('div', {
                className: 'skeleton-card',
                children: [left, btn]
            });
        };

        /**
         * Create skeleton cards list
         * @param {number} count - Number of cards to create
         * @returns {HTMLElement[]}
         */
        const createCards = (count) => {
            const cards = [];
            for (let i = 0; i < count; i++) {
                cards.push(createCard());
            }
            return cards;
        };

        /**
         * Generate complete skeleton structure
         * @returns {HTMLElement}
         */
        const generateSkeleton = () => {
            const container = ext.helper.elementUtil.createElement('div', {
                attributes:{
                    id: containerId
                },
            });
            const loadding = ext.helper.elementUtil.createElement('div', {
                className: "loading"
            });
            const containerOuter = ext.helper.elementUtil.createElement('div', {
                attributes:{
                    id: containerIdOuter
                },
                children: [
                    container,
                    loadding
                ]
            });

            const skeletonElements = [
                createAvatar(),
                // createLinesRow(),
                createButton(),
                createTabs(2),
                ...createCards(cardCount)
            ];
            skeletonElements.forEach(element => {
                container.appendChild(element);
            });
            return containerOuter;
        };

        /**
         * Generate and return skeleton structure
         * @returns {HTMLElement}
         */
        this.generate = function () {
            return generateSkeleton();
        };
    };
})(jsu);