'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.notice__photo .upload input[type=file]');
  var formPhotoContainerInput = document.querySelector('.form__photo-container .upload input[type=file]');
  var formPhotoContainer = document.querySelector('.form__photo-container');
  var preview = document.querySelector('.notice__preview img');
  var dropZone = document.querySelector('.notice__photo .drop-zone');
  var photoContainerDropZone = document.querySelector('.form__photo-container .drop-zone');
  var onDragHandler = function (e) {
    e.stopPropagation();
    e.preventDefault();
  };
  var fileHandler = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  };
  var onFilesDropHandler = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    var fileName = file.name.toLowerCase();
    var img = document.createElement('img');
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        img.style.width = '200px';
        img.style.height = '200px';
        formPhotoContainer.appendChild(img);
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  var onFilesSelect = function () {
    var file = formPhotoContainerInput.files[0];
    var fileName = file.name.toLowerCase();
    var img = document.createElement('img');
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        img.style.width = '200px';
        img.style.height = '200px';
        formPhotoContainer.appendChild(img);
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  fileChooser.addEventListener('change', fileHandler);
  formPhotoContainerInput.addEventListener('change', onFilesSelect);
  dropZone.addEventListener('dragenter', onDragHandler);
  dropZone.addEventListener('dragleave', onDragHandler);
  dropZone.addEventListener('dragover', onDragHandler);
  dropZone.addEventListener('drop', fileHandler);
  photoContainerDropZone.addEventListener('dragenter', onDragHandler);
  photoContainerDropZone.addEventListener('dragleave', onDragHandler);
  photoContainerDropZone.addEventListener('dragover', onDragHandler);
  photoContainerDropZone.addEventListener('drop', onFilesDropHandler);
})();
