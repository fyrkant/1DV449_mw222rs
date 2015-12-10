import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import _ from 'lodash';

class Test extends React.Component {
    render() {
        console.log(this.props.data);

        let nodes = _.map(this.props.data.messages || [], (message) => {
            return <li key={message.id}>{message.title}</li>;
        });

        return (
            <div>
                <div onClick={this.props.click}><h3>Ladda data</h3></div>
                <ul>{nodes || ''}</ul>
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
