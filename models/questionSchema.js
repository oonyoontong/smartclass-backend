var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    quizId:String,
    questionName: String,
    questionType: String,
    choices: [String],
    correct: [Number],
    response: [{
        student: {type:Schema.Types.ObjectId, ref: 'Account'},
        answer: [Number],
        result: Boolean
    }]

});

QuestionSchema.pre("remove", function(){
    this.model('Quiz').update(
        {_id: this.quizId},
        {$pull: {enrolled: this._id}},
        {multi: true},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed quiz references to this question");
        });
    
});
module.exports = mongoose.model('Question', QuestionSchema);