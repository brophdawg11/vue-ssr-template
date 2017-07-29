const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const express = require('express');
const VSR = require('vue-server-renderer');

const serverBundle = require('../../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const server = express();

const renderer = VSR.createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname, '../templates/index.tpl.html'), 'utf-8'),
  clientManifest
})

server.use('/dist', express.static(path.resolve(__dirname, '../../dist')));

function handleVueRoute(req, res) {
    const context = {
        title: 'Vue SSR Demo',
        url: req.url,
        initialState: null,
    };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            res.status(500).end(`Internal Server Error: ${err}`);
            return
        }

        res.end(html);
    }, e => res.status(500).end(e));
}

server.get('/', handleVueRoute);
server.get('/child', handleVueRoute);

server.listen(8080)
