var mongoose = require("mongoose");
var Account = require('../models/accountSchema');
var Course  = require('../models/courseSchema');
var sha256 = require('sha256');
var passport = require('../passport/passport');


exports.authenticate = function(req, res, next) {
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
}

exports.list_all_accounts = function(req,res){
    Account.find({},function(err,account){
        if (err) res.send(err); res.json(account);
    })
};

exports.create_new_account = function(req,res){
    req.body['passwordSalt'] = String(sha256(Date.now().toString()));
    req.body['passwordHash'] = sha256(""+ req.body['passwordSalt'] + req.body['password']);
    delete req.body["password"];
    var new_account = new Account(req.body);
    new_account.save(function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
};

exports.read_a_account = function(req, res) {
    Account.findById(req.body['accountId'], function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
};

exports.update_a_account = function(req, res) {
    console.log(req.body);

    Account.findOneAndUpdate({_id: req.body['accountId']}, req.body, {new: true}, function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
};


exports.delete_account = function(req, res) {
    Account.remove({
        _id: req.body['accountId']
    }, function(err, account) {
        if (err)
            res.send(err);
        res.json({ message: 'Account successfully deleted' });
    });
};

//TODO add account to course
exports.add_course = function(req,res){
    Course.findByIdAndUpdate(
        req.body['courseId'],
        { $addToSet: {enrolled: req.body['accountId']}},
        {safe: true, upsert: true,new:true},function(err,course){
            if (err)
                res.send(err);
        }
    );

    Account.findByIdAndUpdate(
        req.body['accountId'],
        { $addToSet: {enrolled: req.body['courseId']}},
        {safe: true, upsert: true,new:true}
    ).populate('enrolled')
        .exec(function(err, account) {
            if (err)
                res.send(err);
            res.json(account);
        });
};

exports.delete_course = function(req,res){
    Course.findByIdAndUpdate(
        req.body['courseId'],
        { $pull: {enrolled: req.body['accountId']}},
        {safe: true, upsert: true,new:true},function(err,course){
            if (err)
                res.send(err);
        }
    );

    Account.findByIdAndUpdate(
        req.body['accountId'],
        { $pull: {enrolled: req.body['courseId']}},
        {safe: true, upsert: true, new:true}
    ).populate('enrolled')
        .exec(function(err, account) {
            if (err)
                res.send(err);
            res.json(account);
        });
};



/*
exports.add_course = function(req,res){
    Account.findByIdAndUpdate(
        req.body['accountId'],
        {$push: {enrolled: req.body['courseId']}},
        {safe: true, upsert: true},
        function(err, account) {
            if (err)
                res.send(err);
            res.json(account);
        }
    );
};*/
