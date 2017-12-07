'use strict';

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
for (var i = 0; i < fieldset.length; i++) {
  fieldset[i].setAttribute('disabled', 'disabled');
}

var onMainPinMouseup = function () {
  mapBlock.classList.remove('map--faded');
  removeChildren(featuresListTemplate);
  generateSimilarAds(8);
  appendRendered(renderPins, mapPinsBlock);
  insertRenderedBefore(renderFeaturePopup, mapBlock, mapFiltersContainer);
  for (var j = 0; j < fieldset.length; j++) {
    fieldset[j].removeAttribute('disabled');
  }
  form.classList.remove('notice__form--disabled');
  mainPin.removeEventListener('mouseup', onMainPinMouseup);
};

mainPin.addEventListener('mouseup', onMainPinMouseup);


var selectedPin;
var selectPin = function (node) {
  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
  }
  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
};

var clickHandler = function (evt) {
  var target = evt.target;
  while (target !== mapPins) {
    if (target.tagName === 'BUTTON') {
      selectPin(target);
      return;
    }
    target = target.parentNode;
  }
};


mapPins.addEventListener('click', clickHandler);


var popup = document.querySelectorAll('.popup');
var closePopup = function () {
  popup.classList.add('hidden');
};
var openPopup = function () {
  popup.classList.remove('hidden');
};
