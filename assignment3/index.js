const koa = require('koa');
const route = require('koa-route');
const ws = require('koa-websocket');
const api = require('./SRAPI/sr-api');

const app = ws(koa());

app.ws.use(route.all('/data/', function* (next) {
    const toSend = yield api.srWrapper();

    this.websocket.send(toSend);
    // `this` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `this.websocket`.
    this.websocket.send('Hello World');

    this.websocket.on('message', (message) => {
        // do something with the message from client
        if(message === 'update') {
            console.log('client requests update');
            toSend = api.getNewData();
        }

        this.websocket.send(toSend);
    });
    // yielding `next` will pass the context (this) on to the next ws middleware
    yield next;
}));

console.log('Listening on port 3000');
app.listen(3000);