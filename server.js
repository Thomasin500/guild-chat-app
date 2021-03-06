//NodeJS Server Code
const express = require('express');
const app = express(); //init nodeJS express framework
const http = require('http').createServer(app); 
const io = require('socket.io').listen(http); //init socket.io and point it to the server

//needed to serve up css and front end tests
app.use(express.static('public')); 

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    io.emit('user connected', io.engine.clientsCount);

    socket.on('send message', function (message) {
        //send the message to everyone BUT the sender
        socket.broadcast.emit('send message', message); 
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected', io.engine.clientsCount);
    });

    socket.on('show typing', function () {
        socket.broadcast.emit('show typing');
    });

    socket.on('hide typing', function () {
        socket.broadcast.emit('hide typing');
    });
})

http.listen(3000, function () {
    console.log('Server started. Listening on port 3000');
});