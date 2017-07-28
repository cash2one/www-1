/**
 * Created by zhengchaofan on 2017/7/6.
 */
//最大公约数

function maxLimit(q,p) {
    if(p==0){
        return q
    }
    let c=q%p;
    return maxLimit(p,c);
}

console.log(maxLimit(10,5));