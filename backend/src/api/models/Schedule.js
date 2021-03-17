const mongoose = require('mongoose');

const { Schema } = mongoose;

const slotSchema = new Schema({
    hour: {
        type: Number,
        required: true,
        min: 0,
        max: 23,
    },
    booked: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const scheduleSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    courtId: {
        type: Schema.Types.ObjectId,
        ref: 'Court',
    },
    slots: {
        type: [slotSchema],
        default: [
            {
                hour: 10,
                booked: false,
            },
            {
                hour: 11,
                booked: false,
            },
            {
                hour: 12,
                booked: false,
            },
            {
                hour: 13,
                booked: false,
            },
            {
                hour: 14,
                booked: false,
            },
            {
                hour: 15,
                booked: false,
            },
            {
                hour: 16,
                booked: false,
            },
            {
                hour: 17,
                booked: false,
            },
            {
                hour: 18,
                booked: false,
            },
            {
                hour: 19,
                booked: false,
            },
            {
                hour: 20,
                booked: false,
            },
            {
                hour: 21,
                booked: false,
            },
            {
                hour: 22,
                booked: false,
            },
            {
                hour: 23,
                booked: false,
            },
        ],
    },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
