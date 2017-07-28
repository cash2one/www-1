$(document).ready(function(){
    // 点击支付
    $("form").submit(function(e){
        //console.log(_isClick);
        //shytUI.Loading.init().show();
        var _payChannel = $("input[name='payChannel']:checked").val();

        //弹出提示框，并且阻止 该支付方式继续支付.
        var _alertMsg = $("#"+_payChannel+"AlertMsg").val();
        if (_alertMsg != "" && _alertMsg != null) {
            cashierCommon.simpleAlertDialog(_alertMsg);
            e.preventDefault();
            return;
        }

        if ("wxpay" == _payChannel) {
            if(isWxProwser == 'true') {
                if (_isClick == true) {
                    e.preventDefault();
                    return;
                }
                _isClick = true;
                e.preventDefault();
                var _payResult = "/cashier/mobile/cashierWapPayResult.htm";
                cashierWxPay.toPay(_payResult);
            } else {
                //$("#payDialog").addClass("show");
                //$(".m-pay-mask").addClass("show");
                cashierWapCommon.wxWapAlert("/cashier/mobile/cashierWapPayResult.htm", $("input[name='zaOrderNo']").val());
                //shytUI.Loading.close();
                //_isClick = false;
            }
        } else if ("lakala" == _payChannel) {
            // 处理拉卡拉
            getLakalaQRcode();
            e.preventDefault();
            return;
        } else if ("zuifuli" == _payChannel) {
            // 处理最福利支付
            //校验是否能支付
            zflPay();
            e.preventDefault();
            return;
        }

    });

//		$("#payDialog .m-pay-ok").on("click",function(){
//			$.ajax({
//				url:'../checkPayOrderAction/checkOrder.json',
//				data:{
//					"zaOrderNo":$("input[name='zaOrderNo']").val()
//				},
//		   	    success:function(data){
//		   	    	$("#payDialog").removeClass("show");
//		   			if (data == 'paid') {
//		   				$(".m-pay-mask").removeClass("show");
//		   				window.location='cashierWapPayResult.htm?zaOrderNo=' + $("input[name='zaOrderNo']").val();
//		   			} else {
//		   				$("#errorDialog").addClass("show");
//		   			}
//		   	   }
//			});	
//		});
    // 支付失败
//		$("#errorDialog .m-pay-ok").on("click",function(){
//		   	$("#errorDialog").removeClass("show");
//		   	$(".m-pay-mask").removeClass("show");
//		});

    /*if($("#wxpayHidden").val()!="wxpay") {
     $("#pay2").attr("checked","checked");
     }*/

    /**
     * 默认勾选第一个单选按钮
     * */
    $("input[name='payChannel']").first().attr("checked","checked");

    /*******************************花呗开始********************************/
    $("#showTip").on("click",function(){
        shytUI.SimpleTip.init({
            content:'<div style="padding:15px;line-height:1.5;"><p class="tc-gray"><strong style="color:#333333;">花呗分期是什么</strong><br>花呗分期是蚂蚁微贷提供的先消费后 分期还款的网购服务。<br><strong style="color:#333333;">花呗分期特点</strong><br>1.0首付，支持3，6，9期付款<br>2.3期0手续费<br>3.还款超方便<br>方法a:自动还款，支持支付宝余额、 借记卡快捷、余额宝自动还款<br>方法b:主动还款<br>&nbsp;>登录支付宝www.alipay.com-首页-蚂蚁花呗,查看账单及还款<br>&nbsp;>登录支付宝钱包-财富-蚂蚁花呗，查看账单及还款</p></div>'
        }).show();
    });

    //调用公共方法
    cashierWapCommon.initHb();
    /**
     * 隐藏花呗下拉框
     * */

    $(".list-group-item .m-shyt-type").on("click",function(){
        if ($(this).find("input").val() != "anthb" && $(this).find("input").val() != "anthb_app") {
            $("#showHBInfo").hide();
        }
    });


    /*******************************花呗结束********************************/


    /*******************************拉卡拉开始********************************/
    var getLakalaQRcode = function () {

        ajaxCallback(function(data){
            if (data.isSuccess == 'Y' && data.value == 'paid') {
                window.location = domain+'/cashier/mobile/cashierWapPayResult.htm?zaOrderNo=' + $("input[name='zaOrderNo']").val();
            } else {
                var _imageUrl = domain+"/cashier/mobile/cashierWapPayAction/processLakala.do?zaOrder="+$("input[name='zaOrderNo']").val();
                new shytUI.LKLModal({
                    url:_imageUrl, //二维码图片url
                    callback:function(modal){
                        modal.close();
                        ajaxCallback(function(data){
                            if (data.isSuccess == 'Y' && data.value == 'paid') {
                                window.location = domain+'/cashier/mobile/cashierWapPayResult.htm?zaOrderNo=' + $("input[name='zaOrderNo']").val();
                            } else {
                                cashierCommon.simpleAlertDialog("亲，您还没有支付哦");
                            }
                        })
                    }
                }).show();
            }
        });

    }

    /**
     * 支付结果查询
     * */
    var ajaxCallback=function(callback){
        $.ajax({
            dataType : "jsonp",
            jsonp: "callback",
            url: domain+'/cashier/checkPayOrderAction/checkOrderJsonp.json',
            data:{
                "zaOrderNo":$("input[name='zaOrderNo']").val()
            },
            success:function(data){
                callback(data);
            }
        });
    }
    /*******************************拉卡拉结束********************************/

    /*******************************最福利支付开始********************************/
    var zflPay = function() {
        $.ajax({
            url: domain+'/cashier/mobile/cashierWapPayAction/zflPay.json',
            data:{
                "zaOrderNo":$("input[name='zaOrderNo']").val()
            },
            success:function(data){
                if (data.isSuccess == true) {
                    //$("form").submit();
                    window.location=data.value;
                } else {
                    cashierCommon.simpleAlertDialog("支付异常，请选择其他支付方式");
                }
            }
        });
    }
    /*******************************最福利支付结束********************************/
});