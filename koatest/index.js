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
	var links = {
		mainPage: '', 
		persons: ''
	};

	var freeDays = {};
	var theDayToMeet = '';

	yield rp(options)
		.then(function ($) {
			var mainPageLinks = {};
			$('a').each(function(){				
				mainPageLinks[$('a').index(this)] = options.uri+$(this).attr('href');
				
			});
			links['mainPage'] = mainPageLinks;
		})
		.then(function(){
			console.log('log1', links);

		})
		.catch(function (err) {
			console.log(err);
		})

	var calendarOptions = {
		uri: links.mainPage[0],
		transform: function (body) {
			return cheerio.load(body);
		}
	};

	yield rp(calendarOptions)
		.then(function($) {
			var personLinks = {};
			$('a').each(function(){
				personLinks[$('a').index(this)] = links.mainPage[0] + '/' + $(this).attr('href');
			});
			links['persons'] = personLinks;
		});
	
	_.forEach(links.persons, function(el) {
		var personOptions = {
			uri: el,
			transform: function (body) {
				return cheerio.load(body);
			}
		};
		rp(personOptions)
			.then(function($){

				var name = $('h2.center').text();

				var days = [];
				var oks = [];

				var foundFreeDays = {};

				$('th').each(function(){
					var day = $(this).text();
					days.push(day);
				});

				$('td').each(function () {
					var text = $(this).text();
					var index = $('td').index(this);
					if (text.toLowerCase() === 'ok') {
						foundFreeDays[days[index]] = 1;
					}
				});

				freeDays[name] = foundFreeDays;

				
				//freeDays[name] = Object.assign(freeDays[name] || {}, toAdd);
			})
			.then(function () {
				console.log('all links:', links);
				console.log('free days:', freeDays);
				
			})
			.


	});

	var data = yield scraper(post.url);

	this.redirect('/', {title: post.url});
}



app.listen(3000);