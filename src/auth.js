const jwt = require('jwt-simple');
const configs = require('./configs.js');
const envConfigs = require('../env-configs.json');
const log = require('console-log-level')({ level: configs.logLevel });

module.exports = function auth(context) {
    if (!context.request.headers.authorization) {
        context.response.status(401).send('Access denied. No token provided.');
        return null;
    }
    try {
        const payload = jwt.decode(
            context.request.headers.authorization,
            envConfigs.secret
        );
        return payload.currentUserID;
    } catch (error) {
        log.info(error);
        context.response.status(401).send('Invalid token.');
        return null;
    }
};
