'use strict';
var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var randomNumberInRange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
var randomPrice = function () {
  return randomNumberInRange(1000, 1000000);
};
var randomRooms = function () {
  return randomNumberInRange(1, 5);
};
var randomGuests = function () {
  return randomNumberInRange(2, 6);
};
var randomLocationX = function () {
  return randomNumberInRange(300, 900);
};
var randomLocationY = function () {
  return randomNumberInRange(100, 500);
};
var generateRandomItem = function (arr) {
  var item = Math.floor(Math.random() * arr.length);
  return arr[item];
};
var generateRandomFeatures = function () {
  var arr = [];
  var startItem = Math.floor(Math.random() * 2);
  var lastItem = Math.floor(Math.random() * 6);
  for (var i = startItem; i <= lastItem; i++) {
    arr.push(offerFeatures[i]);
  }
  return arr;
};
var removeChildren = function (elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

var similarAds = [];

var generateSimilarAds = function (adsCount) {
  for (var i = 0; i < adsCount; i++) {
    var locationX = randomLocationX();
    var locationY = randomLocationY();
    similarAds.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': offerTitle[i],
        'address': locationX + ' ' + locationY,
        'price': randomPrice(),
        'type': generateRandomItem(offerType),
        'rooms': randomRooms(),
        'guests': randomGuests(),
        'checkin': generateRandomItem(offerTimes),
        'checkout': generateRandomItem(offerTimes),
        'features': generateRandomFeatures(),
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

var offerTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerTimes = ['12:00', '13:00', '14:00'];
var offerType = ['flat', 'house', 'bungalo'];
var offerTypeOutput = {'flat': {name: 'Квартира'}, 'house': {name: 'Дом'}, 'bungalo': {name: 'Бунгало'}};

var fragment = document.createDocumentFragment();
var mapBlock = document.querySelector('.map');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var featuresListTemplate = document.querySelector('template').content.querySelector('.popup__features');
var mapPinsBlock = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');


var renderPins = function (pin) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = pin.location.x + 'px';
  mapPin.style.top = pin.location.y + 'px';
  mapPin.querySelector('.map__pin img').src = pin.author.avatar;
  return mapPin;
};
var renderFeaturePopup = function (popup) {
  var mapCard = mapCardTemplate.cloneNode(true);
  var featuresList = mapCard.querySelector('.map__card .popup__features');

  mapCard.querySelector('.map__card h3').textContent = popup.offer.title;
  mapCard.querySelector('.map__card p small').textContent = popup.location.x + ' ' + popup.location.y;
  mapCard.querySelector('.map__card .popup__price').textContent = popup.offer.price + '₽/ночь';
  mapCard.querySelector('.map__card h4 + p').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
  mapCard.querySelector('.map__card h4 + p + p').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;
  mapCard.querySelector('.map__card h4').textContent = offerTypeOutput[popup.offer.type].name;
  mapCard.querySelector('.popup img').src = popup.author.avatar;
  for (var j = 0; j < popup.offer.features.length; j++) {
    var li = document.createElement('li');
    li.classList = 'feature feature--' + popup.offer.features[j];
    featuresList.appendChild(li);
  }
  mapCard.classList.add('hidden');
  return mapCard;
};

var appendRendered = function (element, block) {
  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(element(similarAds[i]));
  }
  return block.appendChild(fragment);
};

// Функция добавляет элементы в insertBlock перед beforeBlock
var insertRenderedBefore = function (element, insertBlock, beforeBlock) {
  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(element(similarAds[i]));
  }
  return insertBlock.insertBefore(fragment, beforeBlock);
};

var mainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var fieldset = document.querySelectorAll('.notice__form fieldset');
var form = document.querySelector('.notice__form');
var selectedPin;

var disableFormFields = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute('disabled', 'disabled');
  }
};
var enableFormFields = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled');
  }
  form.classList.remove('notice__form--disabled');
};

var onMainPinMouseup = function () {
  mapBlock.classList.remove('map--faded');
  removeChildren(featuresListTemplate);
  generateSimilarAds(8);
  appendRendered(renderPins, mapPinsBlock);
  insertRenderedBefore(renderFeaturePopup, mapBlock, mapFiltersContainer);
  enableFormFields();
  closePopup();
  mainPin.removeEventListener('mouseup', onMainPinMouseup);
};

var selectPin = function (node) {
  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
  }
  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
};

var clickHandler = function (evt) {
  var target = evt.target;
  var targetSrc = target.src;
  while (target !== mapPins) {
    if (target.tagName === 'BUTTON') {
      selectPin(target);
      openPopup(targetSrc);
      return;
    }
    target = target.parentNode;
  }
};
var keyDownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    var target = evt.target.querySelector('img');
    var targetSrc = target.src;
    selectPin(evt.target);
    openPopup(targetSrc);
  }
};

var closePopup = function () {
  var popupCloseBtn = document.querySelectorAll('.popup__close');
  for (var i = 0; i < popupCloseBtn.length; i++) {
    popupCloseBtn[i].addEventListener('click', function (evt) {
      var targetParent = evt.target.parentNode;
      targetParent.classList.add('hidden');
      selectedPin.classList.remove('map__pin--active');
    });
  }
};
var openPopup = function (target) {
  var popup = document.querySelectorAll('.popup');
  for (var i = 0; i < popup.length; i++) {
    popup[i].classList.add('hidden');
    if (target === popup[i].querySelector('img').src) {
      popup[i].classList.remove('hidden');
    }
  }
};

disableFormFields();
mapPins.addEventListener('click', clickHandler);
mapPins.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    var popup = document.querySelectorAll('.popup');
    for (var i = 0; i < popup.length; i++) {
      popup[i].classList.add('hidden');
      selectedPin.classList.remove('map__pin--active');
    }
  }
});
mapPins.addEventListener('keydown', keyDownHandler);
mainPin.addEventListener('mouseup', onMainPinMouseup);
