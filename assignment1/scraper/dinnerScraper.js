var rp = require('request-promise');
var options = require('./scraperOptions');

var dinnerScraper = function*(url, dayToMeet, dayTranslater) {
    options.uri = url;

    var dinnerData =  yield rp(options).
        then($ => {
            var daySmallNoDots = dayTranslater[dayToMeet].
                toLowerCase().replace(/ö/g, 'o').substr(0, 3);
            var query = `input[value^="${daySmallNoDots}"]`;
            var freeTime = [];

            $(query).each(function() {
                freeTime.push($(this).attr('value'));
            });

            return freeTime;
        });

    return dinnerData;
};

module.exports = dinnerScraper;