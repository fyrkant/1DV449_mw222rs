var rp = require('request-promise');
var options = require('./scraperOptions');

var firstPageScraper = function*(url) {
    options.uri = url;
    var links = yield rp(options).
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