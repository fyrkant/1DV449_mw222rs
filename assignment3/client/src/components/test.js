import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import m from 'moment';
import _ from 'lodash';

m.locale('sv');

class Test extends React.Component {
    render() {
        let timeSinceData = this.props.meta ?
        'Uppdaterades ' + m(this.props.meta.time).fromNow() : '';

        let nodes = _.map(this.props.messages || [], (message) => {
            return <li key={message.id}>{message.title}</li>;
        });

        return (
            <div>
                <button onClick={this.props.click}>Uppdatera nu</button>
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
