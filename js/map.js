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

var SIMILAR_ADS = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },

    'offer': {
      'title': 'Большая уютная квартира',
      'address': '500, 200',
      'price': randomPrice(),
      'type': 'flat',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },

    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'flat',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },

    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'house',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user04.png'
    },

    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'house',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user05.png'
    },

    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'house',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user06.png'
    },

    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'house',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user07.png'
    },

    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'bungalo',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user08.png'
    },

    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '{{location.x}}, {{location.y}}',
      'price': randomPrice(),
      'type': 'bungalo',
      'rooms': randomRooms(),
      'guests': randomGuests(),
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': []
    },

    'location': {
      'x': randomLocationX(),
      'y': randomLocationY()
    }
  }
];
var fragment = document.createDocumentFragment();
var mapBlock = document.querySelector('.map');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapPinsBlock = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
mapBlock.classList.remove('map--faded');

var renderPins = function (pin) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = pin.location.x + 'px';
  mapPin.style.top = pin.location.y + 'px';
  mapPin.querySelector('.map__pin img').src = pin.author.avatar;
  return mapPin;
};

var renderFeaturePopup = function (popup) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('.map__card h3').textContent = popup.offer.title;
  mapCard.querySelector('.map__card p small').textContent = popup.location.x + ' ' + popup.location.y;
  mapCard.querySelector('.map__card .popup__price').textContent = popup.offer.price + '&#x20bd;/ночь'; // никак не выводится знак рубля
  mapCard.querySelector('.map__card h4 + p').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
  mapCard.querySelector('.map__card h4 + p + p').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;
  switch (popup.offer.type) {
    case 'flat':
      mapCard.querySelector('.map__card h4').textContent = 'Квартира';
      break;
    case 'house':
      mapCard.querySelector('.map__card h4').textContent = 'Дом';
      break;
    case 'bungalo':
      mapCard.querySelector('.map__card h4').textContent = 'Бунгало';
  }
  return mapCard;
  // помогите со списком преимуществ :))
};

for (var i = 0; i < SIMILAR_ADS.length; i++) {
  fragment.appendChild(renderPins(SIMILAR_ADS[i]));
}
mapPinsBlock.appendChild(fragment);

for (var j = 0; j < SIMILAR_ADS.length; j++) {
  fragment.appendChild(renderFeaturePopup(SIMILAR_ADS[j]));
}
mapBlock.insertBefore(fragment, mapFiltersContainer);

