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
	var data = {
		mainPage: '', 
		persons: ''
	};

	yield rp(options)
		.then(function ($) {
			var mainPageLinks = {};
			$('a').each(function(){				
				mainPageLinks[$('a').index(this)] = options.uri+$(this).attr('href');
				
			});
			data['mainPage'] = mainPageLinks;
		})
		.then(function(){
			console.log('log1', data);

		})
		.catch(function (err) {
			console.log(err);
		})

	var calendarOptions = {
		uri: data.mainPage[0],
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	yield rp(calendarOptions)
		.then(function($) {
			var personLinks = {};
			$('a').each(function(){
				personLinks[$('a').index(this)] = data.mainPage[0] + '/' + $(this).attr('href');
			});
			data['persons'] = personLinks;
		})
		.then(function() {
			console.log('log2', data);
		})
		.then(function() {
			
		})

	var data = yield scraper(post.url);

	this.redirect('/', {title: post.url});
}



app.listen(3000);