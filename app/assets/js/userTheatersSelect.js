function UserTheatersSelect() {
  var that = this;
  $(document).ready(function() {
    that.$select = $('.user-theaters-options');
    if(that.$select) {
      that.setCurrentTheater(that);
      that.$select.on('change', {'that': that}, that.onSelectChange)
    }
  });
}

UserTheatersSelect.prototype.setCurrentTheater = function (that) {
  var urlPathArray = location.pathname.split('/');

  urlPathArray.forEach(function(value, i) {
    if(value && value === 'teatros') {
      that.$select.val(urlPathArray[++i]);
    }
  });
};

UserTheatersSelect.prototype.onSelectChange = function (e) {
  location.href = '/teatros/' + this.value + '/eventos';
};

module.exports = UserTheatersSelect;
