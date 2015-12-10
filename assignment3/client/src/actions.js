import C from './constants';

let ws = new WebSocket('ws:localhost:3000/data');

export default {
    startListeningToSocket() {
        return (dispatch, getState) => {
            console.log('obj');
            ws.onmessage = (event) => {
                console.log(event.data || 'empty');
                dispatch({
                    type: C.RECEIVING_DATA,
                    data: JSON.parse(event.data)
                });
            };
        };
    },
    sendTestClick() {
        return () => {ws.send('click');};
    }
};