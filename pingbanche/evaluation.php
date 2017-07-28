<!doctype html>
<html manifest="test.manifest">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
  	<link rel="stylesheet" href="/pingbanche/css/jquery.mobile.custom.structure.css">
	<link rel="stylesheet" href="/pingbanche/css/style.css">
</head>
<body>
  <div data-role="page">
    <div data-role="header" class="header2" data-title="fixed" data-position="fixed">
      <h1>评价<a href="">投诉</a></h1>
      <a href="" class="icon_goPrev_44"></a>
    </div>
    <div data-role="main" class="ui-content">
		<div class="form1">
			<div class="user_xx1 pr">
				<div class="user_xx1_img pa">
					<img src="/pingbanche/images/user_162.png" alt="">
				</div>
				<p class="user_name" id="js_user">昵称</p>
				<p id="js_token">15088688868</p>
				<p>
					<span id="js_star1"><i class="cur"></i><i class="cur"></i><i class="cur"></i><i class="cur"></i><i></i></span>
					<em>3580单</em>
				</p>
			</div>			
		</div>
		<div class="form_start">
			<h3 class="tit3"></h3>	
			<span class="clum">评价客户</span>
			<form action="">
				<span class="form_start_star js_star">
					<b>信誉度</b>
					<i></i><i></i><i></i><i></i><i></i>
				</span>
				<textarea name="content" placeholder="请输入您对司机的评价" id="content"></textarea>
				<div class="sub_ff_wrap">
					<input type="button" value="评价">	
				</div>
			</form>			
		</div>
	</div>	
  </div>

  <script src="/pingbanche/js/jquery-1.11.0.min.js"></script>
  <script src="/pingbanche/js/jquery.mobile.custom.js"></script>
  <script>
  $(function(){
	var Index=0;
  	$(".js_star").find("i").on("tap",function(){		
  		Index=$(this).index(); 
		$(".js_star").find("i").each(function(index,element){
			if(index<Index){
				$(element).addClass("cur");
			}else{
				$(element).removeClass("cur");
			}
		});
  	});

  	(function(){
		var index=function(id){
			var num=0;
			$(id).find("i").each(function(index,element){
				if($(this).hasClass("cur")){
					num++;
				}	
			});	
			return num;				
		}
		$(".sub_ff_wrap input").click(function(){
			var data={
				"token":$("#js_user").html(),
				"orderId":$("#js_token").html(),
				"star": index(".js_star"),
				"content":$("#content").html(),
			}
			ajax_pwd(data,"mobile/order/rate".function(data){
				if(status=="success"){
    				if(data.response_state==-100){
    					console.log( " ok " );
    					window.location.href="./login.php"
    				}else if(data.response_state==1){
    					// 订单列表
    				}else if(data.response_state==-1){
    					alert(data.response_note);	
    					// 原界面
    				}
    			}
			});
		});
  	})();
  });
  </script>
</body>
</html>
