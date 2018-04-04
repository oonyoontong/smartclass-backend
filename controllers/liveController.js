/*RESTFUL - GET ALL MESSAGE > CLIENT

SORT BY UPVOTE IN VUE

SOCKET - CREATE MESSAGE > SERVER

MONGOOSE - CREATE MESSAGE > MESSAGE

SOCKET - EMIT MESSAGE > CLIENTS*/

var Lecture = require('../models/lectureSchema');
var Live = require('../models/liveSchema');


// lectureId,
//     question,
//     answer ?,
//     dateCreated,
//     upvote;


exports.create_live = function(liveJson){
    Lecture.findOne(
        {_id: req.body['lectureId']},
        function(err,lecture){
            if (err) {
                console.log(err);
                return;
            }
            if (!lecture){
                console.log("FAILED");
                return;
            }
            req.body["dateCreated"] = Date.now();
            var new_live = new Live(req.body);
            new_live.save(function(err,live) {
                if (err)
                    console.log(err);
                lecture.live.push(live);
                lecture.save(function(err){
                    if (err)
                        console.log(err);
                    console.log(live)
                });
            });
        });
};

exports.get_all_by_lecture = function(req,res){
    Live.find(
        {lectureId: req.body['lectureId']},
        function(err,live){
            if (err)
                res.send(live);
            res.json(live);
        }
    )
};

exports.upvote_live = function(req,res){
    Live.findOneAndUpdate(
        { _id : req.body["liveId"]},
        {$inc:{upvote: 1}},
        function(err,live){
            if (err)
                res.send(err);
            res.json(live);
        }
    )
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