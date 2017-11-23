/**
 * Created by zhengchaofan on 2017/11/23.
 */
showObject.aboutUsReady=function () {
    console.log("2");
    var href=window.location.href,
        arr=showObject.queryAt(href),
        str="";
    if(arr){
        str=arr[1];
        if(str=="addUs"){
            $("#addUs").click();
        }
    }
};
$(document).ready(showObject.aboutUsReady);
