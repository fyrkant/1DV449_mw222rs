'use strict';
const fs = require('fs');
const request = require('request');
const m = require('moment');
const file = './cache/cache.json';

//fs.watch(file, (event, filename) => console.log(event, filename));
m.locale('sv');

module.exports = {
    getData() {
        return (dispatch) => {
            // Only update if data is more than 5 min old.
            const now = new Date().getTime();

            fs.readFile(file, 'utf8', (err, content) => {
                if (err) {
                    console.log(err);
                }

                const cachedData = JSON.parse(content);

                if (m(cachedData.meta.bestBefore).isBefore(now)) {
                    console.log('cached data old');
                    dispatch(this.getNewData());
                } else {
                    console.log('dispatching cached data');
                    dispatch({type: 'UPDATE', data: cachedData});
                }
            });
        };
    },
    getNewData() {
        return (dispatch) => {
            const now = new Date().getTime();
            const bestBefore = now + 5 * 60 * 1000;

            request('http://api.sr.se/api/v2/traffic/messages?size=100&format=json',
                (error, response, body) => {
                    if (error) {
                        console.log(error);
                    }
                    if (!error && response.statusCode == 200) {
                        const newData = JSON.parse(body);

                        newData.messages.map((message) => {
                            message.createddate = new Date(parseInt(message.createddate.substr(6)));
                            return message;
                        });

                        const withMeta = Object.assign(
                            {},
                            newData,
                            {meta: {
                                time: now,
                                bestBefore
                            }});

                        fs.writeFile(file, JSON.stringify(withMeta),
                            err => {
                                if (err) {
                                    console.log(err);
                                }

                                console.log('File saved!');
                            });

                        console.log('dispatching new data');
                        dispatch({type: 'UPDATE', data: withMeta});
                    }
                });
        };
    }
};
