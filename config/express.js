const express = require('express');
const router = require('../routes/router');
const consign = require('consign');
const cors = require('cors');
const app = express();

consign().include('/controller').into(app);

app.disable('x-powered-by')
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('', router);
module.exports = app;