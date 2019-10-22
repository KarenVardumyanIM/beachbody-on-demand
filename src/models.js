var mongoose = require('./mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

exports.Users = mongoose.model('beachbody', schema);