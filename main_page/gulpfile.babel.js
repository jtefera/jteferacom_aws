//Automatization Power!!
//Based on the tutorial on https://youtu.be/cFrkpcLFwcw

//Automatization module
import gulp from 'gulp';

//Allows to make shell calls from gulp
import shell from 'gulp-shell';

//Allows to easly delete folders
import rimraf from 'rimraf';

//Allows to run gulp tasks on a sequence given by an array
import run from 'run-sequence';

//Allows to set gulp watchers that see changes on files and set tasks
//automatically(like building like translaping)
import watch from 'gulp-watch';

//Creates a gulp server
import server from 'gulp-live-server'

//Allows to join js modules into a single file
import webpack from 'gulp-webpack'

//Allows to delete folders and files. used in replacement of rimraf
//that was causing a some problems
import del from 'del'

//Important paths that wit will be used
const paths = {
  indexSrc: './src/index.html',
  indexDest: '../public/',
  //Points to the the pre-translaped es2015 js files of the React
  //app are hosted
  appsrcjs: './src/app/**/*.js',
  //Poitns to the file that contains the app bundle parts to be translapped
  appMainJsSrc: './src/app/main.js',
  //Points to the folder where the translapped files will be hosted
  appDest: '../public/js',
  imgSrc: './img/**/*.png',
  imgDest: '../public/img/',
  cssSrc: './src/css/**/*.css',
  cssDest: '../public/css/',
}

//Task that will be run when we command gulp on the terminal
gulp.task('default', cb => {
  process.stdout.write('Gulp! Gulp! \n')
  //Creates a sequence of tasks that are to be called. One after the other
  run('build', 'watch', cb);
});

//Sets up the server container. gulp-live-server is an instance of express
let express;

//Building phase in which first, we erase all files from the destination
//folder, then we translape the files from src/server written in es2015 into
//es5 js in the server folder. Then, calls webpack to bundle all the
//app modules into a single file and restarts the server
gulp.task('build', cb => {
  //Secuenof tasks
  //run('clean', 'babel', 'webpack', 'restart', cb);
  run('webpack', 'copyHtml', cb);
});

gulp.task('copyHtml', cb => {
  return gulp
          .src(paths.indexSrc)
          .pipe(gulp.dest(paths.indexDest))
})

gulp.task('copyImg', cb => {
  return gulp
          .src(paths.imgSrc)
          .pipe(gulp.dest(paths.imgDest))
})

gulp.task('copyCss', cb => {
  return gulp.
          src(paths.cssSrc)
          .pipe(gulp.dest(paths.cssDest))
})
//not used right now. Is a module created by facebook to give
//more control on types in js
gulp.task('flow', shell.task([
  'flow'
], {ignoreErrors: true}));

//bundler!! Allows us to join different modules into a single file
//that contains require or import functions. Used to build the app.
//main.js contains all the requires of the different modules
//index.js is the file than the html will call when it calls our script!
gulp.task('webpack', () => {
  process.stdout.write('watch mee app app \n')
  //We create a stream where main.js is the entry point
  return gulp.src(paths.appMainJsSrc)
          //we pipe that stream into webpack that will do the piping
          .pipe(webpack({
            output: {
              //final output. The folder is given below
              filename: "index.js"
            },
            module: {
              //Before the translaping we pass throw babel the files
              loaders: [
          			{
          				test: /\.js$/,
          				exclude: /node_modules/,
          				loader: 'babel',
          				query: {
          					presets: ['es2015', 'react']
          				}
          			}
          		]
          	}
          }))
          //destination folder
          .pipe(gulp.dest('../public/js/'));
});

gulp.task("justwatching", () => {
  process.stdout.write('I am watching you! \n')
});

//Not used
gulp.task('watchApp', () => {
  gulp.watch(paths.indexSrc, (cb) => run('copyHtml'));
  gulp.watch(paths.appsrcjs, (cb) => run('webpack'));
  gulp.watch(paths.imgSrc, (cb) => run('copyImg'));
  gulp.watch(paths.cssSrc, (cb) => run('copyCss'));
});

//We set a watcher that we watch to changes into the paths.srcjs files.
//If there are, it calls the build task
//gulp.task('watch', ['watchApp', 'watchServer']);
gulp.task('watch', ['watchApp']);
