'use strict';
(function () {
  var ADS_COUNT = 8;
  var mapBlock = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var featuresListTemplate = document.querySelector('template').content.querySelector('.popup__features');
  var notice = document.querySelector('.notice');
  var roomCount = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  var capacityOptions = document.querySelectorAll('#capacity option');
  var lodgingType = document.querySelector('#type');
  var lodgingPrice = document.querySelector('#price');
  var timeInField = notice.querySelector('#timein');
  var timeOutValue = notice.querySelector('#timeout');

  var lodgingTypeToMinPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var roomToCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['noGuests']
  };
  var timeInToTimeOut = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };
  var setMinValue = function (element, type) {
    element.min = type;
    element.placeholder = type;
    if (+element.value < +element.min) {
      element.value = element.min;
    }
  };

  var fragment = document.createDocumentFragment();
  var appendRendered = function (pins) {
    for (var i = 0; i < ADS_COUNT; i++) {
      fragment.appendChild(window.pin.renderPins(pins[i]));
    }
    window.pin.mapPins.appendChild(fragment);
  };
  var insertRenderedBefore = function (cards) {
    for (var i = 0; i < ADS_COUNT; i++) {
      fragment.appendChild(window.card.renderFeaturePopup(cards[i]));
    }
    mapBlock.insertBefore(fragment, mapFiltersContainer);
  };
  var onMainPinMouseup = function () {
    mapBlock.classList.remove('map--faded');
    window.util.removeChildren(featuresListTemplate);
    window.backend.load(appendRendered, window.util.onError);
    window.backend.load(insertRenderedBefore, window.util.onError);
    window.form.enableFormFields();
    window.form.removeElements(capacityOptions);
    window.form.checkValidity();
    window.synchronize(roomCount, capacity, roomToCapacity, window.form.updateSelectOptions);
    window.synchronize(timeInField, timeOutValue, timeInToTimeOut, window.util.selectByValue);
    window.synchronize(timeOutValue, timeInField, timeInToTimeOut, window.util.selectByValue);
    window.synchronize(lodgingType, lodgingPrice, lodgingTypeToMinPrice, setMinValue);
    window.pin.getMainPinLocation();
    window.pin.mainPin.removeEventListener('mouseup', onMainPinMouseup);
  };
  window.form.disableFormFields();
  window.pin.mapPins.addEventListener('click', window.util.clickHandler);
  window.pin.mapPins.addEventListener('click', window.util.closePopup);
  window.pin.mapPins.addEventListener('keydown', window.util.isEsc);
  window.pin.mapPins.addEventListener('keydown', window.util.isEnter);
  window.pin.mainPin.addEventListener('mouseup', onMainPinMouseup);
})();
