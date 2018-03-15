var express = require('express');
var router = express.Router();
var passport = require('../passport/passport');
var AccountController = require('../controllers/accountController');




router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({
            authenticated: false
        }); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({
                authenticated: true,
                account: user
            });
        });
    })(req, res, next);
});


router.post('/create',AccountController.create_new_account);

router.get('/',AccountController.read_a_account);

router.post('/update',AccountController.update_a_account);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;