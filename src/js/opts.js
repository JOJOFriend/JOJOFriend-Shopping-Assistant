($ => {
    "use strict";

	//Firefox supports browsers and also supports Chrome.
	//chrome only supports chrome
    $.api = typeof browser !== "undefined" ? browser : chrome;
	const manifest = $.api.runtime.getManifest();
	
    $.isDev = manifest.version_name.trim() === "Dev"; //isDev, standalone version

    // Replaced at build time by build.js (__BUILD_PLATFORM__ -> chrome | firefox | safari)
    $.browserName = "__BUILD_PLATFORM__";
	
	//Configuration file
    $.opts = {
        manifest: manifest,
        apiVersion:"2.0.1",
        number:"8000",      //This is an identifier specific to the extension; once set, it cannot be changed.
        baseUrl:"https://o.jiayoushichang.com",
        // baseUrl:"http://127.0.0.1:8080/jojofriend",
        urlAliases: {},
        classes:{
            page:{
                style: "ws-be-style",
            }
        },
        attr: {
            name: "data-name",
			style: "data-style",
            couponProcessMark: "coup-mk",
            shadowNamePrefix: "ac-el-"
		},
        website:{
            installNotice:"https://www.jojofriend.com/ext/notice"
		},
        messageActions:{
            updateToolbar:"update_toolbar",
            iconAvailable:"iconAvailable",
            iconUnavailable:"iconUnavailable",
            toolbarIconClick:"toolbar_icon_click"
        },
        storageKeys:{
            position:{
                logoTop:"p/logoTop",
            },
            history:{
                record:"h/record",
                offset:"h/offset",
                number:"h/number",
            },
            website:{
                token:"w/userToken",
                exchangeInfo:"w/exchangeInfo"
            }
        },
        featureToggleKeys: {
            windowShow: "window_show"
        },
        updateExchangeInfoDelay: 1000*60*10 //Updated every 10 minutes.
    };
    
    $.cl = $.opts.classes;
    $.attr = $.opts.attr;
})(jsu);