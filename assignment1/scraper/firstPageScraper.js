var rp = require('request-promise');
var options = require('./scraperOptions');

var firstPageScraper = function*(url) {
    options.uri = url;
    var links = yield rp(options).
        then($ => {
            var mainPageLinks = {};

            mainPageLinks.firstPage = url;

            $('a').each(function() {
                mainPageLinks[$(this).attr('href').replace('/', '')] =
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