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
                "fewodirekt": {
                    "platformId": "fewodirekt",
                    "keywords": [
                        "fewo-direkt"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?fewo-direkt\\\\.[\\\\w.-]+([/?#].*)?$",
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
                "hoteles": {
                    "platformId": "hoteles",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?hoteles\\\\.[\\\\w.-]+([/?#].*)?$",
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
                "stayz": {
                    "platformId": "stayz",
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?stayz\\\\.[\\\\w.-]+([/?#].*)?$",
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
                    "keywords": [
                        "iherb",
                        "iherbgroup"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?(iherb|iherbgroup)\\\\.[\\\\w.-]+([/?#].*)?$",
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
                "sephra": {
                    "platformId": "sephra",
                    "keywords": [
                        "sephrausa",
                        "sephra"
                    ],
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?sephrausa\\\\.[\\\\w.-]+([/?#].*)?$",
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
                    "urlMatch": "^https:\\\\/\\\\/([\\\\w-]+\\\\.)?panasonic\\\\.[\\\\w.-]+([/?#].*)?$",
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