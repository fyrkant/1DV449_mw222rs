var firstPageScraper = function($) {
    var mainPageLinks = {};

    $('a').each(function() {
        mainPageLinks[$('a').index(this)] =
            options.uri + $(this).attr('href');
    });
    links['mainPage'] = mainPageLinks;
}

module.exports = firstPageScraper;