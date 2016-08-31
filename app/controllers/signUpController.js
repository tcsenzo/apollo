let services = require('../services'),
    helpers = require('../helpers'),
    config = require(`../config`);

class SignUpController {

  index(req, res) {
    res.render("signUp/index");
  }

  create(req, res) {
    helpers.requestMid.request({
      url: `${config.authApi}/users`,
      method: 'POST',
      jsonParams: req.body,
      req: req,
      res: res,
      cb: (apiError, apiRes, apiBody) => {
        if(apiRes.statusCode === 201) {
          res.render('signUp/index', {
            'alert': {
              'type': 'success',
              'title': req.t('signup.message.title'),
              'content': req.t('signup.message.content')
            }
          });
        }
      }
    });
  }

}

module.exports = new SignUpController();
