/**
 * Created by Administrator on 2016/6/15.
 */
var user = require('mysql');

//创建一个连接
function user(user)
{
  this.username=user.user_name;
  this.password = user.user_pwd;
}
//function mysql() {
//  this.ClientConnection = function(conn)
//  {
//    conn.connect(function(err){
//      if(err){
//        console.log('[query] - :'+err);
//        return;
//      }
//      console.log('[connection connect]  succeed!');
//    });
//  };
//  //select the DB
//  conn.query('test', function(error, results) {
//    if(error) {
//      console.log('ClientConnectionReady Error: ' + error.message);
//      // client.end();
//      return;
//    }
//  });
  //执行SQL语句
user.mysqlSelete=function(conn,user)
 {
   conn.connect();
   var user_sql = "select * from sys_user where user_name='"+user.username+"' and user_pwd ='"+user.password+"'";
   conn.query(user_sql, function(err, results) {
     if (err) {
       console.log('[query] - :'+err);
       return;
     }
     console.log('The solution is: '+results);
     return results;
   });
   conn.end();
 };
//  //关闭connection
//  this.mysqlSelete=function(conn)
//  {
//    conn.end(function(err){
//      if(err){
//        return;
//      }
//      console.log('[connection end] succeed!');
//    });
//
//  }
//};
module.exports = user;



