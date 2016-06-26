var express = require('express');
var personaModel = require('../model/persona');
var redisModel = require('../model/node_redis');
var router = express.Router();
var server = require('../app.js');
//var get = require('../chat_server');
//var io=require('socket.io').listen(server);
var count=0;
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
				if (req.body.username === data[0].user_name && req.body.password === data[0].user_pwd &&data[0].options==='1') {
					res.redirect('/pub');
					console.log(data);
				}
				else if(req.body.username === data[0].user_name && req.body.password === data[0].user_pwd &&data[0].options==='0')
					res.redirect('/sub');
				else
					res.redirect('/index');
			})

	});
//sub用户的pub，sub
router.get('/sub', function(req, res, next) {
	res.render('sub');
	console.log('connection' + 'fffff');
		redisModel.subs('channel*');
	//io.on('connection',function(socket) {
	//	console.log('connection' + 'ffeeeeeffff');
	//	redisModel.getMessage(function (error, msg) {
	//		console.log('connection' + 'fffff');
	//		console.log(msg);
	//		socket.emit('news', msg);
	//	});

	//})

//router.get('/sub',function(req,res){
//	redisModel.subs('channel*');
//	io.on('connection',function(socket){
//		console.log('connection'+'fffff');
//		redisModel.getMessage(function(error,msg){
//			console.log('connection'+'fffff');
//			console.log(msg);
//			socket.emit('mymssage',msg);
//});
//	});
	//redisModel.pub('channelone', 'sdsdadad');
	//redisModel.getMessage('channel*', 'channelone', function (error, data) {
	//	res.render('sub', {title: data});
});
router.route('/pub')
	.get(function (req,res) {
		res.render('pub_user');
	})
	.post(function (req, res) {

	});
//router.get('/article',function(req,res,next)
//{
//	var content= get.gethtml();
//	res.render('dail',{title:content.title,content:content.contents})
//})
module.exports = router;


