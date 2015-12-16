import React from 'react';
import {IconButton, Menu, MenuItem} from 'react-mdl';
import {map, countBy, isEqual} from 'lodash';
import {filters, filterIndex, orders, orderMenuString} from '../constants';

export let FilterMenu = (props) => {
    const filterCounts = countBy(props.messages, 'category');

    filterCounts[9] = props.messages ? props.messages.length : null;

    return (
        <div>
            <span id="filter-menu">
                <IconButton name="more_vert" />
                {filters[props.filter]}
            </span>
            <Menu ripple target="filter-menu">
                {map(filters, (filter, key) => {
                    return (props.filter === key ?
                        <MenuItem key={key} disabled>
                            {filter} ({filterCounts[filterIndex[key]]})
                        </MenuItem> : filterCounts[filterIndex[key]] &&
                        <MenuItem key={key} onClick={props.filterChangeHandler.bind(this, key)}>
                            {filter} ({filterCounts[filterIndex[key]]})
                        </MenuItem>
                    );
                })}
            </Menu>
            <IconButton name="swap_vert" id="order-menu" style={{float: 'right'}} />
            <Menu ripple target="order-menu" align="right">
                {map(orders, (order, key) => {
                    if (isEqual(props.order, order)) {
                        return <MenuItem key={key} disabled>{orderMenuString[key]}</MenuItem>;
                    } else {
                        return <MenuItem key={key} onClick={props.orderChangeHandler.bind(this, order)}>{orderMenuString[key]}</MenuItem>;
                    }
                })}
            </Menu>
        </div>
    );
};