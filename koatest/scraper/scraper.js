var rp = require('request-promise');
var cheerio = require('cheerio');

var scraper = function*(url){
	var string = yield rp(url)
		.then(
			function(htmlString) {
				var $ = cheerio.load(htmlString);
				return $('a').each(
					function(i, el) {
						console.log($(el).html());
					}
				);
			})		
		.catch(
			function(err){
				console.log(err);
			});

	return string;
}

module.exports = scraper;