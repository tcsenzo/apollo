let helpers = require('../helpers'),
    config = require(`../config`),
    moment = require('moment'),
    fs = require('fs');

class ImageUploadController {

  upload(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
      fstream = fs.createWriteStream(`${__dirname}/../files/${filename}`);
      file.pipe(fstream);
      fstream.on('close', function () {
          //sobe para o java
      });
    });
  }
}

module.exports = new ImageUploadController();
