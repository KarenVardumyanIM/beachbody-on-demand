const jwt = require('jwt-simple');
const Users = require('./models').Users;
const envConfigs = require('../env-configs.json');
const configs = require('./configs.js');
const log = require('console-log-level')({ level: configs.logLevel });

module.exports = function auth(context) {
    if (!context.request.headers.accesstoken) {
        context.response.status(401).send('Access denied. No token provided.');
        return null;
    }
    try {
        const payload = jwt.decode(
            context.request.headers.accesstoken,
            envConfigs.secret
        );
        return payload.currentUserID;
    } catch (e) {
        log.info(e.message);
        context.response.status(400).send('Invalid token.');
        return null;
    }
};
