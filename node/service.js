/**
 * Created by zhengchaofan on 2017/6/6.
 */
let net = require('net');

let server = net.createServer(function (con) {
    console.log('connect');
    con.on('data',function (data) {
        console.log(data+'form'+con.remoteAddress+''+con.remotePort);
        con.write('repeat'+data);
    });
    con.on('close',() =>{
        console.log('clinet close connection');
    })
}).listen(8787);
console.log('listen 8787');