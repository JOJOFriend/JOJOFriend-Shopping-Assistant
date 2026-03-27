($ => {
    "use strict";

    /**
     * @param {*} ext
     */
    $.ActivateHelper = function (ext) {
        const MIN_ACTIVATE_WIDGET_TOP = 50;
        const toCssString = (obj) => Object.entries(obj || {})
            .map(([k, v]) => `${k.replace("_", "-")}:${v}`)
            .join(";");

        const getActivateTop = () => {
            const defaultTop = ext.helper.dao.getDefaults().p.logoTop;
            let top = ext.helper.dao.getData($.opts.storageKeys.position.logoTop, defaultTop);
            const maxTop = window.innerHeight - MIN_ACTIVATE_WIDGET_TOP;
            return Math.min(Math.max(top, 0), maxTop);
        };

        const updateActivateTop = (top) => {
            ext.helper.dao.setDataByKey($.opts.storageKeys.position.logoTop, top);
        };

        const addEventListenerDrag = (dragHandle, activateWidget) => {
            let isDragging = false;
            let startY, elementY;
            const maxTop = () => window.innerHeight - MIN_ACTIVATE_WIDGET_TOP;

            const onMouseMove = (e) => {
                if (!isDragging) return;
                const top = Math.min(Math.max(elementY + (e.clientY - startY), 0), maxTop());
                activateWidget.style.top = `${top}px`;
                updateActivateTop(top);
            };

            const onMouseUp = () => {
                if (!isDragging) return;
                isDragging = false;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            dragHandle.addEventListener("mousedown", (e) => {
                e.preventDefault();
                isDragging = true;
                startY = e.clientY;
                elementY = parseInt(activateWidget.style.top, 10) || 0;
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            });
        };

        this.generate = (couponTotal, badgeData, dragData, interfaceData) => {
            // Drag handle (right-side grip for vertical dragging)
            const dragHandle = ext.helper.elementUtil.createElement("div", {
                className: "activate-widget__drag-handle all-center",
                attributes: { style: toCssString(dragData) },
                children: [ext.helper.elementUtil.createElement("img", {
                    attributes: { src: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='17'%20viewBox='0%200%2010%2017'%3e%3cg%20id='drag_icon'%20data-name='drag%20icon'%20transform='translate(-756.458%20-5682.563)'%3e%3ccircle%20id='Ellipse_277'%20data-name='Ellipse%20277'%20cx='1.5'%20cy='1.5'%20r='1.5'%20transform='translate(756.458%205682.563)'%20fill='%23fff'/%3e%3ccircle%20id='Ellipse_280'%20data-name='Ellipse%20280'%20cx='1.5'%20cy='1.5'%20r='1.5'%20transform='translate(763.458%205682.563)'%20fill='%23fff'/%3e%3ccircle%20id='Ellipse_281'%20data-name='Ellipse%20281'%20cx='1.5'%20cy='1.5'%20r='1.5'%20transform='translate(756.458%205689.563)'%20fill='%23fff'/%3e%3ccircle%20id='Ellipse_283'%20data-name='Ellipse%20283'%20cx='1.5'%20cy='1.5'%20r='1.5'%20transform='translate(756.458%205696.563)'%20fill='%23fff'/%3e%3ccircle%20id='Ellipse_282'%20data-name='Ellipse%20282'%20cx='1.5'%20cy='1.5'%20r='1.5'%20transform='translate(763.458%205689.563)'%20fill='%23fff'/%3e%3ccircle%20id='Ellipse_284'%20data-name='Ellipse%20284'%20cx='1.5'%20cy='1.5'%20r='1.5'%20transform='translate(763.458%205696.563)'%20fill='%23fff'/%3e%3c/g%3e%3c/svg%3e", draggable: false }
                })]
            });

            // Activate trigger (clickable logo/button area)
            const triggerChildren = couponTotal
                ? [ext.helper.elementUtil.createElement("div", {
                    className: "notification all-center pulse-reveal",
                    text: couponTotal,
                    attributes: { style: toCssString(badgeData) }
                })]
                : [];
            const trigger = ext.helper.elementUtil.createElement("div", {
                className: "activate-widget__trigger",
                children: triggerChildren,
                attributes: { style: toCssString(interfaceData) }
            });
            const content = ext.helper.elementUtil.createElement("div", {
                className: "activate-widget__content",
                children: [trigger, dragHandle]
            });
            const activateWidget = ext.helper.elementUtil.createElement("div", {
                className: "activate-widget",
                attributes: { style: `top:${getActivateTop()}px` },
                children: [content]
            });

            addEventListenerDrag(dragHandle, activateWidget);
            return { activateWidget, trigger };
        };
    };
})(jsu);