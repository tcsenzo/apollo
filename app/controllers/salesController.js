let services = require('../services'),
    helpers = require('../helpers'),
    config = require(`../config`);

class SalesController {

  index(req, res) {
    let theaterId = req.params.theaterId;

    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.checkoutApi}/theaters/${theaterId}/history`,
      cb: (apiError, apiRes, apiBody) => {
        res.render("sales/index", {'sales': JSON.stringify(apiBody)});
      }
    });
  }
}

module.exports = new SalesController();
