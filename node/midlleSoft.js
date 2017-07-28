/**
 * Created by zhengchaofan on 2017/6/11.
 */
let fs = require('fs'),
    http = require('http');

http.createServer(function (req,res) {
    console.log(req.url);
    if(req.url.match(/^\/html\/\w*.html$/ig)){//正则匹配
        res.writeHead(200,{
            "content-type":"text/html"
        });
        let strenm=fs.createReadStream(__dirname+req.url).pipe(res);
        // strenm.on('dat')

    }else if(req.url.match(/.(jpg|jpeg|png)$/ig)&&req.method=='GET'){
        res.writeHead(200,{
            "content-type":"application/jpg"
        });
        let strenm=fs.createReadStream(__dirname+req.url).pipe(res);
        // strenm.on('dat')
    }else {
        res.writeHead(200,{
            "content-Type":"text/plain",
        });
        res.end('Not found')
    }
}).listen(5656);