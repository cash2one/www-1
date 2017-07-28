/**
 * Created by Administrator on 2017/5/10.
 */

// function ajax(obj) {
//     var xhr=new XMLHttpRequest();
//     xhr.open(obj.methods,obj.url);
//     xhr.send();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState==4 && xhr.status ==200) {
//             // alert(xhr.responseText);
//             obj.success(xhr);
//         }else {
//             obj.err&&obj.err(xhr);
//         }
//     };
// };
//
// var obj={
//     methods:"GET",
//     url:"mobile/desire/driver",
//     success:function (xhr) {
//         console.log(xhr);
//     }
// };
// ajax(obj);

(function () {
    var url='/haul/',
        count=1,
        status="free",
        noList=false;
    //时间转换
    function   formatDate1(now)   {
        var   year=now.getFullYear();
        var   month=now.getMonth()+1;
        var   date=now.getDate();
        return   year+"-"+month+"-"+date;
    }
    function   formatDate2(now)   {
        var   hour=now.getHours();
        var   minute=now.getMinutes();
        var   second=now.getSeconds();
        // console.log(now,hour,minute,second);
        return   hour>12?"下午":"上午";
    }
    //数据整理
    function dataFormat(data) {
        var date=new Date(data.dueDate);
        data.dueDate=formatDate1(date);
        var date2=new Date(data.dueTime);
        data.dueTime=formatDate2(date2);
        data.distance=parseInt(data.distance);
        data.fromCounty=data.fromCounty?data.fromCounty:data.fromCity;
        data.fromCity=data.fromCity?data.fromCity:"";
        data.toCity=data.toCity?data.toCity:"";
        data.toCounty=data.toCounty?data.toCounty:data.toCity;
        data.carModel=data.carModel?data.carModel:"";
        data.note=data.note?data.note:"";
        return data;
    }
    //生成dom函数
    function makeDom(data) {

        // var date=new Date(data.dueDate);
        // var dateT=formatDate1(date);
        // var date2=new Date(data.dueTime);
        // var date2T=formatDate2(date2);
        // data.distance=parseInt(data.distance);
        // console.log(typeof data.distance);
        var _html='';
        _html+=' <a class="contain">';
        _html+=' <div class="contain-head">';
        _html+=' <div class="contain-head-left">';
        _html+=' <div class="contain-area">';
        _html+=' <span class="contain-area-mian">'+data.fromCounty+'</span>';
        _html+=' <span class="contain-area-minor">'+data.fromCity+'</span>';
        _html+=' </div>';
        _html+=' <div class="bg-right-arrow"></div>';
        _html+=' <div class="contain-area">';
        _html+=' <span class="contain-area-mian cam-color">'+data.toCounty+'</span>';
        _html+=' <span class="contain-area-minor">'+data.toCity+'</span>';
        _html+=' </div>';
        _html+=' </div>';
        _html+=' <div class="contain-head-right">';
        _html+=' <div><span>里程：'+data.distance+'公里</span></div><div><span>总价：'+data.estimateFee+'元</span></div>';
        _html+=' </div>';
        _html+=' </div>';
        _html+=' <div class="contain-body">';
        _html+=' <div class="contain-body-first">';
        _html+=' <span class="cbf-color">可装车时间：</span>';
        _html+=' <span>'+data.dueDate+' '+data.dueTime+'</span>';
        _html+=' </div>';
        _html+=' <div class="contain-body-second">';
        _html+=' <span class="cbs-first">'+data.carModel+'</span><span class="cbs-second">'+data.note+'</span>';
        _html+=' </div>';
        _html+=' </div>';
        _html+='  </a>';
        // console.log(data.dueDate,data.dueTime,_html);
        var div=document.createElement("div");
        div.innerHTML=_html;
        $("#myApp").append(div);
    }
    function ajax(pageSize,pageNum) {
        status="loading";
        // $(".show-more").show();
        if($("#myApp").children().length<=1){
            $(".show-more").hide();
        }else {
            $(".show-more").show();
        }
        $.ajax({
            type: "GET",
            data:{
                pageSize:pageSize,
                pageNum:count,
            },
            url:url+ "mobile/desire/driver",
            success: function (msg) {
                if(count>msg.totalPage||noList){
                    if($("#myApp").children().length<=1){
                        $(".no-more").hide();
                        $(".show-more").hide();
                    }else {
                        $(".no-more").show();
                        $(".show-more").hide();
                    }
                    return
                }
                console.log(msg);
                for(var i=0;i<msg.list.length;i++){
                    if(msg.list[i].status=="PAID"){
                        var data=dataFormat(msg.list[i]);
                        makeDom(data);
                    }else {
                        noList=true;
                        console.log("none",noList);
                    }
                }
                if($("#myApp").children().length<=1){
                    $(".no-list").show();
                }
                $(".show-more").hide();
                if(count==1){
                    $(".dataWarn").remove();
                }
                count++;
                status="free";
            },
            error:function () {
                $(".on-eorr").show();
            }
        });

    }
    ajax(10);
    $(window).scroll(function () {
        //懒加载下拉
        // console.log(window.location.href,"href");
        if(($(window).height() + $(window).scrollTop()) >=$("body").height()){
            //底部
            if(status=="free"){
                ajax(10);
            }
            // console.log($(window).height(),$(window).scrollTop(),$("body").height())
        }else{
            //非底部
        }
    })

}());

