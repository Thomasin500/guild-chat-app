//NodeJS Server Code
const express = require('express');
const app = express(); //init nodeJS express framework
const http = require('http').createServer(app); 
const io = require('socket.io').listen(http); //init the socket framework and point it to the server

app.use(express.static('public')); //this allowed the static files in the public folder to be served

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html'); //return the local base html file
});

//TODO clean up
io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('send message', function (message, callback) {
        console.log('message: ' + message);

        const clients = io.sockets.clients().connected;
        //console.log(clients);

        //send the message to everyone BUT the sender
        socket.broadcast.emit('send message', message); 

        callback = callback || function () { };
        callback(null, "Done.");
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    //for testing purposes 
    socket.on("echo", function (msg, callback) {
        callback = callback || function () { };

        socket.emit("echo", msg);

        callback(null, "Done.");
    });
})

http.listen(3000, function () { //todo can probably remove this or at least the function
    console.log('listening on port 3000');
});




