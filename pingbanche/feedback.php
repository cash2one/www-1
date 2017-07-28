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
      <h1>意见反馈
        <a href="javascript:;" id="js_sure">确定</a>   
      </h1>
      <a href="./set.html" class="icon_goPrev_44" data-ajax="false"></a>
    </div>
    <div data-role="main" class="ui-content form4 pt10">
		<textarea placeholder="请填写详细内容，我们会尽快回复您" id="content"></textarea>
	</div>	
  </div>
  <script src="/pingbanche/js/jquery-1.11.0.min.js"></script>
  <script src="/pingbanche/js/jquery.mobile.custom.js"></script>
  <script src="/pingbanche/js/common.js"></script>
  <script>
  $(function(){
    (function(){
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
    })();
    
    (function(){
      $("#js_sure").on("click",function(){
        if( !$("#content").val()){
          alert("请填写内容");
          return false;
        }
        var data={
          "token":localStorage.getItem("token"),
          "content":$("#content").val(),  
        }
        ajax_pwd(data,"mobile/feedback",function(data){
          switch(data.response_state){
            case 1:
              window.location.href="./set.html";
              break;             
            case -1:
              alert(data.response_note);
              break;     
          }     
        });
      });      
    })();
  });
  </script>
</body>
</html>
