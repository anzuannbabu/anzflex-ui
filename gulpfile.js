var wrap = require('gulp-wrap');
var gulp = require('gulp');
//serve files as static
var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');

//this is template engine
var nunjucksRender = require('gulp-nunjucks-render');

const merge = require("merge-stream");

gulp.task('layout', function () {
    return gulp.src(['src/**/*.html', '!src/layout.html'])
        // .pipe(wrap({ src: 'src/layout.html' }))
        .pipe(nunjucksRender())
        .pipe(gulp.dest('dist'));

});

//copy assets
gulp.task('copy-img', function () {
    return gulp.src('./src/img/**',{encoding: false})
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('copy-css', function () {
    return gulp.src('./src/css/**/*',{encoding: false})
        .pipe(gulp.dest('./dist/css'));
});


// gulp.task('copy-resources', function () {
//     return merge([
//         gulp.src('./src/img/**').pipe(gulp.dest('./dist/img')),
//         gulp.src('./src/css/**').pipe(gulp.dest('./dist/css'))
//     ]);
// });

gulp.task('connect', gulp.series('layout'), function () {
    var app = require('connect')()
        .use(serveStatic('.tmp'))
        .use(serveStatic('src'))
        .use(serveIndex('src'));

    require('http').createServer(app)
        .listen(3000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:3000');
        });
});

gulp.task('layout', function () {
    nunjucksRender.nunjucks.configure(['app']);

    return gulp.src(['src/**/*.html', '!src/layout.html'])
        .pipe(nunjucksRender())
        .pipe(gulp.dest('.tmp'));
});

gulp.task('watch', gulp.series('layout'), function () {
    gulp.watch('src/*.html', gulp.series('layout'));
});







gulp.task('default', gulp.series('layout', 'connect', 'watch', 'copy-img','copy-css'));

// module.exports = layout