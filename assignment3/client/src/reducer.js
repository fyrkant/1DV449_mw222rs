import {C} from './constants';
import initialState from './initialstate';
import {filter, sortByOrder} from 'lodash';

export default (currentState, action) => {
    const newState = Object.assign({}, currentState);

    switch(action.type) {
    case C.RECEIVING_DATA:
        newState.data = action.data;
        newState.filteredSortedMessages = sortByOrder(action.data.messages || [], newState.order.key, newState.order.direction);
        return newState;
    case C.SELECT_MESSAGE:
        newState.data.messages.map(message => {
            if (message.id === newState.selected.id) {
                newState.selected = {id: null};
            }
            if (message.id === action.id) {
                newState.selected = message;
            }
        });
        return newState;
    case C.DESELECT_MESSAGE:
        newState.selected = {id: null};
        return newState;
    case C.CHANGE_FILTER:
        newState.filter = action.filter;
        newState.filteredSortedMessages = filter(newState.data.messages || [], (message) => {
            if (action.filter === 'ALL') {
                return true;
            } else {
                return message.category === action.index;
            }
        });
        newState.filteredSortedMessages = sortByOrder(newState.filteredSortedMessages || [], newState.order.key, newState.order.direction);
        return newState;
    case C.CHANGE_ORDER:
        newState.order = action.order;
        newState.filteredSortedMessages = sortByOrder(newState.filteredSortedMessages || [], newState.order.key, newState.order.direction);
        return newState;
    case C.FOCUS:
        console.log(action.id);
        newState.focus.id = action.id;
        return newState;
    case C.TICK:
        newState.ticker = action.tickerString;
        return newState;
    default: return currentState || initialState;
    }
};