import React from 'react';
import {Icon, Button, IconButton, Menu, MenuItem} from 'react-mdl';
import {map, isEqual} from 'lodash';

export let FilterMenu = (props) => {
    const filters = {
        'ALL': 'Alla kategorier',
        'ROAD': 'Vägtrafik',
        'COLLECTIVE': 'Kollektivtrafik',
        'PLANNED': 'Planerad störning',
        'OTHER': 'Övrigt'
    };
    const orders = {
        'DATE_DESC': {key: 'createddate', direction: 'desc'},
        'DATE_ASC': {key: 'createddate', direction: 'asc'},
        'TITLE_ASC': {key: 'title', direction: 'asc'},
        'TITLE_DESC': {key: 'title', direction: 'desc'}
    };
    const orderMenuString = {
        'DATE_DESC': 'Datum nyast först',
        'DATE_ASC': 'Datum äldst först',
        'TITLE_ASC': 'Titel A-Ö',
        'TITLE_DESC': 'Titel Ö-A'
    };
    const filterCounts =  map(props.messages || [], (message) => {

    });

    return (
        <div>
            <span id="filter-menu">
                <IconButton name="more_vert" />
                {filters[props.filter]}
            </span>
            <Menu target="filter-menu">
                {map(filters, (filter, key) => {
                    if (props.filter === key) {
                        return <MenuItem disabled key={key}>{filter}</MenuItem>;
                    } else {
                        return <MenuItem key={key} onClick={props.filterChangeHandler.bind(this, key)}>{filter}</MenuItem>;
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