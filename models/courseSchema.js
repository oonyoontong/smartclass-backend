//Course schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    courseId: {type: String, unique: true,index: true, required: true},
    dateCreated: Date,
    courseName: {type: String, required: true},
    description: String,
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    enrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }],
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
	});


module.exports = mongoose.model('Course', CourseSchema);

	