'use strict';

(function () {
  var fieldset = document.querySelectorAll('.notice__form fieldset');
  var form = document.querySelector('.notice__form');
  var notice = document.querySelector('.notice');
  var noticeForm = document.querySelector('.notice__form');
  var inputs = noticeForm.querySelectorAll('.form__element input');
  var formSubmit = notice.querySelector('.form__submit');
  var capacity = notice.querySelector('#capacity');
  var roomCount = notice.querySelector('#room_number');
  var roomToCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['noGuests']
  };
  var capacityMap = {
    1: {
      value: '1',
      text: 'для 1 гостя'
    },
    2: {
      value: '2',
      text: 'для 2 гостей'
    },
    3: {
      value: '3',
      text: 'для 3 гостей'
    },
    noGuests: {
      value: '0',
      text: 'не для гостей'
    }
  };

  var resetFormToDefault = function () {
    var title = notice.querySelector('#title');
    var type = notice.querySelector('#type');
    var price = notice.querySelector('#price');
    var timeIn = notice.querySelector('#timein');
    var timeOut = notice.querySelector('#timeout');
    var description = notice.querySelector('#description');
    var features = notice.querySelectorAll('.form__element input');
    var preview = document.querySelector('.notice__preview img');
    var formPhotoContainer = document.querySelector('.form__photo-container');
    var formPhotoContainerImgs = document.querySelectorAll('.form__photo-container img');
    if (title) {
      title.value = '';
    }
    type.value = window.data.offerType[2];
    price.value = window.data.offerDefaultPrice;
    price.placeholder = window.data.offerMinPrice;
    price.min = window.data.offerMinPrice;
    timeIn.value = window.data.offerTimes[1];
    timeOut.value = window.data.offerTimes[1];
    roomCount.value = window.data.offerDefaultRoomCount;
    preview.src = 'img/muffin.png';
    window.util.removeImg(formPhotoContainer, formPhotoContainerImgs);
    window.pin.mainPin.style.left = '600px';
    window.pin.mainPin.style.top = '375px';
    window.pin.getMainPinLocation();
    window.form.updateSelectOptions(capacity, roomToCapacity[roomCount.value]);
    if (description) {
      description.value = '';
    }
    if (features) {
      features.forEach(function (item) {
        item.checked = false;
      });
    }
  };


  formSubmit.addEventListener('click', function (evt) {
    var isFormCorrect = true;
    var formInputs = notice.querySelectorAll('input');
    formInputs.forEach(function (item) {
      if (!item.validity.valid) {
        isFormCorrect = false;
      }
    });
    if (isFormCorrect) {
      if (form) {
        evt.preventDefault();
        window.backend.send(new FormData(form), resetFormToDefault, window.util.onError);
      }
    }
  });
  window.form = {
    removeElements: function (parent) {
      var option = document.createElement('option');
      parent.forEach(function (item) {
        item.remove();
      });
      option.value = capacityMap[1].value;
      option.textContent = capacityMap[1].text;
      capacity.appendChild(option);
    },
    updateSelectOptions: function (select, options) {
      window.util.removeChildren(select);
      options.forEach(function (item) {
        var option = document.createElement('option');
        option.value = capacityMap[item].value;
        option.textContent = capacityMap[item].text;
        select.appendChild(option);
      });
    },
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
