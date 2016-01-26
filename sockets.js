module.exports = function (server) {
  var io = require('socket.io')(server);

  io.on("connection", function (socket) {
    io.to(socket.id).emit("connected");


    socket.on('disconnect', function () {
    	socket.broadcast.emit("left",socket.user);
    });

    socket.on('handshake', function (user) {
    	socket.user = user;
    	socket.broadcast.emit("joined", user);
    });

    socket.on('message', function(data){
    	data.date = getDate(new Date());
    	socket.broadcast.emit('message', data);
    	socket.emit('message',data);
    });

	});
}

function getDate(date){
	return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
