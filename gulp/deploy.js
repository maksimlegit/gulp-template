const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')

const deploy = () => {
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
}

module.exports = deploy