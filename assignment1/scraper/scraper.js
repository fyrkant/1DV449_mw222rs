var x = require('x-ray')();
var _ = require('lodash');

var scraper = function*(url) {
	var firstPage = yield x(url, 'li', [{
		li: '',
		href: 'a@href'
	}])
	.write();

};

module.exports = scraper;