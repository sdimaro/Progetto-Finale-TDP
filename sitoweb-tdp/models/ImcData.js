const mongoose = require('mongoose');

const imcDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    altezza: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    imc: {
        type: Number,
        required: true
    },
    classificazione: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ImcData', imcDataSchema);