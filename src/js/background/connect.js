($ => {
    "use strict";

    $.ConnectHelper = function (b) {

        /**
         * Registers the unified runtime.onMessage listener (sync; must run before content scripts rely on it).
         *
         * @param {object} [actionHandlers]
         * @param {function(number, object): void} [actionHandlers.onUpdateToolbar]
         * @param {function(number): void} [actionHandlers.onIconAvailable]
         * @param {function(number): void} [actionHandlers.onIconUnavailable]
         */
        this.registerMessageListener = (actionHandlers = {}) => {
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

            const handleActionMessage = (message, sender) => {
                const tabId = sender.tab?.id;
                const { action, value } = message;
                const actions = $.opts.messageActions;

                if (action === actions.updateToolbar) {
                    actionHandlers.onUpdateToolbar?.(tabId, value);
                } else if (action === actions.iconAvailable) {
                    actionHandlers.onIconAvailable?.(tabId);
                } else if (action === actions.iconUnavailable) {
                    actionHandlers.onIconUnavailable?.(tabId);
                }
            };

            $.api.runtime.onMessage.addListener((message, sender, sendResponse) => {
                if (message.action) {
                    handleActionMessage(message, sender);
                    return false;
                }

                if (message.type) {
                    const handler = mapping[message.type];
                    if (!handler) {
                        b.log("Unknown message type:" + message.type);
                        return false;
                    }

                    message.tabId = sender.tab ? sender.tab.id : null;

                    handler(message)
                        .then((result) => {
                            sendResponse(result);
                        })
                        .catch((error) => {
                            b.log(error);
                            sendResponse();
                        });

                    return true;
                }

                return false;
            });
        };

        /** @returns {Promise<void>} */
        this.init = async () => Promise.resolve();
    };

})(jsu);
