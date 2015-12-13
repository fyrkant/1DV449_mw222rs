const fs = require('fs');
const request = require('request');

const file = './cache/cache.json';

fs.watch(file, (event, filename) => console.log(event, filename));

module.exports = {
    getData() {
        return (dispatch, getState) => {
            // Only update if data is more than 5 min old.
            const now = new Date().getTime();
            const updateInterval = 5 * 60 * 1000;
            const data = JSON.parse(fs.readFileSync(file));

            if ((data.meta.time + updateInterval) / 1000 < now / 1000) {
                return this.getNewData();
            }
            console.log('dispatching cached data');
            dispatch({type: 'UPDATE', data: data});
        };
    },
    getNewData() {
        return (dispatch, getState) => {
            const now = new Date().getTime();

            request('http://api.sr.se/api/v2/traffic/messages?size=100&format=json',
                (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const newData = JSON.parse(body);

                        const withMeta = Object.assign(
                            {},
                            newData,
                            {meta: {time: now}});

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
