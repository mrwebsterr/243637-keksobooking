'use strict';

(function () {
  var fieldset = document.querySelectorAll('.notice__form fieldset');
  var form = document.querySelector('.notice__form');
  var lodgingType = document.querySelector('#type');
  var lodgingPrice = document.querySelector('#price');

  var roomNumber = document.querySelector('#room_number');
  var roomNumberValue = document.querySelectorAll('#room_number option');
  var guestsNumberValue = document.querySelectorAll('#capacity option');

  var noticeForm = document.querySelector('.notice__form');
  var inputs = noticeForm.querySelectorAll('.form__element input');

  var timeInField = document.querySelector('#timein');
  var timeInValue = document.querySelectorAll('#timein option');
  var timeOutValue = document.querySelectorAll('#timeout option');

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
    setTimeValue: function () {
      timeInField.addEventListener('change', function (evt) {
        for (var i = 0; i < timeInValue.length; i++) {
          timeOutValue[i].removeAttribute('selected');
          if (evt.target.value === timeOutValue[i].value) {
            timeOutValue[i].setAttribute('selected', 'selected');
          }
        }
      });
    },
    setLodgingMinPrice: function () {
      var lodgingTypeToMinPrice = {
        'bungalo': '0',
        'flat': '1000',
        'house': '5000',
        'palace': '10000'
      };
      lodgingType.addEventListener('change', function (evt) {
        return (lodgingPrice.minLength = lodgingTypeToMinPrice[evt.target.value]);
      });
    },
    setGuestsValue: function () {
      roomNumber.addEventListener('change', function (evt) {
        for (var i = 0; i < roomNumberValue.length; i++) {
          guestsNumberValue[i].removeAttribute('selected');
          if (evt.target.value === guestsNumberValue[i].value) {
            guestsNumberValue[i].setAttribute('selected', 'selected');
          }
        }
        if (evt.target.value === '100') {
          guestsNumberValue[3].setAttribute('selected', 'selected');
        }
      });
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
