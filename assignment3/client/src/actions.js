import {C, filterIndex} from './constants';
import m from 'moment';
export const websocket = new WebSocket(
    document.location.hostname === 'localhost' ?
    'ws:localhost:3000' :
    'ws:188.166.107.162:3000');

// 188.166.107.162

export default {
    updateData() {
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
        const index = filterIndex[filter];

        return {type: C.CHANGE_FILTER, filter, index};
    },
    changeOrder(order) {
        return {type: C.CHANGE_ORDER, order: order};
    },
    timeSinceUpdateTicker() {
        return (dispatch, getState) => {
            dispatch({type: C.TICK, tickerString: 'Uppdaterades ' + m(getState().data.meta.time).fromNow()});
            setInterval(() => {
                dispatch({type: C.TICK, tickerString: 'Uppdaterades ' + m(getState().data.meta.time).fromNow()});
            }, 10000);
        };
    },
    focus(id) {
        return (dispatch) => {
            dispatch({type: C.FOCUS, id: id});
        };
    }
};
