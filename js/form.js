'use strict';

(function () {
  var fieldset = document.querySelectorAll('.notice__form fieldset');
  var form = document.querySelector('.notice__form');
  var noticeForm = document.querySelector('.notice__form');
  var inputs = noticeForm.querySelectorAll('.form__element input');

  window.form = {
    disableFormFields: function () {
      for (var i = 0; i < fieldset.length; i++) {
        fieldset[i].setAttribute('disabled', 'disabled');
      }
    },
    enableFormFields: function () {
      for (var i = 0; i < fieldset.length; i++) {
        fieldset[i].removeAttribute('disabled');
      }
      form.classList.remove('notice__form--disabled');
    },
    checkValidity: function () {
      var onInvalidHandler = function (evt) {
        evt.target.style.borderColor = 'red';
      };
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('invalid', onInvalidHandler);
      }
    }
  };
})();
