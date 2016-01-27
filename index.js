var io = require('socket.io').listen(3001);

io.on('connection', function(socket) {
	console.log('a user connected');
});

