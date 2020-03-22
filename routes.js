const express = require('express');
const routes = express.Router();

const Speak = require('./controllers/speak');

routes.get('/status', Speak.status);
routes.post('/speak/send', Speak.sender);

module.exports = routes;