// third party
import React from 'react';
import {connect} from 'react-redux';
import m from 'moment';
import {map} from 'lodash';
import {Layout, Drawer, Card, CardTitle} from 'react-mdl';
import {Marker, InfoWindow} from 'react-google-maps';

// components
import actions from '../actions';
import {UpdateButton} from './update-button';
import {TimeSinceUpdate} from './time-since';
import {MessageList} from './message-list';
import {DetailedMessage} from './detailed-message';
import {SimpleMap} from './simple-map';
import {FilterMenu} from './filter-menu';
import {priorityColors} from '../constants';

m.locale('sv');

class Wrapper extends React.Component {
    render() {
        return (
            <Layout fixedDrawer>
                <Drawer>
                    <UpdateButton
                        messages={this.props.messages}
                        onClick={this.props.click}
                    />
                    <p style={{display: 'inline'}}>{this.props.ticker}</p>

                    <FilterMenu
                        messages={this.props.messages}
                        filter={this.props.filter}
                        filterChangeHandler={this.props.changeFilter}
                        order={this.props.order}
                        orderChangeHandler={this.props.changeOrder}
                    />
                    <MessageList
                        selected={this.props.selected}
                        messages={this.props.messages}
                        select={this.props.selectMessage}
                    />
                </Drawer>

                <SimpleMap>
                    {map(this.props.messages || [], (message) => {
                        return (this.props.selected.id !== message.id ?
                            <Marker
                                icon={priorityColors[message.priority]}
                                key={message.id}
                                opacity={this.props.selected.id !== null ? .4 : 1}
                                onMouseover={this.props.focus.bind(this, message.id)}
                                onClick={this.props.selectMessage.bind(this, message.id)}
                                position={{lat: message.latitude, lng: message.longitude}}
                            /> :
                            <InfoWindow
                                key={message.id}
                                position={{lat: message.latitude, lng: message.longitude}}
                                onCloseclick={this.props.selectMessage.bind(this, message.id)}
                            >
                                <DetailedMessage
                                    message={this.props.selected}
                                />
                            </InfoWindow>
                        );
                    })}
                </SimpleMap>
            </Layout>
        );
    }
}

const mapStateToProps = (appState) => {
    return {
        messages: appState.filteredSortedMessages,
        selected: appState.selected,
        filter: appState.filter,
        order: appState.order,
        focus: appState.focus,
        ticker: appState.ticker
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
        },
        changeOrder(order) {
            dispatch(actions.changeOrder(order));
        },
        focus(id) {
            dispatch(actions.focus(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
