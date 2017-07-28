/**
	 * 分页, 把输入的值设置到页参数上
	 */
	$.fn.page = function(targetFormId) {
		var thiz = this;
		$(this).on('click', 'a', function() {
			var name = $(this).attr('name') ;
			var pageInput = $(thiz).find(".pageInput") ;
			var p = pageInput.val() ;
			var total = $(thiz).find('#totalPages').val() ;
			switch(name) {
				case 'query':
				case 'first':
					p = 1 ;
					break ;
				case 'previous':
					p = parseInt(p) - 1 ;
					if (p <= 1) {
						p = 1 ;
					}
					break ;
				case 'next':
					p = parseInt(p) + 1 ;
					if (p >= total) {
						p = total ;
					}
					break ;
				case 'last':
					p = total ;
					break ;
				case 'jump':
					if (p <= 1) {
						p = 1 ;
					} else if (parseInt(p) >= total) {
						p = total ;
					}
			}
			//确保每页显示的条数大于等于1
			var size = $(thiz).find('input[name="page.size"]').val() ;
			if (parseInt(size) <= 0) {
				size = 1;
			}
			$('#'+targetFormId).find("input[name='page.size']").val(size) ;
			$('#'+targetFormId).find("input[name='page.page']").val(p -1) ;
			$('#'+targetFormId).submit();
			return false ;
		});
	};
	
	
	var page = function(callback, targetFormId){
		$('#'+parentTag + ' input[type=button][name]').click(function(){
			var name = $(this).attr('name') ;
			var pageInput = $('#'+parentTag).find("#pageInput") ;
			var p = pageInput.val() ;
			var total = $('#'+parentTag + ' #totalPages').val() ;
			switch(name) {
				case 'query':
				case 'first':
					p = 1 ;
					break ;
				case 'previous':
					p = parseInt(p) - 1 ;
					if (p <= 1) {
						p = 1 ;
					}
					break ;
				case 'next':
					p = parseInt(p) + 1 ;
					if (p >= total) {
						p = total ;
					}
					break ;
				case 'last':
					p = total ;
					break ;
				case 'jump':
					if (p <= 1) {
						p = 1 ;
					} else if (parseInt(p) >= total) {
						p = total ;
					}
			}
			//确保每页显示的条数大于等于1
			var size = $('#'+parentTag + ' input[name="page.size"]') ;
			if (parseInt(size.val()) <= 0) {
				size.val(1) ;
			} else {
				size.val(parseInt(size.val())) ;
			}
			$('#'+parentTag + " input[name='page.page']").val(p -1) ;
			//执行回调
			if (callback) {
				callback() ;
			}
			return false ;
		}) ;
	} ;