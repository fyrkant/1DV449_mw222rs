var _ = require('lodash');

var firstPageScraper = require('./firstPageScraper');
var calendarScraper = require('./calendarScraper');


var freeDayFinder = function*(uri) {

    // Get the different links from the main page
    var mainPageLinks = yield firstPageScraper(uri);

    // Find which link is to where
    var calendarLink = _.find(mainPageLinks,
        link => link.includes('calendar')
    );

    // Find the links to the three friends calendars
    var dayToMeet = yield calendarScraper(calendarLink);

    return dayToMeet;
};

module.exports = freeDayFinder;