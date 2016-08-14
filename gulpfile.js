var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));

});

// gulp.task('serve', ['inject'], function () {
//     var options = {
//         script: 'app.js',
//         delayTime: 1,
//         env: {
//             'PORT': 3001
//         },
//         watch: jsFiles
//     };

//     return nodemon(options)
//         .on('restart', function (ev) {
//             console.log('Restarting....');
//         });
// });



// gulp.task('serve', function () {
//   nodemon ({
//     'script': 'app.js',
//     'ext': 'js html',
//     'ignore': [
//         '.git',
//         'node_modules',
//         'test'],

//     env: { 'PORT': 3001 },
//     delayTime: 1,


//   });
// return nodemon(options)
//         .on('restart', function (ev) {
//             console.log('Restarting....');
//         });



// });


var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
 
// Task
gulp.task('default', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
	})
})



