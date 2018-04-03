var Feedback = require('../models/feedbackSchema');
var Lecture = require("../models/lectureSchema");

exports.create_feedback = function(req,res){
    Lecture.findOne(
        {_id: req.body['lectureId']},
        function(err,lecture){
            if (err) {
                res.send(err);
                return;
            }
            if (!lecture){
                res.send("FAILED");
                return;
            }
            req.body["dateCreated"] = Date.now();
            var new_feedback = new Feedback(req.body);
            new_feedback.save(function(err,feedback) {
                if (err)
                    res.send(err);
                lecture.feedback.push(feedback);
                lecture.save(function(err){
                    if (err)
                        res.send(err);
                    res.send(feedback)
                });
            });
        });
};

exports.get_all_by_lecture = function(req,res){
    Feedback.find(
        {lectureId: req.body['lectureId']},
        function(err,feedback){
            if (err)
                res.send(feedback);
            res.json(feedback);
        }
    )
};

exports.remove_feedback = function(req,res){
    Feedback.findOne(
        {_id: req.body['feedbackId']},
        function(err, feedback) {
            if (err)
                res.send(err);

            if(feedback == null){
                console.log("feedback is null");
            } else {
                feedback.remove();
                res.send(feedback);
            }
        }
    )
};