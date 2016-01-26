(function () {
	$(document).ready(function(){
		var socket = io.connect();
		socket.on('connected', function () {
		  socket.emit('handshake', {name:window.username});
		});

		socket.on('joined', function(data){
			console.log(data);
			$("#chat-window").append("<div align='center'>" + data.name + " has joined the chat.</div>");
			$(".chat-window-container").scrollTop($("#chat-window").height());
		})

		socket.on('message', function(data){
			$("#chat-window").append(
				"<div class='sender'><b>" + data.username + "</b><span>" + data.date + "</span></div><div class='message'><b>$>  </b>" + data.message + "</div>");
			$(".chat-window-container").scrollTop($("#chat-window").height());
		});

		socket.on('left', function(data){
			$("#chat-window").append("<div align='center'>" + data.name + " has left the chat.</div>");
			$(".chat-window-container").scrollTop($("#chat-window").height());
		})

		$("form").submit(function(e){
			e.preventDefault();
			socket.emit("message",{username: window.username, message:$("#chat-input").val()});
			$("#chat-input").val("")
		});
	});
})();