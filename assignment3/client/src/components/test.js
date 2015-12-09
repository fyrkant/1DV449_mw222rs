import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions'

class Test extends React.Component {
	
	render() {
		console.log(this.props.data);

		return (
			<div>
				<div onClick={this.props.click}>hi</div>
				
			</div>
		);
	}
}

const mapStateToProps = (appState) => {
    return {
        data: appState.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    	click(message) {
    		dispatch(actions.sendTestClick());
    	}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
