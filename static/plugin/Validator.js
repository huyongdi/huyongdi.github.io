/**
 * 前端输入校验模块
 */
define(function (require, exports, module) {
    var $ = require("jquery");

    function Validator() {
        this.isFloatAmount = function (value) {
            return /^(0|[1-9]\d*)(.[0-9]\d*)?$/i.test(value);
        }

        this.isQQ = function(value) {
            return /^[1-9][0-9]{4,9}$/i.test(value);
        }

        /**
         * 判断一个字符串是不是空白字符串<br>
         * 如果是，返回true；否则返回false<br>
         */
        this.isBlank = function (value) {
            return (value == null || $.trim(value) == "" || value == undefined);
        }

        this.isNull = function (value) {
            return (value == null || value == "");
        }

        /**
         * 判断指定的字符串value是不是纯中文字符串<br>
         * 如果是，则返回true；否则返回false<br>
         */
        this.isChineseString = function (value) {
            return /^[\u4e00-\u9fa5]+$/i.test(value);
        };

        this.isName = function (value) {
        	return /^[A-Za-z\u4E00-\u9FA5]+$/i.test(value);
        };
        
        this.isChineseCharDigit = function (value) {
            return /^[\u4e00-\u9fa5A-Za-z0-9]+$/i.test(value);
        }

        this.isWeixin = function(value){
            var re = /^[a-zA-Z\d_]{5,}$/;
            return re.test(value);
        }
        
        /**
         * 判断字符串是否是中文姓名
         * @param value
         * @returns {boolean}
         */
        this.isChineseName = function (value) {
            return /^[\u4E00-\u9FA5]{2,8}(?:·[\u4E00-\u9FA5]{1,8})*$/i.test(value);
        }

        /**
         * 判断指定的字符串value是不是双字节字符<br>
         * 如果是，则返回true；否则返回false<br>
         */
        this.idDoubleByteCharacter = function (value) {
            return /^[^\x00-\xff]$/i.test(value);
        }

        /**
         * 判断指定的字符串value是不是邮箱地址<br>
         * 如果是，则返回true；否则返回false<br>
         */
        this.isEmail = function (value) {
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i.test(value);
        }

        /**
         * 判断指定的字符串value是不是手机号<br>
         * 如果是，则返回true；否则返回false<br>
         */
        this.isMobile = function (value) {
            return /^[1][3,4,5,7,8][0-9]{9}$/i.test(value);
        }

        /**
         * 判断一个字符串是不是URL<br>
         * 如果是，则返回true；否则返回false<br>
         */
        this.isUrl = function (value) {
            return /^(http|https):\/\/[^\s]*$/i.test(value);
        }

        /**
         * 判断一个字符串是否是银行卡号
         * @param value 指定的字符串
         * @returns {boolean} 如果是返回true；否则返回false
         */
        this.isBankCardNo = function (value) {
            return /^(\d{15,19})$/i.test(value);
        }

        /**
         * 判断一个字符串是不是版本名称：0.0.0.0或0.0.0格式的版本号
         * @param value 指定的字符串
         * 如果是，则返回true；否则返回false
         */
        this.isVersionName = function (value) {
            return /^(0|[1-9]\d*).(0|[1-9]\d*).(0|[1-9]\d*)(?:.(0|[1-9]\d*)){0,1}$/i.test(value);
        }

        this.isProgress = function (value) {
            return /^(\d{1}|[1-9]\d{1}|100)$/i.test(value);
        }

        /**
         * 判断非负整数
         * @param value 指定的字符串
         * 如果是，则返回true；否则返回false
         */
        this.isNonNegativeInteger = function (value) {
            return /^([1-9]\d*|0)$/i.test(value);
        }

        /**
         * 判断一个字符串是不是URL<br>
         * 如果是，则返回true；否则返回false<br>
         */
        this.isUrl = function (value) {
            return /((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9&%_\./-~-]*)?/i.test(value);
        };
        
        this.hasSpecialSigns = function(input){
        	var vkeyWords=/[`~!@#$^&*()=|{}':;',\\[\\].<>?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/;
            if(vkeyWords.test(input)){
            	return true;
            }else{
            	return false;
            }
        }
    }

    module.exports = Validator;
});
