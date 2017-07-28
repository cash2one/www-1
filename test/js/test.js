/**
 * Created by Administrator on 2017/5/10.
 */

var storage = window.localStorage;
var city=storage["city"];
$("#list_page_no").hide();
$("#list_page_more").show();
// $("#content_b2").height($(window).height());

var lon=0,lat=0;
// //定位
//  var map, geolocation;
//    //加载地图，调用浏览器定位服务
//    map = new AMap.Map('container', {
//        resizeEnable: true
//    });
//    map.plugin('AMap.Geolocation', function() {
//        geolocation = new AMap.Geolocation({
//            enableHighAccuracy: true,//是否使用高精度定位，默认:true
//            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//            buttonPosition:'RB'
//        });
//        map.addControl(geolocation);
//        geolocation.getCurrentPosition();
//        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
//    });


//    showCityInfo();
//      //获取用户所在城市信息
//    function showCityInfo() {
//        //实例化城市查询类
//        var citysearch = new AMap.CitySearch();
//        //自动获取用户IP，返回当前城市
//        citysearch.getLocalCity(function(status, result) {
//            if (status === 'complete' && result.info === 'OK') {
//                if (result && result.city && result.bounds) {
//                    var cityinfo = result.city;
//                    // var citybounds = result.bounds;
//                    //地图显示当前城市
//                    // map.setBounds(citybounds);
// 		    	if(city==""||city==undefined){
// 		    		city=cityinfo;
//    				}
//                }
//            } else {

//            }
//        });
//    }

//    //解析定位结果
//    function onComplete(data) {
//    	lon=data.position.getLng;
//    	lat=data.position.getLat;
//    }
//    //解析定位错误信息
//    function onError(data) {
//    	// alert("定位失败！");
//        // document.getElementById('tip').innerHTML = '定位失败';
//    }

var str = window.location.href;
var locUrl = str.split("=");
var type=locUrl[1];// 1.找活 2.找车
var order=1;//1 跨地域 2 同城 3 附近
var id=0;
var isload=true;//是否加载更多

if(type==2){
    $("#cross_name").html("跨地拖车");
    $("#city_name").html("同城拖车");
    $("#near_name").html("附近拖车");
}else{
    $("#cross_name").html("跨地业务");
    $("#city_name").html("同城业务");
    $("#near_name").html("附近业务");
}

$("#cross").click(function() {
    if(order==1) {
        return;
    }
    order = 1;
    id=0;
    $("#cross_name").attr({style:"color:#fac113"});
    $("#city_name").attr({style:"color:#343434"});
    $("#near_name").attr({style:"color:#343434"});
    $("#cross_bottom").attr({style:"background-color:#fac113"});
    $("#city_bottom").attr({style:"background-color:#ffffff"});
    $("#near_bottom").attr({style:"background-color:#ffffff"});
    getData(0);

});
$("#city").click(function() {
    if(order==2) {
        return;
    }
    id=0;
    order = 2;
    $("#cross_name").attr({style:"color:#343434"});
    $("#city_name").attr({style:"color:#fac113"});
    $("#near_name").attr({style:"color:#343434"});
    $("#cross_bottom").attr({style:"background-color:#ffffff"});
    $("#city_bottom").attr({style:"background-color:#fac113"});
    $("#near_bottom").attr({style:"background-color:#ffffff"});
    getData(0);

});
$("#near").click(function() {
    if(order==3) {
        return;
    }
    id=0;
    order = 3;
    $("#cross_name").attr({style:"color:#343434"});
    $("#city_name").attr({style:"color:#343434"});
    $("#near_name").attr({style:"color:#fac113"});
    $("#cross_bottom").attr({style:"background-color:#ffffff"});
    $("#city_bottom").attr({style:"background-color:#ffffff"});
    $("#near_bottom").attr({style:"background-color:#fac113"});
    getData(0);

});
$("#query").click(function() {
    if(type==2){
        window.location.href="RescueSerch.html";
    }else{
        window.location.href="WorkSerch.html";
    }

});


getData(0);

function getData(tid){
    $.getJSON("/drive-travel/api/businessCar/businessCarList.json?id="+tid+"&type="+type+"&pageSize="+pageSize+"&order="+order+"&city="+city+"&lon="+lon+"&lat="+lat, function(result){
        console.log(result)
        $("#cross_num").html("("+result.data.differentCount+")");
        $("#city_num").html("("+result.data.sameCount+")");
        $("#near_num").html("("+result.data.nearbyCount+")");
        if(tid==0){
            $("#content").empty();
        }
        var div = "";
        for(var i = 0; i < result.data.busCarList.length; i++) {
            var cityArray = result.data.busCarList[i].cityList;
            var city = "";
            for (var j = 0; j < cityArray.length; j++) {
                city = city + "—" + cityArray[j];
            }
            var need=result.data.busCarList[i].need;
            if(need!=""&&need!=undefined){
                need='(求'+need+')';
            }else{
                need="";
            }
            var distance=result.data.busCarList[i].allDis;
            if(distance!=""&&distance!=undefined){
                distance='约'+distance.split(".")[0]+'km';
            }else{
                distance="";
            }
            var tagNum=result.data.busCarList[i].tagCount;
            var createTime;
            if(tagNum==""||tagNum==0){

                var createTime=result.data.busCarList[i].createTime;
                if(createTime!=""&&createTime!=undefined){
                    createTime=timeStamp(createTime);
                }else{
                    createTime="";
                }
            }else{
                createTime=tagNum+"标记已发车";
            }

            var startTime=result.data.busCarList[i].startTime;
            if(startTime!=""&&startTime!=undefined){
                startTime=timeStamp2String(startTime);
            }else{
                startTime="";
            }

            if(type==1){
                div +='<a href="RescueDetail.html?id='+result.data.busCarList[i].id+'&type='+type+'"><section class="rescue_list_share_section"><div class="fc2 h2 rescue_list_share_section_text" style="font-weight:bold;">'+result.data.busCarList[i].startCity+'—'+result.data.busCarList[i].endCity+need+'<span  class="r_float fc3 h0">'+distance+'</span></div><div class="fc3 h1 rescue_list_share_section_text"><span>'+result.data.busCarList[i].genre+ ' ' + result.data.busCarList[i].brand+'</span> <span> 出发时间：</span><span>'+startTime+'</span><span  class="r_float fc3 h0">'+createTime+'发布</span></div></section></a><div class="div_background_1_c6"></div>';
            }else{
                div+='<a href="RescueDetail.html?id='+result.data.busCarList[i].id+'&type='+type+'"><section class="rescue_list_share_section"><div class="fc2 h2 rescue_list_share_section_text"><div class="fc2 h2 l_float" style="font-weight:bold;">'+result.data.busCarList[i].startCity+'</div><div class="fc3 h1 l_float rescue_list_share_center_city"><div class="rescue_list_share_center_city_content fc4 h0">'+city+'—'+'</div></div><div class="fc2 h2 l_float" style="font-weight:bold;">'+result.data.busCarList[i].endCity+'</div><span  class="r_float fc3 h0">'+distance+'</span></div><div class="fc3 h1 rescue_list_share_section_text"><span>'+result.data.busCarList[i].genre + ' ' + result.data.busCarList[i].brand+'</span> <span> 出发时间：</span><span>'+startTime+'</span><span  class="r_float fc3 h0">'+createTime+'发布</span></div></section></a><div class="div_background_1_c6"></div>';
            }




        }
        if(result.data.busCarList.length!=0) {
            id = result.data.busCarList[result.data.busCarList.length-1].id
            console.log(id)
        }
        if(result.data.busCarList.length<pageSize){
            $("#list_page_more").hide();
            $("#list_page_no").show();
        }else{
            $("#list_page_no").hide();
            $("#list_page_more").show();

        }
        $("#content").append(div)
    });

}

/**
 *绑定滚动事件
 */
$(window).scroll(function() {
    if(($(window).height() + $(window).scrollTop()) >= $("body").height()){
        //底部
        getData(id);

    }else{
        //非底部
    }
});

$(".share_float").click(function(){
    window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.tuochebang.jiuyuan";
});



