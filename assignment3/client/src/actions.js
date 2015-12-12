import C from './constants';
export const websocket = new WebSocket('ws:188.166.107.162:3000');

export default {
    getState(event) {
        const action = {type: C.RECEIVING_DATA, data: JSON.parse(event.data)};

        return action;
    },
    sendTestClick() {
        return () => {
            websocket.send('UPDATE');
        };
    }
};