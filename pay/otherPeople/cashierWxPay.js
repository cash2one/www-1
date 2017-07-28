var cashierWxPay=window.cashierWxPay||{};
(function($){
    var _payResult;
    var isSetInterval = false;
    /**
     * 点击微信公众号支付
     */
    cashierWxPay.toPay = function(payResult) {
        _payResult = payResult;
        shytUI.Loading.init().show();
        $.ajax({
            dataType : "jsonp",
            jsonp: "callback",
            //url : domain+"/cashier/weixin/cashierWxPayAction/pay.json",
            url : domain+"/cashier/mobile/cashierWapPayAction/pay.json",
            data : {
                "zaOrderNo" : $("input[name='zaOrderNo']").val(),
                "merchantCode" : $("#merchantCode").val(),
                "payChannel" : $("input[name='payChannel']:checked").val()
            },
            success : function(data) {
                /*var _params = JSON.parse(data);*/
                var _params = data;
                var isSuccess = _params.isSuccess;
                if(isSuccess == "N"){
                    shytUI.Loading.close();
                    var msg = data["error"];
                    var _errorCode = data["error_code"];
                    _isClick = false; //重复点击标识消除
                    cashierCommon.simpleAlertDialog(msg);
                    if (_errorCode == "cashier.ORDER_IS_PAID") { //订单已经支付
                        location.reload();
                    }
                    //alert(msg);
                    return;
                }
                wx.ready(function(){
                    shytUI.Loading.close();
                    console.log("ready begin...");
                    wx.chooseWXPay({
                        'timestamp': _params.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        'nonceStr': _params.nonceStr, // 支付签名随机串，不长于 32 位
                        'package': _params["package"], // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        'signType': _params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        'paySign': _params.paySign, // 支付签名
                        success: function (res) {
//					    	if ($("#wxErrorPage").val() == 'true') {
//					    		wx.closeWindow();
//					    	}
                            //alert("支付成功");
                            // 支付成功后的回调函数
                            //window.location=domain+'/cashier/mobile/cashierWapPayResult.htm?zaOrderNo=' + $("input[name='zaOrderNo']").val();
                            window.location=domain+payResult+'?isCheck=N&zaOrderNo=' + $("input[name='zaOrderNo']").val();
                        },
                        fail: function (res) {
                            _isClick = false; //重复点击标识消除
                            //cashierCommon.simpleAlertDialog(JSON.stringify(res));
                            //cashierCommon.simpleAlertDialog("亲,支付异常,请换一种支付方式");
                            var _branceType = $("#branchType").val();
                            var _canUserLongScan = $("#canUserLongScan").val();
                            if (_branceType == 'normal' && 'Y' == _canUserLongScan) {
                                proccessWxNotCertifiedError();
                            } else {
                                cashierCommon.simpleAlertDialog("亲,支付异常,请换一种支付方式");
                            }
                            console.log(res);
                        },
                        cancel: function (res) {
                            _isClick = false; //重复点击标识消除
                            console.log(res);
                        }
                    });
                });
            }
        });
    };

    //处理微信金额提醒
    cashierWxPay.proccessWxAmtTip = function(_payChannel,_amt) {
        //处理微信金额提醒
        if (_amt > 5000) {
            if ("wxpay" == _payChannel || "vehicle_wxpay" == _payChannel) {
                $("#wxAmtTip").show();
            } else {
                $("#wxAmtTip").hide();
            }
        }
    }
    //处理微信跨号支付错误问题
    var proccessWxNotCertifiedError = function(payResult){
        var _imageUrl = domain+"/cashier/mobile/cashierWapPayAction/processWxErrorPay.do?zaOrder="+$("input[name='zaOrderNo']").val();
        if ($("#qrcodeImageId").attr("haveClick") == "false") {
            $("#qrcodeImageId").attr("src", _imageUrl);
            $("#qrcodeImageId").attr("haveClick", "true");
            //$("#qrcodeImageId").attr('onerror',  "javascript:wxErrorAlert()");
        }
        $(".QRcode-pop2").show();
        if (isSetInterval == false) {
            var wxPayTimeEven = window.setInterval(checkOrderStatusJsonp,"3000");
            isSetInterval = true;
        }
    }
    //查询订单状态
    var checkOrderStatusJsonp = function() {
        $.ajax({
            dataType : "jsonp",
            jsonp: "callback",
            url: domain+'/cashier/checkPayOrderAction/checkOrderJsonp.json',
            data:{
                "zaOrderNo":$("input[name='zaOrderNo']").val()
            },
            success:function(data){
                if (data.isSuccess == 'Y' && data.value == 'paid') {
                    window.location = domain + _payResult +'?isCheck=N&zaOrderNo=' + $("input[name='zaOrderNo']").val();
                }
            }
        });
    }
})( jQuery ); //end jQuery

