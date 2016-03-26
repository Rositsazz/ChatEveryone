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
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // var seconds = date.getSeconds();
    // if (seconds < 10) {
    //     seconds = "0" + seconds;
    // }
    // if (minutes < 10) {
    //     minutes = "0" + minutes;
    // }
    // if (hours < 10) {
    //     hours = "0" + hours;
    // }
    // return hours + ":" + minutes + ":" + seconds;
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
