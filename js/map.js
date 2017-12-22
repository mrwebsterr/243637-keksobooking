'use strict';
(function () {

  var mapBlock = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var featuresListTemplate = document.querySelector('template').content.querySelector('.popup__features');
  var notice = document.querySelector('.notice');
  var roomCount = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
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
  var capacityMap = {
    1: {
      value: '1',
      text: 'для 1 гостя'
    },
    2: {
      value: '2',
      text: 'для 2 гостей'
    },
    3: {
      value: '3',
      text: 'для 3 гостей'
    },
    noGuests: {
      value: '0',
      text: 'не для гостей'
    }
  };
  var setMinValue = function (element, type) {
    element.minLength = type;
  };

  var similarAds = [];
  var generateSimilarAds = function (adsCount) {
    for (var i = 0; i < adsCount; i++) {
      var locationX = window.util.randomLocationX();
      var locationY = window.util.randomLocationY();
      similarAds.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': window.data.offerTitle[i],
          'address': locationX + ' ' + locationY,
          'price': window.util.randomPrice(),
          'type': window.util.generateRandomItem(window.data.offerType),
          'rooms': window.util.randomRooms(),
          'guests': window.util.randomGuests(),
          'checkin': window.util.generateRandomItem(window.data.offerTimes),
          'checkout': window.util.generateRandomItem(window.data.offerTimes),
          'features': window.util.generateRandomFeatures(),
          'description': '',
          'photos': []
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
    }
  };
  var updateSelectOptions = function (select, options) {
    window.util.removeChildren(select);
    options.forEach(function (item) {
      var option = document.createElement('option');
      option.value = capacityMap[item].value;
      option.textContent = capacityMap[item].text;
      select.appendChild(option);
    });
  };


  var onMainPinMouseup = function () {
    mapBlock.classList.remove('map--faded');
    window.util.removeChildren(featuresListTemplate);
    generateSimilarAds(8);
    window.util.appendRendered(window.pin.renderPins, similarAds, window.pin.mapPins);
    window.util.insertRenderedBefore(window.card.renderFeaturePopup, similarAds, mapBlock, mapFiltersContainer);
    window.util.closePopup();
    window.form.enableFormFields();
    window.form.checkValidity();
    window.synchronize(roomCount, capacity, roomToCapacity, updateSelectOptions);
    window.synchronize(timeInField, timeOutValue, timeInToTimeOut, window.util.selectByValue);
    window.synchronize(timeOutValue, timeInField, timeInToTimeOut, window.util.selectByValue);
    window.synchronize(lodgingType, lodgingPrice, lodgingTypeToMinPrice, setMinValue);
    window.pin.mainPin.removeEventListener('mouseup', onMainPinMouseup);
  };
  window.form.disableFormFields();
  window.pin.mapPins.addEventListener('click', window.util.clickHandler);
  window.pin.mapPins.addEventListener('keydown', window.util.isEsc);
  window.pin.mapPins.addEventListener('keydown', window.util.isEnter);
  window.pin.mainPin.addEventListener('mouseup', onMainPinMouseup);
})();
