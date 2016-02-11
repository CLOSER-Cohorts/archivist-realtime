var io = require('socket.io')
	.listen( process.env.PORT || 5000),
redis = require('redis').createClient( process.env.REDIS_URL || '' );

redis.subscribe('rt-update');

var connected = {};

var locksUpdated = function() {
	var locks = [];
	for (var key in connected) {
		if (connected.hasOwnProperty(key))
			locks = locks.concat(connected[key].locks);
	}
	io.emit('locks-updated', JSON.stringify(locks))
};

io.on('connection', function(socket) {
	connected[socket.id] = {socket: socket, locks: []};
	console.log('a user connected');

	socket.on('disconnect', function() {
		delete connected[socket.id];
		console.log('a user disconnected');
	});

	socket.on('lock', function (message) {
		try {
			connected[socket.id].locks.push(JSON.parse(message));
		} catch (e) {
			console.error(e);
		} finally {
			locksUpdated();
		}
	});
	socket.on('unlock', function (message) {
		try {
			obj = JSON.parse(message);
			var i = connected[socket.id].locks.indexOf(obj);
			connected[socket.id].locks.splice(i, 1);
		} catch (e) {
			console.error(e);
		} finally {
			locksUpdated();
		}
	});
});

redis.on('message', function(channel, message) {
	console.log(message);
	io.emit('rt-update', message);
});

