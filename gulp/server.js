const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const html = require('./html')
const styles = require('./styles')
const imagesOptimization = require('./imagesOptimization')

const server = () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    },
    cors: true,
    notify: false,
    ui: false
  })

  gulp.watch('./source/*.html').on('change', gulp.series(html, browserSync.reload))
  gulp.watch('./source/scss/*.scss').on('change', gulp.series(styles, browserSync.reload))
  gulp.watch('./source/images').on('add', gulp.series(imagesOptimization, browserSync.reload))
}

module.exports = server