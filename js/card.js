'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var getFeatures = function (context, features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (item) {
      var liElement = document.createElement('li');
      liElement.classList.add('feature');
      liElement.classList.add('feature--' + item);
      fragment.appendChild(liElement);
    });
    window.util.removeChildren(context);
    context.appendChild(fragment);
  };
  window.card = {
    renderFeaturePopup: function (popup) {
      var mapCard = mapCardTemplate.cloneNode(true);
      mapCard.querySelector('.map__card h3').textContent = popup.offer.title;
      mapCard.querySelector('.map__card p small').textContent = popup.offer.address;
      mapCard.querySelector('.map__card .popup__price').textContent = popup.offer.price + '₽/ночь';
      mapCard.querySelector('.map__card h4 + p').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
      mapCard.querySelector('.map__card h4 + p + p').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;
      mapCard.querySelector('.map__card h4').textContent = window.data.offerTypeOutput[popup.offer.type].name;
      mapCard.querySelector('.popup img').src = popup.author.avatar;
      getFeatures(mapCard.querySelector('.popup__features'), popup.offer.features);
      mapCard.classList.add('hidden');
      return mapCard;
    }
  };
})();
