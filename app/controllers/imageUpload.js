let helpers = require('../helpers'),
    config = require(`../config`),
    moment = require('moment'),
    fs = require('fs');

class ImageUploadController {

  upload(req, res) {
    let that = this,
        fstream;

    req.pipe(req.busboy);
    req.busboy.on('file', (fieldName, file, fileName) => {
      let imgPath = `${__dirname}/../files/${fileName}`;

      fstream = fs.createWriteStream(imgPath);
      file.pipe(fstream);
      fstream.on('close', function () {
        that.apiUpload(imgPath, req, res);
      });
    });
  }

  apiUpload(imgPath, req, res) {
    fs.readFile(imgPath, (err, data) => {

      let formData = {
        image: new Buffer(data).toString('base64')
      };


      helpers.requestMid.request({
        req: req,
        res: res,
        url: `${config.theaterEventsApi}/events/image`,
        'formData': formData,
        cb: (apiError, apiRes, apiBody) => {
          //apaga o arquivo apos salvar
          fs.unlinkSync(imgPath);
        }
      });
    });
  }
}

module.exports = new ImageUploadController();
