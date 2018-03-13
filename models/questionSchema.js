var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    question: String,
    questionType: Number,
    options: [String],
    answer: Schema.Types.ObjectId,
    response: [{
        student: {type:Schema.Types.ObjectId, ref: 'Account'},
        option: String,
        result: Boolean
    }]

	})


module.exports = mongoose.model('Question', QuestionSchema);