var render = require('./lib/render');
var logger = require('koa-logger');
var validate = require('koa-validate');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

var scraper = require('./scraper/scraper');


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

    // If the posted url doesn't have the http:// in front, add it.
    post.url = post.url.substr(0, prefix.length) !== prefix ?
        prefix + post.url : post.url;

    var scrapedData = yield scraper(post.url);

    //this.redirect('/', {title: post.url});
    this.body = yield render('results', {data: scrapedData});
}

function *book(id) {
    console.log(id);
}

app.listen(3000);
