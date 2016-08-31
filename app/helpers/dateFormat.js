let dateFormat = require(`dateformat`);

class DateFormat {
  format(dateString, pattern) {
    return dateFormat(dateString, pattern);
  }

  brDate(dateString) {
    return dateFormat(dateString, `dd/mm/yyyy`);
  }

  brDateWithTime(dateString) {
    return dateFormat(dateString, `dd/mm/yyyy HH:MM`);
  }

  timeOnly(dateString) {
    return dateFormat(dateString, `HH:MM`);
  }
}

module.exports = new DateFormat();
