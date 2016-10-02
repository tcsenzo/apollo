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
        that.apiUpload(imgPath, fileName, req, res);
      });
    });
  }

  apiUpload(imgPath, imgName, req, res) {

    let formData = {
      image: fs.createReadStream(imgPath),
    };


    helpers.requestMid.request({
      req: req,
      res: res,
      method: 'POST',
      url: `${config.theaterEventsApi}/events/image`,
      'formData': formData,
      cb: (apiError, apiRes, apiBody) => {
        let resJSON = {
          imageName: imgName,
          imageServerName: JSON.parse(apiBody).image
        }

        fs.unlinkSync(imgPath);
        res.json(resJSON);
      }
    });

  }
}

module.exports = new ImageUploadController();
