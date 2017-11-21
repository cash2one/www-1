/**
 * Created by zhengchaofan on 2017/11/21.
 */
$(document).ready(readyHandle);

function mouseEnterHandle() {

    $("#js_hnl_block").stop().css({
        display:"block",
    }).animate({
        height:'92px',
    },500)

}
function mouseLeaveHandle() {
    $("#js_hnl_block").stop().animate({
        height:'0',
    },500);
    $("#js_hnl_block").queue(function () {
        $(this).css({
            display:"none",
        });
        $(this).dequeue();
    });
}

//wx点击显示
function clickHandle(e) {
    // console.log("12");
    // e.preventDefault();
    $("#js_head_wx_block").css({
        display:"block"
    })
}
function leaveHideen() {
    $("#js_head_wx_block").css({
        display:"none"
    })
}

function readyHandle() {
    $("#js_introduce_login").mouseenter(mouseEnterHandle);
    $("#js_introduce_login").mouseleave(mouseLeaveHandle);
    $("#js_head_wx").click(clickHandle);
    $("#js_head_wx").mouseleave(leaveHideen);
}