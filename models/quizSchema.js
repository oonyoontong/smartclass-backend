var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    questionId: String,
    quizName: String,
    description: String,
    dateCreated: Date,
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
	})


QuizSchema.pre("remove", function(){
    this.model('Question').find(
        {_id: {$in: this.questions}},
        function(err,questions){
            for (var i = 0;i < questions.length;i++){
                var question = questions[i];
                if (err)
                    console.log(err);

                if(question == null){
                    console.log("question is null");
                } else {
                    question.remove();
                    console.log(question);
                }
            }
        }
    )
});

module.exports = mongoose.model('Quiz', QuizSchema);
