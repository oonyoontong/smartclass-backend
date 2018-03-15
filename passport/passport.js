var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var sha256 = require('sha256');
var Account = require('../models/accountSchema');

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

module.exports = passport;