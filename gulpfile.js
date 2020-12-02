const gulp = require('gulp')

const html = require('./gulp/html')
const styles = require('./gulp/styles')
const imagesOptimization = require('./gulp/imagesOptimization')
const server = require('./gulp/server')
const deploy = require('./gulp/deploy')

exports.default = gulp.series(
  gulp.parallel(
    html, styles, imagesOptimization
  ),
  server
)

module.exports.deploy = deploy