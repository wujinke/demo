var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.route('/login')
	.get(function (req,res) {
		res.render('index', {title: 'ÓÃ»§µÇÂ¼'});
	})
	 .post(function (req, res) {
			var user = {
				username: 'admin',
				password: '123456'
			}
			if (req.body.user === user.username && req.body.pwd === user.password) {
				res.redirect('/pub_user');
			}
			res.redirect('/index');
		});
router.get('/pub_user', function(req, res, next) {

	res.render('pub_user', { title: 'Eddddd' });
});
module.exports = router;
