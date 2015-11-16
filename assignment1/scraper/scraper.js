var rp = require('request-promise');
var cheerio = require('cheerio');
var _ = require('lodash');

var firstPageScraper = require('./firstPageScraper');
var calendarScraper = require('./calendarScraper');

var scraper = function*(uri) {
    var freeDays = {};

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
    var calendarLinks = yield rp(calendarLink).
        then(body => cheerio.load(body)).
        then($ => {
            var personLinks = [];

            $('a').each(function() {
                personLinks.push(
                    `${calendarLink}/${$(this).attr('href')}`);
            });
            return personLinks;
        });

    // Find which days the friends are free
    freeDays = calendarLinks.map(link =>
        rp(link).
        then(function(html) {
            return calendarScraper(cheerio.load(html));
        }));
    freeDays = yield Promise.all(freeDays).
        then(values => values);

    // Find which day all three friends have free.
    var dayToMeet = freeDays.reduce((one, two) => _.intersection(one,two));


    // Translating day for the cinema scrape.
    var dayTranslater = {
        'Friday': 'Fredag',
        'Saturday': 'Lördag',
        'Sunday': 'Söndag'
    };

    var valueOfDayToMeet;
    var movieOptionValues = [];
    var movieNames = [];

    yield rp(cinemaLink).
        then(body => cheerio.load(body)).
        then($ => {
            var query = `option:contains(${dayTranslater[dayToMeet]})`;

            valueOfDayToMeet = $('select#day').find(query).attr('value');

            $('select#movie').find('option:enabled').
                each(function() {
                    movieOptionValues.push($(this).attr('value'));
                    movieNames.push($(this).text());
                });
        });

    var movieData = movieOptionValues.map(value => {
        var connectString = cinemaLink +
            `/check?day=${valueOfDayToMeet}&movie=${value}`;

        return rp(connectString);
    });

    movieData = yield Promise.all(movieData).then(values => {
        var namedMovies = values.map((element, index) => {
            element = JSON.parse(element);
            _.map(element, (el) => {
                el.movie = movieNames[index];
            });
            return element;
        });

        return namedMovies;
    });

    var bookableMovies = _.remove(_.flatten(movieData),
        m => m.status === 1);

    var dinnerData =  yield rp(dinnerLink).
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

    var scrapedData = {title: 'Resultat'};

    var results = bookableMovies.map(el => {
        var newObj = {};
        var dinnerTimes = [];

        dinnerData.forEach(data => {
            var dinnerTimeObj = {};
            var startTime = data.substr(3,2);
            var endTime = data.substr(5,2);
            var movieEndTime = Number(el.time.substr(0,2)) + 2;

            dinnerTimeObj.link = data;
            dinnerTimeObj.time = `${startTime} - ${endTime}`;

            if (movieEndTime <= startTime) {
                dinnerTimes.push(dinnerTimeObj);
            }
        });

        newObj.movie = el.movie;
        newObj.time = el.time;

        if (dinnerTimes.length !== 0) {
            newObj.dinnerTimes = dinnerTimes;
        }

        return newObj;
    });

    scrapedData.results = results;
    scrapedData.day = dayTranslater[dayToMeet];

    return scrapedData;
};

module.exports = scraper;