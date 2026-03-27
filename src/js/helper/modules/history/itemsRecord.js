($ => {
    "use strict";

    $.ItemsRecordHelper = function (ext, platformConfig) {
        this.run = () => {
            const href = window.location.href;
            const platform = platformConfig.platformId;
            if (platformConfig.historyRecord.disabled) return;

            const { title, price, cover } = platformConfig.historyRecord.elements;
            if (!platformConfig.detailUrlPattern.test(href)) return;

            const id = ext.helper.util.getGoodsIdByLink(href);
            ext.logger("info", "ItemsRecordHelper", "record", "goods detail> title", title);
            ext.logger("info", "ItemsRecordHelper", "record", "goods detail> price", price);
            ext.logger("info", "ItemsRecordHelper", "record", "goods detail> cover", cover);

            if (!title || !price || !cover) return;

            Promise.all([
                $.waitForSelector(cover, { target: document.body, allowEmpty: true }),
                $.waitForSelector(price, { target: document.body, allowEmpty: false, timeout: 5000 })
            ]).then((elements) => {
                const coverElement = elements[0];
                const priceElement =  elements[1];
                const titleElement = document.querySelector(title);

                ext.logger("info", "ItemsRecordHelper", "record", "goods detail> titleElement", titleElement);
                ext.logger("info", "ItemsRecordHelper", "record", "goods detail> priceElement", priceElement);
                ext.logger("info", "ItemsRecordHelper", "record", "goods detail> coverElement", coverElement);

                if (!coverElement) return;

                let imgSrc = "";
                if (coverElement.tagName === "IMG") {
                    imgSrc = coverElement.getAttribute("data-src") ||
                        coverElement.getAttribute("data-url") ||
                        coverElement.getAttribute("src");
                        
                } else if (coverElement.tagName === "SOURCE") {
                    imgSrc = coverElement.getAttribute("srcSet") || coverElement.getAttribute("src");
                }

                const priceText = priceElement ? priceElement.innerText : "Unknown";
                const titleText = titleElement ? titleElement.innerText : "--";
                const goods = {
                    id, url: href, pic: imgSrc,
                    date: Date.now(),
                    price: priceText,
                    title: titleText
                };
                ext.logger("info", "ItemsRecordHelper", "record", "goods detail> goods", goods);
                ext.helper.coupon.itemsHistory.push(platform, goods);
            }).catch(() => {});
        };
    };
})(jsu);
