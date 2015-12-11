import C from './constants';

let ws = new WebSocket('ws:localhost:3000/data');

export default {
    getState(event) {
        const action = {type: C.RECEIVING_DATA, data: JSON.parse(event.data)};

        return action;
    },
    sendTestClick() {
        return () => {ws.send('update');};
    }
};