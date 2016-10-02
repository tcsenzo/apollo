require('../../main');

var globals = {
  $fileInput: $('.event-image-input'),
  $uploadBtn: $('.event-upload-image-btn'),
  $imageHiddenField: $('.image-hidden-field'),
  $imageNamePlaceholder: $('.image-name-placeholder')
}

function ImageUpload() {
  this.binds();
  $(document).ready(function() {
    $.validate();
  })
}

ImageUpload.prototype.binds = function () {
  globals.$uploadBtn.on('click', this.upload);
};

ImageUpload.prototype.upload = function (e) {
  e.preventDefault();

  var file = globals.$fileInput[0].files[0],
      formData = new FormData();

  formData.append('image', file);

  $.ajax({
    url: '/image-upload',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
      debugger;
      if(data) {
        globals.$imageHiddenField.val(data.imageServerName);
        globals.$imageNamePlaceholder.html(data.imageName);
      }
    }
  });
};

new ImageUpload();
