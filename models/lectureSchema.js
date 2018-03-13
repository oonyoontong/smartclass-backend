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
})

module.exports = mongoose.model('Lecture', LectureSchema);