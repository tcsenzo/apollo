require('./ptBr.js');

function FormValidator() {
  $(document).ready(function() {
    $.validate();
  })
}

module.exports = new FormValidator();
