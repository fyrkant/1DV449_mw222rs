var rp = require('request-promise');
var cheerio = require('cheerio');
var _ = require('lodash');

var cinemaScraper = function*(url, dayToMeet, dayTranslater) {
    var valueOfDayToMeet;
    var movieOptionValues = [];
    var movieNames = [];

    yield rp(url).
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
        var connectString = url +
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

    return bookableMovies;
};

module.exports = cinemaScraper;