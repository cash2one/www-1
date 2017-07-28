$(function(){
	(function(){
		$(".form5 .upload_img_w").height(  $(".form5 .upload_img_w").width()/8*5 );
	})();
	(function(){
    	var img_val=$(".img-container").html();
	    $('.upload_img_w').each(function(index,element){ 
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
				$image.cropper("setAspectRatio",8/5);
				// 设置比例
				$("#img_f").on("click",function(){
					$(".img-container").html(img_val);	
					$(".img-container").stop().hide();	
				});

				$("#img_t").on("click",function(){
					var cropBoxData = $image.cropper('getCropBoxData');
					canvasdata = $image.cropper("getCanvasData"); 
					convertToData(src, canvasdata, cropBoxData, function(basechar) {  
						$img=$("<img>");
						$img.attr("src", basechar);

						$(element).find(".img_w").html( $img );
						$(element).find(".js_hidden").val( basechar );
					});
					$(".img-container").html(img_val);	
					$(".img-container").stop().hide();	
				});
		    });		  
		  });
	})();
});