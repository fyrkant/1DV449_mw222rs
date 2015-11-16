var personalCalendarScraper = function($) {
    var days = [];
    var foundFreeDays = [];

    $('th').each(function() {
        var day = $(this).text();

        days.push(day);
    });
    $('td').each(function() {
        var text = $(this).text();
        var index = $('td').index(this);

        if (text.toLowerCase() === 'ok') {
            foundFreeDays.push(days[index]);
        }
    });
    return foundFreeDays;
};

module.exports = personalCalendarScraper;