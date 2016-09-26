let helpers = require('../helpers'),
    config = require(`../config`);

class TicketController {
  show(req, res) {
    helpers.requestMid.request({
      req: req,
      res: res,
      url: `${config.checkoutApi}/tickets/${req.params.ticketHash}`,
      cb: (apiError, apiRes, apiBody) => {
        let ticket = false;

        if(apiRes.statusCode === 200) {
          ticket = JSON.parse(apiBody);
        }
        res.render('ticket/show', {'ticket': ticket});
      }
    });
  }
}

module.exports = new TicketController();
