($ => {
    "use strict";

    $.ConnectHelper = function (b) {

        /**
         * Initializes message handling between content scripts and the background.
         * The method must return a promise (for the caller) while the internal
         * listener itself relies on Chrome's callback-based contract.
         */
        this.init = async () => {
            const mapping = {
                langvars: b.helper.language.getLangVars,
                rtlLangs: b.helper.language.getRtlLanguages,
                languageInfos: b.helper.language.getAvailableLanguages,
                languageVars: b.helper.language.getVars,
                languageRefresh: b.helper.language.init,
                openLink: b.helper.util.openLink,
                closeLink: b.helper.util.closeLink,
                request: b.helper.request.getServerData,

                storageSessionGet: b.helper.storageSession.get,
                storageSessionSet: b.helper.storageSession.set,
                storageSessionRemove: b.helper.storageSession.remove,
                storageSessionClear: b.helper.storageSession.clear,
                getEid: b.helper.dao.getEid
            };

            const handleKnownType = (message, sender, callback) => {
                const handler = mapping[message.type];
                if (!handler) {
                    return false;
                }

                message.tabId = sender.tab ? sender.tab.id : null;

                handler(message)
                    .then((result) => {
                        callback(result);
                    })
                    .catch((error) => {
                        b.log(error);
                        callback();
                    });

                return true;
            };

            const handleSpecialCases = (message) => {
                b.log("Unknown message type:" + message.type);
            };

            // Retrieve data or notification information from the background.
            $.api.runtime.onMessage.addListener((message, sender, callback) => {
                if (!handleKnownType(message, sender, callback)) {
                    handleSpecialCases(message);
                    callback();
                }

                // Return true to indicate an asynchronous response is used.
                return true;
            });
        };
    };

})(jsu);