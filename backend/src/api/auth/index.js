const express = require('express');

const router = express.Router();

const authController = require('./authController');

router.get('/', (req, res) => {
    res.json({ message: 'Auth' });
});

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

module.exports = router;
