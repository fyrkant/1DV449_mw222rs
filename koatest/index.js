var render = require('./lib/render');
var logger = require('koa-logger');
var validate = require('koa-validate');
var body = require('koa-body');
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

            // console.log(valueOfDayToMeet);
            // console.log(movieOptionValues);

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

    console.log(movieData);

    // Get option values for day from day select, line 31

    // Get option values for movies and movie names from movie select, line 52




    //freeDays.forEach((prom) => prom.then(link => console.log(link)));

    this.redirect('/', {title: post.url});
}

app.listen(3000);
