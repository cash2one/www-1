var imgSrc="http://192.168.1.150:9999/haul/imag?uri=";
var url_url="http://192.168.1.150:9999/haul/";
var ajax_pwd=function(data,url,fn){ //重置密码
	$.ajax({
	  type:'POST',
	  url:"http://192.168.1.150:9999/haul/"+url,
	  data:data,
	  cache:false,
	  success:function(data){
	  	fn&&fn(data);
	  }
	});    
}
var ajax_get=function(data,url,fn){ //重置密码
	$.ajax({
	  type:'GET',
	  url:"http://192.168.1.150:9999/haul/"+url,
	  data:data,
	  cache:false,
	  success:function(data){
	  	fn&&fn(data);
	  }
	});    
}
var ajax_kf=function(url,fn){ //获取客服列表
	ajax_get({},url,function(data){
		fn&&fn(data);
	});
}
var ajax_lan=function(lat,lon,fn){
	var data={};
	data["lat"]=lat;
	data["lon"]=lon;
	ajax_get(data,"mobile/location/nearby/driver",function(data){
		if(data.response_state==1){
	      fn&&fn(data); 
	    }else{
	     alert(data.response_note);
	    }	
	});
}  
var getUnread=function(fn){ //获取未读的消息
	var data={"token":window.localStorage.getItem("token")};
	ajax_get(data,"mobile/message/unread",function(data){
  		fn&&fn(data); 
	});
}
var preset=function(fn){ //获取一些预设的值
	var data={"token":window.localStorage.getItem("token")};

	ajax_get(data,"mobile/setting/rule",function(data){
		if(data.response_state==1){
			fn&&fn(data);
		}else{
			alert( data.response_note );
		}		
	});
}
var getUserById=function(id,fn){ 
	//通过ID获取用户部分信息 
	ajax_get({"userId":id},"mobile/user/"+id,function(data){
        if(data.response_state==1){
          fn&&fn(data); 
        }else{
          alert("信息读取失败,请刷新或者重新登录");
        }
	});
}
var adjustPrice=function(id,newPrice,fn){
	var data={};
	data["token"]=window.localStorage.getItem("token")
	data["desireId"]=id;
	data["newPrice"]=newPrice;
	ajax_pwd(data,"mobile/desire/adjustPrice",function(data){
	    if(data.response_state==1){
	      	fn&&fn(data);
		}else{
			alert(data.response_note);
		}
	});
}

var driverList=function(fn){
	var data={
	  	"token":window.localStorage.getItem("token")
	  };
	ajax_get(data,"mobile/user/driverList",function(data){
	    if(data.response_state==1){
	      	fn&&fn(data);
		}else{
			alert(data.response_note);
		}	
	});
}

var payCheck=function(fn){ //检查是否需要支付
	var data={
			token:window.localStorage.getItem("token")
		};
	ajax_get(data,"mobile/desire/payCheck",function(data){
		fn&&fn(data);
	});
}


var ajax_suc=function(id,status,fn){
	var data={
		"token":window.localStorage.getItem("token"),
		"status":status
	}
	ajax_get(data,"mobile/order",function(data){
		if(data.response_state==1){
			var arr=data.list;
			for(var i=0;i<arr.length;i++){
				if(id==arr[i].id){
					fn&&fn( arr[i] );
				}
			}
		}else{
			alert(data.response_note);
		}
	});
} 	 



var ajax_resource=function(id,url,fn){
	//通过ID获取资源/货源详情详情 
	var data={"token":window.localStorage.getItem("token")}
	ajax_get(data,url,function(data){
		if(data.response_state==1){
			fn&&fn(data);
		}else if(data.response_state==-1){
			alert(data.response_note);
		}
	});
}
var prePay=function(id,fn){ //订单支付
	var data={
		"token":window.localStorage.getItem("token"),
		"orderId":id
	}
	ajax_get(data,"mobile/order/prePay",function(data){
		if(data.response_state==1){
			fn&&fn(data);
		}else{
			alert(data.response_note);
		}
	});
};

//防止连续点击
var date_arr = new Array();
function disableButton(button,validateGroup)
{
	date_arr.push(new Date());
	if(date_arr.length >1 && (date_arr[date_arr.length-1].getTime()-date_arr[date_arr.length-2].getTime() < 1000)){
	  event.cancelBubble = true; 
	  return false;
	}
	if (typeof (Page_ClientValidate) == 'function'&& ((validateGroup == undefined && Page_ClientValidate() == false) || (validateGroup != undefined && Page_ClientValidate(validateGroup) == false))){ 
	  return false;
	}
	button.disabled = true;
	return true;
}

function loaded(myScroll,wrap,num,pullUpAction){

	var pullUpEl =$("#"+wrap).find(".pullUp");
	var pullUpOffset = pullUpEl.get(0).offsetHeight;

	myScroll=new iScroll(wrap, { 
	  useTransition: false,
	  topOffset: 0,
	  scrollbars:false,
	  vScroll:true,
	  onRefresh: function () {
		if(pullUpEl.hasClass('loading')) {
	      pullUpEl.removeClass();
	      pullUpEl.find('.pullUpLabel').innerHTML = '上拉加载更多...';
	    }
	  },
	  onScrollMove: function () { 
		if ( this.y < (this.maxScrollY-10) && !
	      pullUpEl.hasClass('flip'))
	    {
	      pullUpEl.addClass('flip');
	      this.maxScrollY = this.maxScrollY;
	      $("#"+wrap).find('.pullDownLabel').innerHTML = '松手开始更新...';
	    }else if( this.y>(this.maxScrollY+10)&&
	      pullUpEl.hasClass('flip') )
	    {
	      pullUpEl.removeClass();
	      this.maxScrollY = pullUpOffset;
	      $("#"+wrap).find('.pullUpLabel').innerHTML = '上拉加载更多...';
	    }
	  },
	  onScrollEnd: function () {
	  	if (pullUpEl.hasClass('flip')) {
	      pullUpEl.addClass('loading');
	      num++;
	      pullUpEl.find('.pullUpLabel').innerHTML = '加载中...';
	      pullUpAction(this,num);
	    }
	  }
	});
	setTimeout(function () { $("#"+wrap).css("left",0); }, 800);
}

function format(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	//var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);//+':'+add0(s);
}

function format1(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	//var s = time.getSeconds();
	return y+'年'+add0(m)+'月'+add0(d)+'日 '+add0(h)+':'+add0(mm);//+':'+add0(s);
}

function add0(m){
	return m<10?'0'+m:m; 
} 
function getQueryString(name) {  //获取URL参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function mySubBtn(id){
    $(id).removeAttr("disabled");
}
		
function format_date(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	return y+'-'+add0(m)+'-'+add0(d);
}
function format_time(shijianchuo){
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	//var s = time.getSeconds();
	return add0(h)+':'+add0(mm); //+':'+add0(s);
}

function convertToData(url, canvasdata, cropdata, callback) {  
  var cropw = cropdata.width; // 剪切的宽  
  var croph = cropdata.height; // 剪切的宽  
  var imgw = canvasdata.width; // 图片缩放或则放大后的高  
  var imgh = canvasdata.height; // 图片缩放或则放大后的高   
  var poleft = canvasdata.left - cropdata.left; // canvas定位图片的左边位置  
  var potop = canvasdata.top - cropdata.top; // canvas定位图片的上边位置  
  var canvas = document.createElement("canvas");  
  var ctx = canvas.getContext('2d');  
  canvas.width = cropw;  
  canvas.height = croph;
  var img = new Image();  
  img.src = url;  
  img.onload = function() {  
      this.width = imgw;  
      this.height = imgh;  
      ctx.drawImage(this, poleft, potop, this.width, this.height);  
      var base64 = canvas.toDataURL('image/jpg', 1);
      callback && callback(base64)     
  }  
}
function getObjectURL(file) {
var url = null;
if (window.createObjectURL != undefined) { 
    url = window.createObjectURL(file);
} else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
} else if (window.webkitURL != undefined) {
   url = window.webkitURL.createObjectURL(file);
}
return url;
}



