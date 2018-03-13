var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    quizName: String,
    description: String,
    dateCreated: Date,
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
	})

module.exports = mongoose.model('Quiz', QuizSchema);
