window.jQuery = require('jquery');
window.$ = window.jQuery;

require('jquery-mask-plugin');
require('bootstrap/js/dropdown');

var UserTheatersSelect = require('./userTheatersSelect.js');
function Main() {
  new UserTheatersSelect();
}

new Main();
