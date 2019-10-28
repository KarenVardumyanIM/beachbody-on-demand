const mongoose = require('mongoose');
const config = require('../env-configs.json');

mongoose.connect(config.app.mongoose.url, { useNewUrlParser: true });

module.exports = mongoose;