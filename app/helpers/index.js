let helpers = {},
    path = __dirname,
    fs = require(`fs`);

fs.readdirSync(path).forEach(function(file) {
  if(file !== `index.js`) {
    helpers[file.split(".")[0]] = require(`./${file}`);
  }
});

module.exports = helpers;
