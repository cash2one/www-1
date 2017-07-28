/**
 * Created by zhengchaofan on 2017/6/10.
 */
let http = require('http'),
    fs = require('fs'),
    query = require('querystring');

http.createServer(function (req,res) {

    function wrHead({
        type='text/html',
        state=200,
                       }={}) {
        res.writeHead(state,{
            'content-type':type
        })
    }

    if(req.url == '/'){
        res.writeHead(200,{
            'content-type':'text/html'
        });
        // res.write('<div style="color: red">hello world</div>');
        let imgStrem = fs.createReadStream(process.cwd()+'/html/form.html');//提示代码的安全健壮耐测试要通过

        imgStrem.on('data',function (data) {
            console.log(data);
            res.write(data)
        });

        imgStrem.on('end',function () {
            res.end();
        })
        // setTimeout(function () {
        //     res.end('<div style="color: yellow">hello world</div>');
        // },10000);
    }else if(req.url == '/url'&&req.method == 'POST'){
        // res.writeHead(200,{
        //     'content-type':'text/html'
        // });
        let chunk='';
        wrHead();
        req.on('data',function (data) {
            chunk+=data;
        });
        req.on('end',function () {
            console.log(typeof chunk);
            res.write('your send a '+req.method+' data:'+chunk+'name: '+query.parse(chunk).name);
            res.end();
        });

        // console.log(res);
    }else {
        wrHead({state:404});
        res.end('not found');
    }



    // res.end();
}).listen(6767);