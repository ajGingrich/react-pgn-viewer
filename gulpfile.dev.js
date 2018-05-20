var gulp = require("gulp")
var rollup = require('rollup-stream'),
var source = require('vinyl-source-stream')
var webserver = require("gulp-webserver")

// gulp.task("copy", function() {
//   return gulp.src("src/*.html")
//     .pipe(gulp.dest("dist"));
// });

gulp.task("rollup", function() {
  return rollup({
    entry: "src/main.js",
    format: "cjs",
    plugins: [
      require("rollup-plugin-json")(),
      require("rollup-plugin-node-resolve")({
        jsnext: true,
        main: true,
        browser: true
      }),
      require("rollup-plugin-babel")({
        exclude: 'node_modules/**'
      }),
      require("rollup-plugin-commonjs")()
    ]
  })
    .pipe(source("main.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["rollup"]);
