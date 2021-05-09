const express = require('express');

const logger = require('./config/logger')

const app = express();

app.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to the API',
    });
});

app.use((req, res, next) => {
    const message = 'Error. Router not found';
    res.status(404);

    logger.warn(message);

    res.json({
        message,
    });
});

app.use((err, req, res, next) => {
    const {statusCode = 500, message} = err;

    logger.error(message);

    res.status(statusCode);
    res.json({
        message,
    })
})

module.exports = app;