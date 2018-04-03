/*RESTFUL - GET ALL MESSAGE > CLIENT

SORT BY UPVOTE IN VUE

SOCKET - CREATE MESSAGE > SERVER

MONGOOSE - CREATE MESSAGE > MESSAGE

SOCKET - EMIT MESSAGE > CLIENTS*/


var Live = require('../models/liveSchema');


// lectureId,
//     question,
//     answer ?,
//     dateCreated,
//     upvote;


exports.create_live = function(liveJson){

    liveJson["dateCreated"] = Date.now();

    var live = new Live(liveJson);
    live.save(function(err){
        if (err)
            console.log(err);
    })

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