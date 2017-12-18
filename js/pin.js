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
})();
