
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var liveSchema = new Schema({
    lectureId:String,
    question: String,
    answer: String,
    dateCreated: Date,
    upvote: Number
});


module.exports = mongoose.model('Live', liveSchema);