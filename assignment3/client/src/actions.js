import C from './constants';

let ws = new WebSocket('ws:localhost:3000/data');

export default {
	startListeningToSocket() {
		return (dispatch, getState) => {
			ws.onmessage = (event) => {
				dispatch({
					type: C.RECEIVING_DATA, 
					data: event.data
				});
			};
		}
	},
	sendTestClick() {
		return () => {ws.send('click');};
	}
}