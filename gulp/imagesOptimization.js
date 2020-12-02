const fs = require('fs')

const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')

const forFiles = files => {
  const arr = []
  if (files) {
    for (const file of files) {
      let fileName = ''
      for (const char of file) {
        if (char === '.') {
          break
        }
        fileName += char
      }
      arr.push(fileName)
    }
  }
  return arr
}

const imagesMinify = imagesPath => {
  return gulp.src(imagesPath)
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 65,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/images'))
    .pipe(webp())
    .pipe(gulp.dest('./dist/images'))
}

const imagesOptimization = completed => {
  fs.readdir('./source/images', (sourceError, sourceFiles) => {
    fs.readdir('./dist/images', (distError, distFiles) => {
      const sourceImages = forFiles(sourceFiles)
      const distImages = forFiles(distFiles)

      const imagesForMinify = []

      for (const fileName of sourceImages) {
        if (!distImages.includes(fileName)) {
          imagesForMinify.push(`./source/images/${fileName}.*`)
        }
      }

      if (imagesForMinify.length) {
        imagesMinify(imagesForMinify).on('end', completed)
      } else {
        completed()
      }
    })
  })
}

module.exports = imagesOptimization