const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
var nodemon = require('gulp-nodemon');
var pug = require('gulp-pug');


function reload(done) {
    browserSync.reload();
    done();
}

// Compile LESS files from /less into /css
function lessTask() {
    return gulp.src('app/less/*.less')
        .pipe(less(
            // {
            //     modifyVars: {
            //         '@xxs': `~'only screen and (max-width: 375px)'`,
            //         '@xs': `~'only screen and (min-width: 376px) and (max-width: 991px)'`,
            //         '@xl': `~'only screen and (min-width: 992px) and (max-width: 1439px)'`,
            //         '@xxl': `~'only screen and (min-width: 1440px)'`,

            //         '@mobile': `~'only screen and (max-width: 991px)'`,
            //         '@desktop': `~'only screen and (min-width: 992px)'`
            //     }
            // }
        ))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// pug to html
function pugTask() {
    return gulp.src(['app/views/**/*.pug'])
        .pipe(pug({
            basedir: 'public'
        }))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

// Minify JS
function jsTask() {
    return gulp.src(['app/js/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
}


// Copy vendor libraries from /node_modules into /vendor
function copyTask(done) {
    gulp.src(['app/assets/**/*'])
        .pipe(gulp.dest('public/assets/'));

    gulp.src(['app/static/**/*'])
        .pipe(gulp.dest('public/'));

    done()
};

function startNodemon(done) {
    const STARTUP_TIMEOUT = 3000;
    const server = nodemon({
        script: 'app.js',
        stdout: false // without this line the stdout event won't fire
    });
    let starting = false;

    const onReady = () => {
        starting = false;
        done();
    };

    server.on('start', () => {
        starting = true;
        setTimeout(onReady, STARTUP_TIMEOUT);
    });

    server.on('stdout', (stdout) => {
        process.stdout.write(stdout); // pass the stdout through
        if (starting) {
            onReady();
        }
    });
}

function startBrowserSync(done) {
    browserSync.init({
        proxy: "http://localhost:3000",
        port: 7000,
    }, done);
}


// Run prod
gulp.task('prod', gulp.series([lessTask, jsTask, pugTask, copyTask]));

//  Dev task with browserSync
gulp.task('dev', gulp.series([lessTask, jsTask, pugTask, copyTask, startNodemon, startBrowserSync, function (done) {
    gulp.watch('app/less/**/*.less', lessTask);
    gulp.watch('app/js/**/*.js', jsTask);

    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/views/**/*.pug', gulp.series(reload));
    gulp.watch('app/js/**/*.js', gulp.series(reload));
    gulp.watch('routes/**/*.js', gulp.series(reload));

    done();
}]));