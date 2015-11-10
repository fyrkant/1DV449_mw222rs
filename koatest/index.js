var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var rp = require('request-promise');
var app = koa();
var scraper = require('./scraper/scraper');


app.use(logger());

app.use(route.get('/', index));
app.use(route.post('/', scrape));

function *index() {
	this.body = yield render('index', {title: 'webbskraparn'})
}

function *scrape() {
	var post = yield parse(this);

	console.log(post.url);

	var data = yield scraper(post.url);

	await console.log(data);

	this.redirect('/');
}



app.listen(3000);