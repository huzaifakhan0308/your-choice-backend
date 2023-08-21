const mongoose = require('mongoose');

const Buy = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    },
    email: {
        type: String,
    },
    city: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: String,
    },
    color: {
        required: true,
        type: String,
    },
    size: {
        required: true,
        type: Number,
    },
    state: {
        required: true,
        type: String,
    },
    zip: {
        type: String,
    },
    quantity: {
        required: true,
        type: Number,
    },
    productImg: {
        required: true,
        type: String,
    },
    confirm: {
        type: Boolean,
    }
}, { timestamps: true });

module.exports = mongoose.model('buy', Buy);

