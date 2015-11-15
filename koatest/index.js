var render = require('./lib/render');
var logger = require('koa-logger');
var validate = require('koa-validate');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var rp = require('request-promise');
var cheerio = require('cheerio');
var _ = require('lodash');
var app = koa();

var calendarScraper = require('./scraper/calendarScraper');


app.use(logger());
app.use(validate());

app.use(route.get('/', index));
app.use(route.get('/book/:id', book));
app.use(route.post('/', scrape));

function *index() {
    this.body = yield render('index', {title: 'webbskraparn'});
}

function *scrape() {
    var post = yield parse(this);
    var prefix = 'http://';

    post.url = post.url.substr(0, prefix.length) !== prefix ?
        prefix + post.url : post.url;

    console.log(post.url);

    var options = {
        uri: post.url,
        transform: function(body) {
            return cheerio.load(body);
        }
    };
    var links = {
        mainPage: '',
        persons: ''
    };

    var freeDays = {};
    var calendarLinks = [];

    // Get the different links from the main page
    yield rp(options).
        then(function($) {
            var mainPageLinks = {};

            $('a').each(function() {
                mainPageLinks[$('a').index(this)] =
                    options.uri + $(this).attr('href');
            });
            links['mainPage'] = mainPageLinks;
        }).
        catch(function(err) {
            console.log(err);
        });

    // Find which link is to where
    var calendarLink = _.find(links.mainPage,
        link => link.includes('calendar')
    );
    var dinnerLink = _.find(links.mainPage,
        link => link.includes('dinner')
    );
    var cinemaLink = _.find(links.mainPage,
        link => link.includes('cinema')
    );

    console.log(calendarLink);
    console.log(dinnerLink);
    console.log(cinemaLink);


    var calendarOptions = {
        uri: calendarLink,
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    // Find the links to the three friends calendars
    yield rp(calendarOptions).
        then(function($) {
            var personLinks = [];

            $('a').each(function() {
                personLinks.push(
                    links.mainPage[0] + '/' + $(this).attr('href'));
            });
            links['persons'] = personLinks;
            calendarLinks = personLinks;
            return personLinks;
        });

    // Find which days the friends are free
    freeDays = calendarLinks.map((link) =>
        rp(link).
        then(function(html) {
            return calendarScraper(cheerio.load(html));
        }));
    freeDays = yield Promise.all(freeDays).
        then((values) => {return values;});

    // Find which day all three friends have free.
    var dayToMeet = freeDays.reduce((one, two) => _.intersection(one,two));


    // Translating day for the cinema scrape.
    var dayTranslater = {
        'Friday': 'Fredag',
        'Saturday': 'Lördag',
        'Sunday': 'Söndag'
    };

    var cinemaOptions = {
        uri: cinemaLink,
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    var valueOfDayToMeet;
    var movieOptionValues = [];
    var movieNames = [];

    yield rp(cinemaOptions).
        then(function($) {
            var query = 'option:contains(' +
                                dayTranslater[dayToMeet] + ')';

            valueOfDayToMeet = $('select#day').find(query).attr('value');

            $('select#movie').find('option:enabled').
                each(function() {
                    movieOptionValues.push($(this).attr('value'));
                    movieNames.push($(this).text());
                });
        });

    var movieData = movieOptionValues.map((value) => {
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
        m => {return m.status === 1;});

    console.log(bookableMovies);

    var dinnerOptions = {
        uri: dinnerLink,
        transform: function(body) {
            return cheerio.load(body);
        }
    };
    var dinnerData =  yield rp(dinnerOptions).
        then(function($) {
            var daySmallNoDots = dayTranslater[dayToMeet].
                toLowerCase().replace(/ö/g, 'o').substr(0, 3);
            var query = 'input[value^="' + daySmallNoDots + '"]';
            var freeTime = [];

            $(query).each(function() {
                freeTime.push($(this).attr('value'));
            });

            return freeTime;

        });

    var scrapedData = {title: 'Resultat'};

    var results = bookableMovies.map((el) => {
        var newObj = {};
        var dinnerTimes = [];

        dinnerData.forEach((data) => {
            var dinnerTimeObj = {};
            var startTime = data.substr(3,2);
            var endTime = data.substr(5,2);
            var movieEndTime = Number(el.time.substr(0,2)) + 2;

            dinnerTimeObj.link = data;
            dinnerTimeObj.time = `${startTime} - ${endTime}`;

            if (movieEndTime <= startTime) {
                dinnerTimes.push(dinnerTimeObj);
            }
            //console.log(el.time.substr(0,2));

            //console.log(startTime);
        });

        console.log(dinnerTimes);

        newObj.movie = el.movie;
        newObj.time = el.time;

        if (dinnerTimes.length !== 0) {
            newObj.dinnerTimes = dinnerTimes;
        }

        return newObj;
    });

    scrapedData.results = results;

    console.log(dinnerData);
    console.log(scrapedData);

    //this.redirect('/', {title: post.url});
    this.body = yield render('results', {data: scrapedData});
}

function *book(id) {
    console.log(id);
}

app.listen(3000);
