var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var rp = require('request-promise');
var cheerio = require('cheerio');
var _ = require('lodash');
var async = require('async');
var app = koa();
var calendarScraper = require('./scraper/calendarScraper');


app.use(logger());

app.use(route.get('/', index));
app.use(route.post('/', scrape));

function *index() {
    this.body = yield render('index', {title: 'webbskraparn'});
}

function *scrape() {
    var post = yield parse(this);

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

    yield rp(options).
        then(function($) {
            var mainPageLinks = {};

            $('a').each(function() {
                mainPageLinks[$('a').index(this)] =
                    options.uri + $(this).attr('href');
            });
            links['mainPage'] = mainPageLinks;
        }).
        then(function() {
            console.log('log1', links);

        }).
        catch(function(err) {
            console.log(err);
        });

    var calendarOptions = {
        uri: links.mainPage[0],
        transform: function(body) {
            return cheerio.load(body);
        }
    };

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

    freeDays = calendarLinks.map((link) =>
        rp(link).
        then(function(html) {
            return calendarScraper(cheerio.load(html));
        }));

    //freeDays = _.map(links.persons, calendarScraper(link));

    freeDays = yield Promise.all(freeDays).
        then((values) => {return values;});

    console.log(freeDays);
    //freeDays.forEach((prom) => prom.then(link => console.log(link)));

    this.redirect('/', {title: post.url});
}



app.listen(3000);