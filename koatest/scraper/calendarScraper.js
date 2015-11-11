var rp = require('request-promise');
var cheerio = require('cheerio');

var calendarScraper = function(links){

	var freeDays = {};
	var theDayToMeet = '';

	_.forEach(links.persons, function(personLink) {
		var personOptions = {
			uri: personLink,
			transform: function (body) {
				return cheerio.load(body);
			}
		};
		rp(personOptions)
			.then(function($){
				var name = $('h2.center').text();
				var days = [];
				var foundFreeDays = [];

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
				freeDays[name] = foundFreeDays;
				console.log(foundFreeDays);
			})			
	});

	
}

module.exports = calendarScraper;