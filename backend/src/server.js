const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('connectRoom', box => {
		socket.join(box);
	});
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-xy9kb.mongodb.net/omnistack?retryWrites=true', {
	useNewUrlParser: true,
});

app.use((req, res, next) => {
	req.io = io;

	return next();
})

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
