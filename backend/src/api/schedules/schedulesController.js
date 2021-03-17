const Court = require('../models/Court');
const Schedule = require('../models/Schedule');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

exports.getAllSchedules = async (req, res) => {
    const arr = await Schedule.find().populate('courtId');
    res.json({
        data: arr,
    });
};

exports.getScheduleByCourtDate = async (req, res) => {
    const { court, date } = req.params;
    const doc = await Schedule.findOne({ courtId: court, date })
        .populate('courtId')
        .exec();
    if (!doc) {
        res.status(500);
    }
    res.json({
        data: doc,
    });
};

// Reserve Court by Court ID and Date
exports.updateScheduleByCourtDate = async (req, res) => {
    const { court, date } = req.params;
    const { slots } = req.body;
    const doc = await Schedule.findOne({ courtId: court, date }).exec();

    slots.forEach((slot) => {
        doc.slots = doc.slots.map((item) => {
            if (item.hour === slot) {
                item.booked = true;
            }
            return item;
        });
    });

    const updatedDoc = await doc.save();
    await updatedDoc.populate('courtId').execPopulate();
    res.json({
        data: updatedDoc,
    });
};

exports.createSchedule = async (req, res) => {
    const { date, courtId, slots } = req.body;

    const newS = new Schedule();
    newS.date = formatDate(date);
    newS.courtId = courtId;
    let createdSchedule = await newS.save();

    if (slots) {
        slots.forEach((slot) => {
            createdSchedule.slots = createdSchedule.slots.map((item) => {
                if (item.hour === slot.hour) {
                    item.booked = true;
                }
                return item;
            });
        });
        createdSchedule = await createdSchedule.save();
    }
    await createdSchedule.populate('courtId').execPopulate();
    res.json({
        data: createdSchedule,
    });
};
