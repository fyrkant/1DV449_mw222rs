import C from './constants';
import initialState from './initialstate';

export default (currentState, action) => {
    const newState = Object.assign({}, currentState);

    switch(action.type) {
    case C.RECEIVING_DATA:
    	console.log(action);
        newState.data = action.data;
        return newState;
    default: return currentState || initialState.data;
    }
};