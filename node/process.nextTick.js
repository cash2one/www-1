/**
 * Created by zhengchaofan on 2017/6/26.
 */
let EventEmiter=require('events').EventEmitter;
let fs=require('fs');
let content;

function rfir(cd) {
    if(!content){
        fs.readFile(__filename,'utf8',function (err,data) {
            if(err){
                console.error('error',err)
            }
            content=data;
            console.log('readFile');
            cd(err,content)
        })
    }else {
        process.nextTick(function () {
            console.log('cashe');
            cd(null,content);
        })
    }
}

rfir(function (err,data) {
   console.log('1.length',data.length) ;

   rfir(function (err,data) {
       console.log('2.length',data.length);
   });

    console.log('read file again...');
});

console.log('reading file.....');


