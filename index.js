const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const { apiHttpPort } = require('./configuration');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(apiHttpPort);