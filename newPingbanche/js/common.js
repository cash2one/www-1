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
    // $(".js_select_scroll div")[2].click();
    showObject.time= setInterval((showObject.run()),showObject.times)
}
//板块点击显示消失
var showObject={
    times:4000,
    time:"",
    clickOrder:["a","b","c","d"],
    run:function () {
        var obj=$(".js_select_scroll div");
        function ooo() {
            showObject.interval(obj);
        }
        return ooo;
    },
    interval:function (obj) {
      var now = $(".colorS1")[0];
      var z;
      for(var i=0;i<showObject.clickOrder.length;i++){
          if($(now).attr("data-match")==showObject.clickOrder[i]){
              z=i+1;
              if(z==showObject.clickOrder.length){
                  z=0;
              }
              for(var j=0;j<obj.length;j++){
                  if($(obj[j]).attr("data-match")==showObject.clickOrder[z]){
                      obj[j].click();
                  }
              }
          }
      }
    },
    slecttTitle:function (title) {
        return $(title);
    },
    selectCotain:function (contain) {
        return $(contain)
    },
    clickTitle:function () {
        var select=showObject.slecttTitle(".js_select_title a");
        var select2=showObject.slecttTitle(".js_select_scroll div");
        if(select && select.length>0){
            select.each(function (i) {
                var _this=this;
                var contain=showObject.selectCotain(".js_select_contain");
                var bg=showObject.selectCotain(".js_select_bg");
                $(this).click(function () {
                    showObject.changClass(select,_this,"select-btns-click1");
                    showObject.changClass(contain,_this,"show");
                    showObject.changClass(bg,_this,"show");
                })
            })
        }
        if(select2 && select2.length>0){
            select2.each(function (i) {
                var _this=this;
                var contain=showObject.selectCotain(".js_select_contain2 li");
                $(this).click(function () {
                    clearInterval(showObject.time);
                    showObject.time=setInterval((showObject.run()),showObject.times);
                    console.log(_this);
                    showObject.changClass(select2,_this,"colorS1");
                    showObject.changClass(contain,_this,"show");
                    showObject.addAnimation(contain,_this,{
                        opacity:1,
                    },2000);
                })
            })
        }

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
    addAnimation:function (obj,_this,aObj,time) {
        for(var i=0;i<obj.length;i++){
            $(obj[i]).stop();
            $(obj[i]).css({
                opacity:0.85,
            });
            if($(_this).attr("data-match")==$(obj[i]).attr("data-match")){
                $(obj[i]).animate(aObj,time);
            }
        }
    },
    queryAt:function (string) {
        var arr=string.split("#");
        if(arr[1]){
            return arr;
        }
        return null;

    }
};

