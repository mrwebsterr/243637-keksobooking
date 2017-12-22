'use strict';

(function () {
  var responseHandle = function (xhr) {
    var error;
    switch (xhr.status) {
      case 200:
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
    }
    return error;
  };
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);
      xhr.addEventListener('load', function () {
        var error = responseHandle(xhr);
        if (error) {
          onError(error);
        } else {
          onLoad(xhr.response);
        }
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;
      xhr.send();
    },
    send: function (data, onLoad, onError) {
      var URL = 'https://1510.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL);
      xhr.addEventListener('load', function () {
        var error = responseHandle(xhr);
        if (error) {
          onError(error);
        } else {
          onLoad(xhr.response);
        }
      });
      xhr.send(data);
    }
  };
}());
