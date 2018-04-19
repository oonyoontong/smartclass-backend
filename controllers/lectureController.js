var Lecture = require('../models/lectureSchema');
var Course = require('../models/courseSchema');

exports.create_new_lecture = function(req,res){
    Course.findOne(
        {_id: req.body['courseId']},
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
        res.json(lecture);
    });
};

exports.get_all_lectures_from_course = function(req,res){
    Course.findById(req.body['courseId'],"lectures")
        .populate("lectures")
        .exec(function(err,lectures){
            if (err)
                send(err);
            res.json(lectures);
        })
};


exports.get_all_lectures = function(req,res){
    Lecture.find({})
        .populate("quiz")
        .exec(function(err,lectures){
            if (err)
                res.send(err);
            res.json(lectures);
    })
};

exports.remove_lecture = function(req,res){
    Lecture.findOne(
        {_id: req.body['lectureId']},
        function(err, lecture) {
            if (err)
                res.send(err);

            if(lecture == null){
                console.log("lecture is null");
                res.send(lecture);
            } else {
                lecture.remove();
                res.send(lecture);
            }
        }
    )


};
