$(function(){
	
	(function(){
		$(".w_auto").find("a").width(  $(".w_auto").find("img").width()  );
	})();

	(function(){
    	var img_val=$(".img-container").html();
	    $('.s_h_img').each(function(index,element){ 
		    $(element).find("input").change(function(){
				var objUrl = getObjectURL(this.files[0]) ;
	  			if (objUrl) {
			        $(".img-container").height( $(window).height );
			        $(".img-container").stop().slideDown();	
					$(".img-container").find("img").attr("src",objUrl);
					$image=$(".img-container>img");
					var src = $image.eq(0).attr("src"); 
					var canvasdata = $image.cropper("getCanvasData"); 
		        }
				$image.cropper("setAspectRatio",1/1);
				// 设置比例
				$("#img_f").on("click",function(){
					$("#js_hidden").val("");
					$(".img-container").html(img_val);	
					$(".img-container").stop().hide();	
				});

				$("#img_t").on("click",function(){
					
					var cropBoxData = $image.cropper('getCropBoxData');
					canvasdata = $image.cropper("getCanvasData"); 
					convertToData(src, canvasdata, cropBoxData, function(basechar) {  
						$("#js_hidden").val(basechar);
						$(".img-container").html(img_val);	
						$(".img-container").stop().hide();	
						if( !$("#js_hidden").val() ){
							window.location.href="./getInfo.html";
						}else{
							var data={
								token:localStorage.getItem("token"),
							};
							if( !!$("#js_hidden").val() ){
								data["photo"]=$("#js_hidden").val();
							}			
							// 这里应该用后台返回的路径
							ajax_pwd(data,"mobile/user/update",function(data){
								if(data.response_state==1){
									alert(data.response_note);
									$("#js_hidden").eq(0).val("");
									window.location.href="./getInfo.html";				
								}else{
									alert(data.response_note);
								}
							});	
						}	
					});
				});
		    });		  
		  });
	})();
});