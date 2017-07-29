const path = require('path');
const express = require('express');

const Renderer = require('./renderer');

const server = express();

const renderer = Renderer.createRenderer();

function handleVueRoute(req, res) {
    return Renderer.renderVueRoute(renderer, req, res);
}

// Static asset routes
server.use('/dist', express.static(path.resolve(__dirname, '../../dist')));

// Vue-component routes
server.get('/', handleVueRoute);
server.get('/child', handleVueRoute);

server.listen(8080);
