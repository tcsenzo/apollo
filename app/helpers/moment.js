let moment = require('moment');

class Moment {

  constructor() {
    this.humanFormat = 'DD/MM/YYYY HH:mm';
    this.systemFormat = 'YYYY-MM-DDTHH:mm:ss';
  }

  systemToHuman(dateString) {
    return moment(dateString, this.systemFormat).format(this.humanFormat);
  }

  humanToSystem(dateString) {
    return moment(dateString, this.humanFormat).format(this.systemFormat) + 'Z';
  }
}

module.exports = new Moment();
