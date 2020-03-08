//NOTE: since we are running these front end tests in the browser, at least one client will already be connected

const options = {
    transports: ['websocket'],
    'force new connection': true
};

let messageList;
let button;
let inputField;
let typing;

before(function (done) {
    messageList = document.getElementById('messageList');
    button = document.getElementById('messageButton');
    inputField = document.getElementById('messageInput');
    typing = document.getElementById('typing');
    done();
});

beforeEach(function (done) {
    //clear any existing messages
    clearMessages();
    done();
});

const clearMessages = () => {
    if (messageList) {
        while (messageList.firstChild) {
            messageList.removeChild(messageList.firstChild);
        }
    }
}

describe('connecting', function () {

    it('connects a client and displays a connection message', function (done) {

        const client = io.connect('http://localhost:3000', options);

        client.once('connect', function () {
            expect(messageList.firstChild.innerText.includes('A new user has been connected.')).equal(true)
            client.disconnect();
            done();
        }); 
    });

    it('disconnects a client and shows a disconnect message', function (done) {

        const clienta = io.connect('http://localhost:3000', options);
        const clientb = io.connect('http://localhost:3000', options);

        clienta.once('connect', function () {
            clienta.once('user disconnected', function (num) {
                expect(true).to.equal(messageList.lastChild.innerText.includes('A user has left the chat.'));
                clienta.disconnect();
                done();
            });
        });

        clientb.once('connect', function () {
            clientb.disconnect();
        });
    });
});

describe('messaging', function () {

    const message = 'Testing...';

    it('sends a local message and displays on the page', function (done) {

        const clienta = io.connect('http://localhost:3000', options);

        clienta.once('connect', function () {
            clearMessages();
            inputField.value = message;
            button.click();
        });

        clienta.once('send message', function () {
            expect(messageList.firstChild.innerText).to.equal(message);
            expect(messageList.firstChild.classList.contains('localMessage')).to.equal(true);
            clienta.disconnect();
            done();
        });
    });

    it('recieves a foreign message and displays it on the page', function (done) {
        const clienta = io.connect('http://localhost:3000', options);
        const clientb = io.connect('http://localhost:3000', options);

        clienta.once('send message', function () {
            expect(messageList.firstChild.innerText).to.equal(message);
            expect(messageList.firstChild.classList.contains('foreignMessage')).to.equal(true);
            clienta.disconnect();
            clientb.disconnect();
            done();
        });

        clientb.once('connect', function () {
            clearMessages();
            clientb.emit('send message', message);
        });  
    });
});

describe('typing', function () {

    it('shows typing', function (done) {

        const clienta = io.connect('http://localhost:3000', options);
        const clientb = io.connect('http://localhost:3000', options);

        clienta.once('connect', function () {
            clienta.once('show typing', function () {
                expect(typing.style.display).to.equal('block');
                clienta.disconnect();
                clientb.disconnect();
                done();
            });
        });

        clientb.once('connect', function () {
            clientb.emit('show typing');
        });
    });

    it('hides typing', function (done) {

        const clienta = io.connect('http://localhost:3000', options);
        const clientb = io.connect('http://localhost:3000', options);

        clienta.once('connect', function () {
            clienta.once('hide typing', function () {
                expect(typing.style.display).to.equal('none');
                clienta.disconnect();
                clientb.disconnect();
                done();
            });
        });

        clientb.once('connect', function () {
            clientb.emit('hide typing');
        });
    });
});
