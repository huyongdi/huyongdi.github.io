// encoding=utf-8
define(function (require, exports, module) {
  var $ = require("jquery");
  require("less");



  function init() {
    roll();
  }

  function roll() {
    'use strict';
//     var dots = 4;
    var sliderElem = document.querySelector('.slider');
    var dotElems = sliderElem.querySelectorAll('.slider__dot');
    var indicatorElem = sliderElem.querySelector('.slider__indicator');
    Array.prototype.forEach.call(dotElems, function (dotElem) {
      dotElem.addEventListener('click', function (e) {
        var currentPos = parseInt(sliderElem.getAttribute('data-pos'));
        var newPos = parseInt(dotElem.getAttribute('data-pos'));
        var newDirection = newPos > currentPos ? 'right' : 'left';
        var currentDirection = newPos < currentPos ? 'right' : 'left';
        indicatorElem.classList.remove('slider__indicator--' + currentDirection);
        indicatorElem.classList.add('slider__indicator--' + newDirection);
        sliderElem.setAttribute('data-pos', newPos);
      });
    });
  }


  module.exports = {
    "init": init
  };
});
