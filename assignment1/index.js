var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var rp = require('request-promise');
var session = require('koa-session');
var app = koa();

var scraper = require('./scraper/scraper');
var freeDayFinder = require('./scraper/freeDayFinder');

app.keys = ['super secret stuff'];

app.use(logger());
app.use(session(app));

app.use(route.get('/', index));
app.use(route.get('/day/:id', day));
app.use(route.get('/book/:id', book));
app.use(route.post('/', scrape));

function *index() {
    this.body = yield render('index', {title: 'Webbskraparn 1.0'});
}

function *scrape() {
    var post = yield parse(this);
    var prefix = 'http://';

    // If the posted url doesn't have the http:// in front, add it.
    post.url = post.url.substr(0, prefix.length) !== prefix ?
        prefix + post.url : post.url;
    // Remove any trailing slashes.
    post.url = post.url.replace(/\/+$/, '');

    this.session.url = post.url;

    var freeDay = yield freeDayFinder(post.url);

    console.log(freeDay);

    if (freeDay.length > 1) {
        this.body = yield render('dayChooser', {days: freeDay});
    } else {
        this.redirect(`/day/${freeDay}`);
    }
}

function *day(id) {
    var url = this.session.url;
    var dayToMeet = id;
    var scrapedData = yield scraper(url, dayToMeet);

    this.body = yield render('results', {data: scrapedData});
}

function *book(id) {
    var url = `${this.session.url}/dinner/login`;
    var username = 'zeke';
    var password = 'coys';
    var options = {
        method: 'POST',
        uri: url,
        form: {
            group1: id,
            username: username,
            password: password
        }
    };

    var postRequest = yield rp(options).then(res => res).
        catch(err => console.log(err));

    this.body = postRequest;
}

app.listen(3000);
