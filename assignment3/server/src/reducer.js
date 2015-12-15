const initialState = require('./initialstate');

module.exports = (currentState, action) => {
    const newState = Object.assign({}, currentState);

    switch(action.type) {
    case 'UPDATE':
        newState.data = action.data;
        return newState;
    default: return currentState || initialState;
    }
};