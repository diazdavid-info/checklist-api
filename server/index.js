const express = require('express');
const requestId = require('express-request-id')();

const logger = require('./config/logger');

const app = express();

app.use(requestId);
app.use(logger.requests);

app.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to the API',
    });
});

app.use((req, res, next) => {
    const message = 'Error. Router not found';
    next({
        message,
        statusCode: 404,
        level: 'warn',
    });
});

app.use((err, req, res, next) => {
    const {message, statusCode = 500, level = 'error'} = err;
    const log = `${logger.header(req)} ${statusCode} ${message}`;

    logger[level](log);

    res.status(statusCode);
    res.json({
        message,
    });
});

module.exports = app;