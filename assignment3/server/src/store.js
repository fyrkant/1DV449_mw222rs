const Redux = require('redux');
const reducer = require('./reducer');
const thunk = require('redux-thunk');
const initialState = require('./initialstate');

module.exports = Redux.applyMiddleware(thunk)(Redux.createStore)(reducer, initialState);