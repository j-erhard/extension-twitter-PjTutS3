const authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){
    app.get('/signup', isLoggedIn, authController.signup);
    app.get('/signin', isLoggedIn, authController.signin);

    app.get('/', isLoggedIn, authController.signin);

    app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/home',
        failureRedirect: '/signup'} ));

    app.get('/home',isNotLoggedIn, authController.home);
    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin', { successRedirect: '/home',
        failureRedirect: '/signin'} ));

    app.get('/tableDesQuetes', isNotLoggedIn, authController.quetes);

    app.get('/Contact', isNotLoggedIn, authController.contact);

    app.get('/verifie', isNotLoggedIn, authController.verifie);

    function isNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/signin');
    }

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) res.redirect('/home');
        else return next();
    }
}


