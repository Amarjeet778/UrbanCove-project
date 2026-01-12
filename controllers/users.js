const User = require('../models/user');

module.exports.signupForm = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.redirectUrl || '/listings';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'Logged you out!');
        res.redirect('/listings');
    });
};
