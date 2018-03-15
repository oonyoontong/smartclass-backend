var mongoose = require("mongoose");
var Account = mongoose.model("Account");
var sha256 = require('sha256');

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


exports.delete_a_account = function(req, res) {

    Account.remove({
        _id: req.params.accountId
    }, function(err, account) {
        if (err)
            res.send(err);
        res.json({ message: 'Account successfully deleted' });
    });
};