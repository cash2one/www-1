/**
 * Created by zhengchaofan on 2017/6/12.
 */
let express=require('express');

let app=express.createServer();

    app.set('view engine','ejs');
    app.set('views','../view');
    app.set('view options',{layout:false});

    app.get('/',function (req,res) {
        res.render('index');
    });

    app.listen(8989);