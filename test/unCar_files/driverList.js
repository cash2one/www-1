    
    var User = $.extend({}, User);
    User.view = function() {
		$.get('driver/view/'+$(this).attr('data-id'), {"_": $.now()},function(data){
			User.updateDialog = BootstrapDialog.show({
				 nl2br: false,
				 closeByBackdrop: false,
				 size: BootstrapDialog.SIZE_WIDE,
				 title: '用户信息',
				 message: data,
				 draggable: true,
				 onhidden: function(){}
			});
			
		}, 'html') ;
	} ;
	
	User.edit = function() {
		$.get('driver/editByManager', {id: $(this).attr('data-id'), "_": $.now()},function(data){
			User.updateDialog = BootstrapDialog.show({
				 nl2br: false,
				 closeByBackdrop: false,
				 size: BootstrapDialog.SIZE_WIDE,
				 title: '修改',
				 message: data,
				 draggable: true,
				 onshown: function() {
					 $('.modal-lg').addClass('modal-lger');
				 },
				 onhidden: function(){}
			});
			
		}, 'html') ;
	} ;
	
	User['delete'] = function() {
		if (!confirm('确认删除？')) {
			return;
		}
		$.post('driver/delete/' + $(this).attr('data-id'), function(data){
			if (data.response_state != 1) {
				alert(data.response_note);
			} else {
				location.reload();
			}
		}, 'json') ;
	} ;
	
    $(function() {
		$("#btn_pa").on("click",function(){
			//whether dom 'addDriver' has content
			var $addDriver = $('#addDriver');
			if ($.trim($addDriver.get(0).innerText) == "") {
				$.get('driver/editByManager', function(data) {
					$addDriver.html(data);
				});
			}
			if( $(this).find("span").hasClass("cur") ){
				$(this).find("span").removeClass("cur");
				$("#addDriver").stop().slideUp();
			}else{
				$(this).find("span").addClass("cur");
				$("#addDriver").stop().slideDown();
			}
			if( $("#btn_pa_js").find("span").hasClass("cur") ){
				$("#btn_pa_js").find("span").removeClass("cur");
				$("#addDriver2").stop().slideUp();
			}	
		});


		$("#btn_pa_js").on("click",function(){
			if( $(this).find("span").hasClass("cur") ){
				$(this).find("span").removeClass("cur");
				$("#addDriver2").stop().slideUp();
			}else{
				$(this).find("span").addClass("cur");
				$("#addDriver2").stop().slideDown();	
			}
			if( $("#btn_pa").find("span").hasClass("cur") ){
				$("#btn_pa").find("span").removeClass("cur");
				$("#addDriver").stop().slideUp();
			}	
		});	
    	
		var sendVerifyCodeFn = function() {
			var mobile = $('#verifyCodeMobile').val();
			var mobileRegx = /1(3|4|5|6|7|8|9)\d{9}/;
			if (!mobileRegx.test(mobile)) {
				alert('请输入正确格式的手机号');
				return;
			}
			
			$.post('user/smsVerifyCode', {mobile: mobile}, function(data) {
				if (data.response_state != 1) {
					alert(data.response_note);
				} else {
					$('#sendVerifyCode').off('click', sendVerifyCodeFn);
					sendVerifyCodeTimeout(60);
				}
			}, 'json');
		};
		
		var sendVerifyCodeTimeout = function(seconds) {
			if (seconds > 0) {
				$('#sendVerifyCode').addClass('text-muted');
				$('#sendVerifyCode').html('再次获取('+ seconds +')');
				window.setTimeout(function() {sendVerifyCodeTimeout(seconds - 1);}, 1000);
			} else {
				$('#sendVerifyCode').removeClass('text-muted');
				$('#sendVerifyCode').html('再次获取');
				$('#sendVerifyCode').click(sendVerifyCodeFn);
			}
		};
 		
		$('#sendVerifyCode').click(sendVerifyCodeFn);
		
		$('#addExistUserBtn').click(function() {
			var verifyCode = $('#verifyCodeInput').val();
			if (!verifyCode) {
				alert('请输入验证码');
				return;
			}
			var mobile = $('#verifyCodeMobile').val();
			$.post('driver/addExistsUser', {mobile: mobile, verifyCode: verifyCode}, function(data) {
				if (data.response_state != 1) {
					alert(data.response_note);
				} else {
					location.reload();
				}
			}, 'json');
		});
		
    	var submitHandler = function(form) {
            var options = {
                    url : 'driver/saveByManager',
                    type : "POST",
                    dataType: 'json',
                    iframe: true,
                    success : function(data) {
                        if (1 == data.response_state) {
                            alert(data.response_note);
                            location.reload();
                        } else {
                            alert(data.response_note);
                        }
                        return false;
                    }
                };
            $(form).ajaxSubmit(options);
            return false;
          };
          
          $('#addDriver').on('click', '#saveNewDriverBtn', function() {
        	  submitHandler($('#driverAddForm'));
        	  return false;
          });
          
          $('body').on('click', '#saveDriverBtn', function() {
        	  submitHandler($('#driverEditForm'));
        	  return false;
          });
          
          $('#pagebar').page('driverListQueryForm');
          
          $('.view').click(User.view);
          $('.edit').click(User.edit);
          $('.delete').click(User['delete']);
    });