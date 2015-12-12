const fs = require('fs');
const request = require('request');

const file = 'cache/cache.json';
const now = new Date().getTime();

module.exports = {
    getData() {
        const updateInterval = 5 * 60 * 1000;
        const data = JSON.parse(fs.readFileSync(file));

        if ((data.meta.time + updateInterval) / 1000 < now / 1000) {
            return () => {this.getNewData();};
        }

        return {type: 'UPDATE', data: data};
    },
    getNewData() {
        request('http://api.sr.se/api/v2/traffic/messages?size=100&format=json',
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const newData = JSON.parse(body);

                    const withMeta = Object.assign(
                        {},
                        newData,
                        {meta: {time: now}});

                    const stringified = JSON.stringify(withMeta);

                    fs.writeFile(file, stringified,
                        err => {
                            if (err) {
                                console.log(err);
                            }

                            console.log('File saved!');
                        });

                    return {type: 'UPDATE', data: stringified};
                }
            });
    }
};