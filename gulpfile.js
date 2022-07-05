/* ******************************************* */
/*                 Modules                     */
/* ******************************************* */
const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const browserSync = require("browser-sync");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const log = require("fancy-log");
const colors = require("colors/safe");
const image = require("gulp-image");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");

/* ******************************************* */
/*                  Settings                   */
/* ******************************************* */
const settings = {
  // Main settings
  files: {
    // Setup main files names
    mainCssFile: "main", // Name of main styles file
    mainJsFile: "main", // Name of file with custom scripts
  },
  path: {
    // Paths setup
    build: "dist", // Build directory
    src: "src" // Source directory
  }
};

/* ******************************************* */
/*                Gulp tasks                   */
/* ******************************************* */

// Starting local browser task
gulp.task("BrowserSync", function() {
  browserSync.init({
    server: {
      baseDir: `${settings.path.src}`
    },
    notify: false,
    ghostMode: false,
    cors: true
    // open: false,
    // online: false, // Work Offline Without Internet Connection
  });
});

// Less compiling task
gulp.task("styles", function() {
  // Log task
  log.info(colors.green(`Building styles files`));

  // Return task instance
  return gulp
    .src(`./${settings.path.src}/scss/**/[^_]*.scss`) // Get files
    .pipe(sourcemaps.init()) // Init sourcemaps
    .pipe(sass().on("error", notify.onError())) // Compiling styles
    .pipe(gcmq().on("error", notify.onError())) // Group media queries
    .pipe(autoprefixer(["last 15 versions"])) // Use autoprefixer
    .pipe(rename({ suffix: ".min" })) // Add ".min" suffix for files
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Clean css
    .pipe(sourcemaps.write("./")) // Create sourcemaps file
    .pipe(gulp.dest(`./${settings.path.src}/css`)) // Get out files in dist directory
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// ** Compile custom scripts
gulp.task("CustomJS", function() {
  // Log task
  log.info(colors.green("Minify scripts"));

  // Return task instance
  return gulp
    .src(`./${settings.path.src}/js/${settings.files.mainJsFile}.js`) // Get file
    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError())) // Minify code
    .pipe(
      // Add sufix for file
      rename({ suffix: ".min" })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`./${settings.path.src}/js`)) // Get out file in dist directory
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Builld task
// ** Dest files
gulp.task("dest", function() {
  // Log task
  log.info(colors.green("Get out files in build directory"));

  // Dest images
  gulp.src(`./${settings.path.src}/img/**/*`).pipe(gulp.dest(`./${settings.path.build}/img`));
  // Dest fonts
  gulp.src(`./${settings.path.src}/fonts/**/*`).pipe(gulp.dest(`./${settings.path.build}/fonts`));
  // Dest styles
  gulp
    .src(`./${settings.path.src}/css/${settings.files.mainCssFile}.min.css`)
    .pipe(gulp.dest(`./${settings.path.build}/css`));
  // dest sccripts
  gulp
    .src(`./${settings.path.src}/js/${settings.files.mainJsFile}.min.js`)
    .pipe(gulp.dest(`./${settings.path.build}/js`));
  // Dest html
  return gulp
    .src(`./${settings.path.src}/**/*.html`)
    .pipe(gulp.dest(`./${settings.path.build}`));
});

// ** Clean build derictory
gulp.task("CleanDist", function() {
  // Log task
  log.info(colors.green("Cleaning build directory"));

  // Return task instance
  return del(`./${settings.path.build}`);
});

// ** Images minifing
gulp.task("ImagesMinify", function() {
  // Log task
  log.info(colors.green("Minifing images"));

  // Return task instance
  return gulp
    .src(`./${settings.path.src}/img/**/*`) // Get images
    .pipe(image()) // Minify images
    .pipe(gulp.dest(`./${settings.path.src}/img`)); // Get out in dist directory
});

// ** Building project
gulp.task(
  "build",
  gulp.series("CleanDist", "styles", "CustomJS", "ImagesMinify", "dest")
);

// Watch task
gulp.task("watch", function() {
  // Watch for html files changing
  gulp.watch(`./${settings.path.src}/**/*.html`).on("change", browserSync.reload);
  // Watch for styles files changing
  gulp.watch(`./${settings.path.src}/scss/**/*.scss`, gulp.parallel("styles"));
  // Watch for js files changing
  gulp.watch(`./${settings.path.src}/js/${settings.files.mainJsFile}.js`, gulp.parallel("CustomJS"));
});

// Default task
gulp.task(
  "default",
  gulp.series("styles", "CustomJS", gulp.parallel("watch", "BrowserSync"))
);