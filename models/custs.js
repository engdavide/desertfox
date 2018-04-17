const   mongoose = require('mongoose');

let custSchema = new mongoose.Schema({
    num: String,
    name: String,

    
});

module.exports = mongoose.model("Custs", custSchema);