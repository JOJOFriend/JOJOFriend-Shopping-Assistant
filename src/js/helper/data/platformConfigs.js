($ => {
    "use strict";

    /**
     * All supported websites must be defined here.
     * @constructor
     */
    $.PlatformConfigsHelper = function () {
        // In the string \\ becomes \ after JSON.parse(), valid in regex.
        // disabled: whether the entire feature is enabled
        // record.disabled: whether the history record is enabled
        // On the matched website, the toolbar icon will display the normal logo instead of being grayed out.
        const defaultPlatformConfigsString = `
            {
                "aliexpress": {
                    "platformId": "aliexpress",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aliexpress\\\\.[a-z]{2,}(\\\\.[a-z]{2,})*(\\\\/.*)?",
                    "detailUrlPattern": "\\\\/item\\\\/[^.\\\\/]+\\\\.html",
                    "tradeUrlPatterns": [
                        "\\\\/trade\\\\/confirm\\\\.html",
                        "\\\\/checkout\\\\?"
                    ],
                    "historyRecord": {
                        "elements": {
                            "title": "h1[data-pl='product-title'], h1[class*='HazeProductDescription_HazeProductDescription__smallText_']",
                            "price": "span.product-price-value, div[class*='currentPriceText'], div[class*='HazeProductPrice_SnowPrice__container']>div, span[class*='price-default--current--']",
                            "cover": "div[class*='slider--img'] >img, div[class*='__previewItem__'] picture[class*='Picture__container']>source, div.pdp-info-left div[class*='slider--img--'] >img"
                        },
                        "disabled": false
                    },
                    "disabled": false,
                    "marketplace": "span[class*='country-flag-']",
                    "couponExistPer": 50
                },
                "lazada": {
                    "platformId": "lazada",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lazada\\\\.[\\\\w.-]+([/?#].*)?$",
                    "detailUrlPattern": "\\\\/products\\\\/.*-i\\\\d+.*\\\\.html",
                    "tradeUrlPatterns": [],
                    "historyRecord": {
                        "elements": {
                            "title": ".pdp-product-title",
                            "price": ".pdp-v2-product-price-content-salePrice",
                            "cover": "div[class*='gallery-preview-panel'] >img:last-child, .gallery-preview-panel__content >img:last-child"
                        },
                        "disabled": false
                    },
                    "disabled": false,
                    "couponExistPer": 20
                },
                "banggood": {
                    "platformId": "banggood",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?banggood\\\\.[\\\\w.-]+([/?#].*)?$",
                    "detailUrlPattern": "\\\\/.*-p-\\\\d+\\\\.html",
                    "tradeUrlPatterns": [],
                    "historyRecord": {
                        "elements": {
                            "title": ".product-title-text",
                            "price": ".newbie-price",
                            "cover": "a.p-img >img"
                        },
                        "disabled": false
                    },
                    "disabled": false,
                    "couponExistPer": 20
                },
                "ebay": {
                    "platformId": "ebay",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ebay\\\\.[\\\\w.-]+([/?#].*)?$",
                    "detailUrlPattern": "\\\\/itm\\\\/\\\\d+",
                    "tradeUrlPatterns": [],
                    "historyRecord": {
                        "elements": {
                            "title": ".x-item-title__mainTitle",
                            "price": ".x-price-primary >span",
                            "cover": ".ux-image-grid-item >img, .ux-image-carousel-item >img"
                        },
                        "disabled": false
                    },
                    "disabled": false,
                    "couponExistPer": 20
                },
                "bestbuy": {
                    "platformId": "bestbuy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bestbuy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "detailUrlPattern": "\\\\/site\\\\/.*\\\\/\\\\d+\\\\.p",
                    "tradeUrlPatterns": [],
                    "historyRecord": {
                        "elements": {
                            "title": ".sm:text-title-sm",
                            "price": "*[class*='_price_']",
                            "cover": "*[class*='displayingImage'] img"
                        },
                        "disabled": true
                    },
                    "disabled": false,
                    "couponExistPer": 20
                },
                "shopee": {
                    "platformId": "shopee",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopee\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wish": {
                    "platformId": "wish",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wish\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amazon": {
                    "platformId": "amazon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amazon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "detailUrlPattern": "\\\\/(?:dp|gp\\\\/product|gp\\\\/aw\\\\/d|gp\\\\/offer-listing)\\\\/",
                    "historyRecord": {
                        "elements": {
                            "title": "#productTitle",
                            "price": "span.priceToPay",
                            "cover": "#imgTagWrapperId img"
                        },
                        "disabled": false
                    },
                    "disabled": false
                },
                "adidas": {
                    "platformId": "adidas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?adidas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "advertiser": {
                    "platformId": "advertiser",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?advertiser\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "agoda": {
                    "platformId": "agoda",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?agoda\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bookabach": {
                    "platformId": "bookabach",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bookabach\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "etsy": {
                    "platformId": "etsy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?etsy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hoteis": {
                    "platformId": "hoteis",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hoteis\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "magazineluiza": {
                    "platformId": "magazineluiza",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?magazineluiza\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "meesho": {
                    "platformId": "meesho",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?meesho\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mercadolibre": {
                    "platformId": "mercadolibre",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mercadolibre\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "namshi": {
                    "platformId": "namshi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?namshi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nike": {
                    "platformId": "nike",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nike\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sivvi": {
                    "platformId": "sivvi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sivvi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skyscanner": {
                    "platformId": "skyscanner",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skyscanner\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "target": {
                    "platformId": "target",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?target\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tripadvisor": {
                    "platformId": "tripadvisor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tripadvisor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wayfair": {
                    "platformId": "wayfair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wayfair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wotif": {
                    "platformId": "wotif",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wotif\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "airbaltic": {
                    "platformId": "airbaltic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?airbaltic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "alibaba": {
                    "platformId": "alibaba",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?alibaba\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "allegro": {
                    "platformId": "allegro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?allegro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "daraz": {
                    "platformId": "daraz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?daraz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "edureka": {
                    "platformId": "edureka",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?edureka\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "expedia": {
                    "platformId": "expedia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?expedia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vrbo": {
                    "platformId": "vrbo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vrbo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "booking": {
                    "platformId": "booking",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?booking\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "noon": {
                    "platformId": "noon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?noon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ozon": {
                    "platformId": "ozon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ozon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rakuten": {
                    "platformId": "rakuten",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rakuten\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ranavat": {
                    "platformId": "ranavat",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ranavat\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shein": {
                    "platformId": "shein",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shein\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "suiteness": {
                    "platformId": "suiteness",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?suiteness\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "temu": {
                    "platformId": "temu",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?temu\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ticketmaster": {
                    "platformId": "ticketmaster",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ticketmaster\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "treatwell": {
                    "platformId": "treatwell",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?treatwell\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trip": {
                    "platformId": "trip",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trip\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "walmart": {
                    "platformId": "walmart",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?walmart\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wildberries": {
                    "platformId": "wildberries",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wildberries\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wilsonsleather": {
                    "platformId": "wilsonsleather",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wilsonsleather\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zalando": {
                    "platformId": "zalando",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zalando\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ajio": {
                    "platformId": "ajio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ajio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flipkart": {
                    "platformId": "flipkart",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flipkart\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myntra": {
                    "platformId": "myntra",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myntra\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shopify": {
                    "platformId": "shopify",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopify\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lenovo": {
                    "platformId": "lenovo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lenovo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cloudways": {
                    "platformId": "cloudways",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cloudways\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wps": {
                    "platformId": "wps",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wps\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bloomingdales": {
                    "platformId": "bloomingdales",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bloomingdales\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dyson": {
                    "platformId": "dyson",
                    "keywords": [
                        "dysoncanada",
                        "dyson"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(dyson|dysoncanada)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lego": {
                    "platformId": "lego",
                    "keywords": [
                        "lego",
                        "legostore"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(lego|legostore)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lg": {
                    "platformId": "lg",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lg\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iherb": {
                    "platformId": "iherb",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(iherb)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "samsonite": {
                    "platformId": "samsonite",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?samsonite\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "finishline": {
                    "platformId": "finishline",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?finishline\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "digitalocean": {
                    "platformId": "digitalocean",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?digitalocean\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kiehls": {
                    "platformId": "kiehls",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kiehls\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "costway": {
                    "platformId": "costway",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?costway\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "crocs": {
                    "platformId": "crocs",
                    "keywords": [
                        "crocs",
                        "crocsitalia"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(crocs|crocsitalia)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "btiktok": {
                    "platformId": "btiktok",
                    "keywords": [
                        "tiktok"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/(ads|getstarted)\\\\.tiktok\\\\.com.*?\\\\/[Bb]usiness.*([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "samsung": {
                    "platformId": "samsung",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?samsung\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nubia": {
                    "platformId": "nubia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nubia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "economybookings": {
                    "platformId": "economybookings",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?economybookings\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "huawei": {
                    "platformId": "huawei",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?huawei\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lululemon": {
                    "platformId": "lululemon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lululemon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hsbc": {
                    "platformId": "hsbc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hsbc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oppo": {
                    "platformId": "oppo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oppo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "qvc": {
                    "platformId": "qvc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?qvc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "curveez": {
                    "platformId": "curveez",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?curveez\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "puma": {
                    "platformId": "puma",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?puma\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rakutentravel": {
                    "platformId": "rakutentravel",
                    "keywords": [
                        "rakuten",
                        "rakutentravel"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/travel\\\\.rakuten\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rakutenkobo": {
                    "platformId": "rakutenkobo",
                    "keywords": [
                        "kobo",
                        "rakutenkobo"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kobo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "josbank": {
                    "platformId": "josbank",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?josbank\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "alibris": {
                    "platformId": "alibris",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?alibris\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "balaveda": {
                    "platformId": "balaveda",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?balaveda\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sephora": {
                    "platformId": "sephora",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sephora\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "belkin": {
                    "platformId": "belkin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?belkin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "onetravel": {
                    "platformId": "onetravel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?onetravel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "charlottetilbury": {
                    "platformId": "charlottetilbury",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?charlottetilbury\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "handy": {
                    "platformId": "handy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?handy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "udemy": {
                    "platformId": "udemy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?udemy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rainforestexpeditions": {
                    "platformId": "rainforestexpeditions",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rainforestexpeditions\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "godiva": {
                    "platformId": "godiva",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?godiva\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nordvpn": {
                    "platformId": "nordvpn",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nordvpn\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "caribbean": {
                    "platformId": "caribbean",
                    "keywords": [
                        "caribbean-joe",
                        "caribbean"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?caribbean-joe\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hotwire": {
                    "platformId": "hotwire",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hotwire\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "petsafe": {
                    "platformId": "petsafe",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?petsafe\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "containerstore": {
                    "platformId": "containerstore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?containerstore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kohls": {
                    "platformId": "kohls",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kohls\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fragrancenet": {
                    "platformId": "fragrancenet",
                    "keywords": [
                        "fragrancenet"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fragrancenet\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "swarovski": {
                    "platformId": "swarovski",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?swarovski\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dominos": {
                    "platformId": "dominos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dominos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thrifty": {
                    "platformId": "thrifty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thrifty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "legolanddiscoverycenter": {
                    "platformId": "legolanddiscoverycenter",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?legolanddiscoverycenter\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bathandbodyworks": {
                    "platformId": "bathandbodyworks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bathandbodyworks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "malwarebytes": {
                    "platformId": "malwarebytes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?malwarebytes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stubhub": {
                    "platformId": "stubhub",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stubhub\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "uniqlo": {
                    "platformId": "uniqlo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?uniqlo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mytrip": {
                    "platformId": "mytrip",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mytrip\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hawaiianairlines": {
                    "platformId": "hawaiianairlines",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hawaiianairlines\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ikea": {
                    "platformId": "ikea",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ikea\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "allforpadel": {
                    "platformId": "allforpadel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?allforpadel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "luxxcurves": {
                    "platformId": "luxxcurves",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?luxxcurves\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "emiratesdraw": {
                    "platformId": "emiratesdraw",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?emiratesdraw\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pictarine": {
                    "platformId": "pictarine",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pictarine\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hellofresh": {
                    "platformId": "hellofresh",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hellofresh\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "apple": {
                    "platformId": "apple",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?apple\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "187killerpads": {
                    "platformId": "187killerpads",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?187killerpads\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "marksandspencer": {
                    "platformId": "marksandspencer",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?marksandspencer\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yvesrocher": {
                    "platformId": "yvesrocher",
                    "keywords": [
                        "yvesrocher",
                        "yves-rocher"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yves-rocher\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jellybuddy": {
                    "platformId": "jellybuddy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jellybuddy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jellybelly": {
                    "platformId": "jellybelly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jellybelly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "spencersonline": {
                    "platformId": "spencersonline",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?spencersonline\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "audiobooksnow": {
                    "platformId": "audiobooksnow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?audiobooksnow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lounge": {
                    "platformId": "lounge",
                    "keywords": [
                        "zalando-lounge",
                        "lounge"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zalando-lounge\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "underarmour": {
                    "platformId": "underarmour",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?underarmour\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gap": {
                    "platformId": "gap",
                    "keywords": [
                        "gapcanada",
                        "gap"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(gap|gapcanada)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lifeextensioneurope": {
                    "platformId": "lifeextensioneurope",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lifeextensioneurope\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rcn": {
                    "platformId": "rcn",
                    "keywords": [
                        "rcn",
                        "astound"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(rcn|astound)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "totalbyverizon": {
                    "platformId": "totalbyverizon",
                    "keywords": [
                        "totalwireless",
                        "totalbyverizon"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(totalbyverizon|totalwireless)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "adorama": {
                    "platformId": "adorama",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?adorama\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "abritel": {
                    "platformId": "abritel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?abritel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "metrobrazil": {
                    "platformId": "metrobrazil",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?metrobrazil\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kohl": {
                    "platformId": "kohl",
                    "keywords": [
                        "kohl",
                        "kohl-shop"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kohl-shop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ticketnetwork": {
                    "platformId": "ticketnetwork",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ticketnetwork\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tiqets": {
                    "platformId": "tiqets",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tiqets\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kkday": {
                    "platformId": "kkday",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kkday\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "newbalance": {
                    "platformId": "newbalance",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?newbalance\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jdsports": {
                    "platformId": "jdsports",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jdsports\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hopegoo": {
                    "platformId": "hopegoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hopegoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cheaptickets": {
                    "platformId": "cheaptickets",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cheaptickets\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "italki": {
                    "platformId": "italki",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?italki\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "photobook": {
                    "platformId": "photobook",
                    "keywords": [
                        "photobookuk",
                        "photobookamerica",
                        "photobookcanada",
                        "photobookaustralia"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(photobookuk|photobookamerica|photobookcanada|photobookaustralia)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "groupon": {
                    "platformId": "groupon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?groupon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ninja": {
                    "platformId": "ninja",
                    "keywords": [
                        "ninjabrasilstore"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(ninjabrasilstore)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "loccitane": {
                    "platformId": "loccitane",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?loccitane\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oliveyoung": {
                    "platformId": "oliveyoung",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oliveyoung\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nume": {
                    "platformId": "nume",
                    "keywords": [
                        "numehair",
                        "nume"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?numehair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zalora": {
                    "platformId": "zalora",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zalora\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "klook": {
                    "platformId": "klook",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?klook\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bws": {
                    "platformId": "bws",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bws\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "watsons": {
                    "platformId": "watsons",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?watsons\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pchometravel": {
                    "platformId": "pchometravel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pchometravel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myer": {
                    "platformId": "myer",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myer\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yoox": {
                    "platformId": "yoox",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yoox\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dhgate": {
                    "platformId": "dhgate",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dhgate\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blibli": {
                    "platformId": "blibli",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blibli\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "printerpix": {
                    "platformId": "printerpix",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?printerpix\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "capcut": {
                    "platformId": "capcut",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?capcut\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dominopizza": {
                    "platformId": "dominopizza",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dominopizza\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vevor": {
                    "platformId": "vevor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vevor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "getyourguide": {
                    "platformId": "getyourguide",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?getyourguide\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "honor": {
                    "platformId": "honor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?honor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "redmagic": {
                    "platformId": "redmagic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?redmagic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kiwi": {
                    "platformId": "kiwi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kiwi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shopotam": {
                    "platformId": "shopotam",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopotam\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pelago": {
                    "platformId": "pelago",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pelago\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shikohin": {
                    "platformId": "shikohin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shikohin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "newegg": {
                    "platformId": "newegg",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?newegg\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "answear": {
                    "platformId": "answear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?answear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "canon": {
                    "platformId": "canon",
                    "keywords": [
                        "canon",
                        "canon-me"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?canon-me\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "turbovpn": {
                    "platformId": "turbovpn",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?turbovpn\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "simbye": {
                    "platformId": "simbye",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?simbye\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "banbe": {
                    "platformId": "banbe",
                    "keywords": [
                        "banbe",
                        "banbeeyewear"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?banbeeyewear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "purevpn": {
                    "platformId": "purevpn",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?purevpn\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "freedom": {
                    "platformId": "freedom",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?freedom\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "radissonhotels": {
                    "platformId": "radissonhotels",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?radissonhotels\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "surfshark": {
                    "platformId": "surfshark",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?surfshark\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ship7": {
                    "platformId": "ship7",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ship7\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "modlily": {
                    "platformId": "modlily",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?modlily\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wilson": {
                    "platformId": "wilson",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wilson\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "macyswineshop": {
                    "platformId": "macyswineshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?macyswineshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cottonon": {
                    "platformId": "cottonon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cottonon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "motorola": {
                    "platformId": "motorola",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?motorola\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "waltons": {
                    "platformId": "waltons",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?waltons\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nectarcollector": {
                    "platformId": "nectarcollector",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nectarcollector\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gmarket": {
                    "platformId": "gmarket",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gmarket\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "auction": {
                    "platformId": "auction",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?auction\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thisshop": {
                    "platformId": "thisshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thisshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "miravia": {
                    "platformId": "miravia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?miravia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hubspot": {
                    "platformId": "hubspot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hubspot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "depositphotos": {
                    "platformId": "depositphotos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?depositphotos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fiverr": {
                    "platformId": "fiverr",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fiverr\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "themeforest": {
                    "platformId": "themeforest",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?themeforest\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "joom": {
                    "platformId": "joom",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?joom\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pictureframes": {
                    "platformId": "pictureframes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pictureframes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thordata": {
                    "platformId": "thordata",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thordata\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "docmorris": {
                    "platformId": "docmorris",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?docmorris\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myprotein": {
                    "platformId": "myprotein",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myprotein\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "burton": {
                    "platformId": "burton",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?burton\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "picsart": {
                    "platformId": "picsart",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?picsart\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "netshoes": {
                    "platformId": "netshoes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?netshoes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "princesspolly": {
                    "platformId": "princesspolly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?princesspolly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "campernation": {
                    "platformId": "campernation",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?campernation\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "homedepot": {
                    "platformId": "homedepot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?homedepot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "partnerboost": {
                    "platformId": "partnerboost",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?partnerboost\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lesmills": {
                    "platformId": "lesmills",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lesmills\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ihg": {
                    "platformId": "ihg",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ihg\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "paramount": {
                    "platformId": "paramount",
                    "keywords": [
                        "paramountplus",
                        "paramount"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?paramountplus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iubenda": {
                    "platformId": "iubenda",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iubenda\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "airindiaexpress": {
                    "platformId": "airindiaexpress",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?airindiaexpress\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hema": {
                    "platformId": "hema",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hema\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "honua": {
                    "platformId": "honua",
                    "keywords": [
                        "honuaskincare",
                        "honua"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?honuaskincare\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "goibibo": {
                    "platformId": "goibibo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?goibibo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ae": {
                    "platformId": "ae",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ae\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "galaxystore": {
                    "platformId": "galaxystore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?galaxystore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ultahost": {
                    "platformId": "ultahost",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ultahost\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "apollo": {
                    "platformId": "apollo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?apollo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kipling": {
                    "platformId": "kipling",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kipling\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "clarksstores": {
                    "platformId": "clarksstores",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?clarksstores\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sunskyonline": {
                    "platformId": "sunskyonline",
                    "keywords": [
                        "sunsky-online"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(sunsky-online)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eset": {
                    "platformId": "eset",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eset\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blissclub": {
                    "platformId": "blissclub",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blissclub\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "danielwellington": {
                    "platformId": "danielwellington",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?danielwellington\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "edrawsoft": {
                    "platformId": "edrawsoft",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?edrawsoft\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myindia": {
                    "platformId": "myindia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myindia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cruise": {
                    "platformId": "cruise",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cruise\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dkny": {
                    "platformId": "dkny",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dkny\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "travelking": {
                    "platformId": "travelking",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?travelking\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yamanshop": {
                    "platformId": "yamanshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yamanshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bellamaison": {
                    "platformId": "bellamaison",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bellamaison\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dermstore": {
                    "platformId": "dermstore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dermstore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "juicycouture": {
                    "platformId": "juicycouture",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?juicycouture\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "creditkarma": {
                    "platformId": "creditkarma",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?creditkarma\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mi": {
                    "platformId": "mi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kaspersky": {
                    "platformId": "kaspersky",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kaspersky\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vodafone": {
                    "platformId": "vodafone",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)*vodafone\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "voegol": {
                    "platformId": "voegol",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?voegol\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "szul": {
                    "platformId": "szul",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?szul\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "onehanesplace": {
                    "platformId": "onehanesplace",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?onehanesplace\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hanes": {
                    "platformId": "hanes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hanes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "foreo": {
                    "platformId": "foreo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?foreo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "maidenform": {
                    "platformId": "maidenform",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?maidenform\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "balibras": {
                    "platformId": "balibras",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?balibras\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "caudalie": {
                    "platformId": "caudalie",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?caudalie\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flagsconnections": {
                    "platformId": "flagsconnections",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flagsconnections\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "veed": {
                    "platformId": "veed",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?veed\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lancome": {
                    "platformId": "lancome",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lancome\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "orbitz": {
                    "platformId": "orbitz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?orbitz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "armanibeauty": {
                    "platformId": "armanibeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?armanibeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bluenile": {
                    "platformId": "bluenile",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bluenile\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dickieslife": {
                    "platformId": "dickieslife",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dickieslife\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eibmarkt": {
                    "platformId": "eibmarkt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eibmarkt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "elemis": {
                    "platformId": "elemis",
                    "keywords": [
                        "elemis-jp",
                        "elemis"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(elemis|elemis-jp)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "elizabetharden": {
                    "platformId": "elizabetharden",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?elizabetharden\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eterna": {
                    "platformId": "eterna",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eterna\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ferrari": {
                    "platformId": "ferrari",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ferrari\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "go2cloud": {
                    "platformId": "go2cloud",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?go2cloud\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "guess": {
                    "platformId": "guess",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?guess\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hampdenclothing": {
                    "platformId": "hampdenclothing",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hampdenclothing\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hilton": {
                    "platformId": "hilton",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hilton\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kikocosmetics": {
                    "platformId": "kikocosmetics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kikocosmetics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lacoste": {
                    "platformId": "lacoste",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lacoste\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lotteon": {
                    "platformId": "lotteon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lotteon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "loveinlike": {
                    "platformId": "loveinlike",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?loveinlike\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mdreams": {
                    "platformId": "mdreams",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mdreams\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "monsterpub": {
                    "platformId": "monsterpub",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?monsterpub\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "narscosmetics": {
                    "platformId": "narscosmetics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?narscosmetics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "notino": {
                    "platformId": "notino",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?notino\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nydj": {
                    "platformId": "nydj",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nydj\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "panasonic": {
                    "platformId": "panasonic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w.-]+\\\\.)*panasonic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rebeccaminkoff": {
                    "platformId": "rebeccaminkoff",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rebeccaminkoff\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "roxyaustralia": {
                    "platformId": "roxyaustralia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?roxyaustralia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sasa": {
                    "platformId": "sasa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sasa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "saucony": {
                    "platformId": "saucony",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?saucony\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "selfridges": {
                    "platformId": "selfridges",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?selfridges\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "simplysupplements": {
                    "platformId": "simplysupplements",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?simplysupplements\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skincarerx": {
                    "platformId": "skincarerx",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skincarerx\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stevemadden": {
                    "platformId": "stevemadden",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stevemadden\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thebodyshop": {
                    "platformId": "thebodyshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thebodyshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "timex": {
                    "platformId": "timex",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?timex\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zaful": {
                    "platformId": "zaful",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zaful\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "herbspro": {
                    "platformId": "herbspro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?herbspro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yourtrippal": {
                    "platformId": "yourtrippal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yourtrippal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "culise": {
                    "platformId": "culise",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?culise\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "leroymerlin": {
                    "platformId": "leroymerlin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?leroymerlin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "geekbuying": {
                    "platformId": "geekbuying",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?geekbuying\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "macys": {
                    "platformId": "macys",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?macys\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yahoo": {
                    "platformId": "yahoo",
                    "keywords": [
                        "buy.yahoo"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?buy\\\\.yahoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oneplus": {
                    "platformId": "oneplus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oneplus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ursime": {
                    "platformId": "ursime",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ursime\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "prungo": {
                    "platformId": "prungo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?prungo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "airalo": {
                    "platformId": "airalo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?airalo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "xcaret": {
                    "platformId": "xcaret",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?xcaret\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rodial": {
                    "platformId": "rodial",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rodial\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "boohoo": {
                    "platformId": "boohoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?boohoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "americanbarbell": {
                    "platformId": "americanbarbell",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?americanbarbell\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hostinger": {
                    "platformId": "hostinger",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hostinger\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "italist": {
                    "platformId": "italist",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?italist\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "uchmet": {
                    "platformId": "uchmet",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?uchmet\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nilkamalfurniture": {
                    "platformId": "nilkamalfurniture",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nilkamalfurniture\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pdffiller": {
                    "platformId": "pdffiller",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pdffiller\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "points": {
                    "platformId": "points",
                    "urlMatch": "^https:\\\\/\\\\/(storefront\\\\.)?points\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "goldenline": {
                    "platformId": "goldenline",
                    "keywords": [
                        "golden-line"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/(storefront\\\\.)?golden-line\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "invideo": {
                    "platformId": "invideo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?invideo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "traveloka": {
                    "platformId": "traveloka",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?traveloka\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "asos": {
                    "platformId": "asos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?asos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nordpass": {
                    "platformId": "nordpass",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nordpass\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "airindia": {
                    "platformId": "airindia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?airindia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "elightup": {
                    "platformId": "elightup",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?elightup\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gitmind": {
                    "platformId": "gitmind",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gitmind\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "justflowers": {
                    "platformId": "justflowers",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?justflowers\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "corel": {
                    "platformId": "corel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?corel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zchocolat": {
                    "platformId": "zchocolat",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zchocolat\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flowerdelivery": {
                    "platformId": "flowerdelivery",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flowerdelivery\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "roxio": {
                    "platformId": "roxio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?roxio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tenergy": {
                    "platformId": "tenergy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tenergy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trampolinepartsandsupply": {
                    "platformId": "trampolinepartsandsupply",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trampolinepartsandsupply\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "parallels": {
                    "platformId": "parallels",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?parallels\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "peoplefinders": {
                    "platformId": "peoplefinders",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?peoplefinders\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trustedtours": {
                    "platformId": "trustedtours",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trustedtours\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "diecastmodelswholesale": {
                    "platformId": "diecastmodelswholesale",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?diecastmodelswholesale\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "winebasket": {
                    "platformId": "winebasket",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?winebasket\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "personalabs": {
                    "platformId": "personalabs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?personalabs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fewodirekt": {
                    "platformId": "fewodirekt",
                    "keywords": [
                        "fewo-direkt"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(fewo-direkt)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wristbandexpress": {
                    "platformId": "wristbandexpress",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wristbandexpress\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trinityroad": {
                    "platformId": "trinityroad",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trinityroad\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "247pressrelease": {
                    "platformId": "247pressrelease",
                    "keywords": [
                        "24-7pressrelease"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(24-7pressrelease)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amiclubwear": {
                    "platformId": "amiclubwear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amiclubwear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "getresponse": {
                    "platformId": "getresponse",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?getresponse\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wondershare": {
                    "platformId": "wondershare",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wondershare\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "silvergoldbull": {
                    "platformId": "silvergoldbull",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?silvergoldbull\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "intego": {
                    "platformId": "intego",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?intego\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jalbum": {
                    "platformId": "jalbum",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jalbum\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "silverrushstyle": {
                    "platformId": "silverrushstyle",
                    "urlMatch": "^https?:\\\\/\\\\/([\\\\w-]+\\\\.)?silverrushstyle\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "greatergood": {
                    "platformId": "greatergood",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?greatergood\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "beckett": {
                    "platformId": "beckett",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?beckett\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stdcheck": {
                    "platformId": "stdcheck",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stdcheck\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "canadapetcare": {
                    "platformId": "canadapetcare",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?canadapetcare\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bestvetcare": {
                    "platformId": "bestvetcare",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bestvetcare\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pandahall": {
                    "platformId": "pandahall",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pandahall\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "clickandgrow": {
                    "platformId": "clickandgrow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?clickandgrow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lawdepot": {
                    "platformId": "lawdepot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lawdepot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hoteles": {
                    "platformId": "hoteles",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hoteles\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "emcklein": {
                    "platformId": "emcklein",
                    "keywords": [
                        "e-mcklein"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(e-mcklein)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stayz": {
                    "platformId": "stayz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stayz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "turbopass": {
                    "platformId": "turbopass",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?turbopass\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ashampoo": {
                    "platformId": "ashampoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ashampoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "healthlabs": {
                    "platformId": "healthlabs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?healthlabs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "proton": {
                    "platformId": "proton",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?proton\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "restoro": {
                    "platformId": "restoro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?restoro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "magzter": {
                    "platformId": "magzter",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?magzter\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sleepandbeyond": {
                    "platformId": "sleepandbeyond",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sleepandbeyond\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theluxurycloset": {
                    "platformId": "theluxurycloset",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theluxurycloset\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "expondo": {
                    "platformId": "expondo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?expondo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rexing": {
                    "platformId": "rexing",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rexing\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mobilepixels": {
                    "platformId": "mobilepixels",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mobilepixels\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "landsend": {
                    "platformId": "landsend",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?landsend\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nicksboots": {
                    "platformId": "nicksboots",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nicksboots\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mrkeyshop": {
                    "platformId": "mrkeyshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mrkeyshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hide": {
                    "platformId": "hide",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hide\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "karaca": {
                    "platformId": "karaca",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?karaca\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "privatevpn": {
                    "platformId": "privatevpn",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?privatevpn\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "empowerdxlab": {
                    "platformId": "empowerdxlab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?empowerdxlab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ravincrossbows": {
                    "platformId": "ravincrossbows",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ravincrossbows\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gamivo": {
                    "platformId": "gamivo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gamivo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "paternitylab": {
                    "platformId": "paternitylab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?paternitylab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bluettipower": {
                    "platformId": "bluettipower",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bluettipower\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vividstormscreen": {
                    "platformId": "vividstormscreen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vividstormscreen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "travelup": {
                    "platformId": "travelup",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?travelup\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "abelssoft": {
                    "platformId": "abelssoft",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?abelssoft\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "directdeals": {
                    "platformId": "directdeals",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?directdeals\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aiper": {
                    "platformId": "aiper",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aiper\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "minitool": {
                    "platformId": "minitool",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?minitool\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dermelect": {
                    "platformId": "dermelect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dermelect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "netart": {
                    "platformId": "netart",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?netart\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stylekorean": {
                    "platformId": "stylekorean",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stylekorean\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arangrant": {
                    "platformId": "arangrant",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?arangrant\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mfimedical": {
                    "platformId": "mfimedical",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mfimedical\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trodo": {
                    "platformId": "trodo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trodo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fragranceshop": {
                    "platformId": "fragranceshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fragranceshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "onebioshop": {
                    "platformId": "onebioshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?onebioshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "corroshop": {
                    "platformId": "corroshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?corroshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "garvee": {
                    "platformId": "garvee",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?garvee\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trendingcustom": {
                    "platformId": "trendingcustom",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trendingcustom\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fabfinds": {
                    "platformId": "fabfinds",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fabfinds\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wadiz": {
                    "platformId": "wadiz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wadiz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mowrator": {
                    "platformId": "mowrator",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mowrator\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "honiture": {
                    "platformId": "honiture",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?honiture\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gabiona": {
                    "platformId": "gabiona",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gabiona\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wrapitstorage": {
                    "platformId": "wrapitstorage",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wrapitstorage\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "swanwicksleep": {
                    "platformId": "swanwicksleep",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?swanwicksleep\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ecosmetics": {
                    "platformId": "ecosmetics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ecosmetics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "switchbot": {
                    "platformId": "switchbot",
                    "keywords": [
                        "switch-bot"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(switch-bot)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "chowsangsang": {
                    "platformId": "chowsangsang",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?chowsangsang\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wowangel": {
                    "platformId": "wowangel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wowangel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "elementor": {
                    "platformId": "elementor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?elementor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mavis": {
                    "platformId": "mavis",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mavis\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oojo": {
                    "platformId": "oojo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oojo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ovago": {
                    "platformId": "ovago",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ovago\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "avidlove": {
                    "platformId": "avidlove",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?avidlove\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kingscamo": {
                    "platformId": "kingscamo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kingscamo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "treatmyuti": {
                    "platformId": "treatmyuti",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?treatmyuti\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "freecash": {
                    "platformId": "freecash",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?freecash\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "macorner": {
                    "platformId": "macorner",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?macorner\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "turbify": {
                    "platformId": "turbify",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?turbify\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yuplay": {
                    "platformId": "yuplay",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yuplay\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zepter": {
                    "platformId": "zepter",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zepter\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "neogenesis": {
                    "platformId": "neogenesis",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?neogenesis\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kinship": {
                    "platformId": "kinship",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kinship\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "legendz": {
                    "platformId": "legendz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?legendz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "qathu": {
                    "platformId": "qathu",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?qathu\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "papique": {
                    "platformId": "papique",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?papique\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fanttik": {
                    "platformId": "fanttik",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fanttik\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mycorneacare": {
                    "platformId": "mycorneacare",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mycorneacare\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lefeet": {
                    "platformId": "lefeet",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lefeet\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "infimobile": {
                    "platformId": "infimobile",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?infimobile\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mureandgrand": {
                    "platformId": "mureandgrand",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mureandgrand\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oedro": {
                    "platformId": "oedro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oedro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vyjewelry": {
                    "platformId": "vyjewelry",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vyjewelry\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rentcarla": {
                    "platformId": "rentcarla",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rentcarla\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amoremall": {
                    "platformId": "amoremall",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amoremall\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aomeitech": {
                    "platformId": "aomeitech",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aomeitech\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "adblockultimate": {
                    "platformId": "adblockultimate",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?adblockultimate\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "instantfunding": {
                    "platformId": "instantfunding",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?instantfunding\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "auras": {
                    "platformId": "auras",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?auras\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "groundluxe": {
                    "platformId": "groundluxe",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?groundluxe\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kspmotor": {
                    "platformId": "kspmotor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kspmotor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pandaoffice": {
                    "platformId": "pandaoffice",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pandaoffice\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iseehair": {
                    "platformId": "iseehair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iseehair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hotels": {
                    "platformId": "hotels",
                    "keywords": [
                        "hotels",
                        "hoteis",
                        "hoteles"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(hotels|hoteles|hoteis)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "budgetpetcare": {
                    "platformId": "budgetpetcare",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?budgetpetcare\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bitdefender": {
                    "platformId": "bitdefender",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bitdefender\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "martinic": {
                    "platformId": "martinic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?martinic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dropps": {
                    "platformId": "dropps",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dropps\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "infinitekind": {
                    "platformId": "infinitekind",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?infinitekind\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "imobie": {
                    "platformId": "imobie",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?imobie\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "keeprix": {
                    "platformId": "keeprix",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?keeprix\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nuleafnaturals": {
                    "platformId": "nuleafnaturals",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nuleafnaturals\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fabcbd": {
                    "platformId": "fabcbd",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fabcbd\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "smokecartel": {
                    "platformId": "smokecartel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?smokecartel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "easyship": {
                    "platformId": "easyship",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?easyship\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "worldanvil": {
                    "platformId": "worldanvil",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?worldanvil\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nexo": {
                    "platformId": "nexo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nexo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coreldraw": {
                    "platformId": "coreldraw",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coreldraw\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "winzip": {
                    "platformId": "winzip",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?winzip\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wordperfect": {
                    "platformId": "wordperfect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wordperfect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shopbeam": {
                    "platformId": "shopbeam",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopbeam\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "renogy": {
                    "platformId": "renogy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?renogy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "renderforest": {
                    "platformId": "renderforest",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?renderforest\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "territoryfoods": {
                    "platformId": "territoryfoods",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?territoryfoods\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "unice": {
                    "platformId": "unice",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?unice\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "harfington": {
                    "platformId": "harfington",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?harfington\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "allegrak": {
                    "platformId": "allegrak",
                    "keywords": [
                        "allegra-k"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(allegra-k)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thefitville": {
                    "platformId": "thefitville",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thefitville\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rest": {
                    "platformId": "rest",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rest\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wherelight": {
                    "platformId": "wherelight",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wherelight\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "travala": {
                    "platformId": "travala",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?travala\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mypetsensitivity": {
                    "platformId": "mypetsensitivity",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mypetsensitivity\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "comhoma": {
                    "platformId": "comhoma",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?comhoma\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "scalahosting": {
                    "platformId": "scalahosting",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?scalahosting\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hototools": {
                    "platformId": "hototools",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hototools\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bombusbee": {
                    "platformId": "bombusbee",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bombusbee\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "krogerwireless": {
                    "platformId": "krogerwireless",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?krogerwireless\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jackery": {
                    "platformId": "jackery",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jackery\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myshopify": {
                    "platformId": "myshopify",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myshopify\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "esimusa": {
                    "platformId": "esimusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?esimusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "esimthailand": {
                    "platformId": "esimthailand",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?esimthailand\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "esimjapan": {
                    "platformId": "esimjapan",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?esimjapan\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "esimkorea": {
                    "platformId": "esimkorea",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?esimkorea\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zendrop": {
                    "platformId": "zendrop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zendrop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fontlab": {
                    "platformId": "fontlab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fontlab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "acebeam": {
                    "platformId": "acebeam",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?acebeam\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dreametech": {
                    "platformId": "dreametech",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dreametech\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "healerlabs": {
                    "platformId": "healerlabs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?healerlabs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oyrosy": {
                    "platformId": "oyrosy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oyrosy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mooyius": {
                    "platformId": "mooyius",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mooyius\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "grandpatio": {
                    "platformId": "grandpatio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?grandpatio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thicktails": {
                    "platformId": "thicktails",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thicktails\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "onemilebike": {
                    "platformId": "onemilebike",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?onemilebike\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coohom": {
                    "platformId": "coohom",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coohom\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "htvront": {
                    "platformId": "htvront",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?htvront\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "goelia1995": {
                    "platformId": "goelia1995",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?goelia1995\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kingpalm": {
                    "platformId": "kingpalm",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kingpalm\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "esimatic": {
                    "platformId": "esimatic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?esimatic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jetpacglobal": {
                    "platformId": "jetpacglobal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jetpacglobal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "deervalleybath": {
                    "platformId": "deervalleybath",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?deervalleybath\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hoverair": {
                    "platformId": "hoverair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hoverair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bgmgirl": {
                    "platformId": "bgmgirl",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bgmgirl\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wigfever": {
                    "platformId": "wigfever",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wigfever\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ohmyprettywig": {
                    "platformId": "ohmyprettywig",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ohmyprettywig\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "youfibre": {
                    "platformId": "youfibre",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?youfibre\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "silksilky": {
                    "platformId": "silksilky",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?silksilky\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "radtkesports": {
                    "platformId": "radtkesports",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?radtkesports\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hohem": {
                    "platformId": "hohem",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hohem\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "caddydaddygolf": {
                    "platformId": "caddydaddygolf",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?caddydaddygolf\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "easeus": {
                    "platformId": "easeus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?easeus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zitsticka": {
                    "platformId": "zitsticka",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zitsticka\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "biocarenutrition": {
                    "platformId": "biocarenutrition",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?biocarenutrition\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ecoworthy": {
                    "platformId": "ecoworthy",
                    "keywords": [
                        "eco-worthy"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(eco-worthy)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gevi": {
                    "platformId": "gevi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gevi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "notta": {
                    "platformId": "notta",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?notta\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cvlife": {
                    "platformId": "cvlife",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cvlife\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rayneo": {
                    "platformId": "rayneo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rayneo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "preply": {
                    "platformId": "preply",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?preply\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fossibot": {
                    "platformId": "fossibot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fossibot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "etravelsim": {
                    "platformId": "etravelsim",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?etravelsim\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ultenic": {
                    "platformId": "ultenic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ultenic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lepro": {
                    "platformId": "lepro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lepro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "teamwhiskey": {
                    "platformId": "teamwhiskey",
                    "keywords": [
                        "team-whiskey"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(team-whiskey)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "musso": {
                    "platformId": "musso",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?musso\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rocketsofawesome": {
                    "platformId": "rocketsofawesome",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rocketsofawesome\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "voyeglobal": {
                    "platformId": "voyeglobal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?voyeglobal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "incerunmen": {
                    "platformId": "incerunmen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?incerunmen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "leparmentier": {
                    "platformId": "leparmentier",
                    "keywords": [
                        "le-parmentier"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(le-parmentier)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "buymoreway": {
                    "platformId": "buymoreway",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?buymoreway\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sihoooffice": {
                    "platformId": "sihoooffice",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sihoooffice\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lycamobile": {
                    "platformId": "lycamobile",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lycamobile\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "boatpassclub": {
                    "platformId": "boatpassclub",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?boatpassclub\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "helloprenup": {
                    "platformId": "helloprenup",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?helloprenup\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gameseal": {
                    "platformId": "gameseal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gameseal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wolftacticalusa": {
                    "platformId": "wolftacticalusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wolftacticalusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coofandy": {
                    "platformId": "coofandy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coofandy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nutraharmony": {
                    "platformId": "nutraharmony",
                    "keywords": [
                        "nutra-harmony"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(nutra-harmony)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pacdora": {
                    "platformId": "pacdora",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pacdora\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coupert": {
                    "platformId": "coupert",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coupert\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ledlightsworld": {
                    "platformId": "ledlightsworld",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ledlightsworld\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aosulife": {
                    "platformId": "aosulife",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aosulife\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "primallifeorganics": {
                    "platformId": "primallifeorganics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?primallifeorganics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kospet": {
                    "platformId": "kospet",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kospet\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "acasis": {
                    "platformId": "acasis",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?acasis\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eureka": {
                    "platformId": "eureka",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eureka\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "alpinestars": {
                    "platformId": "alpinestars",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?alpinestars\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "catlinkus": {
                    "platformId": "catlinkus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?catlinkus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bookloop": {
                    "platformId": "bookloop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bookloop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mydataninja": {
                    "platformId": "mydataninja",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mydataninja\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "encha": {
                    "platformId": "encha",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?encha\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "beneunder": {
                    "platformId": "beneunder",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?beneunder\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pointsyeah": {
                    "platformId": "pointsyeah",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pointsyeah\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sublue": {
                    "platformId": "sublue",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sublue\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "healthymeliving": {
                    "platformId": "healthymeliving",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?healthymeliving\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "knowledgehut": {
                    "platformId": "knowledgehut",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?knowledgehut\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lumitylife": {
                    "platformId": "lumitylife",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lumitylife\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nuarai": {
                    "platformId": "nuarai",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nuarai\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stasu": {
                    "platformId": "stasu",
                    "keywords": [
                        "st-asu"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(st-asu)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "belffin": {
                    "platformId": "belffin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?belffin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "readkidz": {
                    "platformId": "readkidz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?readkidz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "laylasleep": {
                    "platformId": "laylasleep",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?laylasleep\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coinmama": {
                    "platformId": "coinmama",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coinmama\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zinus": {
                    "platformId": "zinus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zinus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zerobounce": {
                    "platformId": "zerobounce",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zerobounce\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ulanzi": {
                    "platformId": "ulanzi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ulanzi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "homefi": {
                    "platformId": "homefi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?homefi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flykitt": {
                    "platformId": "flykitt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flykitt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "damiensaber": {
                    "platformId": "damiensaber",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?damiensaber\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eamtijewelry": {
                    "platformId": "eamtijewelry",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eamtijewelry\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lumisonata": {
                    "platformId": "lumisonata",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lumisonata\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "outfitrer": {
                    "platformId": "outfitrer",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?outfitrer\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "youngelectricbikes": {
                    "platformId": "youngelectricbikes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?youngelectricbikes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gearupbooster": {
                    "platformId": "gearupbooster",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gearupbooster\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "orbitmobile": {
                    "platformId": "orbitmobile",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?orbitmobile\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "g4free": {
                    "platformId": "g4free",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?g4free\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "satellai": {
                    "platformId": "satellai",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?satellai\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "esrtech": {
                    "platformId": "esrtech",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?esrtech\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "comfier": {
                    "platformId": "comfier",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?comfier\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "snailax": {
                    "platformId": "snailax",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?snailax\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "virginconnect": {
                    "platformId": "virginconnect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?virginconnect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cremationclub": {
                    "platformId": "cremationclub",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cremationclub\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "spinnakerwatches": {
                    "platformId": "spinnakerwatches",
                    "keywords": [
                        "spinnaker-watches"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(spinnaker-watches)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cadola1946": {
                    "platformId": "cadola1946",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cadola1946\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tunefab": {
                    "platformId": "tunefab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tunefab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gkutech": {
                    "platformId": "gkutech",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gkutech\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "xtucam": {
                    "platformId": "xtucam",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?xtucam\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thyseed": {
                    "platformId": "thyseed",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thyseed\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cearvol": {
                    "platformId": "cearvol",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cearvol\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "delilahhome": {
                    "platformId": "delilahhome",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?delilahhome\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shopmotette": {
                    "platformId": "shopmotette",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopmotette\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amofashionltd": {
                    "platformId": "amofashionltd",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amofashionltd\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "incauthority": {
                    "platformId": "incauthority",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?incauthority\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "anthbot": {
                    "platformId": "anthbot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?anthbot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shoptinkr": {
                    "platformId": "shoptinkr",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shoptinkr\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "suunto": {
                    "platformId": "suunto",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?suunto\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eurooptic": {
                    "platformId": "eurooptic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eurooptic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "scopelist": {
                    "platformId": "scopelist",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?scopelist\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amazgifts": {
                    "platformId": "amazgifts",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amazgifts\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "reccloud": {
                    "platformId": "reccloud",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?reccloud\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lightpdf": {
                    "platformId": "lightpdf",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lightpdf\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "womolighting": {
                    "platformId": "womolighting",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?womolighting\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "niphean": {
                    "platformId": "niphean",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?niphean\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yilitehair": {
                    "platformId": "yilitehair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yilitehair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "avidloveplay": {
                    "platformId": "avidloveplay",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?avidloveplay\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "promeai": {
                    "platformId": "promeai",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?promeai\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ideal": {
                    "platformId": "ideal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ideal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "larosastyle": {
                    "platformId": "larosastyle",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?larosastyle\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "easecoo": {
                    "platformId": "easecoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?easecoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nanoleaf": {
                    "platformId": "nanoleaf",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nanoleaf\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tangem": {
                    "platformId": "tangem",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tangem\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "surfunionco": {
                    "platformId": "surfunionco",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?surfunionco\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cthegood": {
                    "platformId": "cthegood",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cthegood\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "drywater": {
                    "platformId": "drywater",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?drywater\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sharge": {
                    "platformId": "sharge",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sharge\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "internationalsim": {
                    "platformId": "internationalsim",
                    "keywords": [
                        "international-sim"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(international-sim)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mova": {
                    "platformId": "mova",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mova\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thorkitchen": {
                    "platformId": "thorkitchen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thorkitchen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "treblab": {
                    "platformId": "treblab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?treblab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coursehorse": {
                    "platformId": "coursehorse",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coursehorse\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tokyocanvas": {
                    "platformId": "tokyocanvas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tokyocanvas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dbcosmetics": {
                    "platformId": "dbcosmetics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dbcosmetics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "inikaorganic": {
                    "platformId": "inikaorganic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?inikaorganic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bytesim": {
                    "platformId": "bytesim",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bytesim\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wybotpool": {
                    "platformId": "wybotpool",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wybotpool\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "popai": {
                    "platformId": "popai",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?popai\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nekteck": {
                    "platformId": "nekteck",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nekteck\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "apexup": {
                    "platformId": "apexup",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?apexup\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ultrahuman": {
                    "platformId": "ultrahuman",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ultrahuman\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ads4seo": {
                    "platformId": "ads4seo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ads4seo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "igarden": {
                    "platformId": "igarden",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?igarden\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hynote": {
                    "platformId": "hynote",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hynote\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "euhomy": {
                    "platformId": "euhomy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?euhomy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "deerruntreadmill": {
                    "platformId": "deerruntreadmill",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?deerruntreadmill\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pubrio": {
                    "platformId": "pubrio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pubrio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "roswheel": {
                    "platformId": "roswheel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?roswheel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "voyageluggage": {
                    "platformId": "voyageluggage",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?voyageluggage\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bebird": {
                    "platformId": "bebird",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bebird\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hears": {
                    "platformId": "hears",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hears\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coworkshop": {
                    "platformId": "coworkshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coworkshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "artemisads": {
                    "platformId": "artemisads",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?artemisads\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blokees": {
                    "platformId": "blokees",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blokees\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "armosshoes": {
                    "platformId": "armosshoes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?armosshoes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "djiusa": {
                    "platformId": "djiusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?djiusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skywork": {
                    "platformId": "skywork",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skywork\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wegic": {
                    "platformId": "wegic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wegic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iaohi": {
                    "platformId": "iaohi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iaohi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nuagewears": {
                    "platformId": "nuagewears",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nuagewears\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bcengi": {
                    "platformId": "bcengi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bcengi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ovioshome": {
                    "platformId": "ovioshome",
                    "keywords": [
                        "ovios-home"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(ovios-home)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "meilleurmoment": {
                    "platformId": "meilleurmoment",
                    "keywords": [
                        "meilleur-moment"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(meilleur-moment)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "meowant": {
                    "platformId": "meowant",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?meowant\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tacvasen": {
                    "platformId": "tacvasen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tacvasen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "magcomsen": {
                    "platformId": "magcomsen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?magcomsen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "museumreplicas": {
                    "platformId": "museumreplicas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?museumreplicas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tesmart": {
                    "platformId": "tesmart",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tesmart\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "oneisall": {
                    "platformId": "oneisall",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?oneisall\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tryholo": {
                    "platformId": "tryholo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tryholo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "erayakpower": {
                    "platformId": "erayakpower",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?erayakpower\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bernies": {
                    "platformId": "bernies",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bernies\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nbatopshot": {
                    "platformId": "nbatopshot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nbatopshot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ourcoolfly": {
                    "platformId": "ourcoolfly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ourcoolfly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "merachfit": {
                    "platformId": "merachfit",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?merachfit\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "apolosign": {
                    "platformId": "apolosign",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?apolosign\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aeroband": {
                    "platformId": "aeroband",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aeroband\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hermanrx": {
                    "platformId": "hermanrx",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hermanrx\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bleequp": {
                    "platformId": "bleequp",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bleequp\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hungryminds": {
                    "platformId": "hungryminds",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hungryminds\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ofcasafurniture": {
                    "platformId": "ofcasafurniture",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ofcasafurniture\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jadubeauty": {
                    "platformId": "jadubeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jadubeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "botslab": {
                    "platformId": "botslab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?botslab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "catlinkeu": {
                    "platformId": "catlinkeu",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?catlinkeu\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arzopa": {
                    "platformId": "arzopa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?arzopa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "imagine": {
                    "platformId": "imagine",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?imagine\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "litanikahome": {
                    "platformId": "litanikahome",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?litanikahome\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "naturnest": {
                    "platformId": "naturnest",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?naturnest\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "echowater": {
                    "platformId": "echowater",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?echowater\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ctrader": {
                    "platformId": "ctrader",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ctrader\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mulerun": {
                    "platformId": "mulerun",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mulerun\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nearstream": {
                    "platformId": "nearstream",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nearstream\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fridgefriend": {
                    "platformId": "fridgefriend",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fridgefriend\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trucktok": {
                    "platformId": "trucktok",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trucktok\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "colchonesaznar": {
                    "platformId": "colchonesaznar",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?colchonesaznar\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "accio": {
                    "platformId": "accio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?accio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "poposoapsolar": {
                    "platformId": "poposoapsolar",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?poposoapsolar\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "xmind": {
                    "platformId": "xmind",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?xmind\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sportssimai": {
                    "platformId": "sportssimai",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sportssimai\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cowsarofficial": {
                    "platformId": "cowsarofficial",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cowsarofficial\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kismile": {
                    "platformId": "kismile",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kismile\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aimer": {
                    "platformId": "aimer",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aimer\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "codelabsacademy": {
                    "platformId": "codelabsacademy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?codelabsacademy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aquamail": {
                    "platformId": "aquamail",
                    "keywords": [
                        "aqua-mail"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(aqua-mail)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "monocreators": {
                    "platformId": "monocreators",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?monocreators\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "semainehealth": {
                    "platformId": "semainehealth",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?semainehealth\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arcade": {
                    "platformId": "arcade",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?arcade\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "talkipal": {
                    "platformId": "talkipal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?talkipal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "magiclight": {
                    "platformId": "magiclight",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?magiclight\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flikeze": {
                    "platformId": "flikeze",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flikeze\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thegamecollection": {
                    "platformId": "thegamecollection",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thegamecollection\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vidmage": {
                    "platformId": "vidmage",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vidmage\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "syruvia": {
                    "platformId": "syruvia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?syruvia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "imolovejewelry": {
                    "platformId": "imolovejewelry",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?imolovejewelry\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "genspark": {
                    "platformId": "genspark",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?genspark\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "meshnology": {
                    "platformId": "meshnology",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?meshnology\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "parentica": {
                    "platformId": "parentica",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?parentica\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "novada": {
                    "platformId": "novada",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?novada\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "groundbarefoot": {
                    "platformId": "groundbarefoot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?groundbarefoot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "buyglobal": {
                    "platformId": "buyglobal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?buyglobal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "promeed": {
                    "platformId": "promeed",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?promeed\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "moresoo": {
                    "platformId": "moresoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?moresoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "youngsee": {
                    "platformId": "youngsee",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?youngsee\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "laavooextensions": {
                    "platformId": "laavooextensions",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?laavooextensions\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ugeat": {
                    "platformId": "ugeat",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ugeat\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "buddhastoneshop": {
                    "platformId": "buddhastoneshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?buddhastoneshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "grwoots": {
                    "platformId": "grwoots",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?grwoots\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "genicook": {
                    "platformId": "genicook",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?genicook\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sizeglasses": {
                    "platformId": "sizeglasses",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sizeglasses\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "linen": {
                    "platformId": "linen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?linen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vsgotech": {
                    "platformId": "vsgotech",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vsgotech\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vollyc": {
                    "platformId": "vollyc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vollyc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "haisstronica": {
                    "platformId": "haisstronica",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?haisstronica\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flexispot": {
                    "platformId": "flexispot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flexispot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "closemate": {
                    "platformId": "closemate",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?closemate\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tolaccea": {
                    "platformId": "tolaccea",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tolaccea\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "symliphy": {
                    "platformId": "symliphy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?symliphy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "birdfy": {
                    "platformId": "birdfy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?birdfy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "airzlink": {
                    "platformId": "airzlink",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?airzlink\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "capelincrew": {
                    "platformId": "capelincrew",
                    "keywords": [
                        "capelin-crew"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(capelin-crew)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ottocast": {
                    "platformId": "ottocast",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ottocast\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zapaka": {
                    "platformId": "zapaka",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zapaka\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wedtrend": {
                    "platformId": "wedtrend",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wedtrend\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "marsproxies": {
                    "platformId": "marsproxies",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?marsproxies\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kozyard": {
                    "platformId": "kozyard",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kozyard\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myebikes": {
                    "platformId": "myebikes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myebikes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "breakthroughbasketball": {
                    "platformId": "breakthroughbasketball",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?breakthroughbasketball\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ubiyam": {
                    "platformId": "ubiyam",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ubiyam\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kungfuscrubs": {
                    "platformId": "kungfuscrubs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kungfuscrubs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tcl": {
                    "platformId": "tcl",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tcl\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "samedaycorporation": {
                    "platformId": "samedaycorporation",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?samedaycorporation\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "drinkneubrain": {
                    "platformId": "drinkneubrain",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?drinkneubrain\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dirtycowboyusa": {
                    "platformId": "dirtycowboyusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dirtycowboyusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trycrush": {
                    "platformId": "trycrush",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trycrush\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mendorahealth": {
                    "platformId": "mendorahealth",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mendorahealth\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "broderft": {
                    "platformId": "broderft",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?broderft\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "glahoden": {
                    "platformId": "glahoden",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?glahoden\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kailasgear": {
                    "platformId": "kailasgear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kailasgear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pixverse": {
                    "platformId": "pixverse",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pixverse\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "happybeing": {
                    "platformId": "happybeing",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?happybeing\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "glocalme": {
                    "platformId": "glocalme",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?glocalme\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arspura": {
                    "platformId": "arspura",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?arspura\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rewarx": {
                    "platformId": "rewarx",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rewarx\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kushfly": {
                    "platformId": "kushfly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kushfly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kawain": {
                    "platformId": "kawain",
                    "keywords": [
                        "kawa-in"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(kawa-in)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "suosooptics": {
                    "platformId": "suosooptics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?suosooptics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "artzmiami": {
                    "platformId": "artzmiami",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?artzmiami\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "outin": {
                    "platformId": "outin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?outin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hiby": {
                    "platformId": "hiby",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hiby\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "powercure": {
                    "platformId": "powercure",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?powercure\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rockbrosbike": {
                    "platformId": "rockbrosbike",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rockbrosbike\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aeke": {
                    "platformId": "aeke",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aeke\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "appypie": {
                    "platformId": "appypie",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?appypie\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "topcups": {
                    "platformId": "topcups",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?topcups\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "europacosmetica": {
                    "platformId": "europacosmetica",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?europacosmetica\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "heardirectclub": {
                    "platformId": "heardirectclub",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?heardirectclub\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "torras": {
                    "platformId": "torras",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?torras\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mangoal": {
                    "platformId": "mangoal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mangoal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bamboocoolapparel": {
                    "platformId": "bamboocoolapparel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bamboocoolapparel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "starforged": {
                    "platformId": "starforged",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?starforged\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kneereliefs": {
                    "platformId": "kneereliefs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kneereliefs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wjshomestore": {
                    "platformId": "wjshomestore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wjshomestore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amandahairs": {
                    "platformId": "amandahairs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amandahairs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "geetahair": {
                    "platformId": "geetahair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?geetahair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hatstopdrops": {
                    "platformId": "hatstopdrops",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hatstopdrops\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "laviniagallery": {
                    "platformId": "laviniagallery",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?laviniagallery\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "niidor": {
                    "platformId": "niidor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?niidor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ooocreators": {
                    "platformId": "ooocreators",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ooocreators\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kheadspa": {
                    "platformId": "kheadspa",
                    "keywords": [
                        "k-headspa"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(k-headspa)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "8otherreasons": {
                    "platformId": "8otherreasons",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?8otherreasons\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "filterunited": {
                    "platformId": "filterunited",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?filterunited\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "byadie": {
                    "platformId": "byadie",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?byadie\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jeulia": {
                    "platformId": "jeulia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jeulia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "waproduction": {
                    "platformId": "waproduction",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?waproduction\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "heivy": {
                    "platformId": "heivy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?heivy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "veepn": {
                    "platformId": "veepn",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?veepn\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cocomoonhawaii": {
                    "platformId": "cocomoonhawaii",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cocomoonhawaii\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "interrose": {
                    "platformId": "interrose",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?interrose\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "create": {
                    "platformId": "create",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?create\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bunches": {
                    "platformId": "bunches",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bunches\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vintagewinegifts": {
                    "platformId": "vintagewinegifts",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vintagewinegifts\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fitnessoptions": {
                    "platformId": "fitnessoptions",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fitnessoptions\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bakerross": {
                    "platformId": "bakerross",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bakerross\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theatreticketsdirect": {
                    "platformId": "theatreticketsdirect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theatreticketsdirect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shopto": {
                    "platformId": "shopto",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopto\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "magazinesdirect": {
                    "platformId": "magazinesdirect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?magazinesdirect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "affiliatewindow": {
                    "platformId": "affiliatewindow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?affiliatewindow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gousto": {
                    "platformId": "gousto",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gousto\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "laybrook": {
                    "platformId": "laybrook",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?laybrook\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "h10hotels": {
                    "platformId": "h10hotels",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?h10hotels\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pneus": {
                    "platformId": "pneus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pneus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "marleyspoon": {
                    "platformId": "marleyspoon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?marleyspoon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "free2move": {
                    "platformId": "free2move",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?free2move\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dinnerly": {
                    "platformId": "dinnerly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dinnerly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lampara": {
                    "platformId": "lampara",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lampara\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "reifenonline": {
                    "platformId": "reifenonline",
                    "keywords": [
                        "reifen-online"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(reifen-online)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "reifen": {
                    "platformId": "reifen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?reifen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "europcar": {
                    "platformId": "europcar",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?europcar\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tfnclondon": {
                    "platformId": "tfnclondon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tfnclondon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "acer": {
                    "platformId": "acer",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?acer\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "easyname": {
                    "platformId": "easyname",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?easyname\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pneumatici": {
                    "platformId": "pneumatici",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pneumatici\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "parcelabc": {
                    "platformId": "parcelabc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?parcelabc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "memorypur": {
                    "platformId": "memorypur",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?memorypur\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tirendo": {
                    "platformId": "tirendo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tirendo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "simpleshow": {
                    "platformId": "simpleshow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?simpleshow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "travisperkins": {
                    "platformId": "travisperkins",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?travisperkins\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hotel": {
                    "platformId": "hotel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hotel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kohlshop": {
                    "platformId": "kohlshop",
                    "keywords": [
                        "kohl-shop"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(kohl-shop)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gsparkplug": {
                    "platformId": "gsparkplug",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gsparkplug\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "profichemie": {
                    "platformId": "profichemie",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?profichemie\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "modellbauuniverse": {
                    "platformId": "modellbauuniverse",
                    "keywords": [
                        "modellbau-universe"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(modellbau-universe)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "linguatv": {
                    "platformId": "linguatv",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?linguatv\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "grupoa": {
                    "platformId": "grupoa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?grupoa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cbdarmour": {
                    "platformId": "cbdarmour",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cbdarmour\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sinmaletas": {
                    "platformId": "sinmaletas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sinmaletas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "photobookamerica": {
                    "platformId": "photobookamerica",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?photobookamerica\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "photobookcanada": {
                    "platformId": "photobookcanada",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?photobookcanada\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "photobookuk": {
                    "platformId": "photobookuk",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?photobookuk\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "design2please": {
                    "platformId": "design2please",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?design2please\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nnhotels": {
                    "platformId": "nnhotels",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nnhotels\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "emmasleep": {
                    "platformId": "emmasleep",
                    "keywords": [
                        "emma-sleep"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(emma-sleep)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "muscleresearch": {
                    "platformId": "muscleresearch",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?muscleresearch\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "softwarehunter": {
                    "platformId": "softwarehunter",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?softwarehunter\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "foreverfeeling": {
                    "platformId": "foreverfeeling",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?foreverfeeling\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "twojemeble": {
                    "platformId": "twojemeble",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?twojemeble\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "towerhealth": {
                    "platformId": "towerhealth",
                    "keywords": [
                        "tower-health"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(tower-health)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "irobot": {
                    "platformId": "irobot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?irobot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "finson": {
                    "platformId": "finson",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?finson\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "camdenrimini": {
                    "platformId": "camdenrimini",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?camdenrimini\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "weightworld": {
                    "platformId": "weightworld",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?weightworld\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "evking": {
                    "platformId": "evking",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?evking\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "movavi": {
                    "platformId": "movavi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?movavi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nomochoc": {
                    "platformId": "nomochoc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nomochoc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rawbeautylab": {
                    "platformId": "rawbeautylab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rawbeautylab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stormforcegaming": {
                    "platformId": "stormforcegaming",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stormforcegaming\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "namerobot": {
                    "platformId": "namerobot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?namerobot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "manutan": {
                    "platformId": "manutan",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?manutan\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "buyshedsdirect": {
                    "platformId": "buyshedsdirect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?buyshedsdirect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mediafix": {
                    "platformId": "mediafix",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mediafix\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blazevideos": {
                    "platformId": "blazevideos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blazevideos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tjama": {
                    "platformId": "tjama",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tjama\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "naturesskinandbody": {
                    "platformId": "naturesskinandbody",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?naturesskinandbody\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "webhosting": {
                    "platformId": "webhosting",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?webhosting\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "salsforeverflowers": {
                    "platformId": "salsforeverflowers",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?salsforeverflowers\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thecartridgecentre": {
                    "platformId": "thecartridgecentre",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thecartridgecentre\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "deanmorriscards": {
                    "platformId": "deanmorriscards",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?deanmorriscards\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ttfone": {
                    "platformId": "ttfone",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ttfone\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "diamondsmileteeth": {
                    "platformId": "diamondsmileteeth",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?diamondsmileteeth\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "33fuel": {
                    "platformId": "33fuel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?33fuel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theskindeep": {
                    "platformId": "theskindeep",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theskindeep\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "extranomical": {
                    "platformId": "extranomical",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?extranomical\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theseepcompany": {
                    "platformId": "theseepcompany",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theseepcompany\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "barekind": {
                    "platformId": "barekind",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?barekind\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flixbus": {
                    "platformId": "flixbus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flixbus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "newskillsacademy": {
                    "platformId": "newskillsacademy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?newskillsacademy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lirpharmacy": {
                    "platformId": "lirpharmacy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lirpharmacy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "holidu": {
                    "platformId": "holidu",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?holidu\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "purrandmutt": {
                    "platformId": "purrandmutt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?purrandmutt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "osmotics": {
                    "platformId": "osmotics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?osmotics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "samboat": {
                    "platformId": "samboat",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?samboat\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "farettishoes": {
                    "platformId": "farettishoes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?farettishoes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "italiandelights": {
                    "platformId": "italiandelights",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?italiandelights\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "viamonteshop": {
                    "platformId": "viamonteshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?viamonteshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "updf": {
                    "platformId": "updf",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?updf\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "petcube": {
                    "platformId": "petcube",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?petcube\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "adorime": {
                    "platformId": "adorime",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?adorime\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cayatch": {
                    "platformId": "cayatch",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cayatch\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "intelligentsia": {
                    "platformId": "intelligentsia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?intelligentsia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "solovedress": {
                    "platformId": "solovedress",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?solovedress\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mycoworks": {
                    "platformId": "mycoworks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mycoworks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vinylflat": {
                    "platformId": "vinylflat",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vinylflat\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "diversual": {
                    "platformId": "diversual",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?diversual\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "testhq": {
                    "platformId": "testhq",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?testhq\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "damondmotorsports": {
                    "platformId": "damondmotorsports",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?damondmotorsports\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "regalmutt": {
                    "platformId": "regalmutt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?regalmutt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "boogiebounce": {
                    "platformId": "boogiebounce",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?boogiebounce\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lybethras": {
                    "platformId": "lybethras",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lybethras\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "5kind": {
                    "platformId": "5kind",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?5kind\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lunzo": {
                    "platformId": "lunzo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lunzo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "colchaoemma": {
                    "platformId": "colchaoemma",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?colchaoemma\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wonderhoodie": {
                    "platformId": "wonderhoodie",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wonderhoodie\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arccaptain": {
                    "platformId": "arccaptain",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?arccaptain\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "uslegalforms": {
                    "platformId": "uslegalforms",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?uslegalforms\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "petscalmdown": {
                    "platformId": "petscalmdown",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?petscalmdown\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "getsunmed": {
                    "platformId": "getsunmed",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?getsunmed\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cutplasticsheeting": {
                    "platformId": "cutplasticsheeting",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cutplasticsheeting\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mysteryboxshop": {
                    "platformId": "mysteryboxshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mysteryboxshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iscooterglobal": {
                    "platformId": "iscooterglobal",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iscooterglobal\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "craftbuddyshop": {
                    "platformId": "craftbuddyshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?craftbuddyshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coldcaseinc": {
                    "platformId": "coldcaseinc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coldcaseinc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vendoo": {
                    "platformId": "vendoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vendoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "naturasiberica": {
                    "platformId": "naturasiberica",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?naturasiberica\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vegums": {
                    "platformId": "vegums",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vegums\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arellabeauty": {
                    "platformId": "arellabeauty",
                    "keywords": [
                        "arella-beauty"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(arella-beauty)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "naturesway": {
                    "platformId": "naturesway",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?naturesway\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sedley": {
                    "platformId": "sedley",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sedley\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thepowersite": {
                    "platformId": "thepowersite",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thepowersite\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "3dmakerpro": {
                    "platformId": "3dmakerpro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?3dmakerpro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "drestige": {
                    "platformId": "drestige",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?drestige\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kokoso": {
                    "platformId": "kokoso",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kokoso\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "healthdoseusa": {
                    "platformId": "healthdoseusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?healthdoseusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hihonor": {
                    "platformId": "hihonor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hihonor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "alvacookware": {
                    "platformId": "alvacookware",
                    "keywords": [
                        "alva-cookware"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(alva-cookware)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "klaiyihair": {
                    "platformId": "klaiyihair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?klaiyihair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "watchhome": {
                    "platformId": "watchhome",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?watchhome\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "perletti": {
                    "platformId": "perletti",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?perletti\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "finebuy": {
                    "platformId": "finebuy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?finebuy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "readywise": {
                    "platformId": "readywise",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?readywise\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "obsbot": {
                    "platformId": "obsbot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?obsbot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pettreatery": {
                    "platformId": "pettreatery",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pettreatery\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pyerfar": {
                    "platformId": "pyerfar",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pyerfar\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mycustombobblehead": {
                    "platformId": "mycustombobblehead",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mycustombobblehead\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fanmuebles": {
                    "platformId": "fanmuebles",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fanmuebles\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "smokinghookah": {
                    "platformId": "smokinghookah",
                    "keywords": [
                        "smoking-hookah"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(smoking-hookah)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dontbuyherflowers": {
                    "platformId": "dontbuyherflowers",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dontbuyherflowers\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "menseventwear": {
                    "platformId": "menseventwear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?menseventwear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "redgorilla": {
                    "platformId": "redgorilla",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?redgorilla\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "beeinspiredgoods": {
                    "platformId": "beeinspiredgoods",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?beeinspiredgoods\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "logomatten": {
                    "platformId": "logomatten",
                    "keywords": [
                        "logo-matten"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(logo-matten)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gagliardisrl": {
                    "platformId": "gagliardisrl",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gagliardisrl\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mojofun": {
                    "platformId": "mojofun",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mojofun\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zeagoo": {
                    "platformId": "zeagoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zeagoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thebrobasket": {
                    "platformId": "thebrobasket",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thebrobasket\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "supersparrow": {
                    "platformId": "supersparrow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?supersparrow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "deluviausa": {
                    "platformId": "deluviausa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?deluviausa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "apebornfitness": {
                    "platformId": "apebornfitness",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?apebornfitness\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "housebyjsdonline": {
                    "platformId": "housebyjsdonline",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?housebyjsdonline\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tiavllya": {
                    "platformId": "tiavllya",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tiavllya\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sensonaturale": {
                    "platformId": "sensonaturale",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sensonaturale\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "happyrunsports": {
                    "platformId": "happyrunsports",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?happyrunsports\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "firehiking": {
                    "platformId": "firehiking",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?firehiking\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jupiter1plus": {
                    "platformId": "jupiter1plus",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jupiter1plus\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "friseurhaarfarbe123": {
                    "platformId": "friseurhaarfarbe123",
                    "keywords": [
                        "friseur-haarfarbe123"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(friseur-haarfarbe123)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stattics": {
                    "platformId": "stattics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stattics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "flowerfix": {
                    "platformId": "flowerfix",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?flowerfix\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "horow": {
                    "platformId": "horow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?horow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iniushop": {
                    "platformId": "iniushop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iniushop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "karmaandluck": {
                    "platformId": "karmaandluck",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?karmaandluck\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "conniegray": {
                    "platformId": "conniegray",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?conniegray\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "badshirt": {
                    "platformId": "badshirt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?badshirt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "beyondshakers": {
                    "platformId": "beyondshakers",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?beyondshakers\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cozydays": {
                    "platformId": "cozydays",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cozydays\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "caraudiocentre": {
                    "platformId": "caraudiocentre",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?caraudiocentre\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tagband": {
                    "platformId": "tagband",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tagband\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ringkestore": {
                    "platformId": "ringkestore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ringkestore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myminimaker": {
                    "platformId": "myminimaker",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myminimaker\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "liquidcaffeine": {
                    "platformId": "liquidcaffeine",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?liquidcaffeine\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "doulton": {
                    "platformId": "doulton",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?doulton\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "walabot": {
                    "platformId": "walabot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?walabot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skinbeautysolutions": {
                    "platformId": "skinbeautysolutions",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skinbeautysolutions\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theweedzard": {
                    "platformId": "theweedzard",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theweedzard\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "numehair": {
                    "platformId": "numehair",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?numehair\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "drtomcowan": {
                    "platformId": "drtomcowan",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?drtomcowan\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skintique": {
                    "platformId": "skintique",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skintique\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "directrunning": {
                    "platformId": "directrunning",
                    "keywords": [
                        "direct-running"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(direct-running)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iedm": {
                    "platformId": "iedm",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iedm\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lovemasami": {
                    "platformId": "lovemasami",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lovemasami\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "autelenergy": {
                    "platformId": "autelenergy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?autelenergy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "showerblocks": {
                    "platformId": "showerblocks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?showerblocks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rpnbsafe": {
                    "platformId": "rpnbsafe",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?rpnbsafe\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gainsnutrition": {
                    "platformId": "gainsnutrition",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gainsnutrition\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "germens": {
                    "platformId": "germens",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?germens\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "peta2z": {
                    "platformId": "peta2z",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?peta2z\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "legalec": {
                    "platformId": "legalec",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?legalec\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "newmarinestore": {
                    "platformId": "newmarinestore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?newmarinestore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "longer3d": {
                    "platformId": "longer3d",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?longer3d\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "happyandpolly": {
                    "platformId": "happyandpolly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?happyandpolly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "istitutostellare": {
                    "platformId": "istitutostellare",
                    "keywords": [
                        "istituto-stellare"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(istituto-stellare)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "giraffetools": {
                    "platformId": "giraffetools",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?giraffetools\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "huegahouse": {
                    "platformId": "huegahouse",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?huegahouse\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "xgimi": {
                    "platformId": "xgimi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?xgimi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thermalmaster": {
                    "platformId": "thermalmaster",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thermalmaster\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "torrousa": {
                    "platformId": "torrousa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?torrousa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "petlibro": {
                    "platformId": "petlibro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?petlibro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cztl": {
                    "platformId": "cztl",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cztl\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "detoxorganics": {
                    "platformId": "detoxorganics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?detoxorganics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myblackbriar": {
                    "platformId": "myblackbriar",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myblackbriar\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iluvcolors": {
                    "platformId": "iluvcolors",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iluvcolors\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vocic": {
                    "platformId": "vocic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vocic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "erabeautyusa": {
                    "platformId": "erabeautyusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?erabeautyusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wearedame": {
                    "platformId": "wearedame",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wearedame\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "reelunlimited": {
                    "platformId": "reelunlimited",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?reelunlimited\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "linenspa": {
                    "platformId": "linenspa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?linenspa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cordbrick": {
                    "platformId": "cordbrick",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cordbrick\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "crazymuscle": {
                    "platformId": "crazymuscle",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?crazymuscle\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "smugglerscrate": {
                    "platformId": "smugglerscrate",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?smugglerscrate\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "owleys": {
                    "platformId": "owleys",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?owleys\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "natkina": {
                    "platformId": "natkina",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?natkina\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nourishskinrange": {
                    "platformId": "nourishskinrange",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nourishskinrange\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "screamingo": {
                    "platformId": "screamingo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?screamingo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "highgoogle": {
                    "platformId": "highgoogle",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?highgoogle\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "minimalbottle": {
                    "platformId": "minimalbottle",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?minimalbottle\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aeternum": {
                    "platformId": "aeternum",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aeternum\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "elastiko": {
                    "platformId": "elastiko",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?elastiko\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tabbeauplace": {
                    "platformId": "tabbeauplace",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tabbeauplace\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "intolerancelab": {
                    "platformId": "intolerancelab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?intolerancelab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "happydaysfactory": {
                    "platformId": "happydaysfactory",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?happydaysfactory\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "biogaia": {
                    "platformId": "biogaia",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?biogaia\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "starwurst": {
                    "platformId": "starwurst",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?starwurst\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ceragemludwigshafen": {
                    "platformId": "ceragemludwigshafen",
                    "keywords": [
                        "ceragem-ludwigshafen"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(ceragem-ludwigshafen)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mimipanda": {
                    "platformId": "mimipanda",
                    "keywords": [
                        "mimi-panda"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(mimi-panda)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sanitaironline": {
                    "platformId": "sanitaironline",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sanitaironline\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "themagpie": {
                    "platformId": "themagpie",
                    "keywords": [
                        "the-magpie"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(the-magpie)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gicognition": {
                    "platformId": "gicognition",
                    "keywords": [
                        "gi-cognition"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(gi-cognition)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hwtpro": {
                    "platformId": "hwtpro",
                    "keywords": [
                        "hwt-pro"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(hwt-pro)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nimblecares": {
                    "platformId": "nimblecares",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nimblecares\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "schnelltestcheck": {
                    "platformId": "schnelltestcheck",
                    "keywords": [
                        "schnelltest-check"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(schnelltest-check)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "luxvinduer": {
                    "platformId": "luxvinduer",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?luxvinduer\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "matchingdonors": {
                    "platformId": "matchingdonors",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?matchingdonors\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "alpineairtechnologies": {
                    "platformId": "alpineairtechnologies",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?alpineairtechnologies\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hottperfume": {
                    "platformId": "hottperfume",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hottperfume\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theblackbow": {
                    "platformId": "theblackbow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theblackbow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sephrausa": {
                    "platformId": "sephrausa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sephrausa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hearbetter": {
                    "platformId": "hearbetter",
                    "keywords": [
                        "hear-better"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(hear-better)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "prettyattitude": {
                    "platformId": "prettyattitude",
                    "keywords": [
                        "pretty-attitude"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(pretty-attitude)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ledequipped": {
                    "platformId": "ledequipped",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ledequipped\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "greekcreations": {
                    "platformId": "greekcreations",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?greekcreations\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kentfaith": {
                    "platformId": "kentfaith",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kentfaith\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "punkdesign": {
                    "platformId": "punkdesign",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?punkdesign\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "logmeonce": {
                    "platformId": "logmeonce",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?logmeonce\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cosplayshopper": {
                    "platformId": "cosplayshopper",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cosplayshopper\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "stylogic": {
                    "platformId": "stylogic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stylogic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "efootwear": {
                    "platformId": "efootwear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?efootwear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mukzin": {
                    "platformId": "mukzin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mukzin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "silverbene": {
                    "platformId": "silverbene",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?silverbene\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bookemon": {
                    "platformId": "bookemon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bookemon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "weblium": {
                    "platformId": "weblium",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?weblium\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "giftcards": {
                    "platformId": "giftcards",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?giftcards\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "keysworlds": {
                    "platformId": "keysworlds",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?keysworlds\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "koalagp": {
                    "platformId": "koalagp",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?koalagp\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "keysoff": {
                    "platformId": "keysoff",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?keysoff\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "neje": {
                    "platformId": "neje",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?neje\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "southernhouseboutique": {
                    "platformId": "southernhouseboutique",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?southernhouseboutique\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pgytech": {
                    "platformId": "pgytech",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pgytech\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fosmon": {
                    "platformId": "fosmon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fosmon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lofree": {
                    "platformId": "lofree",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lofree\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vtrpro": {
                    "platformId": "vtrpro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vtrpro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "boyerscoffee": {
                    "platformId": "boyerscoffee",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?boyerscoffee\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "otraeyewear": {
                    "platformId": "otraeyewear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?otraeyewear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "spibelt": {
                    "platformId": "spibelt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?spibelt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "coreproducts": {
                    "platformId": "coreproducts",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?coreproducts\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "loveisarose": {
                    "platformId": "loveisarose",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?loveisarose\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bigforkbrands": {
                    "platformId": "bigforkbrands",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bigforkbrands\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "glimmergoddess": {
                    "platformId": "glimmergoddess",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?glimmergoddess\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "projectcasting": {
                    "platformId": "projectcasting",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?projectcasting\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cigbest": {
                    "platformId": "cigbest",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cigbest\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fenrirmoto": {
                    "platformId": "fenrirmoto",
                    "keywords": [
                        "fenrir-moto"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(fenrir-moto)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eazydtf": {
                    "platformId": "eazydtf",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eazydtf\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "degezondewereld": {
                    "platformId": "degezondewereld",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?degezondewereld\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tantaly": {
                    "platformId": "tantaly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tantaly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sportitfirst": {
                    "platformId": "sportitfirst",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sportitfirst\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "faithheartjewelry": {
                    "platformId": "faithheartjewelry",
                    "keywords": [
                        "faithheart-jewelry"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(faithheart-jewelry)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kingroon": {
                    "platformId": "kingroon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kingroon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "scottishfinesoaps": {
                    "platformId": "scottishfinesoaps",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?scottishfinesoaps\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "barbologylondon": {
                    "platformId": "barbologylondon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?barbologylondon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "soocas": {
                    "platformId": "soocas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?soocas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skinwork": {
                    "platformId": "skinwork",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skinwork\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mirlux": {
                    "platformId": "mirlux",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mirlux\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jennovshop": {
                    "platformId": "jennovshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jennovshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "therealrelaxed": {
                    "platformId": "therealrelaxed",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?therealrelaxed\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eurococ": {
                    "platformId": "eurococ",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eurococ\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "partypro": {
                    "platformId": "partypro",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?partypro\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fumeclear": {
                    "platformId": "fumeclear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fumeclear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "silvercloudbeauty": {
                    "platformId": "silvercloudbeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?silvercloudbeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blackbeehoney": {
                    "platformId": "blackbeehoney",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blackbeehoney\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "iroha": {
                    "platformId": "iroha",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?iroha\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "aloraircrawlspace": {
                    "platformId": "aloraircrawlspace",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?aloraircrawlspace\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pvcstreifenvorhang": {
                    "platformId": "pvcstreifenvorhang",
                    "keywords": [
                        "pvcstreifen-vorhang"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(pvcstreifen-vorhang)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "worldsim": {
                    "platformId": "worldsim",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?worldsim\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "magicmakersinc": {
                    "platformId": "magicmakersinc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?magicmakersinc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "japspeed": {
                    "platformId": "japspeed",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?japspeed\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "haloral": {
                    "platformId": "haloral",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?haloral\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "displaywizard": {
                    "platformId": "displaywizard",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?displaywizard\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hotorjustme": {
                    "platformId": "hotorjustme",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hotorjustme\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "koobin": {
                    "platformId": "koobin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?koobin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "jimjamthelabel": {
                    "platformId": "jimjamthelabel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?jimjamthelabel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yumyumcandyshop": {
                    "platformId": "yumyumcandyshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yumyumcandyshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bakemeawish": {
                    "platformId": "bakemeawish",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bakemeawish\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "excavatorpartsdirect": {
                    "platformId": "excavatorpartsdirect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?excavatorpartsdirect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lookeronline": {
                    "platformId": "lookeronline",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lookeronline\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "unipolar": {
                    "platformId": "unipolar",
                    "keywords": [
                        "uni-polar"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(uni-polar)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ecowisevitamins": {
                    "platformId": "ecowisevitamins",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ecowisevitamins\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "nightfoxstore": {
                    "platformId": "nightfoxstore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?nightfoxstore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wahylondon": {
                    "platformId": "wahylondon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wahylondon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skimpies": {
                    "platformId": "skimpies",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?skimpies\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "seazone": {
                    "platformId": "seazone",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?seazone\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "javawhiskers": {
                    "platformId": "javawhiskers",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?javawhiskers\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gloriousbeauty": {
                    "platformId": "gloriousbeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gloriousbeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "itserly": {
                    "platformId": "itserly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?itserly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vetexpert": {
                    "platformId": "vetexpert",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vetexpert\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tormek": {
                    "platformId": "tormek",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tormek\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "johnparrottsports": {
                    "platformId": "johnparrottsports",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?johnparrottsports\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tenthmuselondon": {
                    "platformId": "tenthmuselondon",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tenthmuselondon\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "livehermosa": {
                    "platformId": "livehermosa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?livehermosa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "seymac": {
                    "platformId": "seymac",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?seymac\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lacrosebike": {
                    "platformId": "lacrosebike",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lacrosebike\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sansbeaute": {
                    "platformId": "sansbeaute",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sansbeaute\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "plotsdiscount": {
                    "platformId": "plotsdiscount",
                    "keywords": [
                        "plots-discount"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(plots-discount)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "retrochicitaly": {
                    "platformId": "retrochicitaly",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?retrochicitaly\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "strainstation": {
                    "platformId": "strainstation",
                    "keywords": [
                        "strain-station"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(strain-station)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pajgps": {
                    "platformId": "pajgps",
                    "keywords": [
                        "paj-gps"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(paj-gps)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "andyanand": {
                    "platformId": "andyanand",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?andyanand\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "funandtables": {
                    "platformId": "funandtables",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?funandtables\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "terezandhonor": {
                    "platformId": "terezandhonor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?terezandhonor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sicotas": {
                    "platformId": "sicotas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sicotas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "landguardgarden": {
                    "platformId": "landguardgarden",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?landguardgarden\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "metanet": {
                    "platformId": "metanet",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?metanet\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "byvoks": {
                    "platformId": "byvoks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?byvoks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "masterformazione": {
                    "platformId": "masterformazione",
                    "keywords": [
                        "master-formazione"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(master-formazione)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kuishi": {
                    "platformId": "kuishi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kuishi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "milkbar": {
                    "platformId": "milkbar",
                    "keywords": [
                        "milk-bar"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(milk-bar)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "togetherhealth": {
                    "platformId": "togetherhealth",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?togetherhealth\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "placeofelms": {
                    "platformId": "placeofelms",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?placeofelms\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ritualandflow": {
                    "platformId": "ritualandflow",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ritualandflow\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ambrosiasys": {
                    "platformId": "ambrosiasys",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ambrosiasys\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "brisks": {
                    "platformId": "brisks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?brisks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yosepower": {
                    "platformId": "yosepower",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yosepower\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lampstation": {
                    "platformId": "lampstation",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lampstation\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "riskify": {
                    "platformId": "riskify",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?riskify\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "formuladepot": {
                    "platformId": "formuladepot",
                    "keywords": [
                        "formula-depot"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(formula-depot)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "camillagabrieli": {
                    "platformId": "camillagabrieli",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?camillagabrieli\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yodolla": {
                    "platformId": "yodolla",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yodolla\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "funfactco": {
                    "platformId": "funfactco",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?funfactco\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sylvoxtv": {
                    "platformId": "sylvoxtv",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sylvoxtv\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "exodosfitness": {
                    "platformId": "exodosfitness",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?exodosfitness\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eyeglassdirect": {
                    "platformId": "eyeglassdirect",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eyeglassdirect\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "earkings": {
                    "platformId": "earkings",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?earkings\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "harfi": {
                    "platformId": "harfi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?harfi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mantraroma": {
                    "platformId": "mantraroma",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mantraroma\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "luxemattresses": {
                    "platformId": "luxemattresses",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?luxemattresses\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fleurwear": {
                    "platformId": "fleurwear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fleurwear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shopchord": {
                    "platformId": "shopchord",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shopchord\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "propper": {
                    "platformId": "propper",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?propper\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "merchpnt": {
                    "platformId": "merchpnt",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?merchpnt\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "boucleme": {
                    "platformId": "boucleme",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?boucleme\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "frisomenfagel": {
                    "platformId": "frisomenfagel",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?frisomenfagel\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "centerpointarchery": {
                    "platformId": "centerpointarchery",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?centerpointarchery\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thejewellershop": {
                    "platformId": "thejewellershop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thejewellershop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lunarartefacts": {
                    "platformId": "lunarartefacts",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lunarartefacts\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "trotec": {
                    "platformId": "trotec",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?trotec\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "amberpromos": {
                    "platformId": "amberpromos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?amberpromos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mamakana": {
                    "platformId": "mamakana",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mamakana\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bestwigoutlet": {
                    "platformId": "bestwigoutlet",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bestwigoutlet\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kaytea": {
                    "platformId": "kaytea",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kaytea\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zozulu": {
                    "platformId": "zozulu",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zozulu\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "litime": {
                    "platformId": "litime",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?litime\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "plusshop": {
                    "platformId": "plusshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?plusshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "swifdoo": {
                    "platformId": "swifdoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?swifdoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "supp": {
                    "platformId": "supp",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?supp\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zenhotels": {
                    "platformId": "zenhotels",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zenhotels\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bloomcabin": {
                    "platformId": "bloomcabin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bloomcabin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "outdoorqueen": {
                    "platformId": "outdoorqueen",
                    "keywords": [
                        "outdoor-queen"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(outdoor-queen)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "atomixmedical": {
                    "platformId": "atomixmedical",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?atomixmedical\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eltonpepple": {
                    "platformId": "eltonpepple",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eltonpepple\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "degrifencens": {
                    "platformId": "degrifencens",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?degrifencens\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thebeautystore": {
                    "platformId": "thebeautystore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thebeautystore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "uwanthome": {
                    "platformId": "uwanthome",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?uwanthome\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dxbchoc": {
                    "platformId": "dxbchoc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dxbchoc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "techpals": {
                    "platformId": "techpals",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?techpals\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "derozedoos": {
                    "platformId": "derozedoos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?derozedoos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "botanicalgreenlab": {
                    "platformId": "botanicalgreenlab",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?botanicalgreenlab\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "curoskin": {
                    "platformId": "curoskin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?curoskin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fixafloor": {
                    "platformId": "fixafloor",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fixafloor\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "embossedgraphics": {
                    "platformId": "embossedgraphics",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?embossedgraphics\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "frizzlife": {
                    "platformId": "frizzlife",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?frizzlife\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "makeidstore": {
                    "platformId": "makeidstore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?makeidstore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "toolchest": {
                    "platformId": "toolchest",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?toolchest\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cloneofperfume": {
                    "platformId": "cloneofperfume",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cloneofperfume\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blimburnseeds": {
                    "platformId": "blimburnseeds",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blimburnseeds\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "no98beauty": {
                    "platformId": "no98beauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?no98beauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "minoston": {
                    "platformId": "minoston",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?minoston\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kittykickstix": {
                    "platformId": "kittykickstix",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kittykickstix\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zazzmode": {
                    "platformId": "zazzmode",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zazzmode\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bluecrossbeauty": {
                    "platformId": "bluecrossbeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bluecrossbeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thebrushandbroom": {
                    "platformId": "thebrushandbroom",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thebrushandbroom\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "natterjack": {
                    "platformId": "natterjack",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?natterjack\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "litones": {
                    "platformId": "litones",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?litones\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vawoo": {
                    "platformId": "vawoo",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vawoo\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vacbird": {
                    "platformId": "vacbird",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vacbird\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "houseofblanks": {
                    "platformId": "houseofblanks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?houseofblanks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "besrey": {
                    "platformId": "besrey",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?besrey\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lagenio": {
                    "platformId": "lagenio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lagenio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "babyshusher": {
                    "platformId": "babyshusher",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?babyshusher\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "puppercrust": {
                    "platformId": "puppercrust",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?puppercrust\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "quaggadesigns": {
                    "platformId": "quaggadesigns",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?quaggadesigns\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "celebrestore": {
                    "platformId": "celebrestore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?celebrestore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "framedworks": {
                    "platformId": "framedworks",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?framedworks\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "growthwise": {
                    "platformId": "growthwise",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?growthwise\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "terralabs": {
                    "platformId": "terralabs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?terralabs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zumkratzen": {
                    "platformId": "zumkratzen",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zumkratzen\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "blackcanyonbrands": {
                    "platformId": "blackcanyonbrands",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?blackcanyonbrands\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "resumecorner": {
                    "platformId": "resumecorner",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?resumecorner\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "belitaferienhaus": {
                    "platformId": "belitaferienhaus",
                    "keywords": [
                        "belita-ferienhaus"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(belita-ferienhaus)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "helm": {
                    "platformId": "helm",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?helm\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "doppelherz": {
                    "platformId": "doppelherz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?doppelherz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tinkererbox": {
                    "platformId": "tinkererbox",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tinkererbox\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mypetdmv": {
                    "platformId": "mypetdmv",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mypetdmv\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "supergut": {
                    "platformId": "supergut",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?supergut\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "babubas": {
                    "platformId": "babubas",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?babubas\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "raysdanc": {
                    "platformId": "raysdanc",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?raysdanc\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "itsonlynaturalgifts": {
                    "platformId": "itsonlynaturalgifts",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?itsonlynaturalgifts\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mesto": {
                    "platformId": "mesto",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mesto\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "rumblebox": {
                    "platformId": "rumblebox",
                    "keywords": [
                        "rumble-box"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(rumble-box)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "northskysupply": {
                    "platformId": "northskysupply",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?northskysupply\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "bolsanovahandbags": {
                    "platformId": "bolsanovahandbags",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?bolsanovahandbags\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "casapadrino": {
                    "platformId": "casapadrino",
                    "keywords": [
                        "casa-padrino"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(casa-padrino)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "yassclean": {
                    "platformId": "yassclean",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?yassclean\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "wellshave": {
                    "platformId": "wellshave",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?wellshave\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "willandbear": {
                    "platformId": "willandbear",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?willandbear\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "hugrug": {
                    "platformId": "hugrug",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hugrug\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "skled": {
                    "platformId": "skled",
                    "keywords": [
                        "sk-led"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(sk-led)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lorenworld": {
                    "platformId": "lorenworld",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lorenworld\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "deluxehomeartshop": {
                    "platformId": "deluxehomeartshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?deluxehomeartshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "truehempstore": {
                    "platformId": "truehempstore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?truehempstore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "weekett": {
                    "platformId": "weekett",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?weekett\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "mrdrippz": {
                    "platformId": "mrdrippz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?mrdrippz\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "vitalized": {
                    "platformId": "vitalized",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?vitalized\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "barbaraklein": {
                    "platformId": "barbaraklein",
                    "keywords": [
                        "barbara-klein"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(barbara-klein)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fidelisdog": {
                    "platformId": "fidelisdog",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fidelisdog\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thesabi": {
                    "platformId": "thesabi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thesabi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "erozul": {
                    "platformId": "erozul",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?erozul\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "touchbeauty": {
                    "platformId": "touchbeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?touchbeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pillowfactory": {
                    "platformId": "pillowfactory",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pillowfactory\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dyubikes": {
                    "platformId": "dyubikes",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dyubikes\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "myredrun": {
                    "platformId": "myredrun",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?myredrun\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "shearsciences": {
                    "platformId": "shearsciences",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?shearsciences\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ismeswim": {
                    "platformId": "ismeswim",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ismeswim\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "unisoarshop": {
                    "platformId": "unisoarshop",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?unisoarshop\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thefoampeople": {
                    "platformId": "thefoampeople",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thefoampeople\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thehelloskinco": {
                    "platformId": "thehelloskinco",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thehelloskinco\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theblossomist": {
                    "platformId": "theblossomist",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theblossomist\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kastneroehler": {
                    "platformId": "kastneroehler",
                    "keywords": [
                        "kastner-oehler"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(kastner-oehler)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "pawpculture": {
                    "platformId": "pawpculture",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?pawpculture\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "henkeys": {
                    "platformId": "henkeys",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?henkeys\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "librieconcorsi": {
                    "platformId": "librieconcorsi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?librieconcorsi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thattotebag": {
                    "platformId": "thattotebag",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thattotebag\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "contextskin": {
                    "platformId": "contextskin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?contextskin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "postermasterstudio": {
                    "platformId": "postermasterstudio",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?postermasterstudio\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "starlightbeds": {
                    "platformId": "starlightbeds",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?starlightbeds\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "kenobloom": {
                    "platformId": "kenobloom",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?kenobloom\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "framani": {
                    "platformId": "framani",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?framani\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "winslets": {
                    "platformId": "winslets",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?winslets\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "floetica": {
                    "platformId": "floetica",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?floetica\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "dreamhomestore": {
                    "platformId": "dreamhomestore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?dreamhomestore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "huladaddy": {
                    "platformId": "huladaddy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?huladaddy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "auroraskin": {
                    "platformId": "auroraskin",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?auroraskin\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "osnutrition": {
                    "platformId": "osnutrition",
                    "keywords": [
                        "os-nutrition"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(os-nutrition)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gardeningnaturally": {
                    "platformId": "gardeningnaturally",
                    "keywords": [
                        "gardening-naturally"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(gardening-naturally)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "thesleeppeople": {
                    "platformId": "thesleeppeople",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?thesleeppeople\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "inspiretruebeauty": {
                    "platformId": "inspiretruebeauty",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?inspiretruebeauty\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fulfilora": {
                    "platformId": "fulfilora",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fulfilora\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "perfumeza": {
                    "platformId": "perfumeza",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?perfumeza\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "ibstonehearing": {
                    "platformId": "ibstonehearing",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?ibstonehearing\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "primmeshiper": {
                    "platformId": "primmeshiper",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?primmeshiper\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "goairportparking": {
                    "platformId": "goairportparking",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?goairportparking\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "songoven": {
                    "platformId": "songoven",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?songoven\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "tameson": {
                    "platformId": "tameson",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?tameson\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "galiciaeducacao": {
                    "platformId": "galiciaeducacao",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?galiciaeducacao\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "todayslifestyle": {
                    "platformId": "todayslifestyle",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?todayslifestyle\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "brianoak": {
                    "platformId": "brianoak",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?brianoak\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "deesup": {
                    "platformId": "deesup",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?deesup\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "zermatusa": {
                    "platformId": "zermatusa",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?zermatusa\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fidelis": {
                    "platformId": "fidelis",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fidelis\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "be": {
                    "platformId": "be",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?be\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "digiboxsmart": {
                    "platformId": "digiboxsmart",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?digiboxsmart\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "upskillist": {
                    "platformId": "upskillist",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?upskillist\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sundaylittles": {
                    "platformId": "sundaylittles",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sundaylittles\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "scanskinai": {
                    "platformId": "scanskinai",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?scanskinai\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "chasingcleaner": {
                    "platformId": "chasingcleaner",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?chasingcleaner\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "spacecowboy": {
                    "platformId": "spacecowboy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?spacecowboy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "simzy": {
                    "platformId": "simzy",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?simzy\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "planetfoot": {
                    "platformId": "planetfoot",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?planetfoot\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "lacouettefrancaise": {
                    "platformId": "lacouettefrancaise",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?lacouettefrancaise\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "theforeverpost": {
                    "platformId": "theforeverpost",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?theforeverpost\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "formadore": {
                    "platformId": "formadore",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?formadore\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "sumiyakiway": {
                    "platformId": "sumiyakiway",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sumiyakiway\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "arq8": {
                    "platformId": "arq8",
                    "keywords": [
                        "arq-8"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(arq-8)\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "eompos": {
                    "platformId": "eompos",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?eompos\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "repenic": {
                    "platformId": "repenic",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?repenic\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "cbdsol": {
                    "platformId": "cbdsol",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?cbdsol\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "brooklyndelhi": {
                    "platformId": "brooklyndelhi",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?brooklyndelhi\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "africannetsponge": {
                    "platformId": "africannetsponge",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?africannetsponge\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "balarugs": {
                    "platformId": "balarugs",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?balarugs\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fansjerseyhub1": {
                    "platformId": "fansjerseyhub1",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fansjerseyhub1\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "gonumber2": {
                    "platformId": "gonumber2",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?gonumber2\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                },
                "fantastictees": {
                    "platformId": "fantastictees",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fantastictees\\\\.[\\\\w.-]+([/?#].*)?$",
                    "historyRecord": {
                        "disabled": true
                    },
                    "disabled": false
                }
            }
        `;

        /***
        * This is a partner website.
        * If it's a partner website, the toolbar icon will display the normal logo instead of being grayed out.
        */
        const partnerPlatforms = [
            "https:\\/\\/www\\.tool77\\.com\\/.*",
            "https:\\/\\/www\\.grabshorts\\.com\\/.*"
        ];

        let cachedPlatformConfigs = null;
        const getParsedPlatformConfigs = () => {
            if (!cachedPlatformConfigs) {
                cachedPlatformConfigs = JSON.parse(defaultPlatformConfigsString);
            }
            return cachedPlatformConfigs;
        }

        const ensurePlatformConfigDecorated = (item, matchReg) => {
            if (item.urlMatch instanceof RegExp) {
                return;
            }
            item.urlMatch = matchReg;
            if (item.detailUrlPattern) {
                item.detailUrlPattern = item.detailUrlPattern instanceof RegExp ? item.detailUrlPattern : new RegExp(item.detailUrlPattern);
            }
            if (item.tradeUrlPatterns) {
                item.tradeUrlPatterns = item.tradeUrlPatterns.map((p) => (p instanceof RegExp ? p : new RegExp(p)));
            }
        }

        this.getConfigForUrl = (currentUrl = window.location.href) => {
            const platformConfigs = getParsedPlatformConfigs();
            let platformConfig = null;
            if (currentUrl) {
                for (const key in platformConfigs) {
                    const item = platformConfigs[key];
                    const { disabled } = item;
                    const matchReg = item.urlMatch instanceof RegExp ? item.urlMatch : new RegExp(item.urlMatch);
                    if (matchReg.test(currentUrl) && !disabled) {
                        ensurePlatformConfigDecorated(item, matchReg);
                        platformConfig = item;
                        break;
                    }
                }
            }
            return { platformConfig, platformConfigs };
        };

        this.isPartnerPlatform = (currentUrl = window.location.href) => {
            return partnerPlatforms.some((partnerPlatform) => new RegExp(partnerPlatform).test(currentUrl));
        };
    };

})(jsu);