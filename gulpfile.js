var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    pngquant = require('imagemin-pngquant'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream;
    ngannotate = require('gulp-ng-annotate');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('inject', function() {    
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src(['./app/scripts/**/*.js','./app/styles/**/*.css'],{read:false}), {relative:true}))
        .pipe(gulp.dest('./app'));
            
});

gulp.task('inject-vendor', function() {
    gulp.src('app/index.html')
        .pipe(wiredep({
            directory: './bower_components/',
            bowerJson: require('./bower.json')
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/*.html')
       .pipe(usemin({
        css:[minifycss(),rev()],
        js: [ngannotate(),concat(),uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('usemin-views',['jshint'], function () {
  return gulp.src('./app/views/*.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [ngannotate(),uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/views/'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(imagemin({ progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
   .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
    
    gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/*.html', ['usemin']);
    gulp.watch('{app/views/*.html', ['usemin-views']);
    gulp.watch('app/images/**/*', ['imagemin']);
    

});

gulp.task('browser-sync', ['default'], function () {
   
    var files = [
      'dist/**/*'
   ];
   
   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "index.html"
      }
   });
   
        // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
    });

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'usemin-views', 'imagemin','copyfonts');
});