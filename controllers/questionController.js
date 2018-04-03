var Question = require('../models/questionSchema');

exports.remove_question = function(req,res){
    Question.findOne(
        {_id: req.body['questionId']},
        function(err, question) {
            if (err)
                res.send(err);

            if(question == null){
                console.log("question is null");
                res.send(question);
            } else {
                question.remove();
                res.send(question);
            }
        }
    )
};