const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const cleanCss = require('gulp-clean-css')
const postcss = require('gulp-postcss')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const autoprefixer = require('autoprefixer')
const rename = require('gulp-rename')

const styles = () => {
  return gulp.src('./source/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(groupCssMediaQueries())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
}

module.exports = styles