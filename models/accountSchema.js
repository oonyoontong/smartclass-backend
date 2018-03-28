//Account schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: {type: String, unique: true,index: true, required: true},
    nickname: String,
    passwordSalt: String,
    passwordHash: String,
    email: String,
    //0 for admin, 1 for instructor, 2 for admin
    privilege: {type: Number, required: true},
    class: String,
    enrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
	});

AccountSchema.pre("remove",function(){
   this.model("Course").update(
       {_id: {$in : this.enrolled}},
       {$pull : {enrolled: this._id}},
       {multi: true},
       function(err){
           if (err)
               console.log(err);
           console.log("removed course references to this account");
       })
});

module.exports = mongoose.model('Account', AccountSchema);