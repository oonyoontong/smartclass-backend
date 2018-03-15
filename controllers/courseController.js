var mongoose = require("mongoose");
var Course = mongoose.model("Course");


exports.create_new_course = function(req,res){

    var new_course = new Course(req.body);
    new_course.save(function(err, account) {
        if (err)
            res.send(err);
        res.json(account);
    });
};