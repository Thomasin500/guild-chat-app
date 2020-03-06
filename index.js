const express = require('express');
const app = express(); //init nodeJS express framework
const http = require('http').createServer(app); 
const io = require('socket.io').listen(http); //init the socket framework and point it to the server


//server related
app.use(express.static('public')); //this allowed the static files in the public folder to be served

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html'); //return the local base html file
});

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('send message', function (message) {
        console.log('message: ' + message);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
})

http.listen(3000, function () {
    console.log('listening on port 3000');
});

//communcation related



