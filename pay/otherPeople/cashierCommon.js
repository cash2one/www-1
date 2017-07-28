/**
 * 通用 Util JS, 不负责具体业务
 * */
var cashierCommon=window.cashierCommon||{};
(function($){
    //通用订单检查JSONP
    cashierCommon.checkOrderStatusJsonp = function(successPage) {
        $.ajax({
            dataType : "jsonp",
            jsonp: "callback",
            url: domain+'/cashier/checkPayOrderAction/checkOrderJsonp.json',
            data:{
                "zaOrderNo":$("input[name='zaOrderNo']").val()
            },
            success:function(data){
                if (data.isSuccess == 'Y' && data.value == 'paid') {
                    window.location = domain + successPage +'?isCheck=N&zaOrderNo=' + _zaOrderNo;
                }
            }
        });
    }

    //通用订单检查
    cashierCommon.checkOrderStatus = function(successPage) {
        shytUI.Loading.init().show();
        var _zaOrderNo = $("#zaOrderNo").val();
        $.ajax({
            url : domainNoHttps+'/cashier/checkPayOrderAction/checkOrder.json',
            data : {
                "zaOrderNo" : _zaOrderNo
            },
            success : function(data) {
                shytUI.Loading.close();
                if (data == "paid") {
                    window.location = domain + successPage +'?zaOrderNo=' + _zaOrderNo;
                }
            },
            error : function(data) {
                shytUI.Loading.close();
            }
        });
    }

    //通用订单检查,无loading页面
    cashierCommon.checkOrderNoLoading = function(successPage, zaOrderNo) {
        $.ajax({
            url : domainNoHttps+'/cashier/checkPayOrderAction/checkOrder.json',
            data : {
                "zaOrderNo" : zaOrderNo
            },
            success : function(data) {
                if (data == "paid") {
                    window.location = domain + successPage +'?zaOrderNo=' + zaOrderNo;
                }
            },
        });
    }

    /**
     * 手机简单提示框
     * */
    cashierCommon.simpleAlertDialog = function(alertText) {
        shytUI.Alert.close();
        shytUI.Alert.init({
            content:'<div class="dis-table mg-mid"><i class="dis-tablecell"></i>\
               <div class="dis-tablecell m-vertical-mid"><p>'+alertText+'</p></div>\
               </div>',
            name:'我知道了',
            callback:function(){
                shytUI.Alert.close();
            }
        }).show();
    }

})( jQuery ); //end jQuery