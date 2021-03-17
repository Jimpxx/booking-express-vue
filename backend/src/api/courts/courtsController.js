const Court = require('../models/Court');

exports.getAllCourts = async (req, res) => {
    const arr = await Court.find();
    res.json({
        data: arr,
    });
};
