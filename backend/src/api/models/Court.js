const mongoose = require('mongoose');

const { Schema } = mongoose;

const courtSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    facility: {
        type: Schema.Types.ObjectId,
        ref: 'Facility',
    },
});

const Court = mongoose.model('Court', courtSchema);

module.exports = Court;
