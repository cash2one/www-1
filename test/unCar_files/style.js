$(function(){
	(function(){
		toggleFn( $(".icon_dropd").add('.js_icon_dropd') );
		function toggleFn($div){
			$div.on("click",function(event){
				if(  $('.icon_dropd').parents(".topNav").find(".dropdown_list").hasClass("db") ){
					 $('.icon_dropd').parents(".topNav").find(".dropdown_list").removeClass("db");
					 $('.icon_dropd').removeClass("cur");

					 $('.icon_dropd').parents(".top_admin").removeClass("cur");
				}else{
					 $('.icon_dropd').parents(".topNav").find(".dropdown_list").addClass("db");
					 $('.icon_dropd').addClass("cur");
					 $('.icon_dropd').parents(".top_admin").addClass("cur");
				}
				event.preventDefault();
			});
		};
		
		$('.top_admin').on('mouseleave', function() {
			$('.topNav').find(".dropdown_list").removeClass("db");
			$('.icon_dropd').removeClass("cur");

			$('.top_admin').removeClass("cur");
		});

	})();
	
	//image preview
	(function() {
		$('body').on('change', '.getImage', function(){
			var files,file,url;
			files=$(this).prop('files');	
			if(files.length>0){
				file = files[0];
				if(isImageFile(file)){
					url = createObjectURLfun(file);
				}
			}; 
			$(this).parents(".previewImg").find(".setImage").html( $("<img>").attr({src:url}));
	    });
	    function isImageFile(file){
	        if (file.type) {
	          return /^image\/\w+$/.test(file.type);
	        } else {
	          return /\.(jpg|jpeg|png|gif)$/.test(file);
	        }
	      }
	    createObjectURLfun = function(file) {
	      if (window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1) {
	        return window.webkitURL.createObjectURL(file);
	      } else {
	        return window.URL.createObjectURL(file);
	      }
	    };
	})();
	
	//edit user info
	(function() {
		var selfEditDialog;
		$('body').on('click', '#selfEditBtn', function() {
			$.get('user/selfEdit', {"_": $.now()}, function(data){
				selfEditDialog = BootstrapDialog.show({
					 nl2br: false,
					 closeByBackdrop: false,
					 size: BootstrapDialog.SIZE_NORMAL,
					 title: '',
					 message: data,
					 draggable: true,
					 onhidden: function(){}
				});
				
			}, 'html') ;
		});
		
		$('body').on('click', '#selfEditSaveBtn', function() {
			var options = {
					url : 'user/selfEdit',
					type : "POST",
					dataType: 'json',
					iframe: true,
					success : function(data) {
						if (1 == data.response_state) {
							selfEditDialog.close();
							$('.top_admin_t').find('.js_icon_dropd').text(data.nickname);
							$('.top_admin_t').find('.userPic').find('img').attr('src', 'imag?uri='+ data.photo +'&width=200');
						} else {
							alert(data.response_note);
						}
						return false;
					}
			};
			$('#selfEditForm').ajaxSubmit(options);
			return false;
		});
		
		//change password
		$('body').on('click', '#changePasswdBtn', function() {
			$.get('user/userPassword', {"_": $.now()}, function(data){
				selfEditDialog = BootstrapDialog.show({
					 nl2br: false,
					 closeByBackdrop: false,
					 size: BootstrapDialog.SIZE_NORMAL,
					 title: '',
					 message: data,
					 draggable: true,
					 onhidden: function(){}
				});
				
			}, 'html') ;
		});
		
		requirejs(['jquery.form', 'validator_zh', 'lib/validation/additional-methods.min'], function(jqForm, jqValidator) {
		    $(function() {
		        var submitHandler = function(form) {
		            var options = {
		                    url : 'user/changePwd',
		                    type : "POST",
		                    dataType: 'json',
		                    success : function(data) {
		                        if (data.response_state == 1) {
		                        	selfEditDialog.close();
		                        } else {
		                            alert(data.response_note);
		                        }
		                        return false;
		                    }
		                };
		            $(form).ajaxSubmit(options);
		            return false;
		          };
		          
		        
		        $('body').on('click', '#userPasswordSave', function() {
		        	var $passwordForm = $("#passwordForm");
		        	$passwordForm.validate({
		                 rules : {
		                	 oldPassword : {
		                         minlength : 1,
		                         required : true
		                     },
		                     password : {minlength : 6, required : true},
		                     password2: {equalTo: '#password'}
		                 },
		                 success : function(element) {
		                     element.addClass('valid').closest('.control-group')
		                             .removeClass('error').addClass('success');// .text('OK!')
		                 }
		             });
		        	
		        	 if ($passwordForm.valid()) {
		        		 submitHandler($passwordForm);
		        	 }
		         });
		    });
		});
        
	})();
	
	(function(){
		var h=$(window).height()-48;
		$(".sec_ov").height( h );
	})();

	(function(){
		$(".form1").find(".view").on("click",function(){
			$(".db_tr").animate({"height":"auto"},200);
			$(".db_tr").html(  $(this).parents("tr").html()   );
			$("#form_mx").show();
		})
		$("#form_mx").find(".icon_cl").on("click",function(){
			$(this).parent("#form_mx").hide();
			$(".db_tr").html("");
			$(".db_tr").animate({"height":0+'px'},200);

		});
		
	})();

	(function(){
		//$('#datetimepicker1').datetimepicker();
		//$('#datetimepicker2').datetimepicker();			
	})();
	

});


