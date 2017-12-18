'use strict';
(function () {

  var mapBlock = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var featuresListTemplate = document.querySelector('template').content.querySelector('.popup__features');
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
  var onMainPinMouseup = function () {
    mapBlock.classList.remove('map--faded');
    window.util.removeChildren(featuresListTemplate);
    generateSimilarAds(8);
    window.util.appendRendered(window.pin.renderPins, similarAds, window.pin.mapPins);
    window.util.insertRenderedBefore(window.card.renderFeaturePopup, similarAds, mapBlock, mapFiltersContainer);
    window.util.closePopup();
    window.form.enableFormFields();
    window.form.setTimeValue();
    window.form.setLodgingMinPrice();
    window.form.setGuestsValue();
    window.form.checkValidity();
    window.pin.mainPin.removeEventListener('mouseup', onMainPinMouseup);
  };
  window.form.disableFormFields();
  window.pin.mapPins.addEventListener('click', window.util.clickHandler);
  window.pin.mapPins.addEventListener('keydown', window.util.isEsc);
  window.pin.mapPins.addEventListener('keydown', window.util.isEnter);
  window.pin.mainPin.addEventListener('mouseup', onMainPinMouseup);
})();
