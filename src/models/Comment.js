const mongoose = require('mongoose');
const {Schema} = mongoose;

const Comment = new Schema({
    title: {type: String, required: false},
    description: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, required: true},
    products: {type: [Schema.Types.ObjectId], required: true},
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Comment', Comment)