var dinnerScraper = require('./dinnerScraper');
var cinemaScraper = require('./cinemaScraper');
var viewObjectMaker = require('./viewObjectMaker');

var dayTranslater = require('./dayTranslater');

var scraper = function*(urls, dayToMeet) {

    // Find bookable movies
    var bookableMovies = yield cinemaScraper(urls.cinema,
        dayToMeet, dayTranslater);

    // Find free dinner times
    var dinnerData =  yield dinnerScraper(urls.dinner, dayToMeet,
        dayTranslater);

    // Create object for the view.
    var viewObject = yield viewObjectMaker(bookableMovies, dinnerData,
    dayToMeet, dayTranslater);

    return viewObject;
};

module.exports = scraper;