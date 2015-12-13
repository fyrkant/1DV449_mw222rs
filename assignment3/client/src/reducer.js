import C from './constants';
import initialState from './initialstate';

export default (currentState, action) => {
    const newState = Object.assign({}, currentState);

    switch(action.type) {
    case C.RECEIVING_DATA:
        console.log(action);
        newState.data = action.data;
        return newState;
    case C.SELECT_MESSAGE:
        console.log(action);
        console.log(newState);
        newState.data.messages.map(message => {
            if (message.id === newState.selected.id) {
                newState.selected = {id: null};
            }
            if (message.id === action.id) {
                newState.selected = message;
                console.log(message);
            }
        });
        return newState;
    case C.DESELECT_MESSAGE:
        newState.selected = {id: null};
        return newState;
    case C.CHANGE_FILTER:
        newState.filter = action.filter;

        return newState;
    default: return currentState || initialState.data;
    }
};