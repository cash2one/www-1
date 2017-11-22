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
    $("#js_head_wx").mouseenter(clickHandle);
    $("#js_head_wx").mouseleave(leaveHideen);
    showObject.clickTitle();
}
//板块点击显示消失
var showObject={
    slecttTitle:function (title) {
        return $(title);
    },
    selectCotain:function (contain) {
        return $(contain)
    },
    clickTitle:function () {
        var select=showObject.slecttTitle(".js_select_title a");
        console.log(select);
        select.each(function (i) {
            var _this=this;
            var contain=showObject.selectCotain(".js_select_contain");
            var bg=showObject.selectCotain(".js_select_bg");
            $(this).click(function () {
                console.log(_this);
                showObject.changClass(select,_this,"select-btns-click1");
                showObject.changClass(contain,_this,"show");
                showObject.changClass(bg,_this,"show");
            })
        })
    },
    changClass:function (obj,_this,_class) {
        for(var i=0;i<obj.length;i++){
            if($(_this).attr("data-match")==$(obj[i]).attr("data-match")){
                $(obj[i]).removeClass(_class);
                $(obj[i]).addClass(_class);
            }else {
                $(obj[i]).removeClass(_class);
            }
        }
    },

};

