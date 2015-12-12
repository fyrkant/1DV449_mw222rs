const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 3000});
// const api = require('./SRAPI/sr-api');
// const fs = require('fs');
const store = require('./src/store');
const actions = require('./src/actions');

store.subscribe(
    () => {
        if (store.getState()) {
            const action = JSON.stringify(
                {type: 'RECEIVING_DATA', data: store.getState()}
            );

            wss.broadcast(action);
        }
    }
);

wss.broadcast = (data) => wss.clients.forEach(client => client.send(data));

wss.on('connection', (ws) => {
    console.log('client connected');

    store.dispatch(actions.getData());

    ws.on('message', (message) => {
        if (message === 'UPDATE') {
            console.log('client requests new data');
            store.dispatch(actions.getNewData());
        }
    });
});