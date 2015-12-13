import C from './constants';
export const websocket = new WebSocket('ws:localhost:3000');

export default {
    getState(event) {
        return (dispatch) => {
            const action = {type: C.RECEIVING_DATA, data: JSON.parse(event.data)};

            dispatch(action);
        };
    },
    sendTestClick() {
        return () => {
            websocket.send('UPDATE');
        };
    },
    selectMessage(id) {
        return (dispatch, getState) => {
            if (getState().selected.id === id) {
                dispatch({type: C.DESELECT_MESSAGE});
            } else {
                dispatch({type: C.SELECT_MESSAGE, id: id});    
            }            
        };
    },
    changeFilter(filter) {
        return {type: C.CHANGE_FILTER, filter: filter};
    }
};