'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ARROW_HEIGHT = 22;
  var MAX_ADS_COUNT = 8;
  var DEFAULT_ADS_COUNT = 5;
  var filter = {
    features: []
  };
  var ads = [];
  var pinFromServer;
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var filterContainer = document.querySelector('.map__filters-container');
  var features = filterContainer.querySelector('#housing-features');
  var adrInput = document.querySelector('#address');
  window.pin = {
    mapPins: document.querySelector('.map__pins'),
    mainPin: document.querySelector('.map__pin--main'),
    renderPins: function (pin) {
      var mapPin = mapPinTemplate.cloneNode(true);
      mapPin.style.left = pin.location.x + 'px';
      mapPin.style.top = pin.location.y + 'px';
      mapPin.querySelector('.map__pin img').src = pin.author.avatar;
      return mapPin;
    },
    getMainPinLocation: function () {
      this.mainPin.style.left = '600px';
      this.mainPin.style.top = '375px';
      adrInput.value = 'x: ' + 600 + ', y: ' + 291;
    }
  };
  var createButton = function (ad) {
    var button = document.createElement('button');
    var img = document.createElement('img');
    button.classList.add('map__pin');
    button.style.left = (ad.location.x - IMG_WIDTH / 2) + 'px';
    button.style.top = (ad.location.y - (IMG_HEIGHT + ARROW_HEIGHT)) + 'px';
    img.src = ad.author.avatar;
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.draggable = false;
    button.appendChild(img);
    return button;
  };

  var checkPinByFilter = function (pin) {
    if (filter.housingType && pin.offer.type !== filter.housingType) {
      return false;
    }
    if (filter.housingPrice) {
      if (filter.housingPrice === 'low' && pin.offer.price > 10000) {
        return false;
      }
      if (filter.housingPrice === 'middle' && (pin.offer.price < 10000 || pin.offer.price > 50000)) {
        return false;
      }
      if (filter.housingPrice === 'high' && pin.offer.price < 50000) {
        return false;
      }
    }
    if (filter.housingRooms && pin.offer.rooms.toString() !== filter.housingRooms) {
      return false;
    }
    if (filter.housingGuests && pin.offer.guests.toString() !== filter.housingGuests) {
      return false;
    }
    var hasAllFeatures = filter.features.every(function (it) {
      return pin.offer.features.indexOf(it) >= 0;
    });
    return hasAllFeatures;
  };
  var onLoadAds = function (response) {
    pinFromServer = response;
    fillMapPin(true);
  };
  var fillMapPin = function (isFirstLoad) {
    if (!pinFromServer) {
      window.backend.load(onLoadAds, window.util.onError);
    } else {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      if (filter) {
        ads = pinFromServer.filter(checkPinByFilter);
      }
      if (isFirstLoad) {
        ads = ads.slice(0, DEFAULT_ADS_COUNT);
      } else {
        ads = ads.slice(0, MAX_ADS_COUNT);
      }
      ads.forEach(function (item) {
        fragment.appendChild(createButton(item));
      });
      window.util.closePopup();
      while (mapPins.childElementCount > 2) {
        mapPins.removeChild(mapPins.lastElementChild);
      }
      mapPins.appendChild(fragment);
    }
  };
  var addEventToSelectFilter = function (id, filterName) {
    var select = filterContainer.querySelector('#' + id);
    if (select) {
      select.addEventListener('change', function (evt) {
        var selectedItem = evt.target.value;
        if (selectedItem !== 'any') {
          filter[filterName] = selectedItem;
        } else {
          filter[filterName] = null;
        }
      });
    }
  };
  filterContainer.addEventListener('change', function () {
    window.util.debounce(fillMapPin);
    window.util.hideAdCard();
  });
  if (features) {
    features.addEventListener('change', function (evt) {
      var featureName = evt.target.value;
      if (evt.target.checked) {
        filter.features.push(featureName);
      } else {
        filter.features.splice(filter.features.indexOf(featureName), 1);
      }
    });
  }
  addEventToSelectFilter('housing-type', 'housingType');
  addEventToSelectFilter('housing-price', 'housingPrice');
  addEventToSelectFilter('housing-rooms', 'housingRooms');
  addEventToSelectFilter('housing-guests', 'housingGuests');
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
