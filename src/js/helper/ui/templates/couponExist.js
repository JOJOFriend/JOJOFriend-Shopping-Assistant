($ => {
    "use strict";

    /**
     * @param {*} ext
     */
    $.CouponExistTemplateHelper = function (ext) {
       const css = `
            all: revert !important;
            position: absolute !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            white-space: nowrap !important;
            top: 7px !important;
            padding: 3px 5px !important;
            font-size: 13px !important;
            background-color: #ea0f0f !important;
            color: #FFF !important;
            z-index: 10000 !important;
            border-radius: 14px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            -ms-transform: translateX(-50%) !important;
            -moz-transform: translateX(-50%) !important;
            -webkit-transform: translateX(-50%) !important;
            -o-transform: translateX(-50%) !important;
        `; 
        const imgCss = `
            all: revert !important;
            width:13px !important;
            height:13px !important;
            margin-right:3px !important;
        `;
        this.generate = (distinguish, tip, direction) => {
            if(!distinguish || !tip || !direction){
                return "";
            }
            return  `
                <div style="${css}" name="${distinguish}">
                    <img src="${$.api.runtime.getURL("images/coupon-fill.png")}" style="${imgCss}">
                    <b style="direction:${direction} !important;">${tip}</b>
                </div>
            `;
        };
    };
})(jsu);
