import C from './constants';
export const websocket = new WebSocket('ws:188.166.107.162:3000');

// 188.166.107.162

export default {
    getState(event) {
        return (dispatch) => {
            this.timeSinceUpdateTicker();
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
        const filterIndex = {
            'ALL': 9,
            'ROAD': 0,
            'COLLECTIVE': 1,
            'PLANNED': 2,
            'OTHER': 3
        }[filter];

        return {type: C.CHANGE_FILTER, filter: filter, index: filterIndex};
    },
    changeOrder(order) {
        return {type: C.CHANGE_ORDER, order: order};
    },
    timeSinceUpdateTicker() {
        return (dispatch, getState) => {
            if (getState().meta) {
                setInterval(console.log('hello'), 1000);
            }
        };
    }
};