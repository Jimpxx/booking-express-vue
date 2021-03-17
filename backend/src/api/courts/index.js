const express = require('express');

const router = express.Router();

const courtsController = require('./courtsController');

// router.get('/', (req, res) => {
//     res.json({ message: 'Courts' });
// });

router.route('/').get(courtsController.getAllCourts);

module.exports = router;
