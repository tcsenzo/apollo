module.exports = {
  dist: {
    files: [{
      "expand": true,
      "cwd": "app/assets/js/",
      "src": ["main.js", "pages/**/main.js"],
      "dest": "app/assets/dist/js/",
      "ext": ".js"
    }]
  }
}
