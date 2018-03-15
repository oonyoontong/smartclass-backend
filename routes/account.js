var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Account = require('../models/accountSchema');
var AccountController = require('../controllers/accountController');
var sha256 = require('sha256');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Account.findOne({ username: username }, function(err, user) {
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
    Account.findById(id, function(err, user) {
        done(err, user);
    });
});


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