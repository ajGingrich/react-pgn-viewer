var gulp = require("gulp")
var rollup = require('rollup-stream')
var source = require('vinyl-source-stream')
var webserver = require("gulp-webserver")

gulp.task("copy", function() {
  return gulp.src("examples/*.html")
    .pipe(gulp.dest("dist"))
})

///do something with environment here so i can use one file??

gulp.task("rollup", function() {
  return rollup({
    input: "examples/index.js",
    format: "iife",
    name: 'pgn',
    plugins: [
      require("rollup-plugin-replace")({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      require("rollup-plugin-node-resolve")({
        jsnext: true,
        main: true,
        browser: true
      }),
      require("rollup-plugin-babel")({
        exclude: 'node_modules/**'
      }),
      require("rollup-plugin-commonjs")({
        include: 'node_modules/**',
        exclude: 'node_modules/chess.js', // doesn't work with es6
        namedExports: {
          'node_modules/react/index.js': [
            'Component',
            'PureComponent',
            'Fragment',
            'Children',
            'createElement',
          ]
          // 'node_modules/chess.js/chess.js': [
          //   'Chess',
          // ],
        },
      })
      // there is a bug with 9.1.3 see https://github.com/dherges/ng-packagr/issues/657
    ],
  }).pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
})

gulp.task("server", function() {
  return gulp.src("dist")
    .pipe(webserver({
      livereload: true,
      port: 8000
    }))
})

gulp.task("watch", function() {
  gulp.watch("src/**/*.js", ["rollup"]) /// also watch examples here?!
});

gulp.task("default", ["copy", "rollup", "server", "watch"]);
