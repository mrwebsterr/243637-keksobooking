'use strict';

(function () {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  window.pin = {
    renderPins: function (pin) {
      var mapPin = mapPinTemplate.cloneNode(true);
      mapPin.style.left = pin.location.x + 'px';
      mapPin.style.top = pin.location.y + 'px';
      mapPin.querySelector('.map__pin img').src = pin.author.avatar;
      return mapPin;
    },
    mapPins: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main')
  };
  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      var mainPinHeight = 84;
      var maxTopPoint = 100;
      var maxBottomPoint = 500;
      var mainPinX = (window.pin.mainPin.offsetLeft - shift.x);
      var mainPinY = (window.pin.mainPin.offsetTop - (shift.y + mainPinHeight));
      if (mainPinY < maxTopPoint || mainPinY > maxBottomPoint) {
        return;
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var adrInput = document.querySelector('#address');
      adrInput.value = 'x: ' + mainPinX + ', y: ' + mainPinY;
      window.pin.mainPin.style.top = (mainPinY + mainPinHeight) + 'px';
      window.pin.mainPin.style.left = mainPinX + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.pin.mapPins.removeEventListener('mousemove', onMouseMove);
      window.pin.mapPins.removeEventListener('mouseup', onMouseUp);

    };
    window.pin.mapPins.addEventListener('mousemove', onMouseMove);
    window.pin.mapPins.addEventListener('mouseup', onMouseUp);
  };
  window.pin.mainPin.addEventListener('mousedown', onMouseDown);
})();
