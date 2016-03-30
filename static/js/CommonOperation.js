/**
 * Created by yanhan on 2015/8/21.
 */
define(function (require, exports, module) {
  var $ = require("jquery");
  require("poshytip");
  require("jCookie");
  require("raty");
  require("validate");
  require("validate_extend");
  require("jquery-ui");
  require("select");

  function CommonOperation() {

    this.compare = function compare(date1, date2) {
      date1 = date1.replace(/\-/gi, "");
      date2 = date2.replace(/\-/gi, "");
      var time1 = parseInt(date1);
      var time2 = parseInt(date2);
      if (time1 > time2) {
        return 1;
      } else if (time1 == time2) {
        return 0;
      } else {
        return -1;
      }
    }

    this.jdmoney = function (money) {
      var t = /^\d+(\.\d+)?$/;
      return t.test(money)
    }

    this.isBeforeToday = function (startTimeStr) {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var todayStr = "" + year + "-" + (month < 10 ? "0" + month : "" + month) + "-" +
          (day < 10 ? "0" + day : "" + day);
      if (this.compare(todayStr, startTimeStr) == 1) {
        return true;
      } else {
        return false;
      }
    }

    this.formatDate = function (timestamp) {
      var date = new Date(parseInt(timestamp));

      var yearStr = "" + date.getFullYear();
      var month = date.getMonth() + 1;
      var monthStr = "";
      if (month < 10) {
        monthStr = "0" + month;
      } else {
        monthStr = "" + month;
      }
      var day = date.getDate();
      var dayStr = "";
      if (day < 10) {
        dayStr = "0" + day;
      } else {
        dayStr = "" + day;
      }
      return yearStr + "-" + monthStr + "-" + dayStr;
    }

    this.formatTime = function (timestamp) {
      var date = new Date(parseInt(timestamp));

      var yearStr = "" + date.getFullYear();
      var month = date.getMonth() + 1;
      var monthStr = "";
      if (month < 10) {
        monthStr = "0" + month;
      } else {
        monthStr = "" + month;
      }
      var day = date.getDate();
      var dayStr = "";
      if (day < 10) {
        dayStr = "0" + day;
      } else {
        dayStr = "" + day;
      }

      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var hourStr = (hour < 10 ? "0" + hour : "" + hour);
      var minuteStr = (minute < 10 ? "0" + minute : "" + minute);
      var secondStr = (second < 10 ? "0" + second : "" + second);

      return yearStr + "-" + monthStr + "-" + dayStr + " " + hourStr + ":" + minuteStr + ":" +
          secondStr;
    }

    this.alertInfo = function (content, callback) {
      var popHtml = '<div id="j_poplayer_info" class="m-poplayer" style="display:none;"><div id="j_content_info"></div><input type="button" class="u-btn u-close" id="j_close_info" value="关闭"/></div><div id="j_bg_info" class="f-bg" style="display:none;"></div><div style="padding-top: 20px;"></div>';
      $("html").append(popHtml);
      $('#j_content_info').text(content);
      $('#j_poplayer_info').css("display", "block");
      $('#j_bg_info').css("display", "block");
      bindClose();
      function bindClose() {
        $("#j_close_info").unbind("click").bind("click", function () {
          $('#j_poplayer_info').css("display", "none");
          $('#j_bg_info').css("display", "none");
          if (callback && typeof callback != 'undefined' && callback != undefined) {
            callback();
          }
        });
      }

      bindEsc();
      function bindEsc() {
        $(document).unbind("keyup").bind("keyup", function (event) {
          if (event.keyCode == 27) {
            $('#j_poplayer_info').css("display", "none");
            $('#j_bg_info').css("display", "none");
          }
        });
      }
    }

    this.alertError = function (content) {
      var popHtml = '<div id="j_poplayer_error" class="m-poplayer" style="display:none;"><div id="j_content_error" class="u-content f-error"></div><input type="button" class="u-btn u-close" id="j_close_error" value="关闭"/></div><div id="j_bg_error" class="f-bg" style="display:none;"></div><div style="padding-top: 20px;"></div>';
      $("html").append(popHtml);
      $('#j_content_error').text(content);
      $('#j_poplayer_error').css("display", "block");
      $('#j_bg_error').css("display", "block");
      bindClose();
      function bindClose() {
        $("#j_close_error").unbind("click").bind("click", function () {
          $('#j_poplayer_error').css("display", "none");
          $('#j_bg_error').css("display", "none");
        });
      }

      bindEsc();
      function bindEsc() {
        $(document).unbind("keyup").bind("keyup", function (event) {
          if (event.keyCode == 27) {
            $('#j_poplayer_error').css("display", "none");
            $('#j_bg_error').css("display", "none");
          }
        });
      }
    }
    /**
     * 弹出确认对话框
     * @param content  对话框显示的提示消息
     * @param okCallback   点击确定的回调函数
     * @param cancelCallback  点击取消的回调函数
     */
    this.alertConfirm = function (content, okCallback, cancelCallback) {
      var popHtml = '<div id="j_poplayer_confirm" class="m-poplayer" style="display:none;"><div id="j_content_confirm" class="u-content"></div><input type="button" class="u-btn u-ok" id="j_ok_confirm" value="确定"/><input type="button" class="u-btn u-cancel" id="j_cancel_confirm" value="取消"/></div><div id="j_bg_confirm" class="f-bg" style="display:none;"></div><div style="padding-top: 20px;"></div>';
      $("html").append(popHtml);
      $('#j_content_confirm').text(content);
      $('#j_poplayer_confirm').css("display", "block");
      $('#j_bg_confirm').css("display", "block");
      bindOk(okCallback);
      bindCancel(cancelCallback);
      function bindOk(okCallback) {
        $("#j_ok_confirm").unbind("click").bind("click", function () {
          try {
            okCallback();
          } catch (e) {
          }
          $('#j_poplayer_confirm').css("display", "none");
          $('#j_bg_confirm').css("display", "none");
        });
      }

      function bindCancel(cancelCallback) {
        $("#j_cancel_confirm").unbind("click").bind("click", function () {
          try {
            cancelCallback();
          } catch (e) {
          }
          $('#j_poplayer_confirm').css("display", "none");
          $('#j_bg_confirm').css("display", "none");
        });
      }

      bindEsc();
      function bindEsc() {
        $(document).unbind("keyup").bind("keyup", function (event) {
          if (event.keyCode == 27) {
            $('#j_poplayer_confirm').css("display", "none");
            $('#j_bg_confirm').css("display", "none");
          }
        });
      }
    };


    this.getUrlParam = function (name) {
      var url = window.location.href;
      var value = "";
      if (url.indexOf("?") > 0) {
        var paramStr = $.trim(url.substr(url.indexOf('?') + 1));
        paramStr = paramStr.replace('#', '');
        if (paramStr != "") {
          var paramArr = paramStr.split('&');
          if (paramArr != null && paramArr.length > 0) {
            for (var i = 0; i < paramArr.length; i++) {
              var arr = paramArr[i].split('=');
              if (arr != null && arr.length == 2) {
                if (arr[0] == name) {
                  value = arr[1];
                  break;
                }
              }
            }
          }
        }
      }
      return value;
    }

    this.toDecimal2 = function (x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return "0.00";
      }
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      return s;
    }

    this.toDecimal3 = function (x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return "";
      }
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      return s;
    }

    /**
     * 截取字符串(支持中英文混合),中文占两个字符
     * @param str
     * @param n
     * @returns
     */
    this.subChinese = function (str, n) {
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

    // 是否为1到100的数
    this.isBetween1And100 = function (num) {

      var type = "^([0-9]|[1-9][0-9]|100)$";
      var re = new RegExp(type);

      if (num.match(re) == null) {
        return false;
      }

      return true;
    };

    //是否为正整数
    this.isPositiveNum = function (num) {
      var type = /^([0-9]|[1-9][0-9]+)$/;
      var re = new RegExp(type);

      if (num.match(re) == null) {
        return false;
      }

      return true;
    };

    this.IsURL = function (str_url) {
      var reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/;
      return reg.test(str_url);
    };

    /**
     * 获取a标签、a标签中的href值、文本
     * @param aString  [a标签,href值,文本]
     */
    this.getATagHref = function (aString) {
      var reg = /<a.+?href="(.*?)".*?>(.*?)<\/a>/g;
      return reg.exec(aString);
    };

    /*
     *Date类型
     *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2014-01-02 04:07:14.223
     *(new Date()).Format("yyyy-M-d h:m:s.S") ==> 2014-5-1 14:19:7.19
     */
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,
        // 月份
        "d+": this.getDate(),
        // 日
        "h+": this.getHours(),
        // 小时
        "m+": this.getMinutes(),
        // 分
        "s+": this.getSeconds(),
        // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // 季度
        S: this.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt =
          fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      return fmt;
    };

    //例如：fromat = "yyyy-MM-dd hh:mm:ss"
    this.dateFormat = function (date, fromat) {
      if (date) {
        return (new Date(date)).Format(fromat);
      } else {
        return "";
      }
    };

    module.exports = CommonOperation;
  }
});
