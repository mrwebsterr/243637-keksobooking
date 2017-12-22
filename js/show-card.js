'use strict';

(function () {
  window.showCard = function (target) {
    var popup = document.querySelectorAll('.popup');
    for (var i = 0; i < popup.length; i++) {
      popup[i].classList.add('hidden');
      if (target === popup[i].querySelector('img').src) {
        popup[i].classList.remove('hidden');
      }
    }
  };
})();

