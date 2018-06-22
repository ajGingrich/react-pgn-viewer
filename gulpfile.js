/* eslint-disable */
var gulp = require("gulp")
var rollup = require('rollup-stream')
var source = require('vinyl-source-stream')
var webserver = require("gulp-webserver")
var del = require("del")
var env = process.env.NODE_ENV
var isProduction = env === 'production'
// var analyzerOptions = { limit: 15, filter: null }
// bug with rollup-common-js 9.1.3 see https://github.com/dherges/ng-packagr/issues/657

gulp.task("clean", function() {
  return del('dist/**', {force:true})
})

gulp.task("copy", function() {
  return gulp.src("examples/*.html")
    .pipe(gulp.dest("dist"))
})

var plugins = [
    require("rollup-plugin-babel")({
      exclude: 'node_modules/**'
    }),
    require("rollup-plugin-node-resolve")({
      jsnext: true,
      main: true,
      browser: true
    }),
    require("rollup-plugin-replace")({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
]

if(isProduction) {
  plugins.push(require("rollup-plugin-commonjs")({
    include: 'node_modules/**'
  }))
  plugins.push(require("rollup-plugin-uglify")())
  // plugins.push(require("rollup-analyzer-plugin")())
} else {
  plugins.push(require("rollup-plugin-commonjs")({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react/index.js': [
        'Component',
        'PureComponent',
        'Fragment',
        'Children',
        'createElement',
      ]
    },
  }))
}

gulp.task("rollup", function() {
  return rollup({
    input: isProduction ? "src/index.js" : "examples/index.js",
    format: isProduction ? "cjs" : "iife",
    name: 'pgn',
    plugins: plugins,
    external: isProduction ? ['react', 'react-dom'] : [],
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
  gulp.watch("src/**/*.js", ["rollup"])
  gulp.watch("examples/**/*.js", ["rollup"])
});

gulp.task("dev", ["clean", "copy", "rollup", "server", "watch"]);

gulp.task("prod", ["clean", "rollup"]);
