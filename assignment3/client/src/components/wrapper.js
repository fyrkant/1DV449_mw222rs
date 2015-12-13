import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import {GoogleMapLoader} from 'react-google-maps';
import {UpdateButton} from './update-button';
import {TimeSinceUpdate} from './time-since';
import {MessageList} from './message-list';
import {SimpleMap} from './map';
import m from 'moment';

m.locale('sv');

class Wrapper extends React.Component {
    render() {
        return (
            <div>
                <UpdateButton onClick={this.props.click}>Uppdatera nu</UpdateButton>
                <TimeSinceUpdate meta={this.props.meta} />
                <MessageList messages={this.props.messages} select={this.props.selectMessage} />
                <GoogleMapLoader
                    googleMapElement={
                        <SimpleMap messages={this.props.messages} />
                    }
                />
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
        },
        selectMessage(id) {
            dispatch(actions.selectMessage(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
