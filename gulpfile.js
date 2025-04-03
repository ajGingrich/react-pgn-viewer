import gulp from 'gulp';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import webserver from 'gulp-webserver';
import * as del from 'del';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

const babelConfig = {
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
};

const commonPlugins = [
  nodeResolve({
    browser: true, // Resolve for browser environment
  }),
  commonjs(), // Convert CommonJS modules to ES6
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
];

// --- Tasks ---

// Clean the dist directory
gulp.task('clean', () => {
  // Use deleteAsync when using namespace import for 'del'
  return del.deleteAsync('dist/**', { force: true });
});

// Copy HTML for examples
gulp.task('copy:html', () => {
  return gulp.src('examples/*.html').pipe(gulp.dest('dist'));
});

// Rollup build for the library (ESM and CJS)
gulp.task('rollup:lib', async () => {
  const inputOptions = {
    input: 'src/index.js',
    plugins: [babel(babelConfig), ...commonPlugins, terser()],
    external: ['react', 'react-dom', 'chess.js', 'reactjs-chessboard'], // Keep peer/external deps out
  };

  const outputOptionsESM = {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true,
  };

  const outputOptionsCJS = {
    file: 'dist/index.cjs',
    format: 'cjs',
    sourcemap: true,
  };

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptionsESM);
  await bundle.write(outputOptionsCJS);
  await bundle.close();
});

// Rollup build for the example app
gulp.task('rollup:example', async () => {
  const inputOptions = {
    input: 'examples/index.js',
    plugins: [
      babel(babelConfig),
      ...commonPlugins,
      // For example build, include React etc.
    ],
  };

  const outputOptions = {
    file: 'dist/index.js',
    format: 'iife', // Suitable for script tag
    name: 'pgnViewerExample', // Global variable name
    sourcemap: true,
    globals: { // Map external module IDs to global variables
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  };

   if (isProduction) {
    inputOptions.plugins.push(terser());
  }

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
});

// Development server
gulp.task('server', () => {
  return gulp.src('dist').pipe(
    webserver({
      livereload: true,
      port: 8000,
      open: true, // Automatically open in browser
    })
  );
});

// Watch for changes in development
gulp.task('watch', () => {
  gulp.watch('src/**/*.js', gulp.series('rollup:example')); // Rebuild example on src change
  gulp.watch('examples/**/*.js', gulp.series('rollup:example'));
  gulp.watch('examples/*.html', gulp.series('copy:html'));
});

// --- Main Tasks ---

// Development task: clean, build example, serve, and watch
gulp.task(
  'dev',
  gulp.series(
    'clean',
    gulp.parallel('copy:html', 'rollup:example'),
    'server',
    'watch'
  )
);

// Production build task: clean, build library (ESM & CJS)
gulp.task('build', gulp.series('clean', 'rollup:lib'));

// Default task
gulp.task('default', gulp.series('build'));
