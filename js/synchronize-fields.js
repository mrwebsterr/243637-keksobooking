'use strict';

(function () {
  window.synchronize = function (el1, el2, mappingElement, callback) {
    el1.addEventListener('change', function (evt) {
      var selectedOptionValue = evt.target.options[evt.target.options.selectedIndex].value;
      var el2Value = el1.tagName === 'SELECT' ? mappingElement[selectedOptionValue] : mappingElement[evt.target.value];
      callback(el2, el2Value);
    });
  };
})();

