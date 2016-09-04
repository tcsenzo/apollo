let services = require(`../services`),
    helpers = require('../helpers'),
    config = require('../config');

class Index {

  index(req, res) {
    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.theaterEventsApi}/theaters`,
      cb: (apiError, apiRes, apiBody) => {
        res.render('index/index', {theaters: JSON.parse(apiBody).theaters});
      }
    });
  }

}

module.exports = new Index();
