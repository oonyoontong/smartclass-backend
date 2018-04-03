var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new mongoose.Schema({
    student: {type:Schema.Types.ObjectId,ref: 'Student'},
    dateCreated: Date,
    feedback: String,
    rating: Number,
    lectureId: {type:Schema.Types.ObjectId, ref: 'Lecture'}
	});

FeedbackSchema.pre("remove", function(){
    this.model('Lecture').update(
        {_id: this.lectureId},
        {$pull: {feedback: this._id}},
        {multi: true},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed lecture references to this feedback");
        }
    );
});

module.exports = mongoose.model('Feedback', FeedbackSchema);