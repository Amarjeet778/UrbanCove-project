const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const userController = require('../controllers/users');
const { saveRedirectUrl } = require('../middleware');
const User = require('../models/user'); 

router.route('/signup').get(userController.signupForm).post(wrapAsync(userController.signup));

router.route('/login')
.get(userController.loginForm)
.post(saveRedirectUrl, async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await User.authenticate()(username, password);

        if (!result.user) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }

        req.login(result.user, (err) => {
            if (err) return next(err);
            return userController.login(req, res);
        });

    } catch (err) {
        req.flash('error', 'Login failed');
        res.redirect('/login');
    }
});;




router.get('/logout', userController.logout);

module.exports = router;
