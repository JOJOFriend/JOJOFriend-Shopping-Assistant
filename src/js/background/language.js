($ => {
    "use strict";

    $.LanguageHelper = function () {

        /* ------------------ Language registry (BCP-47 format) ------------------ */
        // IMPORTANT:
        // All language identifiers here MUST follow BCP-47 (hyphen format, e.g. zh-CN).
        // Chrome extension folder names (_locales) will be converted later to zh_CN.
        const defaultLabelMap = {
            ar: "اتّباع لغة المتصفح",
            de: "Browser-Sprache folgen",
            en: "Follow Browser",
            es: "Seguir el navegador",
            fr: "Suivre la langue du navigateur",
            he: "התאם לשפת הדפדפן",
            hi: "ब्राउज़र भाषा का अनुसरण करें",
            id: "Ikuti bahasa browser",
            it: "Segui la lingua del browser",
            ja: "ブラウザーに従う",
            ko: "브라우저 언어 따르기",
            ms: "Ikut bahasa pelayar",
            nl: "Browsertaal volgen",
            pl: "Dopasuj do jezyka przegladarki",
            pt: "Seguir o idioma do navegador",
            ru: "Следовать языку браузера",
            th: "ใช้ภาษาตามเบราว์เซอร์",
            tr: "Tarayici dilini takip et",
            uk: "Використовувати мову браузера",
            vi: "Theo ngon ngu trinh duyet",
            zh: "跟随浏览器",
            "zh-TW": "跟隨瀏覽器",
        };

        const allLanguages = {
            default: "Follow Browser",
            ar: "العربية",
            de: "Deutsch",
            en: "English",
            "en-US": "English (US)",
            es: "Español",
            fr: "Français",
            he: "עברית",
            hi: "हिन्दी",
            id: "Bahasa Indonesia",
            it: "Italiano",
            ja: "日本語",
            ko: "한국어",
            ms: "Bahasa Melayu",
            nl: "Nederlands",
            pl: "Polski",
            "pt-BR": "Português (Brasil)",
            "pt-PT": "Português (Portugal)",
            ru: "Русский",
            th: "ไทย",
            tr: "Türkçe",
            uk: "Українська",
            vi: "Tiếng Việt",
            "zh-CN": "简体中文",
            "zh-TW": "繁體中文",
        };


        const rtlLangs = ["ar", "he", "fa"];

        // Language aliases (short codes mapped to canonical ones)
        const aliasLangs = { pt: "pt-PT" };

        let language = null;
        let languageLabel = null;
        let langVars = {};
        let isRtl = false;
        let selectedLanguage = "default";

        const getDefaultLanguageLabel = () => {
            const supportedKeys = new Set(
                Object.keys(allLanguages).filter((key) => key !== "default")
            );
            const supportedShorts = new Set(
                Array.from(supportedKeys).map((key) => key.toLowerCase().split("-")[0])
            );

            try {
                const ui = $.api.i18n.getUILanguage();
                // Do not rely on normalizeLocaleKey declaration order here.
                const normalized = String(ui || "")
                    .trim()
                    .replace(/_/g, "-")
                    .split("-")
                    .filter(Boolean)
                    .map((part, i) => (i === 0 ? part.toLowerCase() : part.toUpperCase()))
                    .join("-");
                const short = normalized ? normalized.toLowerCase().split("-")[0] : "";

                // 1) exact locale (e.g. zh-TW) if supported
                if (normalized && supportedKeys.has(normalized) && defaultLabelMap[normalized]) {
                    return defaultLabelMap[normalized];
                }

                // 2) short locale (e.g. zh) if supported group exists
                if (supportedShorts.has(short) && defaultLabelMap[short]) {
                    return defaultLabelMap[short];
                }

                // 3) fallback to english
                return defaultLabelMap.en;
            } catch (err) {
                return defaultLabelMap.en;
            }
        };
        allLanguages.default = getDefaultLanguageLabel();

        // Convert zh_CN -> zh-CN (standard format)
        const toBCP47 = (code) => code ? code.replace(/_/g, "-") : null;

        // Convert zh-CN -> zh_CN (Chrome _locales folder format)
        const toChromeLocale = (code) => code ? code.replace(/-/g, "_") : null;

        /**
         * Normalize any locale string to BCP-47:
         * zh_CN / zh-cn / zh-Hans-CN → zh-CN
         */
        const normalizeLocaleKey = (raw) => {
            if (!raw) return null;

            const parts = raw.trim().replace(/_/g, "-").split("-").filter(Boolean);
            const lang = parts[0].toLowerCase();

            // Find region part if exists (US, CN, TW, 419, ...)
            const region = parts.slice(1).find(p => /^[a-z]{2}$/i.test(p) || /^\d{3}$/.test(p));
            return region ? `${lang}-${region.toUpperCase()}` : lang;
        };

        /**
         * Build a mapping index like:
         * "zh-cn" -> "zh-CN"
         * "zh" -> "zh-CN"
         * This solves incomplete short code mapping issues.
         */
        const buildLocaleIndex = () => {
            const index = {};
            Object.keys(allLanguages).forEach(key => {
                const norm = normalizeLocaleKey(key);
                index[norm.toLowerCase()] = key;

                // also map short language code
                const short = norm.split("-")[0];
                if (!index[short]) index[short] = key;
            });
            return index;
        };

        const localeIndex = buildLocaleIndex();

        /**
         * Resolve any input language to the canonical key in allLanguages.
         */
        const resolveCanonicalLang = (code) => {
            const norm = normalizeLocaleKey(code);
            if (!norm) return null;
            return localeIndex[norm.toLowerCase()] || norm;
        };

        /**
         * Create a prioritized language fallback list.
         * Example for zh-HK:
         * zh-HK → zh-TW → zh → default
         */
        const getLangCandidates = (rawLang, defaultLang) => {
            const candidates = [];
            const canonical = resolveCanonicalLang(rawLang);
            if (canonical) candidates.push(canonical);

            const norm = normalizeLocaleKey(rawLang);
            if (norm) {
                const [short, region] = norm.split("-");

                // Special Chinese region handling
                if (short === "zh") {
                    if (region === "HK" || region === "MO") candidates.push("zh-TW");
                    if (region === "SG") candidates.push("zh-CN");
                }

                // Portuguese alias handling
                if (short === "pt") candidates.push("pt-PT");

                if (localeIndex[short]) candidates.push(localeIndex[short]);
            }

            candidates.push(defaultLang);
            return [...new Set(candidates)];
        };

        /**
         * Load translation file from _locales.
         * Note: ONLY here we convert to zh_CN format.
         */
        const getVars = (lang, defaultLang = null) => new Promise((resolve) => {

            const load = (baseVars) => {
                fetch($.api.runtime.getURL("_locales/" + toChromeLocale(lang) + "/messages.json"))
                    .then(r => r.ok ? r.json() : Promise.reject())
                    .then(data => {
                        Object.assign(baseVars, data);
                        resolve({ langVars: baseVars });
                    })
                    .catch(() => resolve({ langVars: baseVars }));
            };

            // Always load default language first as base, then override
            if (defaultLang && defaultLang !== lang) {
                getVars(defaultLang, null).then(res => load(res.langVars));
            } else {
                load({});
            }
        });


        // ------------------ Initialization ------------------

        /**
         * Determine best language and load translations.
         */
        this.init = () => new Promise((resolve) => {
            $.api.storage.local.get(["language"], (data) => {
                const storedLanguage = data?.language || "default";
                const followBrowser = storedLanguage === "default";
                selectedLanguage = storedLanguage;
                let lang = followBrowser ? this.getUILanguage() : storedLanguage;

                lang = resolveCanonicalLang(lang);
                if (aliasLangs[lang]) lang = aliasLangs[lang];

                const defaultLang = resolveCanonicalLang($.opts.manifest.default_locale);
                const candidates = getLangCandidates(lang, defaultLang);

                this.getAvailableLanguages().then((available) => {
                    const infos = available && available.infos ? available.infos : {};
                    const usable = candidates.find((l) => infos[l] && infos[l].available);
                    language = usable || defaultLang;
                    languageLabel = followBrowser ? allLanguages.default : allLanguages[language];
                    isRtl = rtlLangs.some(r => language.startsWith(r));

                    getVars(language, defaultLang).then(res => {
                        langVars = res.langVars;
                        resolve();
                    });
                });
            });
        });

  
        // ------------------ Public APIs ------------------

        this.getUILanguage = () => {
            try {
                return normalizeLocaleKey($.api.i18n.getUILanguage());
            } catch {
                return $.opts.manifest.default_locale;
            }
        };

        this.getLanguage = () => language;

        this.getRtlLanguages = async () => rtlLangs;

        this.getLangVars = () => new Promise((resolve) => {
            const checkTask = () => {
                if (language) {
                    resolve({
                        language: language,
                        selectedLanguage: selectedLanguage,
                        languageLabel: languageLabel,
                        dir: isRtl ? "rtl" : "ltr",
                        vars: langVars
                    });
                } else {
                    setTimeout(checkTask, 100);
                }
            };
            checkTask();
        });

        this.getVars = (opts = {}) => getVars(opts.language, $.opts.manifest.default_locale);

        /**
         * Check which _locales folders actually exist.
         */
        this.getAvailableLanguages = () => new Promise((resolve) => {
            const infos = {};
            const langs = Object.keys(allLanguages);

            let done = 0;
            langs.forEach((lang) => {
                infos[lang] = {
                    language: lang,
                    languageLabel: allLanguages[lang],
                    available: false
                };

                fetch($.api.runtime.getURL("_locales/" + toChromeLocale(lang) + "/messages.json"), { method: "HEAD" })
                    .then(() => {
                        infos[lang].available = true;
                    })
                    .catch(() => {})
                    .finally(() => {
                        if (++done === langs.length) {
                            resolve({infos: infos});
                        }
                    });
            });
        });

        /**
         * Detect languages with incomplete translations from your translation platform.
         */
        this.getIncompleteLanguages = () => new Promise((resolve) => {
            const url = $.opts?.website?.translation?.info;
            if (!url) return resolve([]);

            fetch(url)
                .then(r => r.ok ? r.json() : Promise.reject())
                .then(infos => {
                    const total = Object.values(infos.categories || {})
                        .reduce((s, c) => s + (c.total || 0), 0);

                    const incomplete = (infos.languages || [])
                        .filter(l => (l.varsAmount || 0) < total)
                        .map(l => resolveCanonicalLang(l.name));

                    resolve(incomplete);
                })
                .catch(() => resolve([]));
        });
    };

})(jsu);