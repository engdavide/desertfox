const   mongoose = require('mongoose');

let productsSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: String,
    description: String
});

module.exports = mongoose.model('Products', productsSchema);

