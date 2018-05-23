var gulp = require("gulp")
var rollup = require('rollup-stream')
var source = require('vinyl-source-stream')
var webserver = require("gulp-webserver")
var del = require("del")
var env = process.env.NODE_ENV
var isProduction = env === 'production'

gulp.task("clean", function() {
  return del('dist/**', {force:true})
})

gulp.task("copy", function() {
  return gulp.src("examples/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("rollup", function() {
  return rollup({
    input: isProduction ? "src/index.js" : "examples/index.js",
    format: isProduction ? "cjs" : "iife",
    name: 'pgn',
    plugins: [
      require("rollup-plugin-babel")({
        exclude: 'node_modules/**',
        // plugins: ['external-helpers'],
        externalHelpers: false
      }),
      require("rollup-plugin-node-resolve")({
        jsnext: true,
        main: true,
        browser: true
      }),
      require("rollup-plugin-commonjs")({
        include: 'node_modules/**',
        exclude: 'node_modules/react-chessboardjs/index.js',
         /// exclude react?? only in external
        namedExports: {
          'node_modules/react/index.js': [
            'Component',
            'PureComponent',
            'Fragment',
            'Children',
            'createElement',
          ]
        },
      }), // bug with 9.1.3 see https://github.com/dherges/ng-packagr/issues/657
      require("rollup-plugin-replace")({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      require("rollup-plugin-uglify") //it's not being uglfied
    ],
  }).pipe(source("index.js"))
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

gulp.task("dev", ["clean", "copy", "rollup", "server", "watch"]);

gulp.task("prod", ["clean", "rollup"]);
