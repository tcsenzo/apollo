module.exports = {
  compile: {
    files: [
      {
        'expand': true,
        'cwd': 'app/assets/stylus/',
        'src': '**/main.styl',
        'dest': 'app/assets/dist/css/',
        'ext': '.css'
      }
    ]
  }
}
