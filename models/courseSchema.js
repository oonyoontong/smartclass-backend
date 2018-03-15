//Course schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    courseId: {type: String, unique: true,index: true, required: true},
    dateCreated: Date,
    courseName: {type: String, required: true},
    description: String,
    lectures: [Schema.Types.ObjectId],
    enrolled: [Schema.Types.ObjectId],
    instructors: [Schema.Types.ObjectId]
	});


module.exports = mongoose.model('Course', CourseSchema);

	