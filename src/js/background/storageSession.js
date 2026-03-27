($ => {
    "use strict";

    $.storageSessionHelper = function (b) {
        const storageSession = $.api.storage.session;

        this.set = (opt) => storageSession.set(opt.params);
        this.get = (opt) => storageSession.get(opt.params);
        this.remove = (opt) => storageSession.remove(opt.params);
        this.clear = () => storageSession.clear();
    };
})(jsu);