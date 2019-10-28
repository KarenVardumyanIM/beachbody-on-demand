const Users = require('../models').Users;

module.exports = function(req, res) {
    const newUser = new Users({
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      email: req.body.email
    });
    Users.findOne({ email: req.body.email }, function(err, user) {
      if(err) {
        throw err;
      }
      if(user) {
        res.status(400).end('This email address is already used in the account.');
      } else {
        newUser.save(function(err, user) {
          if(err) {
            res.status(400).end('Registration failed.')
          } else {
            res.end(`Welcome ${user.name}`)
          }
        })
      }
    })
}