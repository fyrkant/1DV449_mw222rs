var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var rp = require('request-promise');
var cheerio = require('cheerio');
var _ = require('lodash');
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

	var options = {
		uri: post.url,
		transform: function (body) {
			return cheerio.load(body);
		}
	};
	var data = {};

	yield rp(options)
		.then(function ($) {
			$('a').each(function(){
				data[$('a').index(this)] = options.uri+$(this).attr('href');
			});
		})
		.then(function(){
			console.log('log1',data);

		})
		.catch(function (err) {
			console.log(err);
		})

	var calendarOptions = {
		uri: data[0],
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	yield rp(calendarOptions)
		.then(function($) {
			console.log($.html());
		})

	var data = yield scraper(post.url);

	this.redirect('/', {title: post.url});
}



app.listen(3000);