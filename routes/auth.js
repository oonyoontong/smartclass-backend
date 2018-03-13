var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('Account');
var Account = require('../controllers/accountController');
var sha256 = require('sha256');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            var passSalt = user.passwordSalt;
            var passHash = sha256("" + passSalt + password);
            if (passHash != user.passwordHash){
                return done(null, false, {message: 'Incorrect password'});
            }

            return done(null,user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/*router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login'})
);*/

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


router.post('/signup',Account.create_new_account);

router.get('/',Account.list_all_accounts);


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;