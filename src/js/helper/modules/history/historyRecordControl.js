($ => {
    "use strict";

    /**
     * @param {object} ext
     * @constructor
     */
    $.HistoryRecordControl = function (ext, platformConfig) {
        this.forceDisabled = () => {
            const host = window.location.host;
            const regexs = [
                /^(?:music|developer|affiliate-program|advertising|aws|photos|gaming|sellercentral|sellercentral-europe|primevideo|read|pay|vendorcentral|audible|account|ads|associates|kdp|luna|skills|brandregistry|supply|devices|jobs)\.amazon\.|^console\.aws\.amazon\./,
                /^(?:portals|ds|seller|service|gsp|open|login|trade|csp|fuwu)\.aliexpress\./,
                /^(?:developer|edp|community|sellercenter|export|advertising|auth|signin|mesg)\.ebay\./,
                /^(?:open|developer|sellercenter|affiliate|university|advertising|login|member)\.lazada\./,
                /^(?:open|seller|edu|affiliate|careers|help|banhang|partner|business)\.shopee\./
            ];
            return regexs.some((regex) => regex.test(host));
        };
        this.disabled = () => {
            return platformConfig.historyRecord.disabled || this.forceDisabled();
        };
    };

})(jsu);
