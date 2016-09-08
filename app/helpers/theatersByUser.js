let cookie = require('cookie'),
    requestMid = require('./requestMid'),
    config = require('../config');

class GetUserTheaters {
  getTheaters (req, res, next) {
    let that = this;

    requestMid.request({
      req: req,
      res: res,
      url: `${config.theaterEventsApi}/theaters`,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200 || apiRes.statusCode === 201) {
          let theatersJSON = JSON.parse(apiBody).theaters,
              currentTheaterId = that.getCurrentTheater(req.path);


          req.userTheaters = theatersJSON;
          req.currentTheater = theatersJSON.find((theater) => {
            return theater.id === currentTheaterId;
          });

          if(theatersJSON.length === 0) {
            res.redirect('/teatros/novo');
            return false;
          }

          if(req.path === '/') {
            res.redirect(`/teatros/${theatersJSON[0].id}/eventos`);
            return false;
          }

          next();
        }
      }
    });
  }

  getCurrentTheater (url) {
    let urlPathArray = url.split('/'),
        currentTheaterId = '';

    urlPathArray.forEach((value, i) => {
      if(value && value === 'teatros') {
        currentTheaterId = urlPathArray[++i];
        return false;
      }
    });

    return parseInt(currentTheaterId);
  }
}

module.exports = new GetUserTheaters();
