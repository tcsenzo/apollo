let cookie = require('cookie'),
    requestMid = require('./requestMid'),
    config = require('../config');

class Auth {
  authorize(req, res, next) {
    requestMid.request({
      req: req,
      res: res,
      url: `${config.authApi}/users`,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200 || apiRes.statusCode === 201) {
          next();
        }
        else {
          res.redirect('/login');
        }
      }
    });
  }
}

module.exports = new Auth();
