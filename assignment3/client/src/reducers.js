import C from './constants';
import initialState from './initialState';

export default (currentState, action) => {
    switch(action.type) {
    case C.RECEIVING_DATA:
        return Object.assign({}, currentState, {
            data: action.data
        });
    default: return currentState || initialState.data;
    }
};