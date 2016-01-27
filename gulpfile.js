/**
 * Created by rmolodyko on 25.01.2016.
 */

var builder = require('gulp-nw-builder'),
    gulp = require('gulp');

/**
 * Build node webkit app
 */
gulp.task('scripts', function() {
    return gulp.src(['./resources/**/*'])
    .pipe(builder({
        version: 'v0.12.2',
        platforms: ['win32']
    }));
});
