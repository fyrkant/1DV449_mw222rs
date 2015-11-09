var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {

	var url = 'http://localhost:8080';

	request(url, function(error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);

			$('a').filter(function(){
				var data = $(this);

				var text = data.text();

				console.log(text);
			});
		}
	});

});

app.listen('8081');
console.log('Magic happens on port 8081');

exports = module.exports = app;