const fs = require('fs');
const path = require('path');
const VSR = require('vue-server-renderer');

/* eslint-disable import/no-unresolved */
const serverBundle = require('../../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
/* eslint-enable import/no-unresolved */

// Create and return a Vue bundle Renderer
function createRenderer() {
    return VSR.createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, '../templates/index.tpl.html'), 'utf-8'),
        clientManifest,
    });
}

// Render a given route using the Vue bundle renderer
function renderVueRoute(renderer, req, res) {
    // Global context for Server side template
    const context = {
        title: 'Vue SSR Demo',
        url: req.url,
        initialState: null,
    };

    // Render the appropriate Vue components into the renderer template
    // using the server render logic in entry-server.js
    renderer.renderToString(context, (err, html) => {
        if (err) {
            res.status(500).end(`Internal Server Error: ${err}`);
            return;
        }
        res.end(html);
    }, e => res.status(500).end(e));
}

module.exports = {
    createRenderer,
    renderVueRoute,
};
