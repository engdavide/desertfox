const   mongoose = require('mongoose');

const   Users = require('../models/users'),
        Opps = require('../models/opps'),
        Lines = require('../models/lines');


let quotesSchema = new mongoose.Schema({
    quoteNum: Number,
    totalPrice: String,
    lines: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lines"
        },
        sku: String,
        qty: Number,
        unitPrice: Number,
        extPrice: Number,
        prodFamily: String,
        substrate: Number,
        coating: String,
        color: String,
        ribHeight: Number,
        panWidth: Number,
        comments: String,
    },
    
    opps: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opps"
        },
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
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String,
        initials: String
    }
});

module.exports = mongoose.model("Quotes", quotesSchema);