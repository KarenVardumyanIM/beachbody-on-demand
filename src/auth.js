const jwt = require('jwt-simple');
const Users = require('./models').Users;
const configs = require('../env-configs.json');

module.exports = function auth(context) {
    const token = context.request.headers.accesstoken;
    let user = null;
    if (!token) {
        context.response.status(401).send('Access denied. No token provided.');
    }
    try {
        const payload = jwt.decode(
            context.request.headers.accesstoken,
            configs.secret
        );
        user = Users.findById(payload.currentUser);
    } catch {
        context.response.status(400).send('Invalid token.');
        return user;
    }
    return user;
};
