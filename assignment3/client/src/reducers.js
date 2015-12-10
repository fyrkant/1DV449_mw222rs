import C from './constants';
import initialState from './initialstate';

export default (currentState, action) => {
    switch(action.type) {
    case C.RECEIVING_DATA:
        return Object.assign({}, currentState, {
            data: action.data
        });
    default: return currentState || initialState.data;
    }
};