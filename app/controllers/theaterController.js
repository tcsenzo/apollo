let helpers = require('../helpers'),
    config = require(`../config`),
    cookie = require('cookie');

class TheaterController {

  new(req, res) {
    res.render('theater/new');
  }

  create(req, res) {
    let that = this;

    helpers.requestMid.request({
      url: `${config.theaterEventsApi}/theaters`,
      method: 'POST',
      req: req,
      res: res,
      jsonParams: req.body,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 201) {
          res.redirect('/?newTheater=true');
        }
      }
    });
  }
}

module.exports = new TheaterController();
