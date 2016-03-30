/***********************************************
 * 插件名称：常用工具类方法（含表单校验）
 * 作    者：
 * 创建日期：
 ***********************************************
 *
 * 修改人员：
 * 修改说明：
 * 修改日期：
 ***********************************************
 */

var Util = Util || {};
Util.config = {
	jsPath : "/html/webapp/local/js/",
	cssPath : "/html/webapp/local/css/",
	imgPath : "/html/webapp/local/img/",
	tmpPath : "/html/webapp/www/",
	staticPath: '/html/webapp/www/static/'
};
Util.isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() {
		return (Util.isMobile.Android() || Util.isMobile.BlackBerry() || Util.isMobile.iOS() || Util.isMobile.Windows());
	}
};
Util.substr = function(str, n) {
	if (!str || n <= 0) return "";
	var r = /[^\x00-\xff]/g;
	if (str.replace(r, "mm").length <= n) {
		return str;
	}
	var m = Math.floor(n / 2);
	for (var i = m; i < str.length; i++) {
		if (str.substr(0, i).replace(r, "mm").length >= n) {
			return str.substr(0, i) + "...";
		}
	}
	return str;
};
Util.chk = {
	/*
	 * 校验是否为空(先删除二边空格再验证)
	 */
	isNull: function(str) {
		if (null == str || "" == str.trim()) {
			return true;
		} else {
			return false;
		}
	},
	/*
	 * 校验是否全是数字
	 */
	isDigit: function(str) {
		var patrn = /^\d+$/;
		return patrn.test(str);
	},
	/*
	 * 校验是否是整数
	 */
	isInteger: function(str) {
		var patrn = /^([+-]?)(\d+)$/;
		return patrn.test(str);
	},
	/*
	 * 校验是否为正整数
	 */
	isPlusInteger: function(str) {
		var patrn = /^([+]?)(\d+)$/;
		return patrn.test(str);
	},
	/*
	 * 校验是否为负整数
	 */
	isMinusInteger: function(str) {
		var patrn = /^-(\d+)$/;
		return patrn.test(str);
	},
	/*
	 * 校验手机号码
	 */
	isMobile: function(str) {
		var patrn = /^0?(13|15|17|18|14)[0-9]{9}$/;
		return patrn.test(str);
	},
	/*
	 * 校验是否仅中文
	 */
	isChinese: function(str) {
		var patrn = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
		return patrn.test(str);
	},
	/*
	 * 校验仅中文，英文，数字_
	 */
	isChineseEnglistNumber: function(str) {
		var patrn = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
		return patrn.test(str);
	},
	/*
	 * 校验电话号码
	 */
	isPhone: function(str) {
		var patrn = /^(0[\d]{2,3}-)?\d{6,8}(-\d{3,4})?$/;
		return patrn.test(str);
	},
	/*
	 * 校验电邮地址
	 */
	isEmail: function(str) {
		var patrn = /^(\w)+(\.\w+)*\u0040(\w)+((\.\w{2,3}){1,3})$/;
		return patrn.test(str);
	},
	/*
	 * 校验身份证
	 */
	isCard: function(str) {
		var patrn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return patrn.test(str);
	},
	/*
	 * 校验字符串：只能输入6-20个字母、数字、下划线(常用手校验用户名和密码)
	 */
	isString6_20: function(str) {
		var patrn = /^(\w){6,20}$/;
		return patrn.test(str);
	},
	/*
	 * 校验字符串：是否密码正则表达式验证
	 */
	isPwd: function(str) {
		var patrn = /^\w{6,16}$/;
		return patrn.test(str);
	},
	/*
	 * 获取字符串长度，中文为2个字符
	 */
	getInputLength: function(str) {
		var byteLen = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				byteLen += 2;
			} else {
				byteLen++;
			}
		}
		return byteLen;
	}

};

/*
 * 生成指定范围数值随机数
 * @param under   起始值
 * @param over    结束值
 */
function fRandomBy(under, over) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * under + 1);
		case 2:
			return parseInt(Math.random() * (over - under + 1) + under);
		default:
			return 0;
	}
}

/*
 * 万元截取
 * @param s   数值
 * @example   divideTenThousand(1550000) 15.5万元
 */
function divideTenThousand(s) {
	var result = "0";
	if (typeof s !== "undefined" && s !== "") {
		result = s / 1e4;
	}
	return result;
}

// 过滤特殊字符
function specialCharacterFilter(s) {
	var pattern = new RegExp("[+s/?%#&=]");
	var rs = "";
	for (var i = 0; i < s.length; i++) {
		rs = rs + s.substr(i, 1).replace(pattern, "");
	}
	return rs;
}

// 金额千分符
function formatMoney(s, type) {
	if (/[^0-9\.]/.test(s)) return "0";
	if (s == null || s == "") return "0";
	s = s.toString().replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	var re = /(\d)(\d{3},)/;
	while (re.test(s)) s = s.replace(re, "$1,$2");
	s = s.replace(/,(\d\d)$/, ".$1");
	if (type == 0) {
		// 不带小数位(默认是有小数位)
		var a = s.split(".");
		if (a[1] == "00") {
			s = a[0];
		}
	}
	return s;
}

// 格式化金钱
function fmoney(s, n, prefix) {
	n = n >= 0 && n <= 20 ? n :2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
	if (r) {
		r = "." + r;
	} else {
		r = "";
	}
	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," :"");
	}
	return ((prefix != undefined ? prefix :"￥") + t.split("").reverse().join("") + r).replace("-,", "-");
}

// 根据身份证号获取生日
function getAgeByIdCardNo(idCardNo) {
	if (idCardNo != undefined && ChkUtil.isCard(idCardNo)) {
		if (idCardNo.length == 15) {
			// 15位身份证
			var date1 = new Date();
			// 取得当前日期
			var year1 = date1.getFullYear();
			// 取得当前年份
			var month1 = date1.getMonth();
			// 取得当前月份
			if (month1 > parseInt(idCardNo.substr(8, 2))) // 判断当前月分与编码中的月份大小
				return year1 - ("19" + idCardNo.substr(6, 2)); else return year1 - ("19" + idCardNo.substr(6, 2)) - 1;
		} else if (idCardNo.length == 18) {
			// 18位身份证
			var date1 = new Date();
			// 取得当前日期
			var year1 = date1.getFullYear();
			// 取得当前年份
			var month1 = date1.getMonth();
			// 取得当前月份
			if (month1 > parseInt(idCardNo.substr(10, 2))) // 判断当前月分与编码中的月份大小
				return year1 - idCardNo.substr(6, 4); else return year1 - idCardNo.substr(6, 4) - 1;
		}
	} else {
		return "";
	}
}

// 去掉undefined
function removeUndefined(s) {
	if (typeof s == "undefined") {
		s = "";
	}
	return s;
}

// 把undefined或空字符串替换为--
function removeUndefinedToMinus(s) {
	if (typeof s == "undefined" || s == "") {
		return "--";
	} else {
		return s;
	}
}

//未登录者返回到登录页面
function mErrorTips(message){
	if(message == "NEED_LOGIN"){
		alert("对不起，您还未登录！");
		window.location.href = "/pages/login.html";
	}else{
		alert(message);
	}
}

//去空格
function trim(str) {
	return str.replace(/\s/g, "");
}

// 页面显示时，字符串转换异常信息
function excepStrFilter(input) {
	if (input == null) {
		return "";
	} else if (typeof input === undefined) {
		return "";
	} else if (input != null) {
		return input;
	} else if (isNaN(input)) {
		return "";
	} else {
		return input;
	}
}

// 页面显示时，数字转换异常信息
function excepIntFilter(input) {
	if (input == null) {
		return 0;
	} else if (typeof input === undefined) {
		return 0;
	} else if (isNaN(input)) {
		return 0;
	} else {
		return input;
	}
}

//字符截取中英文都能用
function strLimit(str, len){
	var newLength = 0;
	var newStr = "";
	var chineseRegex = /[^\x00-\xff]/g;
	var singleChar = "";
	var strLength = str.replace(chineseRegex, "**").length;
	for (var i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString();
		if (singleChar.match(chineseRegex) != null) {
			newLength += 2;
		} else {
			newLength++;
		}
		if (newLength > len) {
			break;
		}
		newStr += singleChar;
	}
	if (strLength > len) {
		newStr += "...";
	}
	return newStr;
}

/**
 * 截取字符串(支持中英文混合),中文占两个字符
 * @param str
 * @param n
 * @returns
 */
function subChinese(str, n) {
	if (!str || n <= 0) return "";
	var r = /[^\x00-\xff]/g;
	if (str.replace(r, "mm").length <= n) {
		return str;
	}
	var m = Math.floor(n / 2);
	for (var i = m; i < str.length; i++) {
		if (str.substr(0, i).replace(r, "mm").length >= n) {
			return str.substr(0, i) + "...";
		}
	}
	return str;
}

/*
 *Date类型
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2014-01-02 04:07:14.223
 *(new Date()).Format("yyyy-M-d h:m:s.S") ==> 2014-bootstrap.3.3.5-1 14:19:7.19
 */
Date.prototype.Format = function(fmt) {
	var o = {
		"M+":this.getMonth() + 1,
		// 月份
		"d+":this.getDate(),
		// 日
		"h+":this.getHours(),
		// 小时
		"m+":this.getMinutes(),
		// 分
		"s+":this.getSeconds(),
		// 秒
		"q+":Math.floor((this.getMonth() + 3) / 3),
		// 季度
		S:this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
	return fmt;
};

/*跨框架数据共享接口*/
var share = {
	/**
	 * 跨框架数据共享接口
	 * @param {String} 存储的数据名
	 * @param {Any} 将要存储的任意数据(无此项则返回被查询的数据)
	 */
	data:function(name, value) {
		var top = window.top, cache = top["_CACHE"] || {};
		top["_CACHE"] = cache;
		return value ? cache[name] = value :cache[name];
	},
	/**
	 * 数据共享删除接口
	 * @param {String} 删除的数据名
	 */
	removeData:function(name) {
		var cache = window.top["_CACHE"];
		if (cache && cache[name]) delete cache[name];
	}
};

/*
 * 通用打分组件
 * callBack打分后执行的回调
 * this.Index:获取当前选中值
 */
var pRate = function(box,callBack){
	this.Index = null;
	this.title = "";
	var B = $("#"+box),
		rate = B.children("i"),
		w = rate.width(),
		n = rate.length,
		me = this;
	for(var i=0;i<n;i++){
		rate.eq(i).css({
			'width':w*(i+1),
			'z-index':n-i
		});
	}
	rate.hover(function(){
		var S = B.children("i.active");
		$(this).addClass("hover").siblings().removeClass("hover");
		if($(this).index()>S.index()){
			S.addClass("hover");
		}
	},function(){
		rate.removeClass("hover");
	});
	rate.click(function(){
		rate.removeClass("active hover");
		$(this).addClass("active");
		me.Index = $(this).index() + 1;
		me.title = $(this).attr("title");
		if(callBack){callBack();}
	})
};

//日期格式化
function dateFormat(date){
	if(date){
		return (new Date(date)).Format("yyyy-MM-dd");
	}else{
		return "";
	}
}

//日期小时分钟格式化
function dateHoursMinFormat(date){
	if(date){
		return (new Date(date)).Format("yyyy-MM-dd hh:mm:ss");
	}else{
		return "";
	}
}
