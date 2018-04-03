var Quiz = require('../models/quizSchema');
var Question = require('../models/questionSchema');

exports.create_new_quiz = function(req,res){
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
    quiz.save(function(err,quiz){
        if (err)
            console.log(err);
        res.json(quiz);
    })
};

exports.get_all_quiz = function(req,res){
    Quiz.find({})
        .populate("questions")
        .exec(function(err,quiz){
            if (err)
                res.send(err)
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