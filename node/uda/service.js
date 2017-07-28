/**
 * Created by zhengchaofan on 2017/6/14.
 */
let dgram=require('dgram');

let server=dgram.createSocket('udp4');

server.on('message',function (data,rinfo) {
    let str=data.toString('utf8');
    console.log(str,"rinfo:",rinfo);
});



server.bind({
    address: 'localhost',
    port: 8124,
    exclusive: true
});

console.log('success');