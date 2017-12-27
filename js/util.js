'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var debounceLastTimeout;
  var selectedPin;
  var selectPin = function (node) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('map__pin--active');
  };
  var body = document.body;
  var onClickRemove = function () {
    body.firstChild.remove();
    body.firstChild.remove();
    body.removeEventListener('click', onClickRemove);
  };
  window.util = {
    debounce: function (func) {
      if (debounceLastTimeout) {
        window.clearTimeout(debounceLastTimeout);
      }
      debounceLastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
    },
    onError: function (errorMessage) {
      var message = document.createElement('div');
      var overlay = document.createElement('div');
      overlay.style = 'z-index: 100; background-color: rgba(255, 255, 255, 0.5); width: 1200px; height: 100%; margin: 0 auto;';
      overlay.style.position = 'fixed';
      message.style = 'z-index: 1000; text-transform: uppercase; font-weight: bold; width: 1000px; margin: 0 auto; text-align: center; background-color: red; color: white; padding: 50px 0px;';
      message.style.position = 'absolute';
      message.style.top = 50 + '%';
      message.style.left = 0;
      message.style.right = 0;
      message.style.fontSize = '30px';
      message.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', message);
      body.addEventListener('click', onClickRemove);
      document.body.insertAdjacentElement('afterbegin', overlay);
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
    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    },
    removeImg: function (container, img) {
      img.forEach(function (item) {
        container.removeChild(item);
      });
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
        window.util.closePopup();
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
    selectByValue: function (select, value) {
      [].forEach.call(select.options, function (item, i) {
        if (item.value === value) {
          select.options.selectedIndex = i;
        }
      });
    },
    hideAdCard: function () {
      var activeCards = document.querySelectorAll('.popup');
      if (activeCards) {
        activeCards.forEach(function (item) {
          item.classList.add('hidden');
        });
      }
    }
  };
})();
