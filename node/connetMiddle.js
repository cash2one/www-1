/**
 * Created by zhengchaofan on 2017/6/11.
 */
let connect=require('connect'),
    fs=require('fs');

let server=connect.createServer();

server.use(function (req,res,next) {
    console.error(' %s %s ',req.method,req.url);
    next();
});

server.use(function (req,res,next) {
    if(req.url.match(/^\/html\/\w*.html$/ig)){//正则匹配
        res.writeHead(200,{
            "content-type":"text/html"
        });
        let strenm=fs.createReadStream(__dirname+req.url).pipe(res);
        // strenm.on('dat')

    }else {
        next();
    }
});

server.use(function(req,res,next){
    if(req.url.match(/.(jpg|jpeg|png)$/ig)&&req.method=='GET'){
        res.writeHead(200,{
            "content-type":"application/jpg"
        });
        let strenm=fs.createReadStream(__dirname+req.url).pipe(res);
        // strenm.on('dat')
    }else {
        next();
    }
});

server.use(function(req,res,next){
    res.writeHead(200,{
        "content-Type":"text/plain",
    });
    res.end('Not found')
});

server.listen(2323);