const mongoose = require('mongoose');

const Items = mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    img: {
        required: true,
        type: Array,
    },
    price: {
        type: Number,
        default: ''
    },
    off: {
        type: Number,
        default: ''
    },
    colors: {
        required: true,
        type: Array,
    },
    sizes: {
        required: true,
        type: Array,
    },
    gender: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('items', Items);

