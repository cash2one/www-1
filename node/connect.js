/**
 * Created by zhengchaofan on 2017/6/11.
 */
let connect=require('connect');

let server=connect.createServer();

    server.use(connect.static(__dirname));

    server.listen(3535);