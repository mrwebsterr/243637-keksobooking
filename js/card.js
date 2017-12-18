'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.card = {
    renderFeaturePopup: function (popup) {
      var mapCard = mapCardTemplate.cloneNode(true);
      var featuresList = mapCard.querySelector('.map__card .popup__features');

      mapCard.querySelector('.map__card h3').textContent = popup.offer.title;
      mapCard.querySelector('.map__card p small').textContent = popup.location.x + ' ' + popup.location.y;
      mapCard.querySelector('.map__card .popup__price').textContent = popup.offer.price + '₽/ночь';
      mapCard.querySelector('.map__card h4 + p').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
      mapCard.querySelector('.map__card h4 + p + p').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;
      mapCard.querySelector('.map__card h4').textContent = window.data.offerTypeOutput[popup.offer.type].name;
      mapCard.querySelector('.popup img').src = popup.author.avatar;
      for (var j = 0; j < popup.offer.features.length; j++) {
        var li = document.createElement('li');
        li.classList = 'feature feature--' + popup.offer.features[j];
        featuresList.appendChild(li);
      }
      mapCard.classList.add('hidden');
      return mapCard;
    }
  };
})();
