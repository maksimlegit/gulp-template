const gulp = require('gulp')

const html = () => {
  return gulp.src('./source/*.html')
    .pipe(gulp.dest('./dist'))
}

module.exports = html