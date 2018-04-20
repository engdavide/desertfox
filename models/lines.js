const   mongoose = require('mongoose');

let linesSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model("Lines", linesSchema);