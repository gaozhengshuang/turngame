var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var fileInline = require('gulp-file-inline');

gulp.task('imagemin', function () {
    gulp.src(["./build/web-mobile/res/raw-assets/resources/Image/**/*.*"])
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest('./build/web-mobile/res/raw-assets/resources/Image/'))
        .on('end', function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('压缩图片成功');
        });
});

gulp.task('htmlmin', function () {
    gulp.src('./build/web-mobile/*.html')
        .pipe(fileInline())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('./build/web-mobile/'))
        .on('end', function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('压缩html成功');
        });
});
