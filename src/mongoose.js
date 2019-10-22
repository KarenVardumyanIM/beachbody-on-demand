const mongoose = require('mongoose');
const config = require('../env-configs.json');
mongoose.connect(config.app.mongoose.url);

// mongoose.connection.once('open', function() {
//    console.log("we're connected!")
// });

module.exports = mongoose;