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
    city: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: String,
    },
    additional: {
        required: true,
        type: String,
    },
    item: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('buy', Buy);

