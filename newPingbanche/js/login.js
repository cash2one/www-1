/**
 * Created by zhengchaofan on 2017/12/4.
 */

$(document).ready(function () {

    $("#login_button").click(function (e) {
        var username=$("#login_username").val();
        var password=$("#login_password").val();
        var verifyCode=$("#login_verifyCode").val();
        var url=showObject.srcJadge(window.location.href,showObject.prefix)?(showObject.prefix+"/login"):"/login";
        var rex=new RegExp("^.{1,}$","ig"),
            rex2=new RegExp("^.{1,}$","ig");

        if(!rex.test(username)){
            $("#login_msg").addClass("show").text("用户名不合规范");
            return false;
        }
        if(!rex2.test(password)){
            $("#login_msg").addClass("show").text("密码不合规范");
            return false;
        }


        $.ajax({
            url:url,
            type:"POST",
            contentType:"application/x-www-form-urlencoded",
            data:{
                username:username,
                password:password,
                verifyCode:verifyCode,
            },
            success:function (data) {
                console.log(data);
                if(data.type==0){
                    window.location.href=showObject.srcJadge(window.location.href,showObject.prefix)?(showObject.prefix+"/loginC"):"/loginC";
                }else {
                    $("#login_msg").addClass("show").text(data.msg);
                    $("#captchaImg").click();
                }
            },
            error:function (x,t,e) {
                console.log(e);
                console.log("失败");
                $("#login_msg").addClass("show").text("请求失败！");
            }
        });
        e.preventDefault();
    })
});