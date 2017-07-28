	$(function(){
		(function(){
			$(".js_img_org").on("click",function(){
				var img_src=$(this).find("img").attr("src");
				window.localStorage.setItem("img_org",img_src);
				window.location.href="./img_org.html";
			});
		});
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
			var currYear = new Date().getFullYear();
		    $('#txtBirthday').mobiscroll().date({
		        theme: 'mobiscroll',
		        display: 'modal',
		        lang:'zh',
		        defaultValue:new Date().getFullYear(),
		        maxDate:new Date(new Date().setFullYear(currYear +120)),
		        minDate: new Date(new Date().setFullYear(currYear - 120)),
		        dateFormat: 'yy-mm-dd'
		    });

		    $('#txtTime').mobiscroll().time({
		        theme: 'mobiscroll',
		        lang:'zh',
		        display: 'modal', //显示方式 
		        headerText: false,
		        maxWidth: 90,
		       	timeFormat: 'HH:ii',
        		timeWheels: 'HHii'	
		    });
		})();

		(function(){
			$(".collapsible1").find("h1").on("click",function(){
				$(this).parent().toggleClass("d_block");	
			});	

			var valid_time=0;
			$(".valid_time").find("i").on("tap",function(){
				$(".valid_time").find("span").removeClass("cur");
			 	$(this).parent().addClass("cur");
			 	valid_time=$(this).prev("b").html();	
			 	$(".js_v_time").val( valid_time );
			});
			$(".js_v_time").bind("input propertychange",function(){
				if( $(this).val()!=valid_time ){
					$(".valid_time").find("span").removeClass("cur");
				};
			});
		})();


		(function(){
		    $('.upload_img_w').find("input").change(function(){
				var objUrl = getObjectURL(this.files[0]) ;
	  			if (objUrl) {
			        $(".img-container").height( $(window).height );
			        $(".img-container").stop().slideDown();	
					$(".img-container").find("img").attr("src",objUrl);
					$image=$(".img-container>img");
					var src = $image.eq(0).attr("src"); 
					var canvasdata = $image.cropper("getCanvasData");  
					$image.cropper("setAspectRatio",1 / 1);
		        }
				// 设置比例
				$("#img_f").on("click",function(){
					$(".img-container").html('<img src="" alt=""><div class="img_tf"><button id="img_f">取消</button><button id="img_t">确定</button></div>');	
					$(".img-container").stop().hide();	
				});
				$("#img_t").on("click",function(){
					var cropBoxData = $image.cropper('getCropBoxData');
					canvasdata = $image.cropper("getCanvasData"); 
					convertToData(src, canvasdata, cropBoxData, function(basechar) {  
						$img=$("<img>");
						$img.attr("src",basechar); 
						$(".img_w").html( $img );
					});
					$(".img-container").html('<img src="" alt=""><div class="img_tf"><button id="img_f">取消</button><button id="img_t">确定</button></div>');	
					$(".img-container").stop().hide();	
				});
		    });

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
			    if (window.createObjectURL != undefined) { // basic
			        url = window.createObjectURL(file);
			    } else if (window.URL != undefined) { // mozilla(firefox)
			        url = window.URL.createObjectURL(file);
			    } else if (window.webkitURL != undefined) { // webkit or chrome
			        url = window.webkitURL.createObjectURL(file);
			    }
			    return url;
			}
		})();
	});