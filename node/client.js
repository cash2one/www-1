/**
 * Created by zhengchaofan on 2017/6/6.
 */
let net = require('net');

let client = new net.Socket();
client.setEncoding('utf8');

client.connect('8787','localhost',function () {
    console.log('connect to service');
    client.write('connection start');
});

process.stdin.resume();

process.stdin.on('data',function (data) {
    client.write(data);
});

client.on('data',function (data) {
    console.log(data);
});
client.on('close',function () {
    console.log('service close');
})