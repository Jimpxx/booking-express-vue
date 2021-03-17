const jwt = require('jsonwebtoken');
const User = require('../api/models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(403).json({
                    message: 'Not allowed, valid token required',
                });
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'Not allowed' });
    }
};

const requireAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(403).json({
                    message: 'Not allowed, valid token required',
                });
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                console.log(user);
                if (user.role === 'admin') {
                    next();
                } else {
                    res.status(403).json({ message: 'Not allowed' });
                }
            }
        });
    } else {
        res.status(403).json({ message: 'Login required' });
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, checkUser, requireAdmin };
