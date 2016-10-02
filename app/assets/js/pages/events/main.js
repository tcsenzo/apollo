require('../../main');

var globals = {
  $fileInput: $('.event-image-input'),
  $uploadBtn: $('.event-upload-image-btn'),
  $imageHiddenField: $('.image-hidden-field'),
  $imageNamePlaceholder: $('.image-name-placeholder'),
  $loader: $('.upload-overlay'),
  $successIcon: $('.upload-container .fa-check')
}

function ImageUpload() {
  this.binds();
}

ImageUpload.prototype.binds = function () {
  globals.$uploadBtn.on('click', this.upload);
};

ImageUpload.prototype.upload = function (e) {
  e.preventDefault();

  var file = globals.$fileInput[0].files[0],
      formData = new FormData();

  formData.append('image', file);
  globals.$loader.fadeIn(100);

  $.ajax({
    url: '/image-upload',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
      if(data) {
        globals.$imageHiddenField.val(data.imageServerName);
        globals.$imageNamePlaceholder.html(data.imageName);

        globals.$successIcon.show();
      }

      globals.$loader.hide()
    }
  });
};

new ImageUpload();
