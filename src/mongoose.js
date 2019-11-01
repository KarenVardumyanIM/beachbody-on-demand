const mongoose = require('mongoose');
const envConfigs = require('../env-configs.json');

mongoose.connect(envConfigs.mongoose.url, { useNewUrlParser: true });

module.exports = mongoose;
