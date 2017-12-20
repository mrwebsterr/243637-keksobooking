'use strict';

(function () {
  window.synchronize = function (el1, el2, mappingElement) {
    if (!mappingElement) {
      el1.addEventListener('change', function (evt) {
        for (var i = 0; i < el2.length; i++) {
          el2[i].removeAttribute('selected');
          if (evt.target.value === el2[i].value) {
            el2[i].setAttribute('selected', 'selected');
          }
          if (evt.target.value === '100') {
            el2[3].setAttribute('selected', 'selected');
          }
        }
      });
    } else {
      el1.addEventListener('change', function (mapEvt) {
        return (el2.minLength = mappingElement[mapEvt.target.value]);
      });
    }
  };
})();
