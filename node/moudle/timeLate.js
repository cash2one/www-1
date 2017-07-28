/**
 * Created by zhengchaofan on 2017/6/11.
 */




module.exports=function ({time=100}={}) {
    console.log("i'm here");
    return function (req,res,next) {
        let time1=setTimeout(function () {
            console.log(req.url,req.method,'time too long')
        },time);

        let end=res.end;//猴子补丁很有意思
        res.end=function (chunk,encoding) {
            res.end=end;
            res.end(chunk,encoding);
            clearTimeout(time1)
        };

        next();
    }
};