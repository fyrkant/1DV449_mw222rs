var _ = require('lodash');

var firstPageScraper = require('./firstPageScraper');
var dinnerScraper = require('./dinnerScraper');
var cinemaScraper = require('./cinemaScraper');
var viewObjectMaker = require('./viewObjectMaker');

var dayTranslater = {
    'Friday': 'Fredag',
    'Saturday': 'Lördag',
    'Sunday': 'Söndag'
};

var scraper = function*(uri, dayToMeet) {

    // Get the different links from the main page
    var mainPageLinks = yield firstPageScraper(uri);

    var dinnerLink = _.find(mainPageLinks,
        link => link.includes('dinner')
    );
    var cinemaLink = _.find(mainPageLinks,
        link => link.includes('cinema')
    );

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