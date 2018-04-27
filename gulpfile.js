var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', function (done) {
    gulp.src('scss/App.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded',
        }))
        .on('error', function (err) {
            console.log(err.messageFormatted)
            this.emit('end')
        })
        .pipe(autoprefixer())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('src/'))
        .on('end', done)
})

gulp.task('default', ['sass'])
gulp.task('build', ['default'])

gulp.task('watch', ['default'], function () {
    gulp.watch([
        'scss/**/*.scss',
    ], ['sass'])
})
