const   mongoose = require('mongoose');

let oppsSchema = new mongoose.Schema({
    custNum: String,
    salesRep: String,
    closeDate: String,
    oppName: String
    //TODO: Add user and comment associations...
    
    
});

module.exports = mongoose.model("Opps", oppsSchema);