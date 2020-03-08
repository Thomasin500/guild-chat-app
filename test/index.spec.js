//Note: portions of this code were inspired from: https://swizec.com/blog/testing-socket-io-apps/swizec/5625
const chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should(),
    io = require('socket.io-client');

let server;
const options = {
    transports: ['websocket'],
    'force new connection': true
};

beforeEach(function (done) {
    // start the server
    server = require('../server.js').http;
    done();
});

//TODO in this file, test the emit/recieve portions
//in the html spec test the results on the page
describe("connecting", function () {

    it("connects and disconnects a client", function (done) {
        const client = io.connect("http://localhost:3000", options);
        client.once("connect", function () {
            client.disconnect();
            done();
        });
    });

    it("connects and disconnects multiple clients", function (done) {
        const clienta = io.connect("http://localhost:3000", options);
        const clientb = io.connect("http://localhost:3000", options);
        const clientc = io.connect("http://localhost:3000", options);
        const clientd = io.connect("http://localhost:3000", options);

        clienta.once("connect", function () {
        });   
        clientb.once("connect", function () {
        }); 
        clientc.once("connect", function () {
        }); 
        clientd.once("connect", function () {
            clienta.disconnect();
            clientb.disconnect();
            clientc.disconnect();
            clientd.disconnect();
            done();
        }); 
    });
});


describe("messaging", function () {
     
    //TODO write up in a 'lessons learned' about how I had to debug multiple clients
    it("sends and recieves a message", function (done) {

        const clienta = io.connect("http://localhost:3000", options);
        const clientb = io.connect("http://localhost:3000", options);

        clienta.once("connect", function () {
            clienta.once("send message", function (message) {
                message.should.equal("testing...");
                clienta.disconnect();
                clientb.disconnect();
                done();
            });
        });

        clientb.once("connect", function () {  
            clientb.emit("send message", "testing...");
        });
    }); 
});

describe("typing", function () {

    it("shows typing", function (done) {

        const clienta = io.connect("http://localhost:3000", options);
        const clientb = io.connect("http://localhost:3000", options);

        clienta.once("connect", function () {
            clienta.once("show typing", function () {
                clienta.disconnect();
                clientb.disconnect();
                done();
            });
        });

        clientb.once("connect", function () {
            clientb.emit("show typing");
        });
    });

    it("hides typing", function (done) {

        const clienta = io.connect("http://localhost:3000", options);
        const clientb = io.connect("http://localhost:3000", options);

        clienta.once("connect", function () {
            clienta.once("hide typing", function () {
                clienta.disconnect();
                clientb.disconnect();
                done();
            });
        });

        clientb.once("connect", function () {
            clientb.emit("hide typing");
        });
    });
});
