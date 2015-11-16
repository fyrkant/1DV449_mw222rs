var rp = require('request-promise');
var cheerio = require('cheerio');
var personalCalendarScraper = require('./personalCalendarScraper');
var _ = require('lodash');
var options = require('./scraperOptions');

var calendarScraper = function*(url) {
    options.uri = url;

    var calendarLinks = yield rp(options).
        then($ => {
            var personLinks = [];

            $('a').each(function() {
                personLinks.push(
                    `${url}/${$(this).attr('href')}`);
            });
            return personLinks;
        });

    // Find which days the friends are free
    var freeDays = calendarLinks.map(link =>
        rp(link).
        then(body => cheerio.load(body)).
        then($ => personalCalendarScraper($))
    );

    freeDays = yield Promise.all(freeDays).
        then(values => values);

    var toReturn = freeDays.reduce((one, two) => _.intersection(one,two));

    console.log(toReturn);

    return toReturn;

};

module.exports = calendarScraper;