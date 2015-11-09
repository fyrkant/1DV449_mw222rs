var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Assignment 1' });
// });

router.post('/scrape', function(req, res){
	var url = req.body.url;
	console.log(url);

	res.render('scrape', {title: 'webbskraparn', url: url});
});


module.exports = router;