
var Lecture = require('../models/lectureSchema');
var Live = require('../models/liveSchema');


// lectureId,
//     question,
//     answer ?,
//     dateCreated,
//     upvote;


exports.create_live = function(liveJson){
    return new Promise(function(resolve, reject){
        Lecture.findOne(
            {_id: liveJson['lectureId']},
            function(err,lecture){
                if (err) {
                    console.log(err);
                    return;
                }
                if (!lecture){
                    console.log("FAILED");
                    return;
                }
                liveJson["dateCreated"] = Date.now();
                liveJson["upvotes"] = 0;

                var new_live = new Live(liveJson);
                new_live.save(function(err,live) {
                    if (err)
                        console.log(err);
                    lecture.live.push(live);
                    lecture.save(function(err){
                        if (err)
                            console.log(err);

                    });
                    resolve(live);
                });
            });
    })

};

exports.get_all_by_lecture = function(req,res){
    console.log("getting all questions from lecture")
    Live.find(
        {lectureId: req.body['lectureId']},
        function(err,live){
            if (err)
                res.send(live);
            console.log(live)
            res.json(live);
        }
    )
};

exports.upvote_live = function(liveJson){
    return new Promise(function(resolve, reject){
        Live.findOneAndUpdate(
            { _id : liveJson["_id"]},
            {$inc:{upvotes: 1}, $push:{upvoted: liveJson['accountId']}},
            function(err,live){
                if (err)
                    reject(err)
                console.log("found one and updated")
                console.log(live);
                resolve(live);
            }
        )
    })

};


exports.remove_live = function(req,res){
    Live.findOne(
        {_id: req.body['liveId']},
        function(err, live) {
            if (err)
                res.send(err);

            if(live == null){
                console.log("live is null");
                res.send(live);
            } else {
                live.remove();
                res.send(live);
            }
        }
    )
};

exports.answer_live = function(req,res){
    Live.update(
        { _id: req.body['questionId']},
        {answer : req.body['answer']},
        {new : true},
        function(err,live){
            if (err)
                res.send(err);
            res.json(live);
        }
    )
};