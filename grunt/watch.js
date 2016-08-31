module.exports = {
  es6Frontend: {
    files: ['app/assets/js/**/*.js'],
    tasks: ['browserify']
  },
  stylus: {
    files: ['app/assets/stylus/**/*.styl'],
    tasks: ['stylus']
  }
}
