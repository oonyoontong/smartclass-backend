
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var liveSchema = new Schema({
    lectureId:String,
    question: String,
    answer: String,
    dateCreated: Date,
    upvote: Number
});

liveSchema.pre("remove", function(){
    this.model('Lecture').update(
        {_id: this.lectureId},
        {$pull: {live: this._id}},
        {multi: true},
        function(err){
            if (err)
                console.log(err);
            else
                console.log("removed lecture references to this live question");
        }
    );
});


module.exports = mongoose.model('Live', liveSchema);