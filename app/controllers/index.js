let controllers = {},
    path = __dirname,
    fs = require(`fs`);

fs.readdirSync(path).forEach(function(file) {
  if(file !== `index.js`) {
    controllers[file.split(".")[0]] = require(`./${file}`);
  }
});

module.exports = controllers;
