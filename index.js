const app = require('express')(); //init nodeJS express framework
const http = require('http').createServer(app); 
const io = require('socket.io')(http); //init the socket framework and point it to the server

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html'); //return the local base html file
});

io.on('connection', function (socket) {
    console.log('user connected');
})

http.listen(3000, function () {
    console.log('listening on port 3000');
});


