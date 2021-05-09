const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser')

const logger = require('./config/logger');
const api = require('./api/v1')

const app = express();

app.use(requestId);
app.use(logger.requests);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', api);
app.use('/api/v1', api);

app.use((req, res, next) => {
    const message = 'Error. Router not found';
    next({
        message,
        statusCode: 404,
        level: 'warn',
    });
});

app.use((err, req, res, next) => {
    const {message, level = 'error'} = err;
    let {statusCode = 500} = err;
    const log = `${logger.header(req)} ${statusCode} ${message}`;

    if(err.message.startsWith('ValidationError')) {
        statusCode = 422;
    }

    logger[level](log);

    res.status(statusCode);
    res.json({
        error: true,
        statusCode,
        message,
    });
});

module.exports = app;