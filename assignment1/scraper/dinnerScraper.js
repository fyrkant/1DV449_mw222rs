var rp = require('request-promise');
var cheerio = require('cheerio');

var dinnerScraper = function*(url, dayToMeet, dayTranslater) {
    var dinnerData =  yield rp(url).
        then(body => cheerio.load(body)).
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