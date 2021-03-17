const express = require('express');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({ message: 'Courts' });
// });

const Court = require('../models/Court');
const Schedule = require('../models/Schedule');

const schedulesController = require('./schedulesController');

router
    .route('/')
    .get(schedulesController.getAllSchedules)
    .post(schedulesController.createSchedule);
router
    .route('/:court/:date')
    .get(schedulesController.getScheduleByCourtDate)
    .put(schedulesController.updateScheduleByCourtDate);

module.exports = router;
