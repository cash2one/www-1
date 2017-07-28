/**
 * Created by zhengchaofan on 2017/6/8.
 */

let fs = require('fs');

fs.readdir(__dirname,function (err,files) {

   console.log(files)
});