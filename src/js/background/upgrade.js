($ => {
    "use strict";

    $.UpgradeHelper = function (b) {

        this.loaded = false;

        /**
         *
         * @returns {Promise}
         */
        this.init = async () => {
            if ($.api.runtime.onUpdateAvailable) {
                $.api.runtime.onUpdateAvailable.addListener(() => { // reload background script when an update is available
                    $.api.runtime.reload();
                });
            }
            this.loaded = true;
        };

        /**
         * Show onboarding page and reinitialize the content scripts after the extension was installed
         */
        this.onInstalled = () => {
            const installationDate = b.helper.dao.getData("installationDate"); //Installation date
            if (installationDate === null || (+new Date() - installationDate < 60 * 1000)) {
                b.helper.util.openLink({
                    href: $.opts.website.installNotice,
                    newTab: true
                });
            }
        };

        /**
         * Will be called after the extension was updated,
         * calls the upgrade method after a version jump (1.6 -> 1.7) and reinitializes the content scripts
         *
         * @param {object} details
         */
        this.onUpdated = (details) => {
            
        };
    };

})(jsu);