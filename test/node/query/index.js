/**
 * Created by zhengchaofan on 2017/7/10.
 */
var outX='http://test.51pingbanche.com/payList/?no=dededed&no2=swdede'

function query(outX) {
    var arr1=outX.split('?'),
        arr2=[],
        arr3=[],
        obj={},
        name='',
        value='';
    if(arr1.length!=2){
        console.log('不是正常query对象');
        return false;
    }
    arr2=arr1[1].split('&');
    for(var i=0;i<arr2.length;i++){
        arr3=arr2[i].split('=');
        name=arr3[0];
        value=arr3[1];
        obj[name]=value;
    }
    return obj;
}

console.log(query(outX));