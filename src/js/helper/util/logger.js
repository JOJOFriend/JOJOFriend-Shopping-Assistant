($ => {
    "use strict";

    /**
     * @param {*} ext
     */
    $.LoggerHelper = function (ext) {
        /**
         * Format log messages
         * @param {string} level - Log level (info/error)
         * @param {string} className - Class name
         * @param {string} methodName - Method name
         * @param {...*} messages - Log messages
         */
        this.log = (level = "info", className, methodName, ...messages) => {
            const prefix = `[${className || "Unknown"}][${methodName || "Unknown"}]: `;
            const formattedMessages = messages.length > 0 && typeof messages[0] === "string" 
                ? [prefix + messages[0], ...messages.slice(1)]
                : [prefix, ...messages];
            
            const levelLower = level.toLowerCase();
            if (levelLower === "info") {
                console.info(...formattedMessages);
            } else if (levelLower === "error") {
                console.error(...formattedMessages);
            } else {
                console.log(...formattedMessages);
            }
        };
    };
})(jsu);
