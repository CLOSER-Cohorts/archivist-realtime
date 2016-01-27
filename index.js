var io = require('socket.io').listen( process.env.PORT || 5000);

io.on('connection', function(socket) {
	console.log('a user connected');
});

