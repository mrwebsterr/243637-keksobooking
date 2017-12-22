'use strict';

(function () {
  window.synchronize = function (el1, el2, mappingElement, callback) {
    el1.addEventListener('change', function (evt) {
      var el2Value;
      if (el1.tagName === 'SELECT') {
        el2Value = mappingElement[evt.target.options[evt.target.options.selectedIndex].value];
      } else {
        el2Value = mappingElement[evt.target.value];
      }
      callback(el2, el2Value);
    });
  };
})();

