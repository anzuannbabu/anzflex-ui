const gulp = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render')
const data = require('gulp-data')
const serveStatic = require('serve-static')
const serveIndex = require('serve-index')

var browserSync = require('browser-sync').create();


//compile html files
gulp.task('html', (done) => {
    //copying the files from src to dist
    gulp.src("src/pages/*")
        .pipe(data(function () {
            return require("./src/data/page_data.json")
        }))
        .pipe(nunjucksRender({
            path: ["src/templates"]
        }))
        .pipe(gulp.dest('dist'));
    done();
})

gulp.task('img', function () {
    return gulp.src('./src/assets/img/**', { encoding: false })
        .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('css', function () {
    return gulp.src('./src/assets/css/**/*', { encoding: false })
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('js', (done) => {
    //copying the files from src to dist
    gulp.src("src/assets/js/**/*")
        .pipe(gulp.dest('dist/assets/js'));
    done();
})

gulp.task('connect', function (done) {
    // var app = require('connect')()
    //     .use(serveStatic('dist'))
    //     .use(serveStatic('dist'))
    //     .use(serveIndex('dist'));

    // require('http').createServer(app)
    //     .listen(3000)
    //     .on('listening', function () {
    //         console.log('Started connect web server on http://localhost:3000');
    //     });
    done();
});

gulp.task('browser-sync', function (done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    done();
});

gulp.task('serve', gulp.series(['html', 'css', 'img', 'js']));

gulp.task('watch', (done) => {
    gulp.watch("./src/**/*", gulp.series(['serve'])).on('change', browserSync.reload);
    done();
})




//copy assets files
gulp.task('default', gulp.series(['watch', 'serve', 'browser-sync']));











