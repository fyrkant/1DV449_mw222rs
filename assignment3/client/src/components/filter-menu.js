import React from 'react';
import {IconButton, Menu, MenuItem} from 'react-mdl';
import {map, countBy, isEqual} from 'lodash';
import {filters, filterIndex, orders, orderMenuString} from '../constants';

export let FilterMenu = (props) => {
    const filterCounts = countBy(props.messages, 'category');

    return (
        <div>
            <span id="filter-menu">
                <IconButton name="more_vert" />
                {filters[props.filter]}
            </span>
            <Menu target="filter-menu">
                {map(filters, (filter, key) => {
                    const index = filterIndex[key];
                    const filterMenuString = filter + (index === 9 ? '' : ' (' + filterCounts[index] + ')');

                    if (props.filter === key) {
                        return <MenuItem disabled key={key}>{filterMenuString}</MenuItem>;
                    } else if (filterCounts[index]) {
                        return <MenuItem key={key} onClick={props.filterChangeHandler.bind(this, key)}>{filterMenuString}</MenuItem>;
                    }
                })}
            </Menu>
            <IconButton name="swap_vert" id="order-menu" style={{float: 'right'}} />
            <Menu target="order-menu" align="right">
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