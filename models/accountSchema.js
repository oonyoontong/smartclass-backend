//Account schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: {type: String, unique: true,index: true, required: true},
    passwordSalt: String,
    passwordHash: String,
    email: String,
    //0 for admin, 1 for instructor, 2 for admin
    privilege: {type: Number, required: true},
    class: String,
    coursesEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
	});


module.exports = mongoose.model('Account', AccountSchema);