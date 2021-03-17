const express = require('express');
const router = express.Router();

const courts = require('./courts');
const schedules = require('./schedules');
const facilities = require('./facilities');
const auth = require('./auth');

router.get('/', (req, res) => {
    res.json({ message: 'API v1' });
});

router.use('/courts', courts);
router.use('/schedules', schedules);
router.use('/facilities', facilities);
router.use('/auth', auth);

module.exports = router;
