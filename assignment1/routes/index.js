var express = require('express');
var router = express.Router();
var scraper = require('../scraper/scraper');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Assignment 1' });
// });

router.get('/', function(req, res){
	res.render('index', {title: "webbskraparn"});
});

router.post('/', function(req, res) {
	var url = req.body.url;

	console.log(url);

	var test = scraper(url);

	console.log(test.next());
	console.log(test.next());

});


module.exports = router;
