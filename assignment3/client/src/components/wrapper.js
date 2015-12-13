import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import {Icon, Header, Grid, Cell} from 'react-mdl';
import {GoogleMapLoader} from 'react-google-maps';
import {UpdateButton} from './update-button';
import {TimeSinceUpdate} from './time-since';
import {MessageList} from './message-list';
import {SimpleMap} from './map';
import {FilterMenu} from './filter-menu';
import m from 'moment';

m.locale('sv');

class Wrapper extends React.Component {
    render() {
        return (
            <Grid>
                <Header>
                    <h4>Sveriges Radios trafikinformation</h4>
                </Header>
                <Cell col={8}>
                    
                </Cell>
                <Cell col={4}>
                    <UpdateButton messages={this.props.messages} onClick={this.props.click}>Uppdatera nu</UpdateButton>
                    <TimeSinceUpdate meta={this.props.meta} />
                    <FilterMenu messages={this.props.messages} filter={this.props.filter} filterChangeHandler={this.props.changeFilter} />
                    <MessageList selected={this.props.selected} filter={this.props.filter} messages={this.props.messages} select={this.props.selectMessage} />
                </Cell>
            </Grid>
        );
    }
}

const mapStateToProps = (appState) => {
    return {
        messages: appState.data.messages,
        meta: appState.data.meta,
        selected: appState.selected,
        filter: appState.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        click() {
            dispatch(actions.sendTestClick());
        },
        selectMessage(id) {
            dispatch(actions.selectMessage(id));
        },
        changeFilter(filter) {
            dispatch(actions.changeFilter(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
