($ => {
    "use strict";

    /**
     * This is a basic method for platform-specific coupon auto-detect.
     */
    const AutoDetectBase = function () {
        this.BUTTON_CLICK_PASUE_MS = 700; // After clicking the verification button, wait before proceeding.
        this.VALIDATE_DELAY_MAX_MS = 10 * 1000; // Maximum wait time for verification
        this.VALIDATE_LOOP_DELAY_MS = 1500; // Polling task, detecting coupon verification results.
        this.VALIDATE_END_PASUE_MS = 500; // After verification is complete, delay the return for a better viewing experience.
        this.HookType = { react: "react", default: "default" };

        const unsafeWindow = window;

        /**
         * react directly input.value value will not update, use this hook to solve it
         * @param {HTMLInputElement} element
         * @param {string} value
         * @param {boolean} useSetter
         */
        this.reactHook = function(element, value, useSetter=true){
            const inputEvent = new InputEvent("input", {
                view: unsafeWindow,
                bubbles: true,
                cancelable: true
            });
            const changeEvent = new InputEvent("change", {
                view: unsafeWindow,
                bubbles: true,
                cancelable: true
            });
            const keyupEvent = new InputEvent("keyup", {
                view: unsafeWindow,
                bubbles: true,
                cancelable: true
            });

            // Temporarily make the element editable
            element.setAttribute("readonly", "readonly");
            setTimeout(() => {
                element.removeAttribute("readonly");
            }, 200);

            // Set the value using the property descriptor setter if available
            const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
            if (valueSetter && useSetter) {
                valueSetter.call(element, value);
            } else {
                element.value = value;
            }

            // Dispatch events to notify listeners
            element.dispatchEvent(inputEvent);
            element.dispatchEvent(changeEvent);
            element.dispatchEvent(keyupEvent);
        };

        this.unusedHook = function(element, value){
            element.value = value;
        };

        /**
         * @param {Object} support
         * This is the first step in verifying the coupon: checking if the element exists.
         * Here is to determine if there is input; the application button may be hidden.
         */
        this.validate = function(supportData){
            const submitButton = document.querySelector(supportData.submitButtonSelector);
            const couponInput = document.querySelector(supportData.couponInputSelector);
            const validateData = {"couponInput":null, "submitButton":null}
            if(couponInput){
                validateData.couponInput = couponInput;
                validateData.submitButton = submitButton;
            }
            return validateData;
        };

        /**
         * @param {Object} support
         * This is the second step of coupon verification: enter the code and click the verify button.
         * Part Three: Verification Results, to be independently implemented by the platform.
         */
        this.clickValidateButton = function(supportData, couponInput, submitButton, code, hookType){
            if(!couponInput){
                return new Promise((resolve)=>{
                    resolve(false);
                });
            }

            if(hookType===this.HookType.react){
                this.reactHook(couponInput, code);
            }else if(hookType===this.HookType.default){
                this.unusedHook(couponInput, code);
            }

            //Get it again, mainly to handle the situation where the button is displayed after generating the input code.
            if(!submitButton){
                submitButton = document.querySelector(supportData.submitButtonSelector);
                if(!submitButton){
                    return new Promise((resolve)=>{
                    resolve(false);
                    });
                }
            }

            return new Promise((resolve)=>{
                const clickPromise = new Promise((resolveCheck)=>{
                    setTimeout(()=>{
                        submitButton.click();
                        resolveCheck(true);
                    }, this.BUTTON_CLICK_PASUE_MS);
                });
                clickPromise.then((result)=>{
                    resolve(result);
                });
            });
        };

    };


    /**
     * AliExpress coupon verification logic
     * @param {*} ext 
     */
    $.AliexpressAutoDetectHelper = function(ext){
        AutoDetectBase.call(this); //Inherit the properties of AutoDetectBase

        this.start = function(supportData, code){
            const {couponInput, submitButton} = this.validate(supportData);
        
            return new Promise(async (resolve)=>{
                const clickResult = await this.clickValidateButton(supportData, couponInput, submitButton, code, this.HookType.react);
                if(!clickResult){
                    resolve(clickResult)
                    return;
                }
            
                /**
                 * ===========
                 * This is independent logic.
                 * ===========
                 */
                let errors = null, existingCode = null, inputCode = null;
                let checkResult = false, current = 0;
            
                //Loop detection to check if execution is complete.
                const checkInterval = setInterval(()=>{
                    errors = document.querySelector(supportData.applyErrorSelector);
                    if(supportData.existingCodeSelector){
                        existingCode = document.querySelector(supportData.existingCodeSelector);
                    }
                    inputCode = document.querySelector(supportData.couponInputSelector);
            
                    //In some cases on AliExpress, the input box disappears after successful verification.
                    if(errors || existingCode || !inputCode || current >= this.VALIDATE_DELAY_MAX_MS){
                        clearInterval(checkInterval);
                        checkResult = !!existingCode || !inputCode;
                        setTimeout(()=> { //After verification is complete, delay the return for a better viewing experience.
                            resolve(checkResult);
                        }, this.VALIDATE_END_PASUE_MS);
                    }
            
                    current += this.VALIDATE_LOOP_DELAY_MS;
                }, this.VALIDATE_LOOP_DELAY_MS);
            
                /**
                 * ===========
                 * This is independent logic.
                 * ===========
                 */
            });
        }
    };


    /**
     * eBay coupon verification logic
     * @param {*} ext 
     */
    $.EbayAutoDetectHelper = function(ext){
        AutoDetectBase.call(this); //Inherit the properties of AutoDetectBase
        
        this.start = function(supportData, code){
            const {couponInput, submitButton} = this.validate(supportData);
        
            return new Promise(async (resolve)=>{
                const clickResult = await this.clickValidateButton(supportData, couponInput, submitButton, code, this.HookType.react);
                if(!clickResult){
                resolve(clickResult)
                    return;
                }
            
                /**
                 * ===========
                 * This is independent logic.
                 * ===========
                 */
                let errors = null, existingCode = null;
                let checkResult = false, current = 0;

                //If there are errors before performing the check, delete them.
                //This is eBay's unique logic.
                errors = document.querySelector(supportData.applyErrorSelector);
                if(errors){
                    errors.remove();
                }
            
                //Loop detection to check if execution is complete.
                const checkInterval = setInterval(()=>{
                    errors = document.querySelector(supportData.applyErrorSelector);
                    if(supportData.existingCodeSelector){
                        existingCode = document.querySelector(supportData.existingCodeSelector);
                    }
            
                    if(errors || existingCode || current >= this.VALIDATE_DELAY_MAX_MS){
                        clearInterval(checkInterval);
                        checkResult = !!existingCode;
                        setTimeout(()=>{ //After verification is complete, delay the return for a better viewing experience.
                            resolve(checkResult);
                        }, this.VALIDATE_END_PASUE_MS);
                    }
            
                    current += this.VALIDATE_LOOP_DELAY_MS;
                }, this.VALIDATE_LOOP_DELAY_MS);
            
                /**
                 * ===========
                 * This is independent logic.
                 * ===========
                 */
            });
        };
    };

    /**
     * Amazon coupon verification logic
     * @param {*} ext 
     */
    $.AmazonAutoDetectHelper = function(ext){
        AutoDetectBase.call(this); //Inherit the properties of AutoDetectBase
        
        this.start = function(supportData, code){
            const {couponInput, submitButton} = this.validate(supportData);
        
            return new Promise(async (resolve)=>{
                const clickResult = await this.clickValidateButton(supportData, couponInput, submitButton, code, this.HookType.react);
                if(!clickResult){
                    resolve(clickResult)
                    return;
                }
        
                /**
                 * ===========
                 * This is independent logic.
                 * ===========
                 */
                let errors = null, existingCode = null, loading = null;
                let checkResult = false, current = 0;
        
                //Loop detection to check if execution is complete.
                const checkInterval = setInterval(()=>{
                    loading = document.querySelector(supportData.loadingSelector);
                    if(!loading){
                        errors = document.querySelector(supportData.applyErrorSelector);
                        if(supportData.existingCodeSelector){
                            existingCode = document.querySelector(supportData.existingCodeSelector);
                        }
                
                        if(errors || existingCode || current >= this.VALIDATE_DELAY_MAX_MS){
                            clearInterval(checkInterval);
                            checkResult = !!existingCode;
                            setTimeout(()=>{ //After verification is complete, delay the return for a better viewing experience.
                                resolve(checkResult);
                            }, this.VALIDATE_END_PASUE_MS);
                        }
                    }
                    current += this.VALIDATE_LOOP_DELAY_MS;
                }, this.VALIDATE_LOOP_DELAY_MS);
        
                /**
                 * ===========
                 * This is independent logic.
                 * ===========
                 */
            });
        };
    };
})(jsu);