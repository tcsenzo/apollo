let cookie = require('cookie'),
    requestMid = require('./requestMid'),
    config = require('../config');

class GetUserTheaters {
  getTheaters(req, res, next) {
    requestMid.request({
      req: req,
      res: res,
      url: `${config.theaterEventsApi}/theaters`,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200 || apiRes.statusCode === 201) {
          let theatersJSON = JSON.parse(apiBody).theaters;
          req.userTheaters = theatersJSON;

          if(theatersJSON.length === 0) {
            res.redirect('/teatro/novo');
          }
          else {
            next();
          }
        }
        else {
          res.redirect('/login');
        }
      }
    });
  }
}

module.exports = new GetUserTheaters();
