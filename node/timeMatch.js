/**
 * Created by zhengchaofan on 2017/6/26.
 */



// setImmediate(function () {
//     console.log("setImmediate")
// });
//
// setTimeout(function () {
//     console.log("setTimeout")
// },0);
//
// process.nextTick(function () {
//     console.log('process.nextTick')
// });

// setImmediate(function A() {
//     console.log(1);
//     setImmediate(function B(){console.log(2);});
// });
//
// setTimeout(function timeout() {
//     console.log('TIMEOUT FIRED');
// }, 0);

process.nextTick(function () {
    console.log('nextTick延迟执行1');
});
process.nextTick(function () {
    console.log('nextTick延迟执行2');
});
// 加入两个setImmediate()的回调函数
setImmediate(function () {
    console.log('setImmediate延迟执行1');
    // 进入下次循环
    process.nextTick(function () {
        console.log('强势插入');
    });
});
setImmediate(function () {
    console.log('setImmediate延迟执行2');
});

console.log('正常执行');