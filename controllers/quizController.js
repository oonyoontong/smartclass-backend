var Quiz = require('../models/quizSchema');
var Question = require('../models/questionSchema');
var Lecture = require('../models/lectureSchema');

exports.create_new_quiz = function(req,res){
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
            var quiz = new Quiz(req.body);
            var questionsRaw = req.body["questionsRaw"];
            for (var i = 0; i < questionsRaw.length;i++){
                questionsRaw[i].quizId = quiz._id;
                var question = new Question(questionsRaw[i]);
                question.save(function(err){
                    if (err)
                        console.log(err);
                });
                quiz.questions.push(question);
            }
            quiz.save(function(err,result){
                if (err)
                    console.log(err);
                lecture.quiz.push(result);
                lecture.save(function(err){
                    if (err)
                        res.send(err);
                    res.send(result);
                });
            })
        });

};

exports.get_all_quiz = function(req,res){
    Quiz.find({})
        .populate("questions")
        .exec(function(err,quiz){
            if (err)
                res.send(err);
            res.json(quiz);
        })
};

exports.remove_quiz = function(req,res){
    Quiz.findOne(
        {_id: req.body['quizId']},
        function(err, quiz) {
            if (err)
                res.send(err);

            if(quiz == null){
                console.log("quiz is null");
                res.send(quiz);
            } else {
                quiz.remove();
                res.send(quiz);
            }
        }
    )
};

exports.update_quiz = function(req,res){
    Quiz.Update(
        {_id: req.body['quizId']},
        req.body,
        {new: true},
        function(err,quiz){
            if (err)
                res.send(err);
            res.json(quiz);
        }
    )
};

