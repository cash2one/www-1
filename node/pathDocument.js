/**
 * Created by zhengchaofan on 2017/6/26.
 */
let show=require('./pathDpcument');
let count=0;

// show("i'm here");

// let obj={
//   name:'yes'
// };
// process.stdin.resume();
// // process.stdin.setEncoding("utf8");
//
// process.stdin.on('data',function (data) {
//    // process.stdout.write(data.toUpperCase());cat
//    process.stdout.write(data);
//    console.error("erro");
//    console.log('obj',obj)
// });

process.stdin.resume();

console.time('time');
console.log('time');



// for(let i=0;i<1000000;i++){
//     // console.log("i",i)
//     count+=i;
// }

console.log("process.arch",process.arch);
console.log("process.platform",process.platform);
console.log("process.pid",process.pid);
// console.log("process.memoryUsage",process.memoryUsage());



process.on("SIGHUP1",function (e) {
    console.log("e",e)
});

console.log(process.argv);

console.timeEnd('time');

// process.exit(1);
