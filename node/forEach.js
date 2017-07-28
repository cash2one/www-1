/**
 * Created by zhengchaofan on 2017/6/15.
 */

let arr=[[1,2,3],2,3,[5,6,7,8]];

arr.forEach(function (value,index,array) {
    if(index==0){
        value[1]=4;
    }
    console.log(value==array[index]);
});
console.log(arr);