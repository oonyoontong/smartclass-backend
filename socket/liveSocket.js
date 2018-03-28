module.exports = {
    start: function(io) {
        io.on('connection', function(socket) {
            
            socket.on('room', function(room) {
                socket.join(room);
            });

            socket.on('send message', function(room, liveQ){
                //store question on mongoDB
                //send question to all in room
                socket.to(room).emit(liveQ);
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
                console.log(reason);
            });
        });







    }
};
