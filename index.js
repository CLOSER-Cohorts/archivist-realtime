var io = require('socket.io')
	.listen( process.env.PORT || 5000),
redis = require('redis').createClient( process.env.REDIS_URL || '' );

redis.subscribe('rt-update');

io.on('connection', function(socket) {
	console.log('a user connected');
	redis.on('message', function(channel, message) {
		console.log(message)
		socket.emit('rt-update', message);
	});
});

