const   mongoose = require('mongoose'),
        passportLocalMongoose = require("passport-local-mongoose");

let usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    initials: String,
    role: String,
    email: String
});

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", usersSchema);