let request = require(`request`),
    config = require(`../config`);

class Event {
  all(cb) {
    request.get(`${config.theaterEventsApi}/events`, (error, response, body) => {
      cb(error, response, body);
    });
  }

  getById(id, cb) {
    request.get(`${config.theaterEventsApi}/events/${id}`, (error, response, body) => {
      cb(error, response, body);
    });
  }
}

module.exports = new Event();
