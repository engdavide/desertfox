const   mongoose = require('mongoose');

let custsSchema = new mongoose.Schema({
    num: String,
    name: String
});

module.exports = mongoose.model("Custs", custsSchema);