const   mongoose = require('mongoose');

const   Custs = require('../models/custs'),
        Users = require('../models/users'),
        Notes = require('../models/notes');

let oppsSchema = new mongoose.Schema({
    qqId: String,
    cust: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Custs"
            },
        num: String,
        name: String,
        },
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
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
            },
        initials: String,
        },
    status: [
        {
            name: String,
            time: String
        }],
        //TODO consider if this should be it's own model and how to tie to Quote
        // status
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notes"
        }]
    
    
});

module.exports = mongoose.model("Opps", oppsSchema);