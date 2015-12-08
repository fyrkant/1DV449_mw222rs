import React from 'react';
import {render} from 'react-dom';

let ws = new WebSocket('ws:localhost:3000/data');

export class Test extends React.Component {
	clickHandler() {
		ws.send('clicked');
	}
	render() {
		return (
			<div onClick={this.clickHandler}>hi</div>
		);
	}
}

render(<Test/>, document.getElementById('root'));