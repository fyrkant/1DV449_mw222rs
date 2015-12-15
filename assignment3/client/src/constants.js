// actons for reducer
export const C = {
    RECEIVING_DATA: 'RECEIVING_DATA',
    SELECT_MESSAGE: 'SELECT_MESSAGE',
    DESELECT_MESSAGE: 'DESELECT_MESSAGE',
    CHANGE_FILTER: 'CHANGE_FILTER',
    CHANGE_ORDER: 'CHANGE_ORDER',
    FOCUS: 'FOCUS',
    TICK: 'TICK'
};

// pin color urls used by marker component
export const pinUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|';
export const priorityColors = {
    1: 'E91E63',
    2: 'FF5722',
    3: 'FC9113',
    4: '4CAF50',
    5: 'FFF047'
};

export const priorityString = {
    1: 'Mycket allvarlig händelse',
    2: 'Stor händelse',
    3: 'Störning',
    4: 'Information',
    5: 'Mindre störning'
};

export const categoryString = {
    0: 'Vägtrafik',
    1: 'Kollektivtrafik',
    2: 'Planerad störning',
    3: 'Övrigt'
};

// used by filter-menu
export const filters = {
    'ALL': 'Alla kategorier',
    'ROAD': 'Vägtrafik',
    'COLLECTIVE': 'Kollektivtrafik',
    'PLANNED': 'Planerad störning',
    'OTHER': 'Övrigt'
};
export const filterIndex = {
    'ALL': 9,
    'ROAD': 0,
    'COLLECTIVE': 1,
    'PLANNED': 2,
    'OTHER': 3
};
export const orders = {
    'DATE_DESC': {key: 'createddate', direction: 'desc'},
    'DATE_ASC': {key: 'createddate', direction: 'asc'},
    'TITLE_ASC': {key: 'title', direction: 'asc'},
    'TITLE_DESC': {key: 'title', direction: 'desc'}
};
export const orderMenuString = {
    'DATE_DESC': 'Datum nyast först',
    'DATE_ASC': 'Datum äldst först',
    'TITLE_ASC': 'Titel A-Ö',
    'TITLE_DESC': 'Titel Ö-A'
};