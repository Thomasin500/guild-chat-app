//Note: portions of this code were borrowed from: https://github.com/Swizec/random-coding/blob/master/socket.io-testing/test/echo.js

const chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

const io = require('socket.io-client');

describe("echo", function () {

    let server;
    const options = {
            transports: ['websocket'],
            'force new connection': true
        };

    beforeEach(function (done) {
        // start the server
        server = require('../index.js').http;
        done();
    });

    //no-op test for boiler plate
    //TODO might be able to remove this
   it("echos message", function (done) {
        const client = io.connect("http://localhost:3000", options);

        client.once("connect", function () {
            client.once("echo", function (message) {
                message.should.equal("Hello World");

                client.disconnect();
                done();
            });

            client.emit("echo", "Hello World");
        });
    }); 

    //TODO write up in a 'lessons learned' about how I had to debug multiple clients
    it("sends message", function (done) {

        const clienta = io.connect("http://localhost:3000", options);
        const clientb = io.connect("http://localhost:3000", options);

        clienta.once("connect", function () {
            clienta.once("send message", function (message) {
                message.should.equal("testing...");
                clienta.disconnect();
                done();
            });
        });

        clientb.once("connect", function () {  
            clientb.emit("send message", "testing...");
            clientb.disconnect();
        });
    });
});