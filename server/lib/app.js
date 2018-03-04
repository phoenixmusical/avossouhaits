const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
module.exports = app;

app.use(cors({
    optionsSuccessStatus: 200,
}));
app.use(bodyParser.json());

app.use(require('../routes'));
