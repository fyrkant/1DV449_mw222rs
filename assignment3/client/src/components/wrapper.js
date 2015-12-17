// third party
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import m from 'moment';
import {Layout, Drawer} from 'react-mdl';

// components
import actions from '../actions';
import {filterIndex} from '../constants';
import {UpdateButton} from './update-button';
import {MessageList} from './message-list';
import {TimeSince} from './time-since';
import {SimpleMap} from './simple-map';
import {FilterMenu} from './filter-menu';

m.locale('sv');

class Wrapper extends React.Component {
    render() {
        const filteredAndSorted = _(this.props.allMessages)
            .filter(m => this.props.filter === 'ALL' ? m : m.category === filterIndex[this.props.filter])
            .sortByOrder(this.props.order.key, this.props.order.direction)
            .value();

        return (
            <Layout fixedDrawer>
                <Drawer>
                    <UpdateButton
                        messages={filteredAndSorted}
                        onClick={this.props.update}
                    />
                    <TimeSince tick={this.props.ticker} />

                    <FilterMenu
                        messages={this.props.allMessages}
                        filter={this.props.filter}
                        filterChangeHandler={this.props.changeFilter}
                        order={this.props.order}
                        orderChangeHandler={this.props.changeOrder}
                    />
                    <MessageList
                        selected={this.props.selected}
                        messages={filteredAndSorted}
                        select={this.props.selectMessage}
                    />
                </Drawer>
                <SimpleMap
                    messages={filteredAndSorted}
                    selected={this.props.selected}
                    selectMessage={this.props.selectMessage}
                />
            </Layout>
        );
    }
}

const mapStateToProps = (appState) => {
    return {
        allMessages: appState.data.messages,
        selected: appState.selected,
        filter: appState.filter,
        order: appState.order,
        focus: appState.focus,
        ticker: appState.ticker
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update() {
            dispatch(actions.updateData());
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
