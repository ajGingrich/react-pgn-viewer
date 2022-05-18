import serve from 'rollup-plugin-serve';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import htmlTemplate from 'rollup-plugin-generate-html-template';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  input: isProduction ? 'src/index.js' : 'examples/index.js',
  name: 'pgn',
  output: {
    dir: 'dist',
    format: isProduction ? 'cjs' : 'cjs',
  },
  external: isProduction ? ['react', 'react-dom'] : [],
  plugins: [
    cleaner({
      targets: [
        './dist/'
      ]
    }),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
  ]
};

if (!isProduction) {
  config.plugins.push(...[
    htmlTemplate({
      template: 'examples/index.html',
      target: 'index.html',
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'dist'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'dist' }),
  ])
}

export default config;
