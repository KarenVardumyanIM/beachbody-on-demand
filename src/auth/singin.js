const jwt = require('jwt-simple');
const configs = require('../../env-configs.json');
const Users = require('../models').Users;

module.exports = function(req, res) {
    Users.findOne({ email: req.body.email }, function(err, user) {
      if(err) {
        throw err;
      }
      if(user) {
        try {
          if(user.verifyPassword(req.body.password)) {
            const payload = { currentUser: user._id };
            const token = jwt.encode(payload, configs.app.secret);
            res.end(token)
          } else {
            res.status(400).send('Incorrect password.');
          }
        } catch {
          status(500).send('Please log in again.');
        }
      } else {
        res.status(400).send('Email address does not exist.');
      }
    })
}
