var mongoose = require("mongoose");
var Course = require('../models/courseSchema');
var Account = require('../models/accountSchema');

exports.create_new_course = function(req,res){
    req.body["Date"] = Date.now();

    var new_course = new Course(req.body);
    new_course.save(function(err, course) {
        if (err)
            res.send(err);
        res.json(course);
    });
};

//TODO remove all references/children
exports.delete_course = function(req, res) {
    Course.findOne({courseId: req.body["courseId"]}).select('enrolled _id').exec(function(err,course){
        if (err)
            res.send(err);
        console.log(course['enrolled']);
        console.log(course['_id']);
        Account.update({_id: {$in: course['enrolled']}},{$pull:{enrolled: course["_id"]}},{multi:true}, function(err,account){
            if (err)
                res.send(err)
        })

        /*Course.remove({
            courseId: req.body['courseId']
        }, function(err, course) {
            if (err)
                res.send(err);
            res.json({ message: 'Course successfully deleted' });
        });*/
    })


};


exports.update_a_course = function(req, res) {
    Course.findOneAndUpdate({courseId: req.body['courseId']}, req.body, {new: true}, function(err, course) {
        if (err)
            res.send(err);
        console.log(course);
        res.json(course);
    });
};

exports.read_a_course = function(req, res) {
    Course.find({courseId: req.body['courseId']}, function(err, course) {
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
            res.send(err)
        res.json(course);
    })
}


