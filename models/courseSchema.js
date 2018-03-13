//Course schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    courseID: String,
    dateCreated: Date,
    courseName: String,
    description: String,
    lectures: [Schema.Types.ObjectId],
    enrolled: [Schema.Types.ObjectId],
    instructors: [Schema.Types.ObjectId]
	})


module.exports = mongoose.model('Course', CourseSchema);

	