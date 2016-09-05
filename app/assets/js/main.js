window.$ = require('jquery');
require('jquery-mask-plugin');

var UserTheatersSelect = require('./userTheatersSelect.js');
function Main() {
  new UserTheatersSelect();
}

new Main();
