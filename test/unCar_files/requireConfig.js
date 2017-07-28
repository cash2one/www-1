var require = {
		baseUrl: 'js/app',
	    paths: {
	        'lib': '../lib',
	        jquery: '../lib/jquery-1.11.3.min',
	        bootstrap: '../lib/bootstrap.min',
	        ztree: '../lib/ztree/jquery.ztree.all.min',
	        'bootstrap-dialog': '../lib/bootstrap-dialog.min',
	        'ckeditor-core':'../lib/ckeditor/ckeditor',
	        'ckeditor-jquery':'../lib/ckeditor/adapters/jquery',
	        'jquery.form': '../lib/jquery.form.min',
	        'editable': '../lib/bootstrap-editable.min',
	        'validator': '../lib/validation/jquery.validate.min',
	        'validator_zh': '../lib/validation/localization/messages_zh.min',
	        'date97': '../lib/My97DatePicker/WdatePicker',
	        'baidumap': 'http://api.map.baidu.com/getscript?v=2.0&ak=IOS3Ew6Xk4r4XM63ACv5YjNl&services=&t=20160108163541'
	    },
	    shim: {
	        bootstrap: ['jquery'],
	        editable: ['jquery'],
	        ztree: ['jquery'],
	        'ckeditor-jquery':{
	            deps:['jquery', 'ckeditor-core']
	        },
	        'date97': {
	        	exports: 'date97', 
	        	init: function() {
	        		return {WdatePicker: this.WdatePicker, '$dp': this.$dp};
	        	}
	        },
	        baidumap: {exports: 'BMap'}
	    }/*,
	    urlArgs: "bust=" +  (new Date()).getTime()*/
	};