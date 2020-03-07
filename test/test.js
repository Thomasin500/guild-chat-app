//Note: portions of this code were inspired from: https://swizec.com/blog/testing-socket-io-apps/swizec/5625
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

    //TODO also have tests for front end
    //maybe cypress??

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