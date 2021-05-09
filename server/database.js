const mongose = require('mongoose')

const logger = require('./config/logger')

exports.connect = (
    {protocol = 'mongodb', url, username = '', password = ''},
        options = {}
) => {
    let dburl = '';

    if (username && password) {
        dburl = `${protocol}://${username}:${password}@${url}`;
        logger.info(dburl);
    } else {
        dburl = `${protocol}://${url}`;
    }

    mongose.connect(dburl, {
        ...options,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
};

mongose.connection.on('open', () => {
    logger.info('Database connected');
});

mongose.connection.on('close', () => {
    logger.info('Database disconnected');
});

mongose.connection.on('error', (err) => {
    logger.info(`Database connection error: ${err}`);
});

process.on('SIGINT', () => {
    mongose.connection.close(() => {
        logger.info('Database connection disconnected through app termination');
        process.exit(0);
    });
});

exports.disconnect = () => {
    mongose.connection.close(() => {
        logger.info('Database disconnected')
    })
}