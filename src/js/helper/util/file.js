($ => {
    "use strict";

    /**
     * @param {object} ext
     * @constructor
     */
    $.FileHelper = function (ext) {
        /**
         * @param {*} root The root directory of the file, includes /
         * @param {*} files [{"name":"file1", "ext":"txt"},{"name":"file2", "ext":"txt"}]
         * @returns Returns a map distinguished by file name.
         */
        this.readContent = (root, files) => {
            const normalizedRoot = root.endsWith("/") ? root : root + "/";
            return new Promise((resolve, reject) => {
                let loaded = 0;
                const contents = {};
                const total = files.length;

                files.forEach((file) => {
                    const url = $.api.runtime.getURL(`${normalizedRoot}${file.name}.${file.ext}`);
                    $.fetch(url)
                        .then((res) => res.text())
                        .then((data) => {
                            contents[file.name] = data;
                            loaded++;
                            if (loaded >= total) {
                                resolve(contents);
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            });
        };
    };
})(jsu);
