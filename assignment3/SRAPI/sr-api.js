const rp = require('request-promise');

const srWrapper = function*(uri) {
    const options = {
        uri: uri
    };

    const data = yield rp(options);

    return data;
};

module.exports = srWrapper;