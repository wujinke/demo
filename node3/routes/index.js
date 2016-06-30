var express = require('express');
var personaModel = require('../model/persona');
var redisModel = require('../model/node_redis');
var router = express.Router();
var server = require('../app.js');
var get = require('../chat_server');
//var Iconv = require('iconv').Iconv;
//var buffer = require('buffer');
//var io=require('socket.io').listen(server);
var count=0;
var userinfo;
//var User = require('./mysql');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

//sub登录
router.route('/login')
	.get(function (req,res) {
		res.render('login', {title: '用户登录'});
	})
	.post(function (req, res) {
		var user1 = {
			username: req.body.username,
		  password : req.body.password
		};
		personaModel.obtenerListaPersonas(user1,function(error,data) {
				if (req.body.username === data[0].user_name && req.body.password === data[0].user_pwd &&data[0].options==='1') {
					res.redirect('/pub');
					userinfo=data[0].user_id;
					console.log(userinfo);
				}
				else if(req.body.username === data[0].user_name && req.body.password === data[0].user_pwd &&data[0].options==='0')
				{
					userinfo=data[0].user_id;
					res.redirect('/sub');
				}
				else
					res.redirect('/');
			})

	});
//sub
router.get('/sub', function(req, res, next) {
	res.render('sub',{user_id: userinfo});
	console.log('connection' + userinfo);
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
		res.render('pub_user',{title_id: userinfo});
	})
	.post(function (req, res) {

	});
router.route('/reg')
	.get(function (req,res) {
		res.render('register', {info:null});
	})
	.post(function (req, res) {
		var user = {
			username: req.body.username,
			password: req.body.password,
			usersex: req.body.sex,
			userPhone: req.body.phone,
			userEmail: req.body.email,
			option: req.body.option
		};
		personaModel.reg(user, function (error, data) {
			if(data!=null)

			{
				res.render('regSucess');
			}
			else
				res.render('regFail');
		});
	})
router.get('/article',function(req,res,next)
{
	  var data = get.gethtml();
	//var data = Iconv.encode(data,'utf8');
//	var iconv = new Iconv('GBK','utf-8');
//	var data= 	iconv.convert(new Buffer(data)).toString();
	console.log(data.title);
		res.render('dail',{title:data.title,content:data.contents});

})
//router.get('/regSucess',function(req,res,next)
//{
//	var data = get.gethtml();
//	//var data = Iconv.encode(data,'utf8');
//
//
//
//})
module.exports = router;