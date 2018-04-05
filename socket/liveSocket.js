var liveController = require('../controllers/liveController');

module.exports = {
    start: function(io) {
        io.sockets.on('connection', function(socket) {

            console.log("CONNECTED!" + socket.id);

            socket.on('room', function(room) {
                console.log("Connected to room: " + room);
                socket.join(room);

            });

            socket.on('leave room', function() {
                console.log("leaving room " + socket.rooms[Object.keys(socket.rooms)[1]]);
                socket.leave(socket.rooms[Object.keys(socket.rooms)[1]])
            });


            socket.on('send message', function(liveQ){
                console.log("message received: " + liveQ);

                liveController.create_live(liveQ).then((result) => {
                    console.log("result of promise!")
                    console.log(result)
                    io.to(socket.rooms[Object.keys(socket.rooms)[1]]).emit("message received",result);
                })
            });

            socket.on('upvote', function(room, liveQId){
                //increment question upvote on mongoDB
                socket.to(room).emit(liveQId);
            });

            socket.on('answer', function(room, liveQId, answer){
                //add answer to liveSchema Document

                socket.to(room).emit(liveQId,answer);
            });

            socket.on('delete message', function(room, liveQId){
                //delete from mongoDB
                socket.to(room).emit(liveQId);
            });

            socket.on('disconnect', function(reason){
                console.log("disconnected");
                console.log(reason);
            });
        });







    }
};
