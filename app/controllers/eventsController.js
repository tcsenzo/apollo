let helpers = require('../helpers'),
    config = require(`../config`),
    moment = require('moment');

class EventsController {

  index(req, res) {
    let theaterId = req.params.theaterId;

    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.theaterEventsApi}/theaters/${theaterId}`,
      cb: (apiError, apiRes, apiBody) => {
        res.render('events/index', {events: JSON.parse(apiBody).events});
      }
    });
  }

  new(req, res) {
    res.render('events/new', {theaterId: req.params.theaterId});
  }

  create(req, res) {
    let eventJSON = this.uglify(req.body);

    helpers.requestMid.request({
      url: `${config.theaterEventsApi}/events`,
      method: 'POST',
      req: req,
      res: res,
      jsonParams: eventJSON,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 201) {
          res.redirect('../eventos?newEvent=true');
        }
      }
    });
  }

  show(req, res) {
    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.theaterEventsApi}/events/${req.params.eventId}`,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200) {
          res.render('events/show', {'event': JSON.parse(apiBody)});
        }
      }
    });
  }

  uglify(event) {
    return {
      price: parseFloat(event.price.replace(',', '.')),
      original_price: parseFloat(event.original_price.replace(',', '.')),
      available_quantity: parseInt(event.available_quantity),
      scheduled_date: helpers.moment.humanToSystem(`${event.scheduled_date} ${event.scheduled_hour}`),
      name: event.name,
      description: event.description,
      image: event.image,
      theater: {
        id: event.theater.id
      }
    }
  }
}

module.exports = new EventsController();
