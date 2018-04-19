var Course = require('../models/courseSchema');
var Account = require("../models/accountSchema");

exports.create_new_course = function(req,res){
    req.body["dateCreated"] = Date.now();
    var new_course = new Course(req.body);
    new_course.save(function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};


exports.remove_course = function(req, res) {
    Course.findOne(
        {_id: req.body['courseId']},
        function(err, course) {
            if (err)
                res.send(err);

            if(course == null){
                console.log("course is null");
                res.send(course);
            } else {
                course.remove();
                res.send(course);
            }
        }
    )
};

exports.get_enrolled_courses_from_account = function(req,res){
    Account.findOne({_id: req.body['accountId']}).populate('enrolled').exec(function(err,account){
        if (err)
            res.send(err);
        console.log(account);
        res.json(account.enrolled);
    })
};

exports.update_a_course = function(req, res) {
    var _id = req.body['courseId'];
    delete req.body.courseId;
    Course.findOneAndUpdate({_id: _id}, req.body, {new: true}, function(err, course) {
        if (err)
            res.send(err);
        console.log(course);
        res.json(course);
    });
};

exports.read_a_course = function(req, res) {
    Course.find({_id: req.body['courseId']}, function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};



exports.list_all_courses = function(req,res){

    Course.find({},function(err,course){
        if (err) res.send(err); res.json(course);
    })
};

exports.find_course_name_like = function(req,res){
    Course.find({
        courseName: { $regex: '.*' + req.body['courseName'] + '.*', $options: "i"}
    }, function(err,course){
        if (err)
            res.send(err);
        res.json(course);
    })
};
