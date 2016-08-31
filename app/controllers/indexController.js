let services = require(`../services`),
    _ = require(`underscore`);

class Index {

  index(req, res) {
    res.render('index/index');
  }

}

module.exports = new Index();
