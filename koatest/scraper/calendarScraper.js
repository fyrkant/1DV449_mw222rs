var rp = require('request-promise');
var cheerio = require('cheerio');

var calendarScraper = function*(uri){
	var freeDays = {};
	var foundFreeDays = [];

	yield rp(uri)
		.then((html) => {
			return cheerio.load(html);
		})
		.then(function($){
			var name = $('h2.center').text();
			var days = [];

			$('th').each(function(){
				var day = $(this).text();
				days.push(day);
			});
			$('td').each(function () {
				var text = $(this).text();
				var index = $('td').index(this);
				if (text.toLowerCase() === 'ok') {
					foundFreeDays.push(days[index]);
				}
			});
			//freeDays[name] = foundFreeDays;
			return foundFreeDays;
		})

	return foundFreeDays;

	
}

module.exports = calendarScraper;