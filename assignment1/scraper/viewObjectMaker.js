var ViewObjectMaker = function(bookableMovies, dinnerData,
    dayToMeet, dayTranslater) {
    var scrapedData = {title: 'Resultat'};

    var results = {};

    bookableMovies.map(el => {
        var newObj = {};
        var dinnerTimes = [];

        dinnerData.forEach(data => {
            var dinnerTimeObj = {};
            var startTime = data.substr(3,2);
            var endTime = data.substr(5,2);
            var movieEndTime = Number(el.time.substr(0,2)) + 2;

            dinnerTimeObj.link = data;
            dinnerTimeObj.time = `${startTime} - ${endTime}`;

            if (movieEndTime <= startTime) {
                dinnerTimes.push(dinnerTimeObj);
            }
        });

        newObj.movie = el.movie;
        newObj.time = el.time;

        if (dinnerTimes.length !== 0) {
            newObj.dinnerTimes = dinnerTimes;
        }
        results[el.id] = results[el.id] || {};
        results[el.id].times = results[el.id].times || [];
        results[el.id].name = el.movie;
        results[el.id].times.push(newObj);
    });

    scrapedData.results = results;
    scrapedData.day = dayTranslater[dayToMeet];

    return scrapedData;
};

module.exports = ViewObjectMaker;