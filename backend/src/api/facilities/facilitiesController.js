const Facility = require('../models/Facility');

exports.getAll = async (req, res) => {
    const arr = await Facility.find().populate('courts');
    res.json({
        data: arr,
    });
};

exports.create = async (req, res) => {
    const { id, name, address, courts, owner } = req.body;

    const facility = new Facility();
    facility._id = id.toLowerCase();
    facility.name = name;
    facility.address = address;
    facility.courts = courts;
    facility.owner = owner;

    newFacility = await facility.save();
    await newFacility.populate('courts').execPopulate();
    res.json({
        data: newFacility,
    });
};

exports.getOne = async (req, res) => {
    const { id } = req.params;
    const doc = await Facility.findOne({ _id: id }).populate('courts').exec();
    if (!doc) {
        res.status(500);
    }
    res.json({
        data: doc,
    });
};

exports.updateOne = async (req, res) => {
    const { id } = req.params;
    const { name, address, owner } = req.body; // Might want to be able to change id?
    const doc = await Facility.findOne({ _id: id });

    if (name) {
        doc.name = name;
    }
    if (address) {
        doc.address = address;
    }
    if (owner) {
        doc.owner = owner;
    }

    const updatedFacility = await doc.save();
    await updatedFacility.populate('courts').execPopulate();
    res.json({
        data: updatedFacility,
    });
};
