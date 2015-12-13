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
        newState.data.messages.map(message => {
            if (message.id === action.id) {
                message.isSelected = true;
                console.log(message);
            }
        });
        return newState;
    default: return currentState || initialState.data;
    }
};