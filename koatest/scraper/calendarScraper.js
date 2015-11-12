var calendarScraper = function($) {
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
    //freeDays[name] = foundFreeDays;
    //console.log('calendarScraper: ',foundFreeDays);
    return foundFreeDays;
};

module.exports = calendarScraper;