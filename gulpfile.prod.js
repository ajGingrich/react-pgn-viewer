var gulp = require("gulp")
var rollup = require('rollup-stream')
var source = require('vinyl-source-stream')

gulp.task("rollup", function() {
  return rollup({
    input: "src/index.js",
    format: "cjs",
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
      require("rollup-plugin-commonjs")()
      // there is a bug with 9.1.3 see https://github.com/dherges/ng-packagr/issues/657
    ],
    external: ['react', 'react-dom']
  }).pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", ["rollup"]);
