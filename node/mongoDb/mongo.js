/**
 * Created by zhengchaofan on 2017/6/15.
 */
let express=require('express'),
    mongo=require('mongodb');

let app=express.createServer();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret:"my secret"
}));

app.set('view engine','jade');

app.set('view options',{
    layout:false
});

app.get('/',function (req,res) {
   res.render('index',{
       authenticated:false
   })
});

app.get('/login',function (req,res) {
    res.render('login')
});

app.get('/singup',function (req,res) {
    res.render('singup');
});

app.listen(3003);


