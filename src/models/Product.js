const mongoose = require('mongoose');
const {Schema} = mongoose;

const Product = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: false}
});

module.exports = mongoose.model('Product', Product)