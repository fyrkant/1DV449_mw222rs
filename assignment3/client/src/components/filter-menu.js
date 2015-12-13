import React from 'react';
import {IconButton, Menu, MenuItem} from 'react-mdl';
import {map} from 'lodash';

export let FilterMenu = (props) => {
    const filters = {
        'ALL': 'Alla kategorier',
        'ROAD': 'Vägtrafik',
        'COLLECTIVE': 'Kollektivtrafik',
        'PLANNED': 'Planerad störning',
        'OTHER': 'Övrigt'
    };
    const filterCounts =  map([] || props.messages, (message) => {
        
    });

    return (
        <div>
            <IconButton name="more_vert" id="filter-menu" />
            {filters[props.filter]}
            <Menu target="filter-menu">
                {map(filters, (filter, key) => {
                    if (props.filter === key) {
                        return <MenuItem disabled key={key}>{filter}</MenuItem>;
                    } else {
                        return <MenuItem key={key} onClick={props.filterChangeHandler.bind(this, key)}>{filter}</MenuItem>;
                    }
                })}
            </Menu>
        </div>
    );
};