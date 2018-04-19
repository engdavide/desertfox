const   mongoose = require('mongoose');

let oppsSchema = new mongoose.Schema({
    qqId: String,
    custNum: String,
    custName: String,
    salesRep: String,
    closeDate: String,
    oppName: String,
    address: String,
    qqType: String,
    structure: String,
    panel1: String,
    panel1Coverage: String,
    panel2: String,
    panel2Coverage: String,
    hem: String,
    timeIn: String,
    timeout: String,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notes"
        }]
    //TODO: Add user and comment associations...
    
    
});

module.exports = mongoose.model("Opps", oppsSchema);