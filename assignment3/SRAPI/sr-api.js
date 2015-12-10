'use strict';

const rp = require('request-promise');
const fs = require('fs');
const directory = 'cache';
const file = '/cache.json';

const srWrapper = function*() {
    const dir = fs.readdirSync(directory);
    let data = undefined;

    if (dir.length === 0) {
        console.log('getting new data');
        data = yield getNewData();
    } else {
        console.log('reading data from file');
    }

    data = fs.readFileSync(directory + file, 'utf8');

    return data;
};

const getNewData = function*() {
    const options = {
        uri: 'http://api.sr.se/api/v2/traffic/messages?size=100&format=json',
        json: true
    };

    const data = yield rp(options)
        .catch(err => console.log(err));

    const withMeta = Object.assign({}, data, {meta: {time: new Date().getTime()}});
    const toSend = JSON.stringify(withMeta);

    fs.writeFile(directory + file, toSend, (err) => {
        if (err) {
            console.log(err);
        }

        console.log('File saved!');
    });

    return toSend;
};

module.exports = srWrapper;