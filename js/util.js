'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var selectedPin;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var selectPin = function (node) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('map__pin--active');
  };

  window.util = {
    randomNumberInRange: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    randomPrice: function () {
      return this.randomNumberInRange(1000, 1000000);
    },
    randomRooms: function () {
      return this.randomNumberInRange(1, 5);
    },
    randomGuests: function () {
      return this.randomNumberInRange(2, 6);
    },
    randomLocationX: function () {
      return this.randomNumberInRange(300, 900);
    },
    randomLocationY: function () {
      return this.randomNumberInRange(100, 500);
    },
    generateRandomItem: function (arr) {
      var item = Math.floor(Math.random() * arr.length);
      return arr[item];
    },
    closePopup: function () {
      var popupCloseBtn = document.querySelectorAll('.popup__close');
      for (var i = 0; i < popupCloseBtn.length; i++) {
        popupCloseBtn[i].addEventListener('click', function (evt) {
          var targetParent = evt.target.parentNode;
          targetParent.classList.add('hidden');
          selectedPin.classList.remove('map__pin--active');
        });
      }
    },
    generateRandomFeatures: function () {
      var arr = [];
      var startItem = Math.floor(Math.random() * 2);
      var lastItem = Math.floor(Math.random() * 6);
      for (var i = startItem; i <= lastItem; i++) {
        arr.push(window.data.offerFeatures[i]);
      }
      return arr;
    },
    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    },
    clickHandler: function (evt) {
      var target = evt.target;
      var targetSrc = target.src;
      while (target !== window.pin.mapPins) {
        if (target.tagName === 'BUTTON') {
          selectPin(target);
          window.showCard(targetSrc);
          return;
        }
        target = target.parentNode;
      }
    },
    isEnter: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
        var target = evt.target;
        var targetSrc = target.querySelector('img').src;
        selectPin(target);
        window.showCard(targetSrc);
      }
    },
    isEsc: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var popup = document.querySelectorAll('.popup');
        for (var i = 0; i < popup.length; i++) {
          popup[i].classList.add('hidden');
          selectedPin.classList.remove('map__pin--active');
        }
      }
    },
    appendRendered: function (element, arr, block) {
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(element(arr[i]));
      }
      return block.appendChild(fragment);
    },
    insertRenderedBefore: function (element, arr, insertBlock, beforeBlock) {
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(element(arr[i]));
      }
      return insertBlock.insertBefore(fragment, beforeBlock);
    },
    selectByValue: function (select, value) {
      [].forEach.call(select.options, function (item, i) {
        if (item.value === value) {
          select.options.selectedIndex = i;
        }
      });
    }
  };
})();
