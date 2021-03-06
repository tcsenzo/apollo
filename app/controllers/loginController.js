let helpers = require('../helpers'),
    config = require(`../config`),
    cookie = require('cookie');

class LoginController {

  index(req, res) {
    res.render('login/index', {posLogin: req.query.posLogin});
  }

  login(req, res) {
    let that = this;
    helpers.requestMid.request({
      url: `${config.authApi}/login?email=${req.body.email}&password=${req.body.password}`,
      method: 'POST',
      req: req,
      res: res,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200) {
          res.append('set-cookie', apiRes.headers['set-cookie'][0]);
          let loginHashCookie = cookie.parse(apiRes.headers['set-cookie'][0]);
          req.headers.cookie += '; JSESSIONID=' + loginHashCookie.JSESSIONID;
          that.getUsername(req, res);
        }
        else {
          res.render('login/index', {
            'alert': {
              'type': 'danger',
              'title': req.t('login.message.title'),
              'content': req.t('login.message.content')
            }
          });
        }
      }
    });
  }

  getUsername(req, res) {
    let that = this;

    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.authApi}/users`,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200) {
          let loggedUser = JSON.parse(apiBody);
          req.headers.cookie += '; qettal2LoggedUser=' + loggedUser.name;
          res.cookie('qettal2LoggedUser', loggedUser.name);

          that.getUserTheaters(req, res);
        }
        else {
          res.render('login/index', {
            'alert': {
              'type': 'danger',
              'title': req.t('login.message.title'),
              'content': req.t('login.message.content')
            }
          });
        }
      }
    });
  }

  getUserTheaters(req, res) {
    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.theaterEventsApi}/theaters`,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 200 || apiRes.statusCode === 201) {
          let theatersJSON = JSON.parse(apiBody).theaters;
          req.userTheaters = theatersJSON;

          if(theatersJSON.length === 0) {
            res.redirect('/teatros/novo');
          }
          else {
            res.redirect(`/teatros/${req.userTheaters[0].id}/eventos`);
          }
        }
        else {
          res.redirect('/login');
        }
      }
    });
  }

  logout(req, res) {
    res.clearCookie('JSESSIONID');
    res.clearCookie('qettal2LoggedUser');
    res.redirect('/');
  }
}

module.exports = new LoginController();
