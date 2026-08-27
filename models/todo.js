const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String},
    description: {type: String},
    price: {type: Number},
}, {timestamps: true})

const Todo = mongoose.model('Product', todoSchema);

module.exports = Todo;