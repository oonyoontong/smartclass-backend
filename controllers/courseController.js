var mongoose = require("mongoose");
var Course = require('../models/courseSchema');


exports.create_new_course = function(req,res){
    req.body["Date"] = Date.now();

    var new_course = new Course(req.body);
    new_course.save(function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
};

exports.delete_course = function(req, res) {
    Course.remove({
        courseId: req.body['courseId']
    }, function(err, course) {
        if (err)
            res.send(err);
        res.json({ message: 'Course successfully deleted' });
    });
};


exports.update_a_course = function(req, res) {
    Course.findOneAndUpdate({courseId: req.body['courseId']}, req.body, {new: true}, function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
};