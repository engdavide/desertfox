const   mongoose = require('mongoose');

let linesSchema = new mongoose.Schema({
    num: Number,
    productCode: String,
    stockCode: String,
    quantity: Number,
    unitPrice: Number,
    extPrice: Number,
    comments: String
});

module.exports = mongoose.model("Lines", linesSchema);