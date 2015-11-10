var rp = require('request-promise');
var cheerio = require('cheerio');

var calendarScraper = function*(url){
	var firstPageLinks = [];

	var data = yield rp(url)
		.then(
			function(htmlString) {
				var $ = cheerio.load(htmlString);
				return $('a').each(
					function(i, el) {
						firstPageLinks.push($(el).attr('href'));
					}
				);
			})
		.then(function(){
			firstPageLinks.forEach(function(el) {
				var test;
			})
		})		
		.catch(
			function(err){
				console.log(err);
			});

	return data;
}

module.exports = calendarScraper;