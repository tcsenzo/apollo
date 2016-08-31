let services = {},
    path = __dirname,
    fs = require(`fs`);

fs.readdirSync(path).forEach(function(file) {
  if(file !== `index.js`) {
    services[file.split(".")[0]] = require(`./${file}`);
  }
});

module.exports = services;
