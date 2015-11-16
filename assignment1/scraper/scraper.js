var _ = require('lodash');

var firstPageScraper = require('./firstPageScraper');
var calendarScraper = require('./calendarScraper');
var dinnerScraper = require('./dinnerScraper');
var cinemaScraper = require('./cinemaScraper');
var viewObjectMaker = require('./viewObjectMaker');
var dayTranslater = {
    'Friday': 'Fredag',
    'Saturday': 'Lördag',
    'Sunday': 'Söndag'
};

var scraper = function*(uri) {

    // Get the different links from the main page
    var mainPageLinks = yield firstPageScraper(uri);

    // Find which link is to where
    var calendarLink = _.find(mainPageLinks,
        link => link.includes('calendar')
    );
    var dinnerLink = _.find(mainPageLinks,
        link => link.includes('dinner')
    );
    var cinemaLink = _.find(mainPageLinks,
        link => link.includes('cinema')
    );

    // Find the links to the three friends calendars
    var dayToMeet = yield calendarScraper(calendarLink);

    // Find bookable movies
    var bookableMovies = yield cinemaScraper(cinemaLink,
        dayToMeet, dayTranslater);

    // Find free dinner times
    var dinnerData =  yield dinnerScraper(dinnerLink, dayToMeet, dayTranslater);

    // Create object for the view.
    var viewObject = yield viewObjectMaker(bookableMovies, dinnerData,
    dayToMeet, dayTranslater);

    return viewObject;
};

module.exports = scraper;