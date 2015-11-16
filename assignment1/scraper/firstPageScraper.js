var rp = require('request-promise');
var cheerio = require('cheerio');

var firstPageScraper = function*(url) {
    var links = yield rp(url).
        then(body => cheerio.load(body)).
        then($ => {
            var mainPageLinks = {};

            $('a').each(function() {
                mainPageLinks[$('a').index(this)] =
                    url + $(this).attr('href');
            });
            return mainPageLinks;
        }).
        catch(err => {
            console.log(err);
        });

    return links;
};

module.exports = firstPageScraper;