const mongoose = require('mongoose');

const { Schema } = mongoose;

const facilitySchema = new Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        street: String,
        city: String,
        zip: Number,
    },
    courts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Court',
        },
    ],
    owner: {
        type: String,
        required: true,
        default: 'Jimmy',
    },
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
