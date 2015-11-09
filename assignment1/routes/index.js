var express = require('express');
var router = express.Router();
var x = require('x-ray')();
var _ = require('lodash');

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

	x(url, {
		title: 'li',
		name: x('a@href', 'li a')
	})(function(err, obj) {
		console.log(obj);
	});

});


module.exports = router;
