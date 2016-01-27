/**
 * Created by rmolodyko on 25.01.2016.
 */
var io = require('socket.io').listen(8080);

// Wait connections
io.sockets.on('connection', function (socket) {

    // If message was sent then send response broadcast and directly to user
    socket.on('message', function (msg) {
        socket.json.send(msg);
        socket.broadcast.json.send(msg)
    });
});
