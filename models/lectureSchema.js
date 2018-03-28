var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LectureSchema = new Schema({
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
    }]

    //How to include ppt
    //quiz
});

LectureSchema.pre("remove", function(){
    this.model('Course').update(
        {_id: {$in: this.enrolled}},
        {$pull: {enrolled: this._id}},
        {multi: true},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed account references to this course");
        })
});

module.exports = mongoose.model('Lecture', LectureSchema);