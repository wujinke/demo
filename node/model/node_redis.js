/**
 * Created by Administrator on 2016/6/19.
 */
var redis = require('redis');
var client1 = redis.createClient();
var client2 = redis.createClient();
//var client3 = redis.createClient();
//var client4 = redis.createClient();
//var client5 = redis.createClient();
var msg_count = 0;
var redisModel = {};
redisModel.pub=function(pub_channel,message){
  //console.log(message);
  //client1.on('psubscribe', function (pattern, count) {
  //  console.log('client1 psubscribed to ' + pattern + ', ' + count + ' total subscriptions');
    client2.publish(pub_channel,message);
  console.log(message);
    //client3.publish('channelthree', 'Me too!');
    //client4.publish('channelfour', 'And me too!');
    //client4.publish('channelfive', 'And me too!');
 // });
}

redisModel.dispub=function(pub_channel){
  client1.on('punsubscribe', function (pattern, count) {
    console.log('client1 punsubscribed from ' + pattern + ', ' + count + ' total subscriptions');
    //client5.end();
    //client4.end();
    //client3.end();
    client2.end();
    client1.end();
  });
}

redisModel.getMessage=function(callback){
  client1.on('pmessage', function (pattern, channel, message) {
    console.log('(' + pattern + ') client1 received message on ' + channel + ': ' + message);
    msg_count += 1;
    //if (msg_count ===4) {
    //  client1.punsubscribe();
      console.log(msg_count);

   // }
    callback(null,message);
  });
}

redisModel.subs=function(sub_channel){
  client1.psubscribe(sub_channel);
}
module.exports = redisModel;