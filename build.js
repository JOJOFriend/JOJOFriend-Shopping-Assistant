(() => {
    
    "use strict";

    /* eslint-disable no-console */
    /* global Func, path */

    global.modulePath = __dirname + "/node_modules/";
	
	const release = true;
	const platform = "chrome";   //chrome firefox safari
    
    try {
        require("./funcs");
    } catch (e) {
        if (e.code !== "MODULE_NOT_FOUND") {
            throw e;
        }
        console.error("Build script is missing. Please download from https://github.com/Kiuryy/node.js_Build");
        process.exit(1);
    }

    /**
     *
     * @type {Object}
     */
    let packageJson = {};
    /**
     * Starts building the application
     */
    const Build = () => {
        const start = +new Date();
        console.log("Building release...\n");

        transformConfig(["jtmMid", "google", "bing"], []).then(()=>{
            return generatePlatformAndMD();
        }).then(()=>{
            return loadPackageJson();
        }).then(()=>{
    		return Func.cleanPre(); //clean
    	}).then(()=>{
    		return new Promise((resolve) => {
	    		const pipeline = js().then(()=>{
                    return css();
                })
                .then(()=>{
                    return img();
                })
                .then(()=>{
                    return conf();
                })
                .then(()=>{
                    return json();
                })

                //safari adds an extra task to copy to the swift project
                if(platform === "safari"){
                    pipeline.then(()=>{
                        return safari();
                    }).then(resolve);
                    
                }else{
                    pipeline.then(() => {
                        return zip();
                    })
                    .then(resolve);
                }
		    });
    	}).then(()=>{
    		return Func.cleanPost();
    	}).then(()=>{
    		console.log("\nRelease built successfully\t[" + (+new Date() - start) + " ms]");
    	})
    };
    
    /**
     * Parses the json files and copies them to the dist directory
     *
     * @returns {Promise}
     */
    const json = () => {
        return Func.measureTime((resolve) => {
            const replaceRules = [
                [/("version":[\s]*")[^"]*("[\s]*,)/ig, "$1" + packageJson.version + "$2"],
                [/("version_name":[\s]*")[^"]*("[\s]*,)/ig, "$1" + (release ? packageJson.versionName : "Dev") + "$2"],
            ];
            if (release) {
                replaceRules.push([/\s*http:\/\/127\.0\.0\.1:8080/g, ""]);
            }
            Func.replace({ // parse manifest.json
                [path.src + "manifest-"+platform+".json"]: path.tmp + "manifest.json"
            }, replaceRules).then(() => {
                return Func.copy([
                    path.tmp + "manifest.json", path.src + "_locales/**/*.json"], [], path.dist, false);
            }).then(resolve);
        }, "Moved json files to dist directory");
    };
    
     /**
     * Read the package.json of the project and parse its JSON content into an object
     *
     * @returns {*}
     */
    const loadPackageJson = () => {
        return Func.measureTime((resolve) => {
            const fs = require("fs");

            const rawData = fs.readFileSync("package.json");
            const parsedData = JSON.parse(rawData);

            if (parsedData) {
                packageJson = parsedData;
                packageJson.preamble = "Copyright 2025 " + packageJson.author + "\n" +
                "* Licensed under the Apache License, Version 2.0 (the \"License\");\n" +
                "* you may not use this file except in compliance with the License.\n" +
                "* You may obtain a copy of the License at\n" +
                "* http://www.apache.org/licenses/LICENSE-2.0\n";
                resolve();
            } else {
                console.error("Could not load package.json");
                process.exit(1);
            }
        }, "Loaded package.json");
    };
    
    /**
     * minify css and Moved css files to dist directory
     *
     * @returns {Promise}
     */
    const css = () => {
        return Func.measureTime((resolve) => {
            Func.minify([ // parse scss files
                path.src + "css/**/*"
            ], path.dist, false, packageJson.preamble).then(resolve);
        }, "minify css and Moved css files to dist directory");
    };
    
    /**
     * Copies the images to the dist directory
     *
     * @returns {Promise}
     */
    const img = () => {
        return Func.measureTime((resolve) => {
            Func.copy([path.src + "images/**/*"], [], path.dist ,false).then(resolve);
        }, "Moved image files to dist directory");
    };

    /**
     * Copies the HTML templates to the dist directory
     *
     * @returns {Promise}
     */
    const templates = () => {
        return Func.measureTime((resolve) => {
            Func.copy([path.src + "templates/**/*"], [], path.dist, false).then(resolve);
        }, "Moved template files to dist directory");
    };
        
    /**
     * Copies the images to the dist directory
     *
     * @returns {Promise}
     */
    const conf = () => {
        return Func.measureTime((resolve) => {
            Func.minify([
                path.src + "conf/*"
            ], path.dist, false, packageJson.preamble).then(resolve);
            
        }, "Moved conf files to dist directory");
    };
    
    /**
     * Unified JS concat config pipeline (runs in series)
     * Each task: 1. concat to path.tmp (random name) 2. rename to output (default path.tmp + filename) 3. regex replace 4. minify and output to distPath
     *
     * @param {Array<{concat: string[], distPath: string}>} configs concat config list, distPath is the final output path (including filename)
     * @param {boolean} isRelease whether to minify
     * @returns {Promise}
     */
    const runJsConcatTasks = (configs, isRelease) => {
        const crypto = require("crypto");
        const pathModule = require("path");
        const fs = require("fs-extra");
        const replaceRules = [[/}\)\(jsu\);[\s\S]*?\(\$\s*=>\s*{[\s\S]*?"use strict";/mig, ""]];

        return configs.reduce((promise, { concat: concatPaths, distPath }) => {
            return promise.then(() => {
                const filename = pathModule.basename(distPath);
                const output = path.tmp + filename;
                const tmpFile = path.tmp + "tmp-" + crypto.randomBytes(8).toString("hex") + ".js";
                return Func.concat(concatPaths, tmpFile)
                    .then(() => fs.move(tmpFile, output, { overwrite: true }))
                    .then(() => Func.replace({ [output]: output }, replaceRules))
                    .then(() => {
                        // if (isRelease) {
                        //     return Func.minify([output], pathModule.dirname(distPath) + pathModule.sep, true, packageJson.preamble);
                        // }
                        return Func.powerfulCopy(output, distPath);
                    });
            });
        }, Promise.resolve());
    };

    /**
     * Parses the js files and copies them to the dist directory
     *
     * @returns {Promise}
     */
    const js = () => {
        return Func.measureTime((resolve) => {
            const jsConcatConfigs = [
                {
                    concat: [
                        path.src + "js/lib/**/*.js",
                        path.src + "js/opts.js",
                        path.src + "js/helper/**/*.js",
                        path.src + "js/inject.coupon.js"
                    ],
                    distPath: path.dist + "js/inject.coupon.js"
                },
                {
                    concat: [
                        path.src + "js/background.prepare.js",
                        path.src + "js/lib/**/*.js",
                        path.src + "js/opts.js",
                        path.src + "js/helper/data/*.js",
                        path.src + "js/background/**/*.js",
                        path.src + "js/background.js"
                    ],
                    distPath: path.dist + "js/background.js"
                },
                {
                    concat: [
                        path.src + "js/lib/**/*.js",
                        path.src + "js/opts.js",
                        path.src + "js/others/partner.js",
                    ],
                    distPath: path.dist + "js/others/partner.js"
                }
            ];
            runJsConcatTasks(jsConcatConfigs, release).then(resolve);
        }, "Moved js files to dist directory");
    };
    
    
    /**
     * Generate zip file from dist directory
     *
     * @returns {Promise}
     */
    const zip = () => {
        return Func.measureTime((resolve) => {
            const filename = packageJson.name + 
                "_" + packageJson.version + (release ? ".released" : ".dev") +
                "_" + platform + ".zip";
            Func.zipDirectory(path.dist, path.distZip + filename).then(resolve);
        }, "Created zip file from dist directory");
    };

    const safari = () =>{
        return Func.measureTime((resolve) => {
            Func.powerfulCopy(path.dist, "safari_extension/jojofriend/jojofriend Extension/Resources").then(resolve);
        }, "copy to safari project successfully");
    }
    
    const standardizedConf = async ()=>{
        const fs = require('fs');
        const { default: stripJsonComments } = await import('strip-json-comments');
        const configPath = path.src + 'config/platform.conf';

        const raw = fs.readFileSync(configPath, 'utf-8');
        const config = stripJsonComments(raw);

        fs.writeFileSync(configPath, config.trim(), 'utf-8');
        return config;
    };


    /**
     * Normalizes and updates platform configuration.
     * If legacy coupon_supports.conf exists, transform it into platform.conf.
     * Otherwise, read platform.conf directly, apply filters/overrides, and write back.
     *
     * @param {string[]} [filterList=[]] Platform keys to exclude from result
     * @param {Array<Object>} [overrides=[]] Objects keyed by platform; merged deeply into result
     * @returns {Promise<void>}
     */
    const transformConfig = async (filterList = [], overrides = []) => {
        const fs = require("fs");
        const { default: stripJsonComments } = await import("strip-json-comments");

        const KEY_MAP = {
            p: "platformId",
            match: "urlMatch",
            detail: "detailUrlPattern",
            trade: "tradeUrlPatterns",
            record: "historyRecord"
        };

        const configPath = path.src + "config/platform.conf";
        const originConfigPath = path.src + "config/coupon_supports.conf";

        const filterSet = new Set(filterList);

        const mapKeys = (obj) =>
            Object.fromEntries(
                Object.entries(obj).map(([k, v]) => [KEY_MAP[k] ?? k, v])
            );

        const deepMerge = (target, source) => {
            for (const key of Object.keys(source)) {
                const val = source[key];
                if (val != null && typeof val === "object" && !Array.isArray(val)) {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], val);
                } else {
                    target[key] = val;
                }
            }
        };

        const hasLegacy = fs.existsSync(originConfigPath);
        const sourcePath = hasLegacy ? originConfigPath : configPath;

        // If neither legacy nor current config exists, nothing to do
        if (!fs.existsSync(sourcePath)) {
            return;
        }

        let result = {};

        let raw = fs.readFileSync(sourcePath, "utf-8");
        raw = stripJsonComments(raw);
        let input = {};
        try {
            input = JSON.parse(raw);
        } catch (e) {
            console.error("Invalid JSON:", sourcePath);
        }
        for (const [platformKey, platform] of Object.entries(input)) {
            if (filterSet.has(platformKey) || platform?.disabled === true) continue;
            result[platformKey] = mapKeys(platform);
        }

        // Apply overrides (deep merge)
        for (const override of overrides) {
            for (const [platformKey, patch] of Object.entries(override)) {
                if (!result[platformKey]) result[platformKey] = {};
                deepMerge(result[platformKey], patch);
            }
        }

        fs.writeFileSync(configPath, JSON.stringify(result, null, 4), "utf-8");

        if (hasLegacy) {
            fs.unlinkSync(originConfigPath);
        }
    };

    const generatePlatformAndMD = async () => {
        const fs = require("fs");
        const platformConfigsPath = path.src + "js/helper/data/platformConfigs.js";
        const code = fs.readFileSync(platformConfigsPath, "utf-8");
        const match = code.match(/const defaultPlatformConfigsString = `([\s\S]*?)`\s*;/);
        if (!match) {
            throw new Error("Not Find defaultPlatformConfigsString in platformConfigs.js");
        }

        // Beautify the code and maintain consistent formatting.
        const configString = await standardizedConf();
        const platformConfigs = JSON.parse(configString);
        let formattedJson = JSON.stringify(platformConfigs, null, 4);
        formattedJson = formattedJson
            .split('\n')
            .map(line => '            ' + line) // 12 blanks
            .join('\n');
        // formattedJson from JSON.stringify already has correct escaping; do not double backslashes.

        // Rewrite the platformConfigs.js file
        const newCode = code.replace(
            match[0],
            "const defaultPlatformConfigsString = `\n" + formattedJson + "\n        `;"
        );
        fs.writeFileSync(platformConfigsPath, newCode, "utf8");
        
        // write SUPPORTS.md
        const lines = [];
        lines.push("## Websites Supported by JOJOFriend");
        lines.push("JOJOFriend only supports the following platforms and matches URLs using the \"Permission Pattern\" matching method.");
        lines.push("");
        lines.push("| Platform | Permission Pattern |");    
        lines.push("|----------|--------------------|");
        for (const key in platformConfigs) {
            const item = platformConfigs[key];
            const platformId = item.platformId != null ? item.platformId : item.p;
            const urlMatch = item.urlMatch != null ? item.urlMatch : (item.match || "");
            const cleanedMatch = String(urlMatch)
                .replace(/\\\\/g, '\\')
                .replace(/\|/g, '&#124;');
            lines.push(
                `| ${platformId} | ${cleanedMatch} |`
            );
        }

        const platformConfigsMarkdown = lines.join("\n");
        fs.writeFileSync("./PLATFORMS.md", platformConfigsMarkdown, "utf8");
    };

    //execute
    Build();
})();