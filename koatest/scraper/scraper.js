var rp = require('request-promise');
var cheerio = require('cheerio');
var _ = require('lodash');
var calendarScraper = require('./calendarScraper');
var cinemaScraper = require('./cinemaScraper');
var restaurantScraper = require('./restaurantScraper');

var scraper = function*(url){
	var firstPageLinks = [];
	var test = [];

	var data = rp(url)
		.then(
			function(htmlString) {
				var $ = cheerio.load(htmlString);
				return $('a');
			})
		.then(function(ee){
			_.forEach(ee, (a) => {
				var newUrl = url + a.attribs.href;
				test.push(newUrl);
			});
		})
		.then(function(){

		})	
		.catch(
			function(err){
				console.log(err);
			});

	return data;
}

module.exports = scraper;