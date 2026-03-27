($ => {
    "use strict";

    const PartnerHelper = function () {
        const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        const randomString =(length = 8) => {
            let result = "";
            for (let i = 0; i < length; i++) {
                result += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            return result;
        };
    
        const sendBackgroundMessage = (action, value) => {
            $.api.runtime.sendMessage({ action, value });
        };

        this.run = () =>{
            document.documentElement.setAttribute("dt-p-c", "v-" + randomString(16));
            sendBackgroundMessage($.opts.messageActions.iconAvailable, {});
        };
    };

    new PartnerHelper().run();
})(jsu);