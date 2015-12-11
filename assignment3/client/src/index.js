import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import actions from './actions.js';
import Test from './components/test';

render(
	<Provider store={store}>
		<Test/>
	</Provider>,
	document.getElementById('root')
);


const websocket = new WebSocket('ws:localhost:3000/data');

websocket.onmessage = event => store.dispatch(actions.getState(event));
