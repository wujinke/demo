/**
 * Created by coofly on 2014/7/12.
 */
var io = require('socket.io')();
var xssEscape = require('xss-escape');
var redisModel = require('./model/node_redis');
var personaModel = require('./model/persona');
var Iconv = require('iconv-lite');
var nickname_list = [];
var content;
exports.gethtml=function(){
   return content;
}
io.on('connection', function (_socket) {
    console.log(_socket.id + ': connection');
  //_socket.on('login',function(data){
  // // var rows;
  // personaModel.selectId(data,function(error,row){
  //   if(row!=null)
  //  for(var i=0; i<row.length; i++)
  //   {
  //     redisModel.subs(row[i].title);
  //     //personaModel.selectCont(row[i].title_id,function(error,rows){
  //     //  console.log(rows.length+ ': connection');
  //     //  for(var j=0; j<rows.length; j++)
  //     //  {
  //     //
  //     //    console.log(Iconv.decode((rows[j].content),'gbk') + ': ');
  //     //    _socket.emit('news',rows[j].content);
  //     //  }
  //   //  });
  //   }
  //   else
  //     console.log(row);
  // })
  //})

    //_socket.emit('news', 'dwdsada');
    redisModel.getMessage(function (error, msg) {
        console.log('connection' + 'fffff');
       var  _content=JSON.parse(msg);
          content=_content;
       // content=_content;
     //   console.log(content);
        _socket.emit('news',msg);

    //  personaModel.addarticle(Iconv.decode(new Buffer(content),'gbk'));
    })
    _socket.on('add',function(data){
           personaModel.add(data,function(insertId){
             console.log(insertId);
         //   redisModel.set(data);
           });
    })
    _socket.on('message',function(data){

      //  console.log(data);
        redisModel.pub('channeltwo',data);
        //_socket.emit('add',data);
    })
    //_socket.emit('need_nickname');
    //_socket.emit('server_message', 'fffffff');

    _socket.on('disconnect', function () {
        console.log(_socket.id + ': disconnect');
       // redisModel.dispub('channelone');
        //if (_socket.nickname != null && _socket.nickname != "") {
        //    _socket.broadcast.emit('user_quit', _socket.nickname);
        //    RemoveNickname(_socket.nickname);
        //}
    });

    //_socket.on('change_nickname', function (_nickname) {
    //    _nickname = xssEscape(_nickname.trim());
    //    console.log(_socket.id + ': change_nickname(' + _nickname + ')');
    //    var name_len = _nickname.replace(/[^\u0000-\u00ff]/g, "tt").length;
    //    if (name_len < 4 || name_len > 16) {
    //        return _socket.emit('change_nickname_error', '请填写正确的昵称，应为4到16个字符。');
    //    }
    //
    //    if (_socket.nickname == _nickname) {
    //        return _socket.emit('change_nickname_error', '你本来就叫这个。');
    //    }
    //
    //    if (HasNickname(_nickname)) {
    //        return _socket.emit('change_nickname_error', '此昵称已被人使用。');
    //    }
    //
    //    var old_name = "";
    //    if (_socket.nickname != "" && _socket.nickname != null) {
    //        old_name = _socket.nickname;
    //        RemoveNickname(old_name);
    //    }
    //
    //    nickname_list.push(_nickname);
    //    _socket.nickname = _nickname;
    //
    //    console.log(nickname_list);
    //
    //    _socket.emit('change_nickname_done', old_name, _nickname);
    //    if (old_name == "") {
    //        return _socket.broadcast.emit('user_join', _nickname)
    //    } else {
    //        return _socket.broadcast.emit('user_change_nickname', old_name, _nickname)
    //    }
    //});
    //
    //_socket.on('say', function (_content) {
    //    if ("" == _socket.nickname || null == _socket.nickname) {
    //        return _socket.emit('need_nickname');
    //    }
    //    _content = _content.trim();
    //    console.log(_socket.nickname + ': say(' + _content + ')');
    //    _socket.broadcast.emit('user_say', _socket.nickname, xssEscape(_content));
    //    return _socket.emit('say_done', _socket.nickname, xssEscape(_content));
    //});
});

exports.listen = function (_server) {
    return io.listen(_server);
};