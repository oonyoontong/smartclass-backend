var Lecture = require('../models/lectureSchema');
var Course = require('../models/courseSchema');

exports.create_new_lecture = function(req,res){

    Course.findOne(
        {courseId: req.body['courseId']},
        function(err,course){
           if (err) {
               res.send(err);
               return;
           }
           if (!course){
               res.send("FAILED");
               return;
           }
           req.body["dateCreated"] = Date.now();
           var new_lecture = new Lecture(req.body);
           new_lecture.save(function(err,lecture) {
                if (err)
                    res.send(err);
                course.lectures.push(lecture);
                course.save(function(err){
                    if (err)
                        res.send(err);
                    res.send(lecture)
                });
            });
    });
};

exports.update_a_lecture = function(req, res) {
    Lecture.findOneAndUpdate({_id: req.body['lectureId']}, req.body, {new: true}, function(err, lecture) {
        if (err)
            res.send(err);
        console.log(lecture);
        res.json(lecture);
    });
};

exports.read_a_lecture = function(req,res){
    Lecture.findById(req.body['lectureId'], function(err,lecture){
        if (err)
            res.send(err);
        res.json(lecture);
    })
};

exports.read_lecture_array = function(req,res){
    Lecture.find({_id: {$in:req.body['lectureIdArray']}}, function(err,lecture){
        if(err)
            res.send(err);
        res.json(lecture)
    })
};

