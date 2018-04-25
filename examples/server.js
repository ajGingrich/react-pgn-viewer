import express from 'express';
import path from 'path';
import webpack from 'webpack';
const config = require('../webpack.config');
const compiler = webpack(config);

const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(path.join(__dirname, '/src/index.html'), (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

const port = 4040;
app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...'); // eslint-disable-line no-console
});
