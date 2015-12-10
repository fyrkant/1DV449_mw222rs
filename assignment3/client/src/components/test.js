import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import _ from 'lodash';

class Test extends React.Component {
    render() {
        console.log(this.props.meta);

        let timeSinceData = this.props.meta ? new Date(this.props.meta.time * 1000) : '';

        let nodes = _.map(this.props.messages || [], (message) => {
            return <li key={message.id}>{message.title}</li>;
        });

        return (
            <div>
                <button onClick={this.props.click}>Ladda data</button>
                <p>{timeSinceData.toString()}</p>
                <ul>{nodes || ''}</ul>
            </div>
        );
    }
}

const mapStateToProps = (appState) => {
    return {
        messages: appState.data.messages, 
        meta: appState.data.meta
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        click() {
            dispatch(actions.sendTestClick());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
