/**
 * Created by zhengchaofan on 2017/6/14.
 */
let dgram=require('dgram');

let client=dgram.createSocket('udp4');

process.stdin.resume();

process.stdin.on('data',function (data) {
    console.log(data.toString('utf8'));
   client.send(data,0,data.length,8124,'localhost',function (err,msg) {
       if(err){
           console.log("err:",err);
       }else {
           console.log('msg',msg)
       }
   })
});

