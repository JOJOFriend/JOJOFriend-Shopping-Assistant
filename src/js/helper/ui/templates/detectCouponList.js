($ => {
    "use strict";

    /**
     * Detect page coupon/store list panel template and generation logic; depends on DetectCommonTemplateHelper.
     * @param {*} ext
     */
    $.DetectCouponListTemplateHelper = function (ext, commonTemplate) {

        // Button/event names (for external binding)
        const cashbackBtnName = "cashback-click-event";
        const clickToJumpBtnName = "jump-click-event";
        const couponApplyBtnName = "coupon-apply-click-event";
        
        // Sub-component templates
        const discountComponentHtml = `
            <div class="jox-acq-coupon-item jox-acq-media-item">
                #{imgHtml}
                <div class="jox-acq-content">
                    <div class="jox-acq-item-left">
                        <span class="item-coupon-title">#{title}</span>
                        <span class="item-coupon-subtitle">#{desc}</span>
                    </div>
                    <div class="jox-acq-item-right">
                        <span class="discount-base discount-btn-default" data-content="#{content}" name="${clickToJumpBtnName}">#{off}</span>
                    </div>
                </div>
            </div>
        `;
        const discountImageComponentHtml = `
            <div class="jox-acq-img">
                <img src="#{img}"></img>
            </div>
        `;
        const withCouponCopyComponentHtml = `
            <div class="jox-acq-coupon-item">
                <div class="jox-acq-item-left">
                    <div class="item-coupon-text">#{code}</div>
                    <span class="item-coupon-subtitle">
                        #{desc}
                    </span>
                </div>
                <div class="jox-acq-item-right">
                    <span class="discount-base discount-btn-default" data-content='#{content}' name="${clickToJumpBtnName}">#{copyCode}</span>
                </div>
            </div>
        `;
        const storeComponentHtml = `
            <div class="jox-acq-store-item" data-content='#{content}' name="${clickToJumpBtnName}">
                <div class="jox-acq-platform-logo"><img src="#{logo}"/></div>
                <span>#{name}</span>
            </div>
        `;
        const couponApplyComponentHtml = `
            <div class="jox-acq-coupon-apply">
                <span class="jox-acq-apply-inner jox-acq-apply-button" data-content='#{content}' name="${couponApplyBtnName}">#{applyText}</span>
            </div>
        `;

        const rebateHtml = `
            <div class="cashback-panel">
                #{onlineHtml}
                #{guestHtml}
                #{activateBtnHtml}
            </div>
        `;
        const guestHtml = `
            <div class="jox-acq-stepper">
                <div class="jox-acq-step jox-acq-active">
                    <div class="jox-acq-circle"></div>
                    <div class="jox-acq-label">#{activatedText}</div>
                </div>
                <div class="jox-acq-line"></div>
                <div class="jox-acq-step">
                    <div class="jox-acq-circle"></div>
                    <div class="jox-acq-label">#{purchaseText}</div>
                </div>
                <div class="jox-acq-line"></div>
                <div class="jox-acq-step">
                    <div class="jox-acq-circle"></div>
                    <div class="jox-acq-label">#{withdrawText}</div>
                </div>
            </div>
        `;
        const onlineHtml = `
            <div class="cashback-user-info">
                <div class="jox-acq-user-avatar">
                    <a href="#{ucenter}" target="_blank"><img class="jox-acq-avatar-img" src="#{avatar}" alt="User Avatar"></a>
                    <div class="jox-acq-vip-badge-css">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" viewBox="0 0 16 16">
                            <path d="M13.485 1.929a1.5 1.5 0 0 0-2.121 0L6.75 6.543 4.636 4.429a1.5 1.5 0 0 0-2.121 2.121l3 3a1.5 1.5 0 0 0 2.121 0l6-6a1.5 1.5 0 0 0 0-2.121z"/>
                        </svg>
                        <span>#{level}</span>
                    </div>
                </div>
                <div class="jox-acq-account">
                    <div>#{confirmedLabel}<span class="jox-acq-account-confirmed">#{confirmedAmount}</span></div>
                    <div>#{pendingLabel}<span class="jox-acq-account-pending">#{pendingAmount}</span></div>
                </div>
            </div>
        `;

        const showMoreHtml = `
            <div class="jox-acq-showmore-box">
                <div class="showmore-pic">
                    <svg t="1773052718904" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32005" width="80" height="80"><path d="M904.533333 617.813333l20.48 69.973334c8.533333 29.013333-8.533333 58.026667-35.84 66.56l-416.426666 119.466666c-29.013333 8.533333-58.026667-8.533333-66.56-35.84l-18.773334-64.853333c25.6-10.24 40.96-39.253333 32.426667-64.853333-6.826667-27.306667-34.133333-42.666667-61.44-37.546667l-22.186667-76.8c-8.533333-29.013333 8.533333-58.026667 35.84-66.56l416.426667-119.466667c29.013333-8.533333 58.026667 8.533333 66.56 35.84l22.186667 76.8c-25.6 10.24-40.96 37.546667-32.426667 63.146667s32.426667 39.253333 59.733333 34.133333z" fill="#FFD3D7" p-id="32006"></path><path d="M877.226667 609.28l17.066666 61.44c8.533333 29.013333-8.533333 58.026667-35.84 64.853333l-399.36 114.346667c-29.013333 8.533333-58.026667-8.533333-66.56-35.84l-17.066666-61.44c25.6-10.24 39.253333-37.546667 30.72-63.146667-6.826667-25.6-34.133333-42.666667-59.733334-37.546666L324.266667 578.56c-8.533333-29.013333 8.533333-58.026667 35.84-64.853333l399.36-114.346667c29.013333-8.533333 58.026667 8.533333 66.56 35.84l20.48 73.386667c-25.6 10.24-39.253333 37.546667-30.72 63.146666 8.533333 25.6 34.133333 40.96 61.44 37.546667z" fill="#FB560A" p-id="32007"></path><path d="M500.053333 788.48c-5.12 0-10.24-3.413333-11.946666-8.533333l-3.413334-11.946667c-1.706667-6.826667 1.706667-13.653333 8.533334-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413333 11.946667c1.706667 6.826667-1.706667 13.653333-8.533333 15.36h-3.413334z m-17.066666-56.32c-5.12 0-10.24-3.413333-11.946667-8.533333l-3.413333-11.946667c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413333 11.946667c1.706667 6.826667-1.706667 13.653333-8.533333 15.36h-3.413333z m-15.36-58.026667c-5.12 0-10.24-3.413333-11.946667-8.533333l-3.413333-11.946667c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533334l3.413333 11.946666c1.706667 6.826667-1.706667 13.653333-8.533333 15.36h-3.413333z m-17.066667-58.026666c-5.12 0-10.24-3.413333-11.946667-8.533334l-3.413333-11.946666c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413334 11.946667c1.706667 6.826667-1.706667 13.653333-8.533334 15.36h-3.413333z m-15.36-56.32c-5.12 0-10.24-3.413333-11.946667-8.533334l-3.413333-11.946666c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413334 11.946667c1.706667 6.826667-1.706667 13.653333-8.533334 15.36-1.706667-1.706667-1.706667 0-3.413333 0z" fill="#DAE9FF" p-id="32008"></path><path d="M493.226667 790.186667c-5.12 0-10.24-3.413333-11.946667-8.533334l-3.413333-11.946666c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413333 11.946667c1.706667 6.826667-1.706667 13.653333-8.533333 15.36h-3.413333zM477.866667 733.866667c-5.12 0-10.24-3.413333-11.946667-8.533334l-3.413333-11.946666c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413333 11.946667c1.706667 6.826667-1.706667 13.653333-8.533333 15.36-1.706667-1.706667-3.413333 0-3.413333 0z m-17.066667-58.026667c-5.12 0-10.24-3.413333-11.946667-8.533333l-3.413333-11.946667c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533333l3.413334 11.946667c1.706667 6.826667-1.706667 13.653333-8.533334 15.36H460.8z m-17.066667-58.026667c-5.12 0-10.24-3.413333-11.946666-8.533333l-1.706667-11.946667c-1.706667-6.826667 1.706667-13.653333 8.533333-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533334l3.413334 11.946666c1.706667 6.826667-1.706667 13.653333-8.533334 15.36H443.733333z m-15.36-56.32c-5.12 0-10.24-3.413333-11.946666-8.533333l-3.413334-11.946667c-1.706667-6.826667 1.706667-13.653333 8.533334-15.36 6.826667-1.706667 13.653333 1.706667 15.36 8.533334l3.413333 11.946666c1.706667 6.826667-1.706667 13.653333-8.533333 15.36h-3.413334z" fill="#FFFFFF" p-id="32009"></path><path d="M510.293333 580.266667c5.12-13.653333 20.48-29.013333 35.84-32.426667 0 0 59.733333-18.773333 97.28-29.013333l11.946667-3.413334c15.36-1.706667 30.72 8.533333 35.84 23.893334l-1.706667-3.413334c3.413333 15.36-5.12 32.426667-20.48 35.84l-116.053333 34.133334c-15.36 5.12-34.133333-3.413333-39.253333-18.773334l-3.413334-6.826666zM539.306667 667.306667c5.12-13.653333 20.48-29.013333 34.133333-32.426667l186.026667-52.906667c13.653333-3.413333 30.72 3.413333 35.84 17.066667l1.706666 3.413333c6.826667 15.36 0 30.72-15.36 34.133334l-194.56 56.32-3.413333 1.706666c-15.36 5.12-34.133333-3.413333-42.666667-17.066666l-3.413333-5.12 1.706667-5.12z" fill="#DAE9FF" p-id="32010"></path><path d="M527.36 551.253333l114.346667-32.426666c11.946667-3.413333 25.6 3.413333 29.013333 15.36 3.413333 11.946667-3.413333 25.6-15.36 29.013333l-114.346667 32.426667c-11.946667 3.413333-25.6-3.413333-29.013333-15.36-5.12-13.653333 1.706667-25.6 15.36-29.013334zM552.96 641.706667l204.8-58.026667c11.946667-3.413333 25.6 3.413333 29.013333 15.36 3.413333 11.946667-3.413333 25.6-15.36 29.013333l-204.8 58.026667c-11.946667 3.413333-25.6-3.413333-29.013333-15.36-5.12-13.653333 3.413333-25.6 15.36-29.013333z" fill="#FFFFFF" p-id="32011"></path><path d="M933.546667 395.946667l46.08 95.573333c18.773333 37.546667 3.413333 83.626667-34.133334 102.4l-563.2 273.066667c-37.546667 18.773333-83.626667 3.413333-102.4-35.84l-42.666666-88.746667c34.133333-20.48 47.786667-64.853333 29.013333-100.693333-17.066667-35.84-59.733333-52.906667-97.28-39.253334l-51.2-104.106666c-18.773333-37.546667-3.413333-83.626667 34.133333-102.4l563.2-273.066667c37.546667-18.773333 83.626667-3.413333 102.4 35.84l51.2 104.106667c-34.133333 20.48-47.786667 63.146667-30.72 97.28 15.36 34.133333 58.026667 49.493333 95.573334 35.84z" fill="#DAE9FF" p-id="32012"></path><path d="M892.586667 389.12l40.96 85.333333c18.773333 37.546667 3.413333 83.626667-35.84 102.4L361.813333 839.68c-37.546667 18.773333-83.626667 3.413333-102.4-35.84l-40.96-85.333333c32.426667-20.48 44.373333-63.146667 27.306667-98.986667s-58.026667-51.2-95.573333-39.253333L102.4 481.28c-18.773333-37.546667-3.413333-83.626667 35.84-102.4L674.133333 116.053333c37.546667-18.773333 83.626667-3.413333 102.4 35.84l49.493334 100.693334c-32.426667 20.48-44.373333 63.146667-27.306667 98.986666 17.066667 34.133333 58.026667 51.2 93.866667 37.546667z" fill="#3889FF" p-id="32013"></path><path d="M397.653333 733.866667c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826666-13.653334c-3.413333-8.533333 0-18.773333 8.533333-22.186666 8.533333-3.413333 18.773333 0 22.186667 8.533333l6.826666 15.36c3.413333 8.533333 0 18.773333-8.533333 22.186667h-6.826667z m-37.546666-76.8c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533333-22.186667 8.533333-3.413333 18.773333 0 22.186667 8.533333l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533334 22.186667-1.706667 1.706667-3.413333 1.706667-6.826666 1.706667zM324.266667 580.266667c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533333-22.186667 8.533333-3.413333 18.773333 0 22.186667 8.533333l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533334 22.186667-1.706667 1.706667-5.12 1.706667-6.826666 1.706667z m-37.546667-76.8c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533334-22.186667 8.533333-3.413333 18.773333 0 22.186666 8.533333l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533333 22.186667-1.706667 1.706667-3.413333 1.706667-6.826667 1.706667zM249.173333 426.666667c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826666-15.36c-3.413333-8.533333 0-18.773333 8.533333-22.186667 8.533333-3.413333 18.773333 0 22.186667 8.533333l6.826666 15.36c3.413333 8.533333 0 18.773333-8.533333 22.186667-1.706667 1.706667-3.413333 1.706667-6.826667 1.706667z" fill="#DAE9FF" p-id="32014"></path><path d="M389.12 737.28c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533334-22.186667 8.533333-3.413333 18.773333 0 22.186666 8.533334l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533333 22.186666-1.706667 1.706667-3.413333 1.706667-6.826667 1.706667z m-37.546667-76.8c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826666-15.36c-3.413333-8.533333 0-18.773333 8.533333-22.186667 8.533333-3.413333 18.773333 0 22.186667 8.533334l6.826666 15.36c3.413333 8.533333 0 18.773333-8.533333 22.186666-1.706667 1.706667-3.413333 1.706667-6.826667 1.706667z m-37.546666-75.093333c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533333-22.186667 8.533333-3.413333 18.773333 0 22.186667 8.533333l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533334 22.186667-1.706667 0-3.413333 1.706667-6.826666 1.706667z m-35.84-76.8c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533333-22.186667s18.773333 0 22.186667 8.533333l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533334 22.186667-1.706667 0-5.12 1.706667-6.826666 1.706667z m-37.546667-76.8c-6.826667 0-11.946667-3.413333-15.36-10.24l-6.826667-15.36c-3.413333-8.533333 0-18.773333 8.533334-22.186667 8.533333-3.413333 18.773333 0 22.186666 8.533333l6.826667 15.36c3.413333 8.533333 0 18.773333-8.533333 22.186667-1.706667 0-5.12 1.706667-6.826667 1.706667z" fill="#FFFFFF" p-id="32015"></path><path d="M365.226667 438.613333c3.413333-20.48 22.186667-46.08 42.666666-56.32 0 0 80.213333-42.666667 129.706667-66.56 49.493333-23.893333 15.36-6.826667 15.36-6.826666 22.186667-6.826667 47.786667 3.413333 58.026667 25.6l-1.706667-5.12c10.24 22.186667 0 47.786667-20.48 58.026666l-155.306667 76.8c-20.48 10.24-49.493333 3.413333-61.44-17.066666l-6.826666-8.533334zM428.373333 556.373333c3.413333-20.48 22.186667-44.373333 40.96-54.613333l250.88-121.173333c18.773333-8.533333 44.373333-3.413333 56.32 15.36l3.413334 5.12c13.653333 18.773333 6.826667 42.666667-13.653334 54.613333L501.76 580.266667l-3.413333 1.706666c-20.48 10.24-51.2 3.413333-66.56-13.653333L426.666667 563.2l1.706666-6.826667z" fill="#DAE9FF" p-id="32016"></path><path d="M380.586667 392.533333l153.6-75.093333c17.066667-8.533333 37.546667-1.706667 46.08 15.36s1.706667 37.546667-15.36 46.08l-153.6 75.093333c-17.066667 8.533333-37.546667 1.706667-46.08-15.36s0-37.546667 15.36-46.08zM442.026667 515.413333L716.8 380.586667c17.066667-8.533333 37.546667-1.706667 46.08 15.36s1.706667 37.546667-15.36 46.08l-274.773333 134.826666c-17.066667 8.533333-37.546667 1.706667-46.08-15.36s-1.706667-37.546667 15.36-46.08z" fill="#FFFFFF" p-id="32017"></path><path d="M204.8 887.466667a341.333333 34.133333 0 1 0 682.666667 0 341.333333 34.133333 0 1 0-682.666667 0Z" fill="#DAE9FF" p-id="32018"></path></svg>
                </div>
                <div class="showmore-subtitle">#{subTitle}</div>
                <div class="showmore-btn" data-content='#{content}' name="${clickToJumpBtnName}">#{text}</div>
            </div>
        `;
        const showMoreBrandsHtml = `
            <div class="jox-acq-showmore-box">
                <div class="showmore-btn" data-content='#{content}' name="${clickToJumpBtnName}">#{text}</div>
            </div>
        `;

        const panelNavigationHtml = `
            <div class="panel-navigation">
                <ul>
                    <li>
                        <a data-href="#jox-acq-coupon-list" class="#{couponActive}" data-toggle="tab">
                            #{couponTabText}
                        </a>
                    </li>
                    <li>
                        <a data-href="#jox-acq-store-list" class="#{storeActive}" data-toggle="tab">
                            #{storeTabText}
                        </a>
                    </li>
                </ul>
            </div>
        `;

        const rootHtml = `
            <div class="notranslate panel-container scroll-box" data-lang="#{lang}" data-direction="#{direction}">
                    #{rebateHtml}
                    #{panelNavigationHtml}

                    <div class="panel-tabs">
                        <div class="tab-pane fade-in #{couponActive}" id="jox-acq-coupon-list">
                            #{applyHtml}
                            <div class="jox-acq-coupon-list">
                                #{couponItemsHtml}
                            </div>
                            <div class="jox-acq-coupon-bottom">
                                #{couponShowMoreHtml}
                            </div>
                        </div>
                        <div class="tab-pane fade #{storeActive}" id="jox-acq-store-list">
                            <div class="jox-acq-store-latest-visit"></div>
                            <div class="jox-acq-store-list">
                                #{storesHtml}
                            </div>
                            <div class="jox-acq-store-bottom">
                                #{storeShowMoreHtml}
                            </div>
                        </div>
                    </div>
                    #{termsHtml}
                </div>
        `;

        const generateTermsHtml = (terms) => commonTemplate.generateTermsHtml(terms);

        const generateCouponItemsHtml = (coupons) => {
            if (!coupons) return "";
            return coupons.map((coupon) => {
                const {code, content, copyCode, desc, image, off, title, type} = coupon;
                if (type === "code") {
                    return ext.helper.util.fillTemplate(withCouponCopyComponentHtml, {
                        code, 
                        content:ext.helper.util.escapeHTML(JSON.stringify(content)), 
                        desc, copyCode
                    });
                }
                if (type === "discount") {
                    return ext.helper.util.fillTemplate(discountComponentHtml, {
                        title,
                        desc,
                        content:ext.helper.util.escapeHTML(JSON.stringify(content)),
                        off,
                        imgHtml: image ? ext.helper.util.fillTemplate(discountImageComponentHtml, { img: image }) : ""
                    });
                }
                return "";
            }).join("");
        };

        const generateCouponShowMoreHtml = (showMore) => {
            if (!showMore) return "";
            const { content, text, subTitle } = showMore;
            return ext.helper.util.fillTemplate(showMoreHtml, {
                content:ext.helper.util.escapeHTML(JSON.stringify(content)),
                text,
                subTitle
            });
        };

        const generateStoreShowMoreHtml = (showMoreBrands) => {
            if (!showMoreBrands) return "";
            const { content, text } = showMoreBrands;
            return ext.helper.util.fillTemplate(showMoreBrandsHtml, {
                content:ext.helper.util.escapeHTML(JSON.stringify(content)),
                text
            });
        };

        const generateStoresHtml = (brands) => {
            if (!brands) return "";
            return brands.map(({ content, logoBase64, name }) =>
                ext.helper.util.fillTemplate(storeComponentHtml, {
                    content:ext.helper.util.escapeHTML(JSON.stringify(content)),
                    name,
                    logo: logoBase64
                })
            ).join("");
        };

        const generatePanelNavigationHtml = (tabs) => {
            if (!tabs || tabs.navigationHidden) return "";
            const { couponTabText, storeTabText, couponActive, storeActive } = tabs;
            return ext.helper.util.fillTemplate(panelNavigationHtml, {
                couponTabText,
                storeTabText,
                couponActive: couponActive ? "active" : "",
                storeActive: storeActive ? "active" : ""
            });
        };

        const generateRebateHtml = (rebate) => {
            let guestHtmlStr = "", onlineHtmlStr = "", activateButtonHtmlStr = "";
            if (rebate) {
                const { activateButton, guest, online } = rebate;
                if (guest) {
                    guestHtmlStr = ext.helper.util.fillTemplate(guestHtml, {
                        activatedText: guest.activatedText,
                        purchaseText: guest.purchaseText,
                        withdrawText: guest.withdrawText
                    });
                }
                if (online) {
                    const { avatar, confirmedAmount, confirmedLabel, email, level, pendingAmount, pendingLabel, ucenterUrl } = online;
                    onlineHtmlStr = ext.helper.util.fillTemplate(onlineHtml, {
                        ucenter: ucenterUrl,
                        avatar,
                        level: level,
                        confirmedLabel,
                        confirmedAmount,
                        pendingLabel,
                        pendingAmount,
                        email
                    });
                }
                if (activateButton) {
                    const { mode, qrCodeBase64 } = activateButton;
                    if (mode === "scan" && qrCodeBase64) {
                        activateButtonHtmlStr += commonTemplate.generateScanHtml(activateButton);
                    }
                    if (mode === "normal") {
                        activateButtonHtmlStr += commonTemplate.generateCashbackBtnHtml(activateButton, cashbackBtnName);
                    }
                }
            }

            // If none exist, return empty string and skip template processing
            if(activateButtonHtmlStr || guestHtmlStr || onlineHtmlStr){
                return ext.helper.util.fillTemplate(rebateHtml, {
                    activateBtnHtml: activateButtonHtmlStr,
                    guestHtml: guestHtmlStr,
                    onlineHtml: onlineHtmlStr
                });
            }

            return "";
        };

        const generateApplyHtml = (applyCoupon) => {
            if (!applyCoupon) return "";
            const { content, applyText } = applyCoupon;

            return ext.helper.util.fillTemplate(couponApplyComponentHtml, {
                applyText,
                content:ext.helper.util.escapeHTML(JSON.stringify(content))
            });
        };
        
        this.getActivateEventConfig = () => {
            return commonTemplate.getActivateEventConfig();
        };

        this.generate = async (payload) => {
            if (!payload) return {};
            const styleObj = await ext.helper.styleHelper.readCssContent(["shadow/detect", "shadow/detectCouponList"]);
            const css = (styleObj["shadow/detect"] || "") + "\n" + (styleObj["shadow/detectCouponList"] || "");
            const { applyCoupon, brands, coupons, direction, lang, rebate, showMore, moreBrands, tabs, terms } = payload;
            
            const termsHtml = generateTermsHtml(terms);
            const couponItemsHtml = generateCouponItemsHtml(coupons);
            const couponShowMoreHtml = generateCouponShowMoreHtml(showMore);
            const storeShowMoreHtml = generateStoreShowMoreHtml(moreBrands);
            const storesHtml = generateStoresHtml(brands);
            const panelNavigationHtml = generatePanelNavigationHtml(tabs);
            const rebateHtml = generateRebateHtml(rebate);
            const applyHtml = generateApplyHtml(applyCoupon);

            const html = ext.helper.util.fillTemplate(rootHtml, {
                direction,
                lang,
                couponActive: tabs?.couponActive ? "active" : "",
                storeActive: tabs?.storeActive ? "active" : "",
                termsHtml,
                couponItemsHtml,
                couponShowMoreHtml,
                storeShowMoreHtml,
                storesHtml,
                panelNavigationHtml,
                rebateHtml,
                applyHtml
            });

            return {
                css,
                html,
                names: { clickToJumpBtnName, cashbackBtnName, couponApplyBtnName }
            };
        };
    };
})(jsu);
