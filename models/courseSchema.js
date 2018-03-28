//Course schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    courseId: {type: String, unique: true, index: true, required: true},
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

CourseSchema.pre("remove", function(){
    this.model('Account').update(
        {_id: {$in: this.enrolled}},
        {$pull: {enrolled: this._id}},
        {multi: true},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed account references to this course");
        })

    this.model('Lecture').remove(
        {_id: {$in: this.lectures}},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed all lectures");
        }
    )
});

module.exports = mongoose.model('Course', CourseSchema);
