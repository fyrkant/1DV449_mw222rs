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

setTimeout(() => store.dispatch(actions.startListeningToSocket()));