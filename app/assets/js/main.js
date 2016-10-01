window.jQuery = require('jquery');
window.$ = window.jQuery;

require('jquery-mask-plugin');
require('bootstrap/js/dropdown');
require('jquery-form-validator');

require('./formValidator');

var UserTheatersSelect = require('./userTheatersSelect.js');
function Main() {
  new UserTheatersSelect();
}

new Main();
