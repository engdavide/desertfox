const   mongoose = require('mongoose');

const   Users = require('../models/users'),
        Opps = require('../models/opps'),
        Lines = require('../models/lines');


let quotesSchema = new mongoose.Schema({
    quoteNum: Number,
    priceCode: String,
    totalPrice: String,
    panel: String,
    substrate: String,
    paint: String,
    color: String,
    ribHeight: String,
    panelWidth: String,
    lines: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lines"
        },
        num: Number,
        productCode: String,
        stockCode: String,
        quantity: Number,
        unitPrice: Number,
        extPrice: Number,
        comments: String
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