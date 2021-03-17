const express = require('express');
const { requireAdmin } = require('../../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({ message: 'Facilities' });
// });

// const Court = require('../models/Court');
// const Schedule = require('../models/Schedule');

const facilitiesController = require('./facilitiesController');

router
    .route('/')
    .get(facilitiesController.getAll)
    .post(requireAdmin, facilitiesController.create);
router
    .route('/:id')
    .get(facilitiesController.getOne)
    .put(facilitiesController.updateOne);

module.exports = router;
