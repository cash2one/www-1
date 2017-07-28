/**
 * Created by zhengchaofan on 2017/6/11.
 */
let connect=require('connect'),
    timerLate1=require('./moudle/timeLate.js');

let server=connect.createServer();

let shell,shellRes;

server.use(function (req,res,next) {
    console.log(req.url);
    shell=req;//证明在connect中的请求对象在一次请求中就是一个对象
    shellRes=res;
    next();
});

server.use(timerLate1({time:600}));

server.use(function (req,res,next) {
    console.log('shell',shell==req,'shellResEnd',shellRes.end==res.end);
   if(req.url.match(/a$/ig)){
       res.writeHead(200);
       res.end('fast');
   }else {
       next();
   }
});

server.use(function (req,res,next) {
    if(req.url.match(/b$/ig)){
        setTimeout(function () {
            res.writeHead(200);
            res.end('slow');
        },1000)
    }else {
        next()
    }
});

server.use(function (req,res,next) {
    res.writeHead(404);
    res.end('not found');
});

server.listen(9393);