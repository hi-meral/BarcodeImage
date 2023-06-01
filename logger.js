const winston = require('winston');

const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logfile/error-' + month + year + '.log', level: 'error', format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
        new winston.transports.File({ filename: 'logfile/info-' + month + year + '.log', level: 'info', format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
    ],
});

module.exports = { logger }