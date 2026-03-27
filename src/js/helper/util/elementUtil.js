($ => {
    "use strict";

    /**
     * Utility for DOM element creation and manipulation.
     * @constructor
     * @param {*} ext - Extension context (e.g. for helper.util, helper.cacheContainers).
     */
    $.ElementUtilHelper = function (ext) {

        /**
         * Create an HTML element with optional text/html, style, class, attributes, props, events, children.
         * @param {string} tag - Tag name.
         * @param {Object} [options] - text, html, style, className, attributes, props, on, children.
         * @returns {HTMLElement}
         */
        this.createElement = function (tag, { text, html, style, className, attributes, props, on, children } = {}) {
            const el = document.createElement(tag);

            if (text != null) {
                el.textContent = text;
            } else if (html != null) {
                el.innerHTML = html;
            }
            if (style) {
                Object.assign(el.style, style);
            }
            if (className) {
                el.className = className;
            }
            if (attributes) {
                for (const [k, v] of Object.entries(attributes)) {
                    el.setAttribute(k, v);
                }
            }
            if (props) {
                for (const [k, v] of Object.entries(props)) {
                    el[k] = v;
                }
            }
            if (on) {
                for (const [event, handler] of Object.entries(on)) {
                    el.addEventListener(event, handler);
                }
            }
            if (children) {
                const frag = document.createDocumentFragment();
                const normalize = (c) =>
                    c == null || c === false ? null : c instanceof Node ? c : document.createTextNode(c);
                const list = Array.isArray(children) ? children : [children];
                list.map(normalize).filter(Boolean).forEach((c) => frag.appendChild(c));
                el.appendChild(frag);
            }
            return el;
        };

        this.removeClass = function (element, className) {
            element.classList.remove(className);
        };

        this.addClass = function (element, className) {
            element.classList.add(className);
        };

        this.toggleClass = function (element, className) {
            element.classList.toggle(className);
        };

        this.hasClass = function (element, className) {
            return element.classList.contains(className);
        };

        this.getStyle = function (element, styleName) {
            return window.getComputedStyle(element).getPropertyValue(styleName);
        };

        /**
         * Resolve when document.body is available (e.g. when run_at = document_start).
         * Polls every 100ms if body is not yet present.
         * @returns {Promise<HTMLBodyElement>}
         */
        this.getAvailableBody = function () {
            return new Promise((resolve) => {
                if (document.body) {
                    resolve(document.body);
                    return;
                }
                const interval = setInterval(() => {
                    if (document.body) {
                        clearInterval(interval);
                        resolve(document.body);
                    }
                }, 100);
            });
        };

        /**
         * Whether the element is displayed (offsetParent or computed display not "none").
         * @param {Element} element
         * @returns {boolean}
         */
        this.isElementDisplayed = function (element) {
            if (element.offsetParent !== null) {
                return true;
            }
            const style = window.getComputedStyle(element);
            return style.display !== "none";
        };

        /**
         * Create a shadow DOM root: outer div + shadow root + optional move-to-end observer and AliExpress anchor cleanup.
         * @param {string} name - Root name (used for action, id, style id).
         * @param {string} [css=""] - CSS to inject into shadow root.
         * @param {string} [dir="ltr"] - data-extension-direction value.
         * @param {boolean} [moveToEnd=false] - If true, use MutationObserver to keep root at end of insertRootElement.
         * @param {number} [observerTime=20000] - Max ms to run move-to-end observer.
         * @returns {{ outerDIV: HTMLElement, shadowRoot: ShadowRoot }}
         */
        this.generateShadowDomRoot = function (name, css = "", dir = "ltr", moveToEnd = false, observerTime = 20000) {
            const insertRootElement = document.documentElement || document.body;
            const root = this.createElement("div", {
                attributes: {
                    'style': "all: initial!important;z-index:2147483647!important;display:block!important;",
                    'data-model': `${$.attr.shadowNamePrefix}${name}`
                }
            });
            insertRootElement.appendChild(root);

            const outerDIV = this.createElement("div", {
                attributes: {
                    "data-extension-direction": dir,
                    id: `root-${name}`
                }
            });
            const shadowRoot = root.attachShadow({ mode: "open" });
            this.addShadowRootStyle(shadowRoot, name, css);
            shadowRoot.appendChild(outerDIV);

            const now = Date.now();
            if (moveToEnd) {
                const observer = new MutationObserver(() => {
                    const lastChild = insertRootElement.lastElementChild;
                    if (
                        lastChild !== root &&
                        !lastChild.getAttribute("action") &&
                        document.documentElement
                    ) {
                        if (Date.now() - now <= observerTime) {
                            insertRootElement.appendChild(root);
                        } else {
                            observer.disconnect();
                        }
                    }
                });
                observer.observe(insertRootElement, {
                    childList: true,
                    subtree: false,
                    attributes: false,
                    characterData: false
                });
            }
            if (name && name.includes("aliexpress")) {
                setInterval(() => {
                    outerDIV.querySelectorAll("*[data-re-mark-tag='aliexpress']").forEach((element) => {
                        ext.helper.util.removeAnchorsByNode(element);
                    });
                }, 3000);
            }
            ext.helper.cacheContainers.add(shadowRoot);
            return { outerDIV, shadowRoot };
        };

        /**
         * Add a style element to shadow root (id style-{name}), or append after first existing style.
         * @param {ShadowRoot} shadowRoot
         * @param {string} name - Style id suffix.
         * @param {string} css - CSS text.
         */
        this.addShadowRootStyle = function (shadowRoot, name, css) {
            if (shadowRoot.querySelector(`#style-${name}`)) {
                return;
            }
            const newStyle = document.createElement("style");
            newStyle.id = `style-${name}`;
            newStyle.textContent = css;
            const existingStyle = shadowRoot.querySelector("style");
            if (existingStyle) {
                existingStyle.after(newStyle);
            } else {
                shadowRoot.insertBefore(newStyle, shadowRoot.firstChild);
            }
        };
    };
})(jsu);