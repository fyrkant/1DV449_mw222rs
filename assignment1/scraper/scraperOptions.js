var cheerio = require('cheerio');

var scraperOptions = {
    transform: body => cheerio.load(body),
    headers: {
        'User-Agent':
            'Webbskraparn 1.0 by Mattias, contact: mw222rs@student.lnu.se'
    }
};

module.exports = scraperOptions;