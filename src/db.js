var mongoose = require('./mongoose.js')
var User = require('./models').Users;

var user = new User({
    username: "tester123",
    password: "t1422",
    email: "fsfsf"
});


// user.save(function(err, user, affected) {
//     console.log(arguments)
// })

// User.findOne({username: "Karen"}, function(err, result) {
//     console.log(result);
// });

mongoose.connection.on('open', function() {
    // var db = mongoose.connection.db;
    // db.dropDatabase(function(err) {
    //     if(err) throw err;
    //     console.log();
    //     mongoose.disconnect();
    // })
})