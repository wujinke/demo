var express = require('express');
var personaModel = require('../model/persona');
var redisModel = require('../model/node_redis');
var router = express.Router();
//var User = require('./mysql');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

//sub的用户登录
router.route('/login')
	.get(function (req,res) {
		res.render('login', {title: '用户登录'});
	})
	.post(function (req, res) {
		var user = {
			username: req.body.username,
		  password : req.body.password
		};
		personaModel.obtenerListaPersonas(user,function(error,data) {
				if (req.body.username === data[0].user_name && req.body.password === data[0].user_pwd) {
					res.redirect('/sub');
					console.log(data);
				}
				else
					res.redirect('/index');
			})
	});
//sub用户的pub，sub
router.get('/sub', function(req, res, next) {
	redisModel.subs('channel*');
	redisModel.pub('channelone','sdsdadad');
	redisModel.getMessage('channel*','channelone',function(error,data){
		res.render('sub', { title: data});
	});



});
module.exports = router;


