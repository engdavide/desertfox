const   mongoose = require('mongoose');

let productsSchema = new mongoose.Schema({
    stockCode: String,
    colorCode: String,
    productCode: String,
    gauge: String,
    priceCode: String,
    sellingPrice: String,
    description: String
});

module.exports = mongoose.model('Products', productsSchema);

