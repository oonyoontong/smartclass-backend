var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LectureSchema = new Schema({
    courseId: String,
    lectureName: String,
    description: String,
    dateCreated: Date,
    live : [{
        type: Schema.Types.ObjectId,
        ref: 'Live'
    }],
    quiz : [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    feedback: [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }]

    //How to include ppt
    //quiz
});

LectureSchema.pre("remove", function(){
    console.log("REMOVING A LECTURE!");
    this.model('Course').update(
        {_id: this.courseId},
        {$pull: {lectures: this._id}},
        {multi: true},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed course references to this lecture");
        }
    );
    this.model('Live').find(
        {_id: {$in: this.live}},
        function(err,result){
            for (var i = 0;i < result.length;i++){
                var live = result[i];
                if (err)
                    console.log(err);

                if(live == null){
                    console.log("live is null");
                } else {
                    live.remove();
                    console.log(live);
                }
            }
        }
    )

    this.model('Quiz').find(
        {_id: {$in: this.quiz}},
        function(err,result){
            for (var i = 0;i < result.length;i++){
                var quiz = result[i];
                if (err)
                    console.log(err);

                if(quiz == null){
                    console.log("quiz is null");
                } else {
                    quiz.remove();
                    console.log(quiz);
                }
            }
        }
    )

    this.model('Feedback').find(
        {_id: {$in: this.feedback}},
        function(err,result){
            for (var i = 0;i < result.length;i++){
                var feedback = result[i];
                if (err)
                    console.log(err);

                if(feedback == null){
                    console.log("feedback is null");
                } else {
                    feedback.remove();
                    console.log(feedback);
                }
            }
        }
    )
});

module.exports = mongoose.model('Lecture', LectureSchema);