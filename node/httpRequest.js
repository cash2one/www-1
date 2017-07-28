/**
 * Created by zhengchaofan on 2017/6/5.
 */
let http = require('http');

http.createServer((req,res) => {
    res.writeHead(200,{
        'content-type':'text/plain'
    });
    res.end('hello world');
    console.log('todo');
}).listen(7878);

console.log('listen 7878 port');
