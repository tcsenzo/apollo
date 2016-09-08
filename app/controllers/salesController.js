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
        let sales = JSON.parse(apiBody),
            totalApproved = 0,
            totalUnapproved = 0;

        sales.forEach((sale) => {
          let totalPrice = 0;
          sale.items.forEach((item) => {
            totalPrice += parseFloat(item.total_price);
          });
          sale.total_price = totalPrice;

          if(sale.payment_status.toLowerCase() === 'approved') {
            totalApproved += sale.total_price;
          }
          else {
            totalUnapproved += sale.total_price;
          }
        });

        res.render("sales/index", {
          'sales': sales,
          'totalApproved': totalApproved,
          'totalUnapproved': totalUnapproved
        });
      }
    });
  }
}

module.exports = new SalesController();
