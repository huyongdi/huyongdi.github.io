define(function (require, exports, module) {
  var $ = require("jquery");

  function Common() {

    /**
     * 当列表内字过长会自动隐藏，鼠标放上去展开
     */
    this.bindTdWordWrapToggle = function () {
      $(".nowrap").bind("mouseover", function () {
        $(this).removeClass("nowrap");
        $(this).addClass("word-wrap");
      });
      $(".nowrap").bind("mouseout", function () {
        $(this).removeClass("word-wrap");
        $(this).addClass("nowrap");
      });
      $(".word-wrap").bind("mouseover", function () {
        $(this).removeClass("nowrap");
        $(this).addClass("word-wrap");
      });
      $(".word-wrap").bind("mouseout", function () {
        $(this).removeClass("word-wrap");
        $(this).addClass("nowrap");
      });
    };
    
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

  }


  module.exports = Common;
});
