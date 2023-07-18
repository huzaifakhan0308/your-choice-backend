const mongoose = require('mongoose');

const Items = mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    img: [{
        required: true,
        type: String,
        default: ''
    }],
    price: {
        type: Number,
        default: ''
    },
    off: {
        type: Number,
        default: ''
    },
    colors: [{
        type: String,
        required: true
    }],
    gender: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('items', Items);

