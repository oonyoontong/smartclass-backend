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
        })
});

module.exports = mongoose.model('Lecture', LectureSchema);