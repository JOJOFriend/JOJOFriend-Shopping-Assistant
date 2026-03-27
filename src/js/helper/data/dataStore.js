($ => {
    "use strict";

    /**
     * Simple in-memory store for data items.
     * @constructor
     */
    $.DataStoreHelper = function () {
        const data = [];

        this.add = function (item) {
            data.push(item);
        };

        this.remove = function (item) {
            const index = data.indexOf(item);
            if (index !== -1) {
                data.splice(index, 1);
            }
        };

        this.clear = function () {
            data.length = 0;
        };

        /** 
         * @returns {Array} Shallow copy of all items (prevents external mutation). 
         * */
        this.getAll = function () {
            return [...data];
        };

        this.getSize = function () {
            return data.length;
        };
    };
})(jsu);