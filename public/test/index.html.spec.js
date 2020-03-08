

describe('After this', function () {
    it('should be logged in', function (done) {
        const a = document.getElementById('messageList');
        console.log(a)
        done();
    });
});

//TODO in this file, test the emit/recieve portions
//in the html spec test the results on the page

/*
describe("connecting", function () {

    //TODO write up in a 'lessons learned' about how I had to debug multiple clients
    it("connects a client", function (done) {

        console.log('test');

        const client = io.connect("http://localhost:3000", options);

        client.once("connect", function () {


            //const a = document.getElementById('messageList');
            //console.log(a)

            done();

        });



    });

    it("disconnects a client", function (done) {


    });

    //TODO actually test that the message shows up on screen

});

describe("messaging", function () {

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

    //TODO actually test that the message shows up on screen
    //local for the sender
    //foregin for the reciever
});



describe("typing", function () {

    //TODO write up in a 'lessons learned' about how I had to debug multiple clients
    it("shows a typing message", function (done) {


    });

    it("stops showing a typing message", function (done) {


    });

    //TODO actually test that the message shows up on screen

});

*/