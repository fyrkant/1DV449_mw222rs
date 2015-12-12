const initialState = require('./initialstate');

module.exports = (currentState, action) => {
    switch(action.type) {
    case 'UPDATE':
        return action.data;
    default: return currentState || initialState;
    }
};