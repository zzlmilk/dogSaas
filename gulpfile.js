var gulp = require('gulp');

var apidoc = require('gulp-apidoc'),
	 plumber = require('gulp-plumber');


var  sourceCSS = 'src/client/css/',
	 destCSS = 'public/css/',
	 destFolder = './public/js/',
	  destFile = 'bundle.js',
	 sass = require('gulp-sass'),
	 browserify = require('browserify'),
      hbsfy = require("hbsfy"),
       source = require('vinyl-source-stream'),
      watchify = require('watchify'),

	   sourceFile = './src/client/js/main.js';



gulp.task('copy', function() {
	gulp.src('src/client/index.html').pipe( gulp.dest('public') );
	gulp.src('src/client/img/**/*').pipe( gulp.dest('public/img') );
	gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*').pipe( gulp.dest('public/fonts') );


})

gulp.task('build-css', function() {
	return gulp.src(sourceCSS + '*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(destCSS));

})


gulp.task('browserify-build', function() {
	      var bundler = browserify({
          // Required watchify args
          cache: {}, 
          packageCache: {}, 
          fullPaths: true,
        // Browserify Options
          entries: sourceFile,
           debug: true
       });

	      hbsfy.configure({
            extensions: ['hbs']
        });

	      var bundle = function() {
	      	return bundler
	      	 .transform(hbsfy)
        	 .bundle()
        	 .on('error', function(err){
		            console.log(err.message);
		            this.emit('end');
      		  })
        	.pipe(source(destFile))
       	    .pipe(gulp.dest(destFolder));


	   };

	     return bundle();

})


gulp.task('build-dist',['copy','browserify-build','build-css'],function(){
    
    
});



gulp.task('default',function(){
    gulp.watch('src/client/**/*',['build-dist']);
    
});


