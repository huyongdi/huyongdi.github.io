define(function (require, exports, module) {
  var $ = require("jquery");

  function Common() {
    /**
     * 弹出确认框，显示用户传入的提示信息
     * @param message  提示信息
     * @param callback  回调函数
     */
    this.confirm = function (message, callback) {
      var msg;
      msg = Messenger().post({
        message: message,
        hideAfter: 5,
        hideOnNavigate: true,
        actions: {
          retry: {
            label: '确定',
            auto: false,
            action: function () {
              callback();
              return msg.cancel();
            }
          },
          cancel: {
            label: '取消',
            action: function () {
              return msg.cancel();
            }
          }
        }
      });
    };
    
    this.alertInfo = function (content) {
      Messenger().post({
        type: 'info',
        message: content,
        hideAfter: 3,
        hideOnNavigate: true
      });
    };

    this.alertError = function (content) {
      Messenger().post({
        message: content,
        type: 'error',
        hideAfter: 3,
        showCloseButton: true
      });
    };

    this.alertSuccess = function (content) {
      Messenger().post({
        type: 'success',
        message: content,
        hideAfter: 2,
        hideOnNavigate: true
      });
    };

    /**
     * 百度统计-事件追踪
     * bc代表百度
     */
    this.eventTrace = function (label) {
      var title = document.title; //opt_label 事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
      var url = window.location.href;
      var index = url.lastIndexOf("/");
      var lastIndex = url.indexOf("?");

      var link = url.substring(index + 1, lastIndex); //opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
      window._hmt && window._hmt.push(['_trackEvent', label, 'click', title, link]);
      window._gaq && window._gaq.push(['_trackEvent', label]);
    };
  }


  module.exports = Common;
});
