var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new mongoose.Schema({
    student: {type:Schema.Types.ObjectId,ref: 'Student'},
    feedback: String,
    slideNumber: Number,
    lecture: {type:Schema.Types.ObjectId, ref: 'Lecture'}
	});

module.exports = mongoose.model('Feedback', FeedbackSchema);