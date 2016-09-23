let moment = require('moment');

class Moment {

  constructor() {
    this.humanFormat = 'DD/MM/YYYY HH:mm';
  }

  systemToHuman(dateString) {
    return moment(dateString).format(this.humanFormat);
  }

  humanToSystem(dateString) {
    return moment(dateString, this.humanFormat).utc().format();
  }
}

module.exports = new Moment();
